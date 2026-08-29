/**
 * Hand-drawn dashed outline of the waving kid — shown on the Body Parts board
 * before any part is placed, then progressively covered by the real photo.
 * Pose mirrors body-parts-boy.png: waving hand up on the right, arm hanging on the left.
 */
export function BodyOutline({ placed, total }: { placed: number; total: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 text-[oklch(0.63_0.035_65)]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 298"
        className="absolute inset-0 h-full w-full animate-[breathe_5s_ease-in-out_infinite]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g strokeDasharray="6 5" opacity={0.6}>
          {/* ground */}
          <ellipse cx="100" cy="287" rx="60" ry="9" fill="oklch(0.9 0.04 85)" fillOpacity={0.45} />
          {/* feet */}
          <ellipse cx="77" cy="273" rx="17" ry="7" />
          <ellipse cx="123" cy="273" rx="17" ry="7" />
          {/* legs */}
          <path d="M87 180 Q80 228 79 268" />
          <path d="M111 180 Q117 228 121 268" />
          {/* arm hanging down (left) */}
          <path d="M69 104 Q57 148 60 190" />
          <circle cx="60" cy="199" r="13" />
          {/* torso */}
          <path d="M62 98 Q97 82 132 98 L125 180 Q97 193 69 180 Z" />
          {/* waving arm up (right) + doodle */}
          <path d="M131 100 Q157 86 165 58" />
          <path d="M150 78 C126 70 126 44 150 44 C170 44 172 74 150 82" />
          <g className="origin-[168px_50px] animate-[wave_2.6s_ease-in-out_infinite]">
            <circle cx="168" cy="50" r="13" />
          </g>
          {/* neck */}
          <path d="M89 82 L89 95 Q97 100 105 95 L105 82" />
          {/* head */}
          <circle cx="97" cy="45" r="38" />
        </g>
      </svg>

      <p className="absolute inset-x-0 bottom-2 text-center text-xs font-bold text-muted-foreground">
        {placed} / {total} parts attached
      </p>
    </div>
  );
}
