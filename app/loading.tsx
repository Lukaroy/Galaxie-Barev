"use client"

// Načítací komponenta - zobrazí animovaný spinner s náhodným českým textem

import { useState } from "react"

const loadingTexts = [
  "Načítám...",
  "Moment...",
  "Chvilku strpení...",
  "Už to bude...",
  "Připravujem...",
  "Jen sečku...",
]

export default function Loading() {
  const [text] = useState(
    () => loadingTexts[Math.floor(Math.random() * loadingTexts.length)]
  )
  
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">{text}</p>
    </div>
  )
}
