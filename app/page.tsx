"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Heart = {
  id: number
  x: number
  y: number
}

export default function Home() {
  const router = useRouter()

  const text1 = "Hai, kamu."
  const text2 = "Aku mau bilang sesuatu niihh 🤗"

  const [showText1, setShowText1] = useState("")
  const [showText2, setShowText2] = useState("")
  const [autoHearts, setAutoHearts] = useState<number[]>([])
  const [clickHearts, setClickHearts] = useState<Heart[]>([])
  const [showButton, setShowButton] = useState(false)

  // ⌨️ efek ngetik
  useEffect(() => {
    let i = 0
    const interval1 = setInterval(() => {
      setShowText1(text1.slice(0, i + 1))
      i++

      if (i === text1.length) {
        clearInterval(interval1)

        let j = 0
        const interval2 = setInterval(() => {
          setShowText2(text2.slice(0, j + 1))
          j++

          if (j === text2.length) {
            clearInterval(interval2)
            setShowButton(true) // 👉 tombol muncul setelah teks selesai
          }
        }, 100)
      }
    }, 120)

    return () => clearInterval(interval1)
  }, [])

  // ❤️ otomatis dari bawah
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoHearts((prev) => [...prev, Date.now()])
    }, 700)

    return () => clearInterval(interval)
  }, [])

  // 🖱️ klik layar → ❤️
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newHearts: Heart[] = Array.from({ length: 6 }).map(() => ({
      id: Date.now() + Math.random(),
      x: e.clientX + (Math.random() * 40 - 20),
      y: e.clientY + (Math.random() * 40 - 20),
    }))

    setClickHearts((prev) => [...prev, ...newHearts])

    setTimeout(() => {
      setClickHearts((prev) => prev.slice(6))
    }, 1200)
  }

  return (
    <main
      onClick={handleClick}
      className="relative min-h-screen flex flex-col items-center justify-center gap-4 overflow-hidden text-gray-800"
    >
      {/* ❤️ otomatis */}
      {autoHearts.map((id) => (
        <span
          key={id}
          className="heart"
          style={{ left: `${Math.random() * 100}%`, bottom: 0 }}
        >
          ❤️
        </span>
      ))}

      {/* ❤️ klik */}
      {clickHearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: heart.x,
            top: heart.y,
            position: "absolute",
          }}
        >
          ❤️
        </span>
      ))}

      <h1 className="text-4xl font-bold">
        {showText1}
      </h1>

      <p className="text-xl">
        {showText2}
      </p>

      {/* ✅ tombol pindah page */}
      {showButton && (
        <button
          onClick={(e) => {
            e.stopPropagation() // ❗ biar ga munculin heart
            router.push("/sweet")
          }}
          className="mt-6 px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
        >
          Klik di sinii yaaa
        </button>
      )}

      <p className="mt-2 text-sm opacity-70">
        (boleh klik layarnya juga 🤭)
      </p>
    </main>
  )
}
