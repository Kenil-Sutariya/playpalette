import { motion } from "framer-motion";

const LOOP = {
  duration: 8,
  repeat: Infinity,
  repeatDelay: 1.5,
  ease: "linear" as const,
};

// A POP/plaster lion figurine being painted by an animated brush.
// The unpainted state is shaded white plaster (like the real product out of
// the box); painted regions use radial gradients + specular highlights so
// the result reads as a glossy hand-painted 3D figurine, not a flat cartoon.
// One shared timeline (0 → 1) keeps the brush and regions in sync.
export default function PaintingLion() {
  return (
    <div className="relative w-full max-w-md mx-auto select-none" aria-hidden>
      <svg viewBox="0 0 320 340" className="w-full h-auto">
        <defs>
          <radialGradient id="pl-plaster" cx="0.35" cy="0.3" r="0.95">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f2efec" />
            <stop offset="100%" stopColor="#d9d4cf" />
          </radialGradient>
          <radialGradient id="pl-plaster-light" cx="0.38" cy="0.32" r="0.9">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e9e5e1" />
          </radialGradient>
          <radialGradient id="pl-mane" cx="0.35" cy="0.3" r="0.95">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="55%" stopColor="#f97316" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>
          <radialGradient id="pl-face" cx="0.38" cy="0.32" r="0.9">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
          <radialGradient id="pl-muzzle" cx="0.4" cy="0.35" r="0.9">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
          <radialGradient id="pl-ear" cx="0.35" cy="0.35" r="0.9">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>
          <radialGradient id="pl-shadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ground shadow — the figurine sits on a surface */}
        <ellipse cx="160" cy="318" rx="112" ry="16" fill="url(#pl-shadow)" />

        {/* ============ unpainted plaster figurine (always visible) ============ */}
        <circle cx="160" cy="160" r="105" fill="url(#pl-plaster)" />
        <g fill="none" stroke="#c7c0b9" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round">
          <path d="M160 62 q10 18 0 34" />
          <path d="M226 88 q-2 20 -16 28" />
          <path d="M255 155 q-16 8 -30 4" />
          <path d="M232 226 q-14 -10 -18 -24" />
          <path d="M92 90 q4 20 17 28" />
          <path d="M66 155 q16 8 30 4" />
          <path d="M89 226 q13 -10 17 -24" />
          <path d="M160 258 q8 -16 0 -30" />
        </g>
        <circle cx="95" cy="80" r="24" fill="url(#pl-plaster)" />
        <circle cx="95" cy="80" r="12" fill="url(#pl-plaster-light)" />
        <circle cx="225" cy="80" r="24" fill="url(#pl-plaster)" />
        <circle cx="225" cy="80" r="12" fill="url(#pl-plaster-light)" />
        <circle cx="160" cy="168" r="72" fill="url(#pl-plaster-light)" />
        <ellipse cx="160" cy="196" rx="34" ry="26" fill="#ffffff" />
        {/* molded (unpainted) face details */}
        <g fill="#d9d4cf">
          <circle cx="136" cy="152" r="7" />
          <circle cx="184" cy="152" r="7" />
          <path d="M150 184 L170 184 L160 196 Z" />
        </g>

        {/* ============ painted layers (revealed by the brush) ============ */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.06, 0.34, 1] }}
        >
          <circle cx="160" cy="160" r="105" fill="url(#pl-mane)" />
          <g fill="none" stroke="#9a3412" strokeOpacity="0.25" strokeWidth="5" strokeLinecap="round">
            <path d="M160 62 q10 18 0 34" />
            <path d="M226 88 q-2 20 -16 28" />
            <path d="M255 155 q-16 8 -30 4" />
            <path d="M232 226 q-14 -10 -18 -24" />
            <path d="M92 90 q4 20 17 28" />
            <path d="M66 155 q16 8 30 4" />
            <path d="M89 226 q13 -10 17 -24" />
            <path d="M160 258 q8 -16 0 -30" />
          </g>
          <ellipse cx="112" cy="94" rx="34" ry="16" fill="#ffffff" opacity="0.35" transform="rotate(-28 112 94)" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.34, 0.44, 1] }}
        >
          <circle cx="95" cy="80" r="24" fill="url(#pl-ear)" />
          <circle cx="95" cy="80" r="12" fill="#fdba74" />
          <circle cx="225" cy="80" r="24" fill="url(#pl-ear)" />
          <circle cx="225" cy="80" r="12" fill="#fdba74" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.44, 0.66, 1] }}
        >
          <circle cx="160" cy="168" r="72" fill="url(#pl-face)" />
          <ellipse cx="132" cy="134" rx="17" ry="9" fill="#ffffff" opacity="0.4" transform="rotate(-20 132 134)" />
        </motion.g>

        <motion.ellipse
          cx="160" cy="196" rx="34" ry="26" fill="url(#pl-muzzle)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.66, 0.76, 1] }}
        />

        {/* painted face details pop in at the end */}
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          style={{ transformOrigin: "160px 180px" }}
          animate={{ opacity: [0, 0, 1, 1], scale: [0.6, 0.6, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.78, 0.86, 1] }}
        >
          <circle cx="136" cy="152" r="7" fill="#1c1917" />
          <circle cx="184" cy="152" r="7" fill="#1c1917" />
          <circle cx="138.5" cy="149.5" r="2.5" fill="#ffffff" />
          <circle cx="186.5" cy="149.5" r="2.5" fill="#ffffff" />
          <path d="M150 184 L170 184 L160 196 Z" fill="#1c1917" />
          <path d="M160 196 Q160 208 148 210 M160 196 Q160 208 172 210" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M116 190 L96 186 M116 200 L98 202 M204 190 L224 186 M204 200 L222 202" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* sparkles once the painting is done */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ ...LOOP, times: [0, 0.86, 0.92, 1] }}
        >
          <text x="42" y="60" fontSize="28">✨</text>
          <text x="252" y="150" fontSize="24">✨</text>
          <text x="60" y="280" fontSize="22">✨</text>
        </motion.g>
      </svg>

      {/* The brush scrubbing over each region in the same timeline */}
      <motion.div
        className="absolute top-0 left-0 text-5xl md:text-6xl"
        style={{ filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.25))" }}
        animate={{
          x: ["105%", "35%", "72%", "22%", "60%", "18%", "70%", "48%", "40%", "58%", "46%", "50%", "105%"],
          y: ["10%", "18%", "38%", "52%", "66%", "12%", "8%", "38%", "52%", "48%", "60%", "56%", "70%"],
          rotate: [0, -25, 20, -20, 15, -25, 20, -15, 15, -15, 10, 0, 30],
        }}
        transition={{
          ...LOOP,
          times: [0, 0.06, 0.14, 0.22, 0.34, 0.4, 0.44, 0.5, 0.66, 0.7, 0.76, 0.8, 1],
        }}
      >
        🖌️
      </motion.div>
    </div>
  );
}
