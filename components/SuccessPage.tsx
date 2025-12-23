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

  // Data lirik yang sudah disesuaikan dengan riset detikan kamu
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
      className="fixed inset-0 z-[1000] w-screen h-screen flex items-center justify-center bg-[#fbcfe8] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-white/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-rose-300/40 rounded-full blur-3xl" />

      {/* KARTU UTAMA */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-[90%] max-w-lg bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/50 flex flex-col items-center text-center"
      >
        
        {/* Ikon Perayaan */}
        <div className="flex justify-center gap-4 mb-4">
          <PartyPopper className="text-rose-500" size={24} />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <Heart className="text-rose-600 fill-rose-600" size={32} />
          </motion.div>
          <Sparkles className="text-yellow-500" size={24} />
        </div>

        <h1 className="text-2xl md:text-3xl font-serif italic text-rose-950 mb-6">
          Yeay! Officially Yours.
        </h1>

        {/* BINGKAI POLAROID */}
        <motion.div 
          initial={{ rotate: -2 }}
          className="bg-white p-3 shadow-xl rounded-sm border border-slate-100 flex flex-col items-center mb-6"
        >
          <img 
            src="/photo_2.jpg" 
            alt="Success" 
            className="w-full max-w-[180px] md:max-w-[220px] aspect-square object-cover rounded-sm"
          />
          <div className="pt-3 pb-1">
            <p className="font-handwriting text-xl text-rose-500">I Love You ❤️</p>
          </div>
        </motion.div>

        {/* AREA LIRIK DINAMIS */}
        <div className="h-24 w-full flex items-center justify-center px-4 mb-4">
          <AnimatePresence mode="wait">
            {activeLyric ? (
              <motion.p
                key={activeLyric.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-rose-900 font-serif italic text-lg md:text-xl leading-relaxed"
              >
                "{activeLyric.text}"
              </motion.p>
            ) : (
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Music2 className="text-rose-300" size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INFO TANGGAL */}
        <div className="mt-4 pt-4 border-t border-rose-200 w-full flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-rose-900/60 font-serif italic">
            <Calendar size={12} />
            <p className="text-[10px] tracking-widest uppercase">{today}</p>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}