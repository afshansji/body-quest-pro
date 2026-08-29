import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BodyFigure } from "./BodyFigure";
import { Mascot, type Mood } from "./Mascot";
import { Results } from "./Results";
import { PENALTY, scoreForCorrect, type BodySystem, type Grade, type Part } from "@/game/systems";

type Bubble = { id: number; x: number; y: number; text: string; tone: "good" | "bad" | "neutral" };
type Spark = { id: number; x: number; y: number };

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function useCountUp(value: number) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    let frame = 0;
    const from = display;
    const diff = value - from;
    if (diff === 0) return;
    const steps = 18;
    const tick = () => {
      frame++;
      setDisplay(Math.round(from + (diff * frame) / steps));
      if (frame < steps) raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return display;
}

export function GameBoard({
  system,
  grade,
  onExit,
}: {
  system: BodySystem;
  grade: Grade;
  onExit: () => void;
}) {
  const [round, setRound] = useState(0);
  const [placed, setPlaced] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [mood, setMood] = useState<Mood>("idle");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [selected, setSelected] = useState<Part | null>(null);
  const [drag, setDrag] = useState<{ part: Part; x: number; y: number } | null>(null);
  const [wrongSpot, setWrongSpot] = useState<string | null>(null);
  const [coach, setCoach] = useState<string>("");
  const boardRef = useRef<HTMLDivElement>(null);
  const uid = useRef(0);

  const tray = useMemo(() => shuffle(system.parts), [system, round]);
  const remaining = tray.filter((p) => !placed[p.id]);
  const total = system.parts.length;
  const done = correct >= total && total > 0;
  const accuracy = correct + mistakes === 0 ? 100 : Math.round((correct / (correct + mistakes)) * 100);
  const shownScore = useCountUp(score);

  const activePart = drag?.part ?? selected;

  const reset = useCallback(() => {
    setRound((r) => r + 1);
    setPlaced({});
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setMistakes(0);
    setCorrect(0);
    setSelected(null);
    setDrag(null);
    setBubbles([]);
    setCoach("");
    setMood("idle");
  }, []);

  const flash = useCallback((mood: Mood) => {
    setMood(mood);
    setTimeout(() => setMood("idle"), 700);
  }, []);

  const addBubble = (x: number, y: number, text: string, tone: Bubble["tone"]) => {
    const id = ++uid.current;
    setBubbles((b) => [...b, { id, x, y, text, tone }]);
    setTimeout(() => setBubbles((b) => b.filter((n) => n.id !== id)), 1700);
  };

  const attempt = useCallback(
    (spot: Part, part: Part) => {
      if (placed[spot.id]) {
        addBubble(spot.x, spot.y, "Slot taken", "neutral");
        return;
      }
      if (spot.id === part.id) {
        const gained = scoreForCorrect(streak, grade);
        const nextCorrect = correct + 1;
        setPlaced((p) => ({ ...p, [spot.id]: true }));
        setScore((s) => s + gained);
        setStreak((s) => {
          const n = s + 1;
          setBestStreak((b) => Math.max(b, n));
          return n;
        });
        setCorrect(nextCorrect);
        addBubble(spot.x, spot.y, `+${gained} · ${part.fact}`, "good");
        const id = ++uid.current;
        setSparks((s) => [...s, { id, x: spot.x, y: spot.y }]);
        setTimeout(() => setSparks((s) => s.filter((n) => n.id !== id)), 800);
        flash("cheer");
        if (system.journey) {
          setCoach(
            nextCorrect >= total
              ? (system.journeyComplete ?? "All done!")
              : system.journey[Math.min(nextCorrect, system.journey.length - 1)]!,
          );
        } else {
          setCoach(`Great! ${part.name} is in place.`);
        }
      } else {
        setScore((s) => Math.max(0, s - PENALTY[grade]));
        setStreak(0);
        setMistakes((m) => m + 1);
        setWrongSpot(spot.id);
        setTimeout(() => setWrongSpot(null), 450);
        addBubble(spot.x, spot.y, `-${PENALTY[grade]} · Not this one`, "bad");
        flash("oops");
      }
      setSelected(null);
    },
    [placed, streak, grade, correct, flash, system, total],
  );

  // pointer drag
  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY } : d));
    const up = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const spotEl = el?.closest("[data-spot]") as HTMLElement | null;
      const current = drag;
      setDrag(null);
      if (spotEl && current) {
        const spot = system.parts.find((p) => p.id === spotEl.dataset['spot']);
        if (spot) attempt(spot, current.part);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", () => setDrag(null), { once: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag, attempt, system.parts]);

  useEffect(() => {
    if (done) setMood("celebrate");
  }, [done]);

  const initialCoach = system.journey
    ? "Place the first part to begin the breathing journey."
    : "Drag each organ from the tray onto the matching spot on the body.";

  const placedList = system.parts.filter((p) => placed[p.id]);

  return (
    <div className="relative min-h-screen">
      <header className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onExit}
            className="shrink-0 rounded-full bg-card px-4 py-2 text-sm font-bold shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
          >
            ← Back to systems
          </button>
          <h1 className="truncate font-display text-xl font-black sm:text-2xl">{system.name}</h1>
          <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground">
            Grade {system.grades.includes("1-5") && grade === "1-5" ? "1–5" : "6–10"}
          </span>
        </div>
        <button
          onClick={reset}
          className="rounded-full bg-[var(--coral)] px-4 py-2 text-sm font-black text-[var(--coral-foreground)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
        >
          Restart
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 pb-24 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,300px)]">
        {/* TRAY */}
        <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-soft)]">
          <h2 className="mb-3 font-display text-lg font-black">Tray</h2>
          <p className="mb-3 text-xs text-muted-foreground">Drag a piece, or tap it then tap a spot.</p>
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {remaining.map((part, i) => (
              <li key={part.id}>
                <button
                  onPointerDown={(e) => {
                    e.preventDefault();
                    setDrag({ part, x: e.clientX, y: e.clientY });
                    setSelected(part);
                  }}
                  aria-pressed={selected?.id === part.id}
                  className={`motion-fade flex w-full touch-none items-center gap-2 rounded-2xl border-2 px-3 py-2 text-left font-bold shadow-[var(--shadow-soft)] transition animate-[pop-in_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both] ${
                    selected?.id === part.id
                      ? "border-primary bg-accent scale-105"
                      : "border-transparent bg-secondary hover:-translate-y-0.5"
                  }`}
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <span className="text-xl">{part.icon}</span>
                  <span className="min-w-0 truncate text-sm">{part.name}</span>
                </button>
              </li>
            ))}
            {remaining.length === 0 && (
              <li className="text-sm font-bold text-[var(--success)]">All pieces placed! 🎉</li>
            )}
          </ul>
        </section>

        {/* BODY */}
        <section
          ref={boardRef}
          className="relative mx-auto aspect-[1/1.7] w-full max-w-[420px] rounded-3xl bg-card shadow-[var(--shadow-soft)]"
        >
          <BodyFigure litParts={correct} />
          {/* air path */}
          {system.journey && placedList.length > 1 && (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
              <polyline
                points={system.parts
                  .filter((p) => placed[p.id])
                  .map((p) => `${p.x},${p.y}`)
                  .join(" ")}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}
          {system.parts.map((spot, i) => {
            const isPlaced = placed[spot.id];
            const isTarget = activePart?.id === spot.id && !isPlaced;
            return (
              <button
                key={spot.id}
                data-spot={spot.id}
                onClick={() => selected && attempt(spot, selected)}
                aria-label={isPlaced ? `${spot.name} placed` : `Drop spot ${i + 1}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 text-xs font-black transition ${
                  isPlaced
                    ? "border-[var(--success)] bg-[var(--success)] px-2 py-1 text-[var(--success-foreground)] animate-[snap_0.5s_cubic-bezier(0.34,1.56,0.64,1)]"
                    : "h-9 w-9 border-dashed border-primary/70 bg-background/70 text-muted-foreground"
                } ${isTarget ? "animate-[magnet_1.1s_ease-in-out_infinite] border-solid" : ""} ${
                  wrongSpot === spot.id ? "animate-[shake_0.4s_ease-in-out] !border-destructive !bg-destructive/70" : ""
                }`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                {isPlaced ? (
                  <span className="whitespace-nowrap">
                    {spot.icon} {spot.name}
                  </span>
                ) : grade === "1-5" ? (
                  i + 1
                ) : (
                  ""
                )}
              </button>
            );
          })}
          {sparks.map((s) => (
            <span key={s.id} className="pointer-events-none absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute block h-2 w-2 rounded-full bg-[var(--sun)] animate-[spark_0.7s_ease-out_forwards]"
                  style={
                    {
                      "--dx": `${Math.cos((i / 8) * 6.28) * 46}px`,
                      "--dy": `${Math.sin((i / 8) * 6.28) * 46}px`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>
          ))}
          {bubbles.map((b) => (
            <span
              key={b.id}
              className={`pointer-events-none absolute z-20 w-48 -translate-x-1/2 rounded-2xl px-3 py-2 text-center text-xs font-bold shadow-[var(--shadow-lift)] animate-[rise_1.6s_ease-out_forwards] ${
                b.tone === "good"
                  ? "bg-[var(--success)] text-[var(--success-foreground)]"
                  : b.tone === "bad"
                    ? "bg-[var(--coral)] text-[var(--coral-foreground)]"
                    : "bg-card text-foreground"
              }`}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              {b.text}
            </span>
          ))}
        </section>

        {/* PANELS */}
        <section className="space-y-4">
          <div className="rounded-3xl bg-card p-4 shadow-[var(--shadow-soft)]">
            <h2 className="mb-3 font-display text-lg font-black">Score panel</h2>
            <div className="grid grid-cols-2 gap-3 text-center">
              <Stat label="Score" value={shownScore} />
              <Stat
                label="Streak"
                value={
                  <span className="inline-flex items-center gap-1">
                    {streak}
                    <span
                      className="inline-block animate-[flame_1s_ease-in-out_infinite]"
                      style={{ fontSize: `${1 + Math.min(streak, 6) * 0.12}rem` }}
                    >
                      🔥
                    </span>
                  </span>
                }
              />
              <Stat label="Mistakes" value={mistakes} />
              <Stat label="Placed" value={`${correct} of ${total}`} />
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-[width] duration-500"
                style={{ width: `${(correct / total) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-accent p-4 shadow-[var(--shadow-soft)]">
            <div className="flex items-start gap-3">
              <Mascot mood={mood} size={78} />
              <p className="min-w-0 flex-1 text-sm font-bold text-accent-foreground">{coach || initialCoach}</p>
            </div>
          </div>
        </section>
      </div>

      {/* drag ghost */}
      {drag && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rotate-6 scale-125 rounded-2xl bg-primary px-4 py-2 font-black text-primary-foreground shadow-[var(--shadow-lift)]"
          style={{ left: drag.x, top: drag.y }}
        >
          {drag.part.icon} {drag.part.name}
        </div>
      )}

      {done && (
        <Results
          system={system}
          score={score}
          accuracy={accuracy}
          bestStreak={bestStreak}
          mistakes={mistakes}
          onReplay={reset}
          onExit={onExit}
        />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-secondary px-2 py-3">
      <div className="font-display text-xl font-black text-secondary-foreground">{value}</div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
