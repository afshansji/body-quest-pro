export function BodyFigure({ litParts }: { litParts: number }) {
  return (
    <svg
      viewBox="0 0 200 400"
      className="pointer-events-none absolute inset-0 h-full w-full animate-[breathe_4s_ease-in-out_infinite]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bodyfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* head */}
      <circle cx="100" cy="42" r="30" fill="url(#bodyfill)" stroke="var(--primary)" strokeWidth="3" />
      {/* eyes blink */}
      <g className="animate-blink">
        <circle cx="90" cy="40" r="3.4" fill="var(--foreground)" />
        <circle cx="110" cy="40" r="3.4" fill="var(--foreground)" />
      </g>
      <path d="M92 54 Q100 61 108 54" fill="none" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" />
      {/* neck + torso */}
      <rect x="92" y="70" width="16" height="16" rx="6" fill="url(#bodyfill)" stroke="var(--primary)" strokeWidth="3" />
      <path
        d="M62 100 Q100 82 138 100 L132 210 Q100 224 68 210 Z"
        fill="url(#bodyfill)"
        stroke="var(--primary)"
        strokeWidth="3"
        className="animate-[breathe_4s_ease-in-out_infinite]"
      />
      {/* arms */}
      <path d="M64 104 Q40 150 38 214" fill="none" stroke="var(--primary)" strokeWidth="14" strokeLinecap="round" opacity="0.35" />
      <path d="M136 104 Q160 150 162 214" fill="none" stroke="var(--primary)" strokeWidth="14" strokeLinecap="round" opacity="0.35" />
      {/* legs */}
      <path d="M84 214 Q78 300 78 372" fill="none" stroke="var(--primary)" strokeWidth="18" strokeLinecap="round" opacity="0.35" />
      <path d="M118 214 Q124 300 126 372" fill="none" stroke="var(--primary)" strokeWidth="18" strokeLinecap="round" opacity="0.35" />
      {/* glow that grows as parts are placed */}
      <circle cx="100" cy="160" r={30 + litParts * 6} fill="var(--success)" opacity={Math.min(0.03 * litParts, 0.22)} />
    </svg>
  );
}
