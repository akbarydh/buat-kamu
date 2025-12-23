"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import GlowButton from "@/components/GlowButton"

type Heart = { id: number; x: number; y: number; }

export default function Home() {
  const router = useRouter()
  const [showText1, setShowText1] = useState("")
  const [showText2, setShowText2] = useState("")
  const [autoHearts, setAutoHearts] = useState<number[]>([])
  const [clickHearts, setClickHearts] = useState<Heart[]>([])
  const [showButton, setShowButton] = useState(false)

  const text1 = "Heeii kamuu🙌"
  const text2 = "Aku mau bilang sesuatu niihh 🤗"

  // Efek Ketik
  useEffect(() => {
    let i = 0
    const interval1 = setInterval(() => {
      setShowText1(text1.slice(0, i + 1))
      i++
      if (i === text1.length) {
        clearInterval(interval1)
        setTimeout(() => {
          let j = 0
          const interval2 = setInterval(() => {
            setShowText2(text2.slice(0, j + 1))
            j++
            if (j === text2.length) {
              clearInterval(interval2)
              setShowButton(true)
            }
          }, 80)
        }, 500)
      }
    }, 100)
    return () => clearInterval(interval1)
  }, [])

  // Hati Otomatis Terbang dari Bawah
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoHearts((prev) => [...prev.slice(-12), Date.now()])
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newHearts: Heart[] = Array.from({ length: 5 }).map(() => ({
      id: Date.now() + Math.random(),
      x: e.clientX + (Math.random() * 40 - 20),
      y: e.clientY + (Math.random() * 40 - 20),
    }))
    setClickHearts((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setClickHearts((prev) => prev.slice(5))
    }, 1000)
  }

  return (
    <main
      onClick={handleClick}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent text-rose-950 cursor-pointer p-6"
    >
      {/* ❤️ Layer Hati Otomatis */}
      {autoHearts.map((id) => (
        <span 
          key={id} 
          className="heart text-2xl" 
          style={{ left: `${Math.random() * 100}%`, bottom: "-50px", position: "absolute" }}
        >
          ❤️
        </span> 
      ))}

      {/* ❤️ Layer Hati saat Klik */}
      {clickHearts.map((heart) => (
        <span 
          key={heart.id} 
          className="heart text-2xl" 
          style={{ left: heart.x, top: heart.y, position: "fixed" }}
        >
          ❤️
        </span>
      ))}

      {/* Konten Teks Utama */}
      <div className="z-10 text-center space-y-6">
        <div className="relative inline-block">
          <motion.h1 
            className="text-5xl md:text-7xl font-serif italic font-medium tracking-tight mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {showText1}
          </motion.h1>
          <motion.div 
            className="h-[1.5px] bg-rose-400/50 w-0 mx-auto"
            animate={{ width: showText1 ? "80%" : "0%" }}
            transition={{ duration: 1 }}
          />
        </div>

        <motion.p 
          className="text-xl md:text-3xl font-serif italic opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {showText2}
        </motion.p>

        {/* Pemanggilan GlowButton */}
        <div className="pt-10 h-32 flex items-center justify-center">
          <AnimatePresence>
            {showButton && (
              <GlowButton 
                text="Buka Pesan Ini ❤️" 
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/sweet")
                }} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Petunjuk di Bawah */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 text-[10px] tracking-[0.3em] uppercase text-center font-medium"
      >
        Tap anywhere to send love
      </motion.div>

      {/* Dekorasi Blur Lembut (Background tetap pink dari globals.css) */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none" />
    </main>
  )
}