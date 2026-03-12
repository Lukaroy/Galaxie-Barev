"use client"

// Načítací komponenta - zobrazí animovaný spinner s náhodným českým textem

import { useState } from "react"

export default function Loading() {
  // Hydration fix: vždy stejný text při SSR/CSR
  const text = "Načítám..."
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
