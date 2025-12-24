"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, Music2, PartyPopper, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface SuccessPageProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function SuccessPage({ audioRef }: SuccessPageProps) {
  const [currentTime, setCurrentTime] = useState(0);
  // Simpan posisi 'left' di dalam state agar tidak berubah saat re-render
  const [autoHearts, setAutoHearts] = useState<{id: number, left: number, speed: number, size: number, opacity: number}[]>([]);

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const lyricsData = [
    { text: "Hal yg paling kusuka", time: 0.5 },
    { text: "di dekatmu", time: 4 },
    { text: "Kau adalah orang favoritku", time: 5 },
    { text: "nomor satu", time: 9 },
    { text: "Nomor dua, tiga, empat, lima, enam", time: 11 },
    { text: "Isinya namamu💖", time: 16 },
    { text: "Huruf besar semua", time: 19 },
    { text: "Dan hitungan ke seribu", time: 23 },
    { text: "Seribu tahun lagi maksudku", time: 27 },
  ];

  useEffect(() => {
    let frameId: number;
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
      frameId = requestAnimationFrame(updateTime);
    };
    frameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(frameId);
  }, [audioRef]);

  // LOGIC HATI - Memperbaiki loncatan posisi
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoHearts((prev) => [
        ...prev.slice(-15), 
        { 
          id: Date.now(), 
          left: Math.random() * 100, // Tentukan posisi horizontal SEKALI saja di sini
          speed: Math.random() * 10 + 10, // Diperlambat (10-20 detik)
          size: Math.random() * 15 + 15, 
          opacity: Math.random() * 0.4 + 0.2 
        }
      ]);
    }, 2000); // Muncul setiap 2 detik agar lebih tenang
    return () => clearInterval(interval);
  }, []);

  const activeLyric = [...lyricsData]
    .reverse()
    .find((lyric) => currentTime >= lyric.time);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[1000] w-screen h-screen flex items-center justify-center bg-[#fbcfe8] overflow-hidden"
    >
      {/* ❤️ LAYER HATI TERBANG - Menggunakan CSS Animation yang lebih stabil */}
      {autoHearts.map((heart) => (
        <span 
          key={heart.id} 
          className="floating-heart" 
          style={{ 
            left: `${heart.left}%`, 
            position: "absolute",
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.speed}s`,
            opacity: heart.opacity,
            bottom: "-50px",
            zIndex: 0
          }}
        >
          ❤️
        </span> 
      ))}

      {/* --- CSS UNTUK ANIMASI HATI (Tambahkan di globals.css atau style tag) --- */}
      <style jsx>{`
        .floating-heart {
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          pointer-events: none;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: var(--opacity); }
          90% { opacity: var(--opacity); }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* DEKORASI BLUR */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. KARTU UTAMA */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-[90%] max-w-lg bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-8 shadow-2xl border border-white/80 flex flex-col items-center text-center z-10"
      >
        
        <div className="flex justify-center gap-4 mb-6">
          <PartyPopper className="text-rose-400 opacity-40" size={20} />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart className="text-rose-500 fill-rose-500" size={30} />
          </motion.div>
          <Sparkles className="text-yellow-400" size={20} />
        </div>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl md:text-5xl font-serif italic text-rose-950 tracking-tight">
            Our Story Begins
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold px-4 text-rose-900">
            Ayoo lukis ribuan kenangan baru bersama 💖
          </p>
        </div>

        <motion.div 
          initial={{ rotate: -2 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="bg-white p-3 pb-12 shadow-2xl rounded-sm border border-slate-50 flex flex-col items-center mb-8 relative"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/20 backdrop-blur-sm border border-white/30 -rotate-2 z-20" />
          
          <img 
            src="/photo_2.jpg" 
            alt="Success" 
            className="w-full max-w-[180px] md:max-w-[220px] aspect-[4/5] object-cover rounded-sm"
          />
          <div className="mt-4">
            <p className="font-handwriting text-2xl md:text-3xl text-rose-600 opacity-90 leading-none">
              My favorite person 💖
            </p>
          </div>
        </motion.div>

        {/* AREA LIRIK */}
        <div className="h-20 w-full flex items-center justify-center px-4 mb-6">
          <AnimatePresence mode="wait">
            {activeLyric ? (
              <motion.p
                key={activeLyric.text}
                initial={{ opacity: 0, filter: "blur(10px)", y: 5 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(10px)", y: -5 }}
                transition={{ duration: 0.5 }}
                className="text-rose-950 font-serif italic text-xl md:text-2xl leading-relaxed"
              >
                "{activeLyric.text}"
              </motion.p>
            ) : (
              <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Music2 className="text-rose-400 opacity-20" size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 pt-6 border-t border-rose-100 w-full flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-rose-900 opacity-40 font-serif italic">
            <Calendar size={14} />
            <p className="text-[11px] tracking-[0.2em] uppercase">{today}</p>
          </div>
          <p className="text-[10px] text-rose-900 opacity-30 italic font-serif px-6">
            Makasihh yaa udah milih aku dari jutaan bahkan miliaran orang
          </p>
        </div>

      </motion.div>
    </motion.div>
  );
}