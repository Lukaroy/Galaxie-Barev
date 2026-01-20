"use client"

import React, { useState, useEffect } from "react"
import ProtectedRoute from "@/app/components/ProtectedRoute"
import { motion } from "framer-motion"
import { Search, Download, Type } from "lucide-react"
import Loading from "../components/loading"

type Font = {
  id: number
  name: string
  category: string
  url: string
  tips: string | null
}

function FontyContent() {
  const [fonts, setFonts] = useState<Font[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Vše")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [customText, setCustomText] = useState("Zkus si vlastní text zde")

  // ===== Načtení fontů =====
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const res = await fetch("/api/fonts")
        if (!res.ok) throw new Error()
        setFonts(await res.json())
      } catch {
        setError("Nepodařilo se načíst fonty")
      } finally {
        setLoading(false)
      }
    }

    fetchFonts()
  }, [])

  // ===== Dynamické načítání Google Fonts =====
  useEffect(() => {
    fonts.forEach(font => {
      const linkId = `font-${font.id}`
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link")
        link.id = linkId
        link.rel = "stylesheet"
        link.href = font.url
        document.head.appendChild(link)
      }
    })
  }, [fonts])

  const getFontFamily = (name: string) => `'${name}', sans-serif`
  const getDownloadUrl = (fontName: string) =>
    `https://fonts.google.com/download?family=${fontName.replace(/ /g, "+")}`

  const categories = ["Vše", ...Array.from(new Set(fonts.map(f => f.category)))]

  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "Vše" || font.category === selectedCategory)
  )

  if (loading) return <Loading />

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
      </div>
    )
  }

  return (
    <div className="fonty-page">
      <div className="container">

        <h1 className="title">Fonty</h1>
        <p className="subtitle">Procházej a vybírej z naší kolekce fontů</p>

        {/* Vlastní text */}
        <div className="custom-text-container">
          <div className="custom-text-header">
            <Type size={20} color="#9872C7" />
            <h3>Vyzkoušej vlastní text</h3>
          </div>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={2}
            className="custom-textarea"
          />
        </div>

        {/* Search + filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Hledat font..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid fontů */}
        <div className="fonts-grid">
          {filteredFonts.map(font => (
            <motion.div
              key={font.id}
              whileHover={{ scale: 1.02 }}
              className="font-card"
            >
              <h3>{font.name}</h3>
              <p className="font-category">{font.category}</p>

              <div className="font-preview">
                <p className="font-preview-title" style={{ fontFamily: getFontFamily(font.name) }}>
                  {font.name}
                </p>

                <p className="font-preview-sample" style={{ fontFamily: getFontFamily(font.name) }}>
                  AaBbCc 123456789
                </p>

                <p className="font-preview-custom" style={{ fontFamily: getFontFamily(font.name) }}>
                  {customText}
                </p>
              </div>

              {font.tips && (
                <p className="font-tips">
                  💡 {font.tips}
                </p>
              )}

              <button
                onClick={() => window.open(getDownloadUrl(font.name), "_blank")}
                className="download-btn"
              >
                <Download size={16} /> Stáhnout ZIP
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FontyPage() {
  return (
    <ProtectedRoute>
      <FontyContent />
    </ProtectedRoute>
  )
}
