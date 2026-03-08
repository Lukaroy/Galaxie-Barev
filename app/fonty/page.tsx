"use client"

// Stránka Fonty - prohlížení, filtrování a stahování Google fontů
// Uživatel může vyhledávat podle názvu, filtrovat podle kategorie
// a zobrazit si vlastní náhledový text

import React, { useState, useEffect } from "react"
import ProtectedRoute from "@/app/components/ProtectedRoute"
import { motion } from "framer-motion"
import { Search, Download, Type, X } from "lucide-react"
import Loading from "@/app/loading"

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
  const [customText, setCustomText] = useState("Zkus si vlastní text")

  const MAX_CUSTOM_TEXT_LENGTH = 50

  // Načtení fontů z API při prvním zobrazení
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

  // Přidání Google Fonts stylesheet do <head> pro každý font
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

  // Sestavení CSS font-family řetězce
  const getFontFamily = (name: string) => `'${name}', sans-serif`
  // URL pro stažení fontu z Google Fonts
  const getDownloadUrl = (fontName: string) =>
    `https://fonts.google.com/download?family=${fontName.replace(/ /g, "+")}`

  // Unikátní kategorie pro filtr
  const categories = ["Vše", ...Array.from(new Set(fonts.map(f => f.category)))]

  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "Vše" || font.category === selectedCategory)
  )

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= MAX_CUSTOM_TEXT_LENGTH) {
      setCustomText(value)
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Vše")
  }
  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "Vše"

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

        <div className="page-header-unified">
          <h1 className="page-title-gradient">Fonty</h1>
          <p className="page-subtitle">Procházej a vybírej z naší kolekce fontů</p>
        </div>

        {/* Search Bar */}
        <div className="fonty-search-section">
          <div className="fonty-search-wrapper">
            <Search size={20} className="fonty-search-icon" />
            <input
              type="text"
              placeholder="Hledat font podle názvu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="fonty-search-input"
            />
            {searchQuery && (
              <button className="fonty-clear-btn" onClick={() => setSearchQuery("")} title="Vymazat">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="fonty-categories-bar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`fonty-category-pill ${selectedCategory === category ? "active" : ""}`}
            >
              {category}
            </button>
          ))}
          {hasActiveFilters && (
            <button className="fonty-clear-all" onClick={clearFilters}>
              <X size={14} /> Resetovat
            </button>
          )}
        </div>

        {/* Custom Text Preview */}
        <div className="fonty-preview-box">
          <label className="fonty-preview-label">
            <Type size={16} />
            <span>Vlastní text pro náhled</span>
            <span className="fonty-char-count">{customText.length}<span className="fonty-char-max">/{MAX_CUSTOM_TEXT_LENGTH}</span></span>
          </label>
          <input
            type="text"
            value={customText}
            onChange={handleCustomTextChange}
            placeholder="Napiš vlastní text..."
            className="fonty-preview-input"
            maxLength={MAX_CUSTOM_TEXT_LENGTH}
          />
        </div>

        {/* Results count */}
        <div className="fonty-results-info">
          Zobrazeno <strong>{filteredFonts.length}</strong> z <strong>{fonts.length}</strong> fontů
        </div>

        <div className="fonts-grid">
          {filteredFonts.map(font => (
            <motion.div
              key={font.id}
              whileHover={{ scale: 1.02 }}
              className="font-card"
            >
              <div className="font-card-header">
                <h3>{font.name}</h3>
                <span className="font-category-badge">{font.category}</span>
              </div>

              <div className="font-preview">
                <p className="font-preview-title" style={{ fontFamily: getFontFamily(font.name) }}>
                  {font.name}
                </p>

                <p className="font-preview-sample" style={{ fontFamily: getFontFamily(font.name) }}>
                  AaBbCcDd 0123456789
                </p>

                {customText && (
                  <p className="font-preview-custom" style={{ fontFamily: getFontFamily(font.name) }}>
                    {customText}
                  </p>
                )}
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
                <Download size={16} /> Stáhnout
              </button>
            </motion.div>
          ))}
        </div>

        {filteredFonts.length === 0 && (
          <motion.div
            className="moodboard-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Type size={56} className="moodboard-empty-icon" />
            <h2 className="moodboard-empty-title">Žádné fonty nenalezeny</h2>
            <p className="moodboard-empty-subtitle">Zkus upravit vyhledávání nebo filtry</p>
          </motion.div>
        )}
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
