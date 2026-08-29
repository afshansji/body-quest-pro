import { useEffect, useState } from "react";
import { Mascot } from "./Mascot";
import { rankFor, type BodySystem } from "@/game/systems";

export function Results({
  system,
  score,
  accuracy,
  bestStreak,
  mistakes,
  onReplay,
  onExit,
}: {
  system: BodySystem;
  score: number;
  accuracy: number;
  bestStreak: number;
  mistakes: number;
  onReplay: () => void;
  onExit: () => void;
}) {
  const rank = rankFor(system, accuracy);
  const stars = accuracy >= 95 ? 5 : accuracy >= 80 ? 4 : accuracy >= 60 ? 3 : 2;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let frame = 0;
    const steps = 30;
    let raf = 0;
    const tick = () => {
      frame++;
      setShown(Math.round((score * frame) / steps));
      if (frame < steps) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 block h-3 w-2 rounded-sm animate-[confetti_2.6s_linear_forwards]"
            style={{
              left: `${(i * 2.5) % 100}%`,
              background: ["var(--primary)", "var(--sun)", "var(--coral)", "var(--success)"][i % 4],
              animationDelay: `${(i % 10) * 0.18}s`,
            }}
          />
        ))}
      </div>
      <div className="relative w-full max-w-md rounded-4xl bg-card p-6 text-center shadow-[var(--shadow-lift)] animate-[pop-in_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        <div className="mx-auto -mt-20 w-fit">
          <Mascot mood="celebrate" size={120} />
        </div>
        <div className="text-2xl">{"⭐".repeat(stars)}</div>
        <h2 className="mt-1 font-display text-3xl font-black">{rank?.title}</h2>
        <p className="text-sm text-muted-foreground">{rank?.note}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Cell label="Final score" value={shown} />
          <Cell label="Accuracy" value={`${accuracy}%`} />
          <Cell label="Best streak" value={bestStreak} />
          <Cell label="Mistakes" value={mistakes} />
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={onReplay}
            className="flex-1 rounded-2xl bg-[image:var(--gradient-primary)] px-4 py-3 font-display font-black text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
          >
            Play again
          </button>
          <button
            onClick={onExit}
            className="flex-1 rounded-2xl bg-secondary px-4 py-3 font-display font-black text-secondary-foreground transition hover:-translate-y-0.5"
          >
            Back to systems
          </button>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-secondary px-3 py-4">
      <div className="font-display text-2xl font-black text-secondary-foreground">{value}</div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
