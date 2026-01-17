"use client"

import { useState, useEffect } from "react"

const loadingTexts = [
  "Načítám...",
  "Moment...",
  "Chvilku strpení...",
  "Už to bude...",
  "Připravujem...",
  "Jen sečku...",
]

export default function Loading() {
  const [text, setText] = useState(loadingTexts[0])
  
  useEffect(() => {
    setText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)])
  }, [])
  
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
