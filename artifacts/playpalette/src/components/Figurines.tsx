// Hand-shaded SVG renderings of painted POP figurines, styled to read as
// 3D plaster craft toys (radial-gradient volume, specular highlights, ground
// shadows) rather than flat cartoons. Used by the product demo slider and
// the shop page animation until real product photos are available.

export function LionFigurine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 340" className={className} aria-hidden>
      <defs>
        <radialGradient id="lion-mane" cx="0.35" cy="0.3" r="0.95">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="55%" stopColor="#f97316" />
          <stop offset="85%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <radialGradient id="lion-face" cx="0.38" cy="0.32" r="0.9">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="lion-muzzle" cx="0.4" cy="0.35" r="0.9">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
        <radialGradient id="lion-ear" cx="0.35" cy="0.35" r="0.9">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <radialGradient id="fig-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="318" rx="112" ry="16" fill="url(#fig-shadow)" />

      <circle cx="160" cy="160" r="105" fill="url(#lion-mane)" />
      {/* molded mane ridges */}
      <g fill="none" stroke="#9a3412" strokeOpacity="0.22" strokeWidth="5" strokeLinecap="round">
        <path d="M160 62 q10 18 0 34" />
        <path d="M226 88 q-2 20 -16 28" />
        <path d="M255 155 q-16 8 -30 4" />
        <path d="M232 226 q-14 -10 -18 -24" />
        <path d="M92 90 q4 20 17 28" />
        <path d="M66 155 q16 8 30 4" />
        <path d="M89 226 q13 -10 17 -24" />
        <path d="M160 258 q8 -16 0 -30" />
      </g>

      <circle cx="95" cy="80" r="24" fill="url(#lion-ear)" />
      <circle cx="95" cy="80" r="12" fill="#fdba74" />
      <circle cx="225" cy="80" r="24" fill="url(#lion-ear)" />
      <circle cx="225" cy="80" r="12" fill="#fdba74" />

      <circle cx="160" cy="168" r="72" fill="url(#lion-face)" />
      <ellipse cx="160" cy="196" rx="34" ry="26" fill="url(#lion-muzzle)" />

      <circle cx="136" cy="152" r="7" fill="#1c1917" />
      <circle cx="184" cy="152" r="7" fill="#1c1917" />
      <circle cx="138.5" cy="149.5" r="2.5" fill="#ffffff" />
      <circle cx="186.5" cy="149.5" r="2.5" fill="#ffffff" />
      <path d="M150 184 L170 184 L160 196 Z" fill="#1c1917" />
      <path d="M160 196 Q160 208 148 210 M160 196 Q160 208 172 210" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M116 190 L96 186 M116 200 L98 202 M204 190 L224 186 M204 200 L222 202" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />

      {/* specular highlights — glossy painted plaster */}
      <ellipse cx="112" cy="94" rx="34" ry="16" fill="#ffffff" opacity="0.35" transform="rotate(-28 112 94)" />
      <ellipse cx="132" cy="134" rx="17" ry="9" fill="#ffffff" opacity="0.4" transform="rotate(-20 132 134)" />
    </svg>
  );
}

export function ElephantFigurine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 340" className={className} aria-hidden>
      <defs>
        <radialGradient id="ele-body" cx="0.35" cy="0.3" r="0.95">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="55%" stopColor="#60a5fa" />
          <stop offset="85%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id="ele-ear-in" cx="0.4" cy="0.35" r="0.9">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f472b6" />
        </radialGradient>
        <radialGradient id="ele-dark" cx="0.35" cy="0.3" r="0.95">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <radialGradient id="ele-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="322" rx="118" ry="16" fill="url(#ele-shadow)" />

      {/* body + legs */}
      <ellipse cx="160" cy="245" rx="88" ry="62" fill="url(#ele-body)" />
      <rect x="108" y="278" width="30" height="44" rx="15" fill="url(#ele-dark)" />
      <rect x="182" y="278" width="30" height="44" rx="15" fill="url(#ele-dark)" />
      <path d="M112 314 h22 M186 314 h22" stroke="#dbeafe" strokeWidth="6" strokeLinecap="round" />

      {/* ears behind head */}
      <circle cx="82" cy="140" r="48" fill="url(#ele-dark)" />
      <circle cx="82" cy="140" r="30" fill="url(#ele-ear-in)" />
      <circle cx="238" cy="140" r="48" fill="url(#ele-dark)" />
      <circle cx="238" cy="140" r="30" fill="url(#ele-ear-in)" />

      {/* head */}
      <circle cx="160" cy="150" r="70" fill="url(#ele-body)" />

      {/* trunk */}
      <path
        d="M148 195 C150 228 140 252 114 264 C105 268 96 264 94 256 C92 249 98 243 105 240 C124 232 132 214 134 192 Z"
        fill="url(#ele-dark)"
      />
      <circle cx="102" cy="252" r="7" fill="#1e3a8a" />

      {/* tusks */}
      <path d="M136 198 q-8 14 -20 16" stroke="#fef9c3" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M184 198 q8 14 20 16" stroke="#fef9c3" strokeWidth="8" strokeLinecap="round" fill="none" />

      <circle cx="136" cy="140" r="7" fill="#1c1917" />
      <circle cx="184" cy="140" r="7" fill="#1c1917" />
      <circle cx="138.5" cy="137.5" r="2.5" fill="#ffffff" />
      <circle cx="186.5" cy="137.5" r="2.5" fill="#ffffff" />
      <circle cx="120" cy="165" r="9" fill="#f9a8d4" opacity="0.55" />
      <circle cx="200" cy="165" r="9" fill="#f9a8d4" opacity="0.55" />

      <ellipse cx="118" cy="98" rx="30" ry="14" fill="#ffffff" opacity="0.35" transform="rotate(-26 118 98)" />
      <ellipse cx="120" cy="215" rx="24" ry="10" fill="#ffffff" opacity="0.25" transform="rotate(-15 120 215)" />
    </svg>
  );
}

export function TrainFigurine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 340" className={className} aria-hidden>
      <defs>
        <radialGradient id="train-red" cx="0.3" cy="0.3" r="1">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="55%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </radialGradient>
        <radialGradient id="train-blue" cx="0.3" cy="0.25" r="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="60%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <radialGradient id="train-wheel" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="70%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
        <radialGradient id="train-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="170" cy="308" rx="130" ry="16" fill="url(#train-shadow)" />

      {/* smoke puffs */}
      <circle cx="97" cy="96" r="14" fill="#e7e5e4" opacity="0.9" />
      <circle cx="116" cy="74" r="10" fill="#e7e5e4" opacity="0.7" />
      <circle cx="132" cy="58" r="7" fill="#e7e5e4" opacity="0.5" />

      {/* chimney */}
      <rect x="84" y="118" width="26" height="58" rx="9" fill="url(#train-blue)" />
      <rect x="78" y="112" width="38" height="14" rx="7" fill="#fbbf24" />

      {/* cab */}
      <rect x="200" y="118" width="82" height="132" rx="18" fill="url(#train-blue)" />
      <rect x="192" y="104" width="98" height="22" rx="11" fill="url(#train-red)" />
      <rect x="216" y="140" width="50" height="46" rx="10" fill="#e0f2fe" />
      <path d="M220 148 l18 30" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.8" />

      {/* boiler */}
      <rect x="58" y="168" width="150" height="82" rx="26" fill="url(#train-red)" />
      <circle cx="70" cy="209" r="12" fill="#fde68a" />
      <rect x="120" y="196" width="64" height="12" rx="6" fill="#fbbf24" />

      {/* cow catcher */}
      <path d="M58 250 L34 282 L74 282 Z" fill="url(#train-wheel)" />

      {/* wheels */}
      <circle cx="112" cy="268" r="27" fill="url(#train-wheel)" />
      <circle cx="112" cy="268" r="9" fill="#78716c" />
      <circle cx="188" cy="268" r="27" fill="url(#train-wheel)" />
      <circle cx="188" cy="268" r="9" fill="#78716c" />
      <circle cx="252" cy="272" r="21" fill="url(#train-wheel)" />
      <circle cx="252" cy="272" r="8" fill="#78716c" />

      <ellipse cx="102" cy="184" rx="34" ry="11" fill="#ffffff" opacity="0.35" transform="rotate(-8 102 184)" />
      <ellipse cx="222" cy="132" rx="22" ry="8" fill="#ffffff" opacity="0.35" transform="rotate(-12 222 132)" />
    </svg>
  );
}
