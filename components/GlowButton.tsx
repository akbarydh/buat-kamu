"use client"

import { motion } from "framer-motion";

interface GlowButtonProps {
  onClick: (e: React.MouseEvent) => void;
  text: string;
}

export default function GlowButton({ onClick, text }: GlowButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="z-20 flex flex-col items-center"
    >
      <motion.button
        onClick={onClick}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 30px rgba(244, 63, 94, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-12 py-4 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 bg-[length:200%_auto] hover:bg-right transition-all duration-700 text-white font-bold rounded-full shadow-lg flex items-center gap-3 border border-white/40 backdrop-blur-sm overflow-hidden"
      >
        {/* Efek Kilauan Berjalan (Shiny Sweep) */}
        <motion.div 
          className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            left: ["-100%", "200%"]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear"
          }}
        />

        <span className="relative z-10 tracking-wider text-lg">
          {text}
        </span>
        
        <motion.span 
          className="relative z-10 text-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ❤️
        </motion.span>
      </motion.button>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="mt-4 text-[10px] tracking-[0.4em] uppercase font-semibold text-rose-900/60"
      >
        Click to continue
      </motion.p>
    </motion.div>
  );
}