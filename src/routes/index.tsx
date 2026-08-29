import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mascot } from "@/components/Mascot";
import { BodyFigure } from "@/components/BodyFigure";
import { GameBoard } from "@/components/GameBoard";
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
        content: "Drag organs onto the body, build streaks and follow a breath from nose to alveoli.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [active, setActive] = useState<BodySystem | null>(null);

  if (active && grade) {
    return (
      <main className="relative min-h-screen bg-[image:var(--gradient-hero)]">
        <Blobs />
        <GameBoard system={active} grade={grade} onExit={() => setActive(null)} />
        <Footer />
      </main>
    );
  }

  const available = grade ? systemsForGrade(grade) : [];
  const list = grade ? [...available, ...SYSTEMS.filter((s) => s.locked && !available.includes(s))] : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[image:var(--gradient-hero)]">
      <Blobs />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10">
        {/* HERO */}
        <section className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-black uppercase tracking-wide text-primary shadow-[var(--shadow-soft)]">
              Breathe Easy Game
            </span>
            <h1 className="mt-3 font-display text-5xl font-black leading-none sm:text-7xl">
              Body<span className="text-primary">Quest</span>
            </h1>
            <p className="mt-3 max-w-md text-lg font-bold text-muted-foreground">
              Learn every part of the human body by dragging, dropping and discovering fun facts.
            </p>
          </div>
          <div className="flex items-end justify-center gap-2">
            <Mascot mood="wave" size={150} />
            <div className="relative h-56 w-32">
              <BodyFigure litParts={4} />
            </div>
          </div>
        </section>

        {/* STEP 1 */}
        <section className="mt-10">
          <h2 className="font-display text-2xl font-black">Step 1 · Choose your grade</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {(
              [
                { g: "1-5" as Grade, title: "Grade 1–5", sub: "Drag body parts onto the human body." },
                { g: "6-10" as Grade, title: "Grade 6–10", sub: "Core organs — brain, heart, lungs, and more." },
              ] as const
            ).map((opt, i) => {
              const on = grade === opt.g;
              return (
                <button
                  key={opt.g}
                  onClick={() => {
                    setGrade(opt.g);
                    setActive(null);
                  }}
                  className={`motion-fade rounded-4xl border-4 p-6 text-left transition animate-[pop-in_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both] ${
                    on
                      ? "-translate-y-1 border-primary bg-card shadow-[var(--shadow-lift)]"
                      : "border-transparent bg-card/80 shadow-[var(--shadow-soft)] hover:-translate-y-1"
                  }`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-2xl font-black">{opt.title}</h3>
                    {on && (
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--success)] text-[var(--success-foreground)]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-bold text-muted-foreground">{opt.sub}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* STEP 2 */}
        {grade && (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-black">Step 2 · Pick a system</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s, i) => (
                <article
                  key={s.id}
                  className={`motion-fade group rounded-4xl bg-card p-5 shadow-[var(--shadow-soft)] transition animate-[pop-in_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both] ${
                    s.locked ? "opacity-60 grayscale" : "hover:-translate-y-1 hover:rotate-[-1.2deg]"
                  }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="text-4xl">{s.locked ? "🔒" : s.icon}</div>
                  <h3 className="mt-2 font-display text-xl font-black">{s.name}</h3>
                  <p className="mt-1 text-sm font-bold text-muted-foreground">{s.description}</p>
                  <div className="mt-3 flex gap-1" aria-label={`Difficulty ${s.difficulty} of 5`}>
                    {Array.from({ length: 5 }).map((_, d) => (
                      <span
                        key={d}
                        className={`h-2.5 w-2.5 rounded-full ${d < s.difficulty ? "bg-[var(--coral)]" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                  {s.locked ? (
                    <p className="mt-4 rounded-2xl bg-muted px-4 py-2 text-center text-sm font-black text-muted-foreground">
                      Coming soon
                    </p>
                  ) : (
                    <button
                      onClick={() => setActive(s)}
                      className="mt-4 w-full rounded-2xl bg-[image:var(--gradient-primary)] px-4 py-3 font-display font-black text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5"
                    >
                      Start game
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}

function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-[blob_18s_ease-in-out_infinite]" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[var(--sun)]/25 blur-3xl animate-[blob_22s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--coral)]/20 blur-3xl animate-[blob_26s_ease-in-out_infinite]" />
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-primary/40 animate-[float_5s_ease-in-out_infinite]"
          style={{ left: `${(i * 7.3) % 100}%`, top: `${(i * 13.7) % 100}%`, animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/70 px-4 py-6 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm font-bold text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>BodyQuest · Learn the human body, one breath at a time.</p>
        <p className="flex items-center gap-2">
          <svg viewBox="0 0 60 36" width="30" height="18" className="rounded-sm shadow-[var(--shadow-soft)]" role="img" aria-label="Flag of Bangladesh">
            <rect width="60" height="36" fill="#006a4e" />
            <circle cx="27" cy="18" r="11" fill="#f42a41" />
          </svg>
          Made in Dhaka, Bangladesh 📍
        </p>
      </div>
    </footer>
  );
}
