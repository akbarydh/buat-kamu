"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react"; 
import SuccessPage from "@/components/SuccessPage"; // Pastikan path ini sesuai folder kamu

type HeartType = { id: string; x: number; y?: number; };

export default function SweetPage() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [autoHearts, setAutoHearts] = useState<HeartType[]>([]);
  const [clickHearts, setClickHearts] = useState<HeartType[]>([]);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  
  // Ref untuk mengontrol audio agar bisa dibaca di SuccessPage
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Efek Hati Otomatis di Background
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoHearts((prev) => [
        ...prev.slice(-15),
        { id: `auto-${Date.now()}-${Math.random()}`, x: Math.random() * 100 }
      ]);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  // Efek Hati saat Layar Diklik
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

  // Logika Tombol "Nggak" yang Menghindar
  const moveNoButton = () => {
    const maxWidth = window.innerWidth - 120;
    const maxHeight = window.innerHeight - 60;
    setNoBtnPos({ 
      x: Math.max(10, Math.random() * maxWidth), 
      y: Math.max(10, Math.random() * maxHeight) 
    });
  };

  // Fungsi saat tombol "Mau!" diklik
  const handleAccept = () => {
    setIsAccepted(true);
    if (audioRef.current) {
      // Jika kamu ingin lagu mulai dari detik tertentu (misal detik 10), tambahkan:
      // audioRef.current.currentTime = 10;
      audioRef.current.play().catch(err => console.log("Musik gagal putar:", err));
    }
  };

  return (
    <main onClick={handleClick} className="relative min-h-screen text-slate-900 overflow-x-hidden bg-[#fbcfe8] cursor-pointer">
      
      {/* 🎵 Element Audio - Pastikan file musik1.mp3 ada di folder public */}
      <audio ref={audioRef} src="/musik1.mp3" loop />

      {/* 🎈 Layer Hati Terbang */}
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
          <motion.div key="question" exit={{ opacity: 0 }} className="relative z-10">
            {/* 1. HERO SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
              <h1 className="text-3xl md:text-6xl font-serif italic text-rose-950 leading-tight">
                Hari itu sebenarnya sederhana, <br /> tapi entah kenapa sulit dilupain.
              </h1>
              <ChevronDown className="mt-20 opacity-50 mx-auto animate-bounce" />
            </section>

            {/* 2. VIDEO SECTION */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center p-4">
              <div className="bg-white/40 backdrop-blur-xl p-2 rounded-[2rem] shadow-2xl">
                <video src="/pizza.mp4" controls loop playsInline className="w-full max-w-[300px] rounded-[1.5rem] aspect-[9/16] object-cover" />
              </div>
              <p className="mt-6 text-center font-serif italic text-lg">Bikin pizza bareng 🍕</p>
            </section>

            {/* 3. PHOTO SECTION */}
            <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 p-6 py-20">
              <motion.div 
                initial={{ rotate: -5, opacity: 0 }} 
                whileInView={{ rotate: -3, opacity: 1 }}
                className="w-full max-w-[260px] bg-white p-3 pb-8 shadow-2xl border-[8px] border-white relative"
              >
                <img src="/berdua.jpeg" className="w-full aspect-[3/4] object-cover" alt="us" />
                <p className="font-handwriting text-2xl text-center mt-4 text-rose-500">us. 2024</p>
              </motion.div>

              <motion.div 
                initial={{ rotate: 5, opacity: 0 }} 
                whileInView={{ rotate: 3, opacity: 1 }}
                className="w-full max-w-[260px] bg-white p-3 pb-8 shadow-2xl border-[8px] border-white relative"
              >
                <img src="/potobut.jpeg" className="w-full aspect-[3/4] object-cover" alt="us" />
                <p className="font-handwriting text-2xl text-center mt-4 text-rose-500">photobooth ✨</p>
              </motion.div>
            </section>

            {/* 4. PERTANYAAN SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
              <Heart className="text-rose-500 fill-rose-500 mb-6 animate-pulse" size={50} />
              <h2 className="text-4xl md:text-5xl font-serif text-rose-950 mb-10">Will you be mine?</h2>
              <div className="flex gap-6 justify-center h-20 w-full relative">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleAccept(); 
                  }}
                  className="px-12 py-4 bg-rose-500 text-white rounded-full font-bold shadow-xl z-20 hover:scale-110 transition-transform"
                >
                  Mau! ❤️
                </button>
                <button 
                  onMouseEnter={moveNoButton}
                  onClick={(e) => { e.stopPropagation(); moveNoButton(); }}
                  style={{ 
                    position: noBtnPos.x ? 'fixed' : 'relative', 
                    left: noBtnPos.x, 
                    top: noBtnPos.y, 
                    transition: 'all 0.2s ease-out' 
                  }}
                  className="px-10 py-4 bg-white/80 text-rose-400 border-2 border-rose-100 rounded-full font-bold"
                >
                  Nggak 😜
                </button>
              </div>
            </section>
          </motion.div>
        ) : (
          /* DI SINI PERUBAHANNYA: Mengoper audioRef ke SuccessPage */
          <SuccessPage key="success" audioRef={audioRef} />
        )}
      </AnimatePresence>
    </main>
  );
}