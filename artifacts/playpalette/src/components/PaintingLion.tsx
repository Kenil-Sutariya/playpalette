import { motion } from "framer-motion";

const LOOP = {
  duration: 8,
  repeat: Infinity,
  repeatDelay: 1.5,
  ease: "linear" as const,
};

// One shared timeline (0 → 1) so the brush position and each painted
// region stay in sync across the infinite loop.
export default function PaintingLion() {
  return (
    <div className="relative w-full max-w-md mx-auto select-none" aria-hidden>
      <svg viewBox="0 0 320 320" className="w-full h-auto drop-shadow-xl">
        {/* Unpainted outline — always visible, like a blank POP figurine */}
        <circle cx="160" cy="160" r="105" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="3" />
        <circle cx="160" cy="168" r="72" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="3" />
        <circle cx="95" cy="80" r="24" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="3" />
        <circle cx="225" cy="80" r="24" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="3" />

        {/* Painted mane */}
        <motion.circle
          cx="160" cy="160" r="105" fill="#f97316"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.06, 0.34, 1] }}
        />
        {/* Painted ears */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.34, 0.44, 1] }}
        >
          <circle cx="95" cy="80" r="24" fill="#fb923c" />
          <circle cx="95" cy="80" r="12" fill="#fdba74" />
          <circle cx="225" cy="80" r="24" fill="#fb923c" />
          <circle cx="225" cy="80" r="12" fill="#fdba74" />
        </motion.g>
        {/* Painted face */}
        <motion.circle
          cx="160" cy="168" r="72" fill="#fbbf24"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.44, 0.66, 1] }}
        />
        {/* Muzzle */}
        <motion.ellipse
          cx="160" cy="196" rx="34" ry="26" fill="#fef3c7"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.66, 0.76, 1] }}
        />
        {/* Face details pop in at the end */}
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
          <path d="M116 190 L96 186 M116 200 L98 202 M204 190 L224 186 M204 200 L222 202" stroke="#78716c" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        {/* Sparkles once the painting is done */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ ...LOOP, times: [0, 0.86, 0.92, 1] }}
        >
          <text x="42" y="60" fontSize="28">✨</text>
          <text x="252" y="150" fontSize="24">✨</text>
          <text x="60" y="260" fontSize="22">✨</text>
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
