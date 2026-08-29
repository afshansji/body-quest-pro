import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home,
  Layers,
  Gamepad2,
  HelpCircle,
  BarChart3,
  Trophy,
  Settings,
  Play,
  Lock,
  Check,
  Sparkles,
} from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { GameBoard } from "@/components/GameBoard";
import boyImg from "@/assets/body-parts-boy.png";
import { SYSTEMS, systemsForGrade, type BodySystem, type Grade } from "@/game/systems";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BodyQuest — Human Body Learning Game for Kids" },
      {
        name: "description",
        content:
          "BodyQuest is a colorful drag-and-drop game teaching grades 1–10 the parts of the human body, core organs and the respiratory system.",
      },
      { property: "og:title", content: "BodyQuest — Human Body Learning Game for Kids" },
      {
        property: "og:description",
        content:
          "Drag organs onto the body, build streaks and follow a breath from nose to alveoli.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { icon: Home, label: "Home" },
  { icon: Layers, label: "Systems" },
  { icon: Gamepad2, label: "Games" },
  { icon: HelpCircle, label: "Quizzes" },
  { icon: BarChart3, label: "Progress" },
  { icon: Trophy, label: "Achievements" },
  { icon: Settings, label: "Settings" },
] as const;

/** pastel tint + accent for each system card */
const TINT: Record<string, { panel: string; dot: string }> = {
  "body-parts": { panel: "oklch(0.94 0.05 155)", dot: "oklch(0.7 0.15 155)" },
  respiratory: { panel: "oklch(0.93 0.045 235)", dot: "oklch(0.66 0.15 235)" },
};
const FALLBACK_TINT = { panel: "oklch(0.93 0.03 210)", dot: "var(--primary)" };

const GRADE_OPTS = [
  {
    g: "1-5" as Grade,
    icon: "🌱",
    title: "Grade 1–5",
    sub: "Drag body parts onto the human body.",
  },
  {
    g: "6-10" as Grade,
    icon: "🎓",
    title: "Grade 6–10",
    sub: "Core organs — brain, heart, lungs, and more.",
  },
] as const;

function Index() {
  const [grade, setGrade] = useState<Grade>("6-10");
  const [active, setActive] = useState<BodySystem | null>(null);

  if (active) {
    return (
      <main className="relative min-h-screen bg-[image:var(--gradient-hero)]">
        <Blobs />
        <GameBoard system={active} grade={grade} onExit={() => setActive(null)} />
        <Footer />
      </main>
    );
  }

  const list = systemsForGrade(grade);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[image:var(--gradient-hero)]">
      <Blobs />
      <Leaves />
      <Sidebar />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:pl-28 lg:pl-24">
        {/* HERO */}
        <section className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-primary shadow-[var(--shadow-soft)]">
              Breathe Easy Game
            </span>
            <h1 className="mt-3 flex items-start font-display text-6xl font-black leading-[0.95] sm:text-7xl">
              <span className="text-foreground">Body</span>
              <span className="text-primary">Quest</span>
              <Sparkles className="ml-1 mt-1 h-7 w-7 text-[var(--sun)]" strokeWidth={2.5} />
            </h1>
            <p className="mt-4 max-w-md text-lg font-bold text-muted-foreground">
              Learn every part of the human body by dragging, dropping and discovering fun facts.
            </p>
          </div>

          <div className="relative mx-auto flex items-end justify-center gap-2 overflow-hidden rounded-[2rem] px-6 pb-3 pt-8 shadow-[var(--shadow-soft)] [background:linear-gradient(to_bottom,oklch(0.95_0.04_210),oklch(0.93_0.07_160)_55%,oklch(0.85_0.13_150))]">
            <Mascot mood="wave" size={124} />
            <img
              src={boyImg}
              alt=""
              draggable={false}
              className="h-44 w-auto object-contain mix-blend-multiply"
            />
          </div>
        </section>

        {/* STEP 1 */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-black">
            Step 1 <span className="text-primary">•</span> Choose your grade
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {GRADE_OPTS.map((opt, i) => {
              const on = grade === opt.g;
              return (
                <button
                  key={opt.g}
                  onClick={() => {
                    setGrade(opt.g);
                    setActive(null);
                  }}
                  className={`motion-fade flex items-center gap-4 rounded-3xl border-2 bg-card p-5 text-left transition animate-[pop-in_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both] ${
                    on
                      ? "-translate-y-0.5 border-primary shadow-[var(--shadow-lift)] ring-4 ring-primary/15"
                      : "border-border/60 shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-primary/40"
                  }`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-secondary text-3xl">
                    {opt.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl font-black">{opt.title}</span>
                    <span className="mt-0.5 block text-sm font-bold text-muted-foreground">
                      {opt.sub}
                    </span>
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${
                      on ? "bg-primary text-primary-foreground" : "border-2 border-border"
                    }`}
                  >
                    {on && <Check className="h-5 w-5" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* STEP 2 */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-black">
            Step 2 <span className="text-primary">•</span> Pick a system
          </h2>
          <div className="mt-4 grid max-w-2xl gap-5 sm:grid-cols-2">
            {list.map((s, i) => {
              const tint = TINT[s.id] ?? FALLBACK_TINT;
              return (
                <article
                  key={s.id}
                  className={`motion-fade flex flex-col overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] transition animate-[pop-in_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both] ${
                    s.locked ? "opacity-80" : "hover:-translate-y-1"
                  }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* image panel */}
                  <div
                    className="relative grid h-32 place-items-center"
                    style={{ background: tint.panel }}
                  >
                    <span className={`text-5xl ${s.locked ? "grayscale" : ""}`}>{s.icon}</span>
                    <Stars />
                    {s.locked && (
                      <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-card/80 text-muted-foreground shadow-[var(--shadow-soft)]">
                        <Lock className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    )}
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-lg font-black leading-tight">{s.name}</h3>
                    <p className="mt-1 text-sm font-bold text-muted-foreground">{s.description}</p>

                    {!s.locked && (
                      <div
                        className="mt-3 flex gap-1.5"
                        aria-label={`Difficulty ${s.difficulty} of 5`}
                      >
                        {Array.from({ length: 5 }).map((_, d) => (
                          <span
                            key={d}
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: d < s.difficulty ? tint.dot : "var(--muted)" }}
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex-1" />

                    {s.locked ? (
                      <p className="rounded-2xl bg-muted px-4 py-2.5 text-center text-sm font-black text-muted-foreground">
                        Coming soon
                      </p>
                    ) : (
                      <button
                        onClick={() => setActive(s)}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-4 py-2.5 font-display font-black text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
                      >
                        Start game
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-foreground/20">
                          <Play className="h-3.5 w-3.5 fill-current" />
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

function Sidebar() {
  return (
    <nav
      aria-label="Main"
      className="fixed left-3 top-3 bottom-3 z-30 hidden w-20 flex-col items-center gap-1 overflow-y-auto rounded-[1.75rem] py-4 shadow-[var(--shadow-lift)] md:flex [background:linear-gradient(to_bottom,oklch(0.5_0.07_205),oklch(0.42_0.07_215))]"
    >
      {NAV.map(({ icon: Icon, label }, i) => {
        const on = i === 0;
        return (
          <button
            key={label}
            aria-label={label}
            aria-current={on ? "page" : undefined}
            className="group flex w-full flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold text-white/75 transition hover:text-white"
          >
            <span
              className={`grid h-11 w-11 place-items-center rounded-2xl transition ${
                on
                  ? "bg-card text-primary shadow-[var(--shadow-soft)]"
                  : "bg-white/10 group-hover:bg-white/20"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={2.4} />
            </span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}

function Stars() {
  const pts = [
    { l: "14%", t: "24%", s: 10 },
    { l: "82%", t: "30%", s: 14 },
    { l: "70%", t: "70%", s: 9 },
    { l: "30%", t: "74%", s: 12 },
  ];
  return (
    <>
      {pts.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute font-black text-card/70"
          style={{ left: p.l, top: p.t, fontSize: p.s }}
        >
          ✦
        </span>
      ))}
    </>
  );
}

function Leaves() {
  return (
    <div
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      <span className="absolute -left-4 bottom-2 rotate-12 text-7xl opacity-70">🌿</span>
      <span className="absolute left-6 top-24 -rotate-12 text-3xl opacity-60">🍃</span>
      <span className="absolute -right-3 bottom-16 -rotate-12 text-7xl opacity-70">🌿</span>
      <span className="absolute right-10 top-10 text-2xl opacity-60">✨</span>
      <span className="absolute bottom-4 left-24 text-4xl opacity-70">🌼</span>
    </div>
  );
}

function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-[blob_18s_ease-in-out_infinite]" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[var(--sun)]/20 blur-3xl animate-[blob_22s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--coral)]/15 blur-3xl animate-[blob_26s_ease-in-out_infinite]" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/70 px-4 py-6 backdrop-blur md:pl-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm font-bold text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>BodyQuest · Learn the human body, one breath at a time.</p>
        <p className="flex items-center gap-2">
          <svg
            viewBox="0 0 60 36"
            width="30"
            height="18"
            className="rounded-sm shadow-[var(--shadow-soft)]"
            role="img"
            aria-label="Flag of Bangladesh"
          >
            <rect width="60" height="36" fill="#006a4e" />
            <circle cx="27" cy="18" r="11" fill="#f42a41" />
          </svg>
          Made in Dhaka, Bangladesh 📍
        </p>
      </div>
    </footer>
  );
}
