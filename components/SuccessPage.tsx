"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, Music2, PartyPopper, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface SuccessPageProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function SuccessPage({ audioRef }: SuccessPageProps) {
  const [currentTime, setCurrentTime] = useState(0);

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

  const activeLyric = [...lyricsData]
    .reverse()
    .find((lyric) => currentTime >= lyric.time);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      /* ✅ DIUBAH: Menggunakan variabel background dari globals.css agar seragam */
      className="fixed inset-0 z-[1000] w-screen h-screen flex items-center justify-center bg-[var(--background)] overflow-hidden"
    >
      {/* --- DEKORASI BLUR (Sama dengan Page Home) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Sakura (Tetap ada namun opacity dibuat lebih halus) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ y: [0, 30, 0], opacity: [0, 0.3, 0], rotate: 360 }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
            className="absolute text-[var(--secondary)]/20"
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      {/* 2. KARTU UTAMA */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        /* ✅ DIUBAH: Glassmorphism agar gradasi background terlihat tembus */
        className="relative w-[90%] max-w-lg bg-white/40 backdrop-blur-2xl rounded-[3.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col items-center text-center z-10"
      >
        
        {/* Ikon Perayaan */}
        <div className="flex justify-center gap-4 mb-6">
          <PartyPopper className="text-[var(--secondary)] opacity-60" size={20} />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart className="text-rose-500 fill-rose-500" size={28} />
          </motion.div>
          <Sparkles className="text-[var(--accent)]" size={20} />
        </div>

        <h1 className="text-3xl md:text-4xl font-serif italic text-[var(--secondary)] mb-8 tracking-tight">
          Officially Yours.
        </h1>

        {/* BINGKAI POLAROID */}
        <motion.div 
          initial={{ rotate: -2 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="bg-white p-3 pb-10 shadow-2xl rounded-sm border border-slate-50 flex flex-col items-center mb-8 relative"
        >
          {/* Efek Solatip Transparan */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/20 backdrop-blur-sm border border-white/30 -rotate-2" />
          
          <img 
            src="/photo_2.jpg" 
            alt="Success" 
            className="w-full max-w-[180px] md:max-w-[220px] aspect-[4/5] object-cover rounded-sm"
          />
          <div className="mt-4">
            <p className="font-handwriting text-2xl text-[var(--secondary)] opacity-90">Happy with you ❤️</p>
          </div>
        </motion.div>

        {/* AREA LIRIK DINAMIS */}
        <div className="h-20 w-full flex items-center justify-center px-4 mb-6">
          <AnimatePresence mode="wait">
            {activeLyric ? (
              <motion.p
                key={activeLyric.text}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="text-[var(--secondary)] font-serif italic text-xl leading-relaxed"
              >
                "{activeLyric.text}"
              </motion.p>
            ) : (
              <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Music2 className="text-[var(--secondary)] opacity-20" size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INFO TANGGAL */}
        <div className="mt-4 pt-6 border-t border-[var(--secondary)]/10 w-full flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-[var(--secondary)] opacity-40 font-serif italic">
            <Calendar size={14} />
            <p className="text-[11px] tracking-[0.2em] uppercase">{today}</p>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}