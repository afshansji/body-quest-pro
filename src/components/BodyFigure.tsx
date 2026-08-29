export function BodyFigure({ litParts }: { litParts: number }) {
  return (
    <svg
      viewBox="0 0 200 400"
      className="pointer-events-none absolute inset-0 h-full w-full animate-[breathe_4s_ease-in-out_infinite]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9ae" />
          <stop offset="100%" stopColor="#f2b47e" />
        </linearGradient>
      </defs>

      {/* ======= CARTOON KID (like reference image 1) ======= */}
      {/* back arm (left, hanging down) */}
      <path d="M66 112 Q48 160 46 214" fill="none" stroke="url(#skin)" strokeWidth="17" strokeLinecap="round" />
      <circle cx="46" cy="218" r="10" fill="url(#skin)" />

      {/* legs */}
      <path d="M86 222 Q82 300 80 366" fill="none" stroke="url(#skin)" strokeWidth="19" strokeLinecap="round" />
      <path d="M116 222 Q122 300 124 366" fill="none" stroke="url(#skin)" strokeWidth="19" strokeLinecap="round" />
      {/* feet */}
      <ellipse cx="76" cy="372" rx="14" ry="8" fill="url(#skin)" />
      <ellipse cx="130" cy="372" rx="14" ry="8" fill="url(#skin)" />

      {/* red shorts */}
      <path d="M70 196 Q100 206 130 196 L134 244 Q100 256 66 244 Z" fill="#e03131" />
      <path d="M100 202 L100 250" stroke="#c01f1f" strokeWidth="4" />
      <path d="M70 196 Q100 206 130 196 L131 206 Q100 216 69 206 Z" fill="#c01f1f" />

      {/* torso */}
      <path d="M64 106 Q100 88 136 106 L130 198 Q100 210 70 198 Z" fill="url(#skin)" />
      {/* belly button */}
      <circle cx="100" cy="176" r="2.5" fill="#d99a5f" />

      {/* waving arm (right, up) */}
      <path d="M134 110 Q162 96 168 66" fill="none" stroke="url(#skin)" strokeWidth="17" strokeLinecap="round" />
      <g className="origin-[168px_60px] animate-[wave_2.4s_ease-in-out_infinite]">
        <circle cx="170" cy="56" r="11" fill="url(#skin)" />
        <path d="M164 48 L158 36 M169 46 L168 32 M175 47 L180 34 M180 52 L188 44" stroke="url(#skin)" strokeWidth="7" strokeLinecap="round" />
      </g>

      {/* neck */}
      <rect x="92" y="76" width="16" height="18" rx="6" fill="url(#skin)" />

      {/* head */}
      <circle cx="100" cy="48" r="32" fill="url(#skin)" />
      {/* ears */}
      <circle cx="68" cy="50" r="7" fill="url(#skin)" />
      <circle cx="132" cy="50" r="7" fill="url(#skin)" />

      {/* spiky hair */}
      <path
        d="M68 42 Q62 14 84 12 L88 2 L96 10 L104 0 L110 10 L120 4 L122 14 Q140 18 132 44 Q128 28 118 26 Q122 36 112 28 Q110 36 100 28 Q94 36 88 28 Q80 36 82 26 Q72 28 68 42 Z"
        fill="#e8890c"
      />

      {/* eyebrows */}
      <path d="M82 40 Q89 35 96 39" fill="none" stroke="#b46a08" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M104 39 Q111 35 118 40" fill="none" stroke="#b46a08" strokeWidth="3.5" strokeLinecap="round" />

      {/* eyes (blink) */}
      <g className="animate-blink">
        <ellipse cx="89" cy="48" rx="6.5" ry="7.5" fill="white" />
        <ellipse cx="111" cy="48" rx="6.5" ry="7.5" fill="white" />
        <circle cx="90" cy="49" r="3.6" fill="#2b8fd4" />
        <circle cx="110" cy="49" r="3.6" fill="#2b8fd4" />
        <circle cx="90.8" cy="49.8" r="1.8" fill="#12263a" />
        <circle cx="110.8" cy="49.8" r="1.8" fill="#12263a" />
      </g>

      {/* nose + big smile */}
      <path d="M99 56 Q100 59 103 57" fill="none" stroke="#d99a5f" strokeWidth="2" strokeLinecap="round" />
      <path d="M86 62 Q100 82 114 62 Q100 70 86 62 Z" fill="#8a3b12" />
      <path d="M92 68 Q100 76 108 68 Q100 72 92 68 Z" fill="#ef5b5b" />

      {/* glow that grows as parts are placed */}
      <circle cx="100" cy="150" r={26 + litParts * 5} fill="var(--success)" opacity={Math.min(0.03 * litParts, 0.2)} />
    </svg>
  );
}
