"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react"; 
import SuccessPage from "@/components/SuccessPage";

type HeartType = { id: string; x: number; y?: number; };

export default function SweetPage() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [autoHearts, setAutoHearts] = useState<HeartType[]>([]);
  const [clickHearts, setClickHearts] = useState<HeartType[]>([]);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoHearts((prev) => [
        ...prev.slice(-15),
        { id: `auto-${Date.now()}-${Math.random()}`, x: Math.random() * 100 }
      ]);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: `click-${Date.now()}-${i}-${Math.random()}`,
      x: e.clientX, y: e.clientY,
    }));
    setClickHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setClickHearts((prev) => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 1500);
  };

  const moveNoButton = () => {
    const maxWidth = window.innerWidth - 120;
    const maxHeight = window.innerHeight - 60;
    setNoBtnPos({ 
      x: Math.max(10, Math.random() * maxWidth), 
      y: Math.max(10, Math.random() * maxHeight) 
    });
  };

  const handleAccept = () => {
    setIsAccepted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Musik gagal:", err));
    }
  };

  return (
    <main onClick={handleClick} className="relative min-h-screen overflow-x-hidden bg-[#fdf2f8] cursor-pointer">
      <audio ref={audioRef} src="/musik1.mp3" loop />

      {/* Layer Hati Berjatuhan */}
      <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
        {autoHearts.map((h) => (
          <span key={h.id} className="heart text-2xl" style={{ left: `${h.x}%`, bottom: "-50px", position: "absolute" }}>❤️</span>
        ))}
        {clickHearts.map((h) => (
          <span key={h.id} className="heart text-2xl" style={{ left: `${h.x}px`, top: `${h.y}px`, position: "fixed" }}>❤️</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div key="question" exit={{ opacity: 0 }} className="relative z-10 text-rose-950">
            
            {/* 1. HERO SECTION */}
            <section className="min-h-[90vh] flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-4xl md:text-6xl font-serif italic leading-tight px-4 text-rose-900">
                  Hari itu sebenarnya sederhana, <br /> 
                  <span className="text-rose-500 font-bold">tapi entah kenapa sulit dilupain.</span>
                </h1>
                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-16 flex flex-col items-center opacity-50"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1 font-bold">Scroll Down</p>
                  <ChevronDown size={20} className="text-rose-400" />
                </motion.div>
              </motion.div>
            </section>

            {/* 2. MEMORIES SECTION */}
            <section className="min-h-screen w-full max-w-7xl mx-auto px-6 py-20 flex flex-col gap-16">
              <div className="flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="bg-white/40 backdrop-blur-md p-4 rounded-[3rem] shadow-2xl border border-white/60 w-full max-w-[340px] md:max-w-[420px]"
                >
                  <video src="/pizza.mp4" autoPlay loop playsInline className="w-full rounded-[2.2rem] aspect-[9/16] object-cover" />
                  <p className="mt-5 text-center font-serif italic text-xl pb-1 text-rose-800">Bikin pizza bareng, lucu bangett ini 🍕</p>
                </motion.div>
              </div>

              <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-14">
                <motion.div 
                  initial={{ opacity: 0, rotate: -5, x: -30 }} 
                  whileInView={{ opacity: 1, rotate: -2, x: 0 }}
                  className="w-[48%] max-w-[320px] bg-white p-4 pb-12 shadow-2xl border-white relative"
                >
                  <img src="/berdua.jpeg" className="w-full aspect-[3/4] object-cover rounded-sm" alt="us" />
                  <p className="font-handwriting text-2xl md:text-3xl text-center mt-5 text-rose-600/80">foto selfiee kita duaa</p>
                  <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-9 bg-white/60 backdrop-blur-sm border border-white/30 rotate-1 shadow-sm" />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, rotate: 5, x: 30 }} 
                  whileInView={{ opacity: 1, rotate: 3, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-[48%] max-w-[320px] bg-white p-4 pb-12 shadow-2xl border-white relative"
                >
                  <img src="/potobut.jpeg" className="w-full aspect-[3/4] object-cover rounded-sm" alt="us" />
                  <p className="font-handwriting text-2xl md:text-3xl text-center mt-5 text-rose-600/80">photobooth ✨</p>
                  <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-9 bg-white/60 backdrop-blur-sm border border-white/30 -rotate-2 shadow-sm" />
                </motion.div>
              </div>
            </section>

            {/* 3. REVISED PERTANYAAN SECTION (MIRIP GAMBAR REFERENSI) */}
            <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center w-full bg-gradient-to-b from-transparent to-rose-100/50">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-10 max-w-2xl">
                
                {/* Heart Icon dengan Glow */}
                <motion.div 
                  animate={{ scale: [1, 1.15, 1], filter: ["drop-shadow(0 0 0px #fb7185)", "drop-shadow(0 0 15px #fb7185)", "drop-shadow(0 0 0px #fb7185)"] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                   <Heart className="text-rose-500 fill-rose-500 mx-auto" size={100} />
                </motion.div>

                <h2 className="text-5xl md:text-8xl font-serif italic mb-12 text-rose-900 tracking-tight">
                  Will you be mine?
                </h2>

                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center h-48 relative w-full px-4">
                  {/* Tombol Mau */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); handleAccept(); }}
                    className="px-24 py-6 bg-rose-500 text-white rounded-full font-serif italic text-2xl shadow-[0_15px_45px_rgba(244,63,94,0.4)] z-20 border-2 border-rose-400 hover:bg-rose-600 transition-all"
                  >
                    Mau! ❤️
                  </motion.button>

                  {/* Tombol Gamau yang Lari */}
                  <button 
                    onMouseEnter={moveNoButton}
                    onClick={(e) => { e.stopPropagation(); moveNoButton(); }}
                    style={{ 
                      position: noBtnPos.x ? 'fixed' : 'relative', 
                      left: noBtnPos.x, top: noBtnPos.y, zIndex: 30
                    }}
                    className="px-12 py-4 bg-white text-rose-400 border-2 border-rose-100 rounded-full font-serif italic text-lg shadow-md hover:shadow-xl transition-all duration-200"
                  >
                    Gamau 😕
                  </button>
                </div>

                {/* Footer Text Kecil ala Desain Kamu */}
                <p className="text-xs font-serif italic text-rose-300 mt-10 uppercase tracking-widest">
                   Click "Mau" to make me the happiest person
                </p>
              </motion.div>
            </section>

          </motion.div>
        ) : (
          <SuccessPage key="success" audioRef={audioRef} />
        )}
      </AnimatePresence>
    </main>
  );
}