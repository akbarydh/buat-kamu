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
  
  const [yesScale, setYesScale] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const yesTexts = [
    "Mau! ❤️",
    "Harus mau! 🥺",
    "Ayooo diklik! ✨",
    "Pliiss banget!! 🙏",
    "Masa gak mau sih? :( ",
    "Beneran tega?? 😭",
    "Gak ada tombol lain loh..",
    "Udah takdir ini, klik aja!",
    "POKOKNYA MAU! ❤️",
    "GAK BISA KABURRR! ❤️"
  ];

  const currentYesText = yesTexts[Math.min(noClickCount, yesTexts.length - 1)];

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

  const handleNoInteraction = () => {
    setNoClickCount(prev => prev + 1);
    setYesScale(prev => prev + 1.5); 
    
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

  const isFullPage = yesScale > 15;

  return (
    <main onClick={handleClick} className="relative min-h-screen overflow-x-hidden bg-[var(--background)] cursor-pointer">
      <audio ref={audioRef} src="/musik1.mp3" loop />

      {/* Layer Hati */}
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
          <motion.div key="question" exit={{ opacity: 0 }} className="relative z-10 text-[var(--secondary)]">
            
            {/* 1. HERO SECTION */}
            <section className="min-h-[90vh] flex flex-col items-center justify-center p-6 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <h1 className="text-4xl md:text-6xl font-serif italic leading-tight px-4 text-[var(--secondary)]">
                  Mungkin bagi orang lain biasa ajaa, <br /> 
                  <span className="text-[var(--accent)] font-bold">tapi saat bersamamu, setiap detiknya berharga.</span>
                </h1>
                <p className="mt-6 text-sm md:text-base opacity-60 max-w-md mx-auto leading-relaxed">
                  Makasihh yaa sudah hadir dan memberi warna baru yang ga pernah aku bayangkan sebelumnya
                </p>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-16 flex flex-col items-center opacity-30">
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1 font-bold">Liat kenangan kita</p>
                  <ChevronDown size={20} />
                </motion.div>
              </motion.div>
            </section>

            {/* 2. MEMORIES SECTION */}
            <section className="min-h-screen w-full max-w-7xl mx-auto px-6 py-20 flex flex-col gap-16">
              <div className="flex justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-white/40 backdrop-blur-md p-4 rounded-[3rem] shadow-2xl border border-white/60 w-full max-w-[340px] md:max-w-[420px]">
                  <video src="/pizza.mp4" autoPlay loop playsInline className="w-full rounded-[2.2rem] aspect-[9/16] object-cover" />
                  <p className="mt-5 text-center font-serif italic text-lg pb-1 opacity-80 px-4">"Pizza-nya mungkin gak sempurna, tapi tawa kita hari itu yang paling juara." 🍕</p>
                </motion.div>
              </div>

              <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-14">
                <motion.div initial={{ opacity: 0, rotate: -5, x: -30 }} whileInView={{ opacity: 1, rotate: -2, x: 0 }} className="w-[48%] max-w-[320px] bg-white p-4 pb-12 shadow-2xl border-white relative">
                  <img src="/berdua.jpeg" className="w-full aspect-[3/4] object-cover rounded-sm" alt="us" />
                  <p className="font-handwriting text-2xl md:text-3xl text-center mt-5 text-[var(--secondary)]/80">Our Little Secret ✨</p>
                  <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-9 bg-white/40 backdrop-blur-sm border border-white/20 rotate-1 shadow-sm" />
                </motion.div>

                <motion.div initial={{ opacity: 0, rotate: 5, x: 30 }} whileInView={{ opacity: 1, rotate: 3, x: 0 }} transition={{ delay: 0.2 }} className="w-[48%] max-w-[320px] bg-white p-4 pb-12 shadow-2xl border-white relative">
                  <img src="/potobut.jpeg" className="w-full aspect-[3/4] object-cover rounded-sm" alt="us" />
                  <p className="font-handwriting text-2xl md:text-3xl text-center mt-5 text-[var(--secondary)]/80">Captured Moment 📸</p>
                  <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-9 bg-white/40 backdrop-blur-sm border border-white/20 -rotate-2 shadow-sm" />
                </motion.div>
              </div>

              {/* BAGIAN PENYAMBUNG: Semoga makin banyak kenangan */}
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                className="text-center space-y-4 mt-10"
              >
                <p className="font-serif italic text-xl md:text-2xl opacity-70">
                  "Foto kita mungkin belum banyak..."
                </p>
                <p className="font-serif text-lg md:text-xl text-[var(--accent)] font-medium">
                  Tapii aku mauu melukis ribuan kenangan baru <br className="hidden md:block"/> bersama kamuu🤗
                </p>
              </motion.div>
            </section>

            {/* 3. PERTANYAAN SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center w-full bg-gradient-to-b from-transparent to-[var(--accent)]/20">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-10 max-w-2xl w-full">
                
                <motion.div 
                  animate={{ scale: [1, 1.15, 1] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                   <Heart className="text-rose-500 fill-rose-500 mx-auto" size={100} />
                </motion.div>

                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-serif italic text-[var(--secondary)] tracking-tight">
                    So, will you be mine?
                  </h2>
                  <p className="text-sm md:text-base opacity-60 font-serif italic">
                    Mari kita buat lebih banyak cerita untuk dikenang
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center h-64 relative w-full px-4">
                  <motion.button 
                    style={{ scale: yesScale }}
                    onClick={(e) => { e.stopPropagation(); handleAccept(); }}
                    className={`
                      px-16 py-6 bg-rose-500 text-white rounded-full font-serif italic text-2xl shadow-2xl transition-all duration-300
                      ${isFullPage ? 'fixed inset-0 z-[100] rounded-none flex items-center justify-center text-4xl md:text-7xl p-10' : 'z-20 relative'}
                    `}
                  >
                    {currentYesText}
                  </motion.button>

                  {!isFullPage && (
                    <button 
                      onMouseEnter={handleNoInteraction}
                      onClick={(e) => { e.stopPropagation(); handleNoInteraction(); }}
                      style={{ 
                        position: noBtnPos.x ? 'fixed' : 'relative', 
                        left: noBtnPos.x, top: noBtnPos.y, zIndex: 30
                      }}
                      className="px-12 py-4 bg-white text-[var(--secondary)] border-2 border-[var(--secondary)]/10 rounded-full font-serif italic text-lg shadow-md transition-all duration-200 whitespace-nowrap"
                    >
                      {noClickCount > 5 ? "Gak bisa kabur :P" : "Gamau 😕"}
                    </button>
                  )}
                </div>

                <p className="text-xs font-serif italic opacity-30 mt-10 uppercase tracking-widest">
                   "Setiap detik bersamamu adalah hadiah yang kuinginkan selamanya"
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