"use client"

import { useEffect, useState } from "react"

export default function ConfessPage() {
  const text = "Sebenernya… aku suka kamu 💗"
  const [showText, setShowText] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setShowText(text.slice(0, i + 1))
      i++
      if (i === text.length) clearInterval(interval)
    }, 120)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 text-gray-800 overflow-hidden">
      <h1 className="text-4xl font-bold animate-fade-in text-center">
        {showText}
      </h1>

      <p className="text-sm opacity-70 animate-fade-in">
        (jujur ini dari hati 😳)
      </p>
    </main>
  )
}
