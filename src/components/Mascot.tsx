export type Mood = "idle" | "wave" | "cheer" | "oops" | "celebrate";

const moodClass: Record<Mood, string> = {
  idle: "animate-[bob_2.6s_ease-in-out_infinite]",
  wave: "animate-[bob_2.2s_ease-in-out_infinite]",
  cheer: "animate-[cheer_0.6s_ease-out]",
  oops: "animate-[oops_0.55s_ease-out]",
  celebrate: "animate-[dance_1.2s_ease-in-out_infinite]",
};

export function Mascot({ mood = "idle", size = 120 }: { mood?: Mood; size?: number }) {
  const happy = mood === "cheer" || mood === "celebrate" || mood === "wave";
  return (
    <div className={moodClass[mood]} style={{ width: size }} aria-hidden="true">
      <svg viewBox="0 0 120 130" width="100%" role="img">
        <ellipse cx="60" cy="124" rx="30" ry="5" className="fill-foreground/10" />
        {/* body / air buddy bubble */}
        <circle cx="60" cy="62" r="42" className="fill-primary" />
        <circle cx="60" cy="62" r="42" className="fill-background/25" />
        <circle cx="60" cy="62" r="34" className="fill-card" />
        {/* antenna */}
        <line x1="60" y1="24" x2="60" y2="12" className="stroke-primary" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="9" r="6" className="fill-[var(--sun)]" />
        {/* eyes */}
        <g className="animate-blink">
          <circle cx="48" cy="58" r="6" className="fill-foreground" />
          <circle cx="72" cy="58" r="6" className="fill-foreground" />
          <circle cx="50" cy="56" r="2" className="fill-card" />
          <circle cx="74" cy="56" r="2" className="fill-card" />
        </g>
        {/* mouth */}
        {mood === "oops" ? (
          <ellipse cx="60" cy="76" rx="7" ry="8" className="fill-[var(--coral)]" />
        ) : (
          <path
            d={happy ? "M46 72 Q60 88 74 72" : "M48 74 Q60 82 72 74"}
            className="fill-none stroke-foreground"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {/* cheeks */}
        <circle cx="38" cy="70" r="5" className="fill-[var(--coral)]/40" />
        <circle cx="82" cy="70" r="5" className="fill-[var(--coral)]/40" />
        {/* arms */}
        <g className={mood === "wave" || mood === "celebrate" ? "origin-[100px_62px] animate-[oops_1.4s_ease-in-out_infinite]" : ""}>
          <path d="M100 62 Q114 50 110 38" className="fill-none stroke-primary" strokeWidth="7" strokeLinecap="round" />
        </g>
        <path
          d={mood === "cheer" ? "M20 62 Q8 48 12 36" : "M20 62 Q8 70 10 82"}
          className="fill-none stroke-primary"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* legs */}
        <path d="M46 100 L42 116" className="stroke-primary" strokeWidth="7" strokeLinecap="round" />
        <path d="M74 100 L78 116" className="stroke-primary" strokeWidth="7" strokeLinecap="round" />
      </svg>
    </div>
  );
}
