"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Download, Copy, Shuffle, History, Check, Palette, Eye, Lock, Unlock, RotateCw, Sun, Moon } from 'lucide-react'
import type { ColorScheme, PaletteHistory } from '@/types'
import { generateColorScheme, generateRandomColor, copyToClipboard, hexToHSL, hslToHex, type HSL } from '@/lib/colorUtils'
import ProtectedRoute from '@/app/components/ProtectedRoute'

function BarvyPageContent() {
  const [baseColor, setBaseColor] = useState('#9872C7')
  const [scheme, setScheme] = useState<ColorScheme>('complementary')
  const [generatedColors, setGeneratedColors] = useState<string[]>([])
  const [wheelAngle, setWheelAngle] = useState(0)
  const [history, setHistory] = useState<PaletteHistory[]>([])
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [lockedColors, setLockedColors] = useState<Set<number>>(new Set())
  const [hoverColor, setHoverColor] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  const handleGenerateColors = useCallback(() => {
    const colors = generateColorScheme(baseColor, scheme)
    
    const finalColors = colors.map((color, idx) => 
      lockedColors.has(idx) && generatedColors[idx] ? generatedColors[idx] : color
    )
    
    setGeneratedColors(finalColors)
  }, [baseColor, scheme, lockedColors, generatedColors])

  const randomColor = () => {
    setBaseColor(generateRandomColor())
  }

  const getContrastRatio = (color1: string, color2: string) => {
    const getLuminance = (color: string) => {
      const rgb = {
        r: parseInt(color.slice(1, 3), 16) / 255,
        g: parseInt(color.slice(3, 5), 16) / 255,
        b: parseInt(color.slice(5, 7), 16) / 255
      }
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => 
        val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
      )
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2)
  }

  const exportPalette = (format: 'css' | 'json') => {
    if (generatedColors.length === 0) return

    let content = ''
    if (format === 'css') {
      content = ':root {\n'
      generatedColors.forEach((color, idx) => {
        content += `  --color-${idx + 1}: ${color};\n`
      })
      content += '}'
    } else {
      content = JSON.stringify({
        scheme,
        colors: generatedColors,
        generated: new Date().toISOString()
      }, null, 2)
    }

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `palette-${Date.now()}.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyAllColors = async () => {
    const text = generatedColors.join(', ')
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedColor('all')
      setTimeout(() => setCopiedColor(null), 2000)
    }
  }

  const handleCopyColor = async (color: string, format: 'hex' | 'rgb' | 'hsl' = 'hex') => {
    let textToCopy = color
    if (format === 'rgb') {
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)
      textToCopy = `rgb(${r}, ${g}, ${b})`
    } else if (format === 'hsl') {
      const { h, s, l } = hexToHSL(color)
      textToCopy = `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
    }
    const success = await copyToClipboard(textToCopy)
    if (success) {
      setCopiedColor(color)
      setTimeout(() => setCopiedColor(null), 1500)
    }
  }

  const toggleLockColor = (index: number) => {
    const newLocked = new Set(lockedColors)
    if (newLocked.has(index)) {
      newLocked.delete(index)
    } else {
      newLocked.add(index)
    }
    setLockedColors(newLocked)
  }

  const adjustBrightness = (color: string, amount: number) => {
    const { h, s, l } = hexToHSL(color)
    return hslToHex(h, s, Math.max(0, Math.min(100, l + amount)))
  }

  const rotateHue = (color: string, amount: number) => {
    const { h, s, l } = hexToHSL(color)
    return hslToHex((h + amount + 360) % 360, s, l)
  }

  const handleWheelClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY
    
    const angle = Math.atan2(y, x) * (180 / Math.PI)
    const hue = (angle + 360) % 360
    
    const { s, l } = hexToHSL(baseColor)
    const newColor = hslToHex(hue, s, l)
    setBaseColor(newColor)
    setWheelAngle(hue)
  }

  useEffect(() => {
    const { h } = hexToHSL(baseColor)
    setWheelAngle(h)
  }, [baseColor])

  useEffect(() => {
    if (baseColor && mounted) {
      const colors = generateColorScheme(baseColor, scheme)
      setGeneratedColors(colors)
    }
  }, [baseColor, scheme, mounted])

  useEffect(() => {
    setMounted(true)
    if (generatedColors.length === 0) {
      handleGenerateColors()
    }
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' && !e.repeat) {
        e.preventDefault()
        handleGenerateColors()
      } else if (e.key === 'r' && !e.repeat) {
        randomColor()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleGenerateColors])

  const schemeInfo = {
    complementary: 'Protilehlé barvy na kruhu - silný kontrast',
    monochromatic: 'Variace jedné barvy - harmonický vzhled',
    analogous: 'Sousední barvy - příjemná kombinace',
    triadic: 'Tři rovnoměrně vzdálené barvy',
    tetradic: 'Čtyři rovnoměrně vzdálené barvy'
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="barvy-page">
      <div className="barvy-container">
        <div className="page-header">
          <h2>
            Generátor barevných palet
            <span>Najdi svou perfektní kombinaci</span>
          </h2>
        </div>

        <div className="barvy-content">
          <div className="generator-section">
            <div className="color-wheel-card">
              <svg 
                className="color-wheel" 
                viewBox="0 0 300 300" 
                onClick={handleWheelClick}
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {Array.from({ length: 360 }).map((_, i) => {
                  const angle = i - 90
                  const x1 = 150 + Math.cos(angle * Math.PI / 180) * 70
                  const y1 = 150 + Math.sin(angle * Math.PI / 180) * 70
                  const x2 = 150 + Math.cos(angle * Math.PI / 180) * 125
                  const y2 = 150 + Math.sin(angle * Math.PI / 180) * 125
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={`hsl(${i}, 85%, 60%)`}
                      strokeWidth="2"
                    />
                  )
                })}
                
                <circle
                  cx="150"
                  cy="150"
                  r="65"
                  fill="#3B364D"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
                
                <circle
                  cx={150 + Math.cos((wheelAngle - 90) * Math.PI / 180) * 97.5}
                  cy={150 + Math.sin((wheelAngle - 90) * Math.PI / 180) * 97.5}
                  r="15"
                  fill={baseColor}
                  stroke="white"
                  strokeWidth="3"
                  filter="url(#glow)"
                />
              </svg>
              
              <div className="color-preview-box">
                <div className="color-preview" style={{ backgroundColor: baseColor }}></div>
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="hex-input"
                />
              </div>
            </div>

            <div className="scheme-card">
              <label>Typ schématu</label>
              <select 
                value={scheme} 
                onChange={(e) => setScheme(e.target.value as ColorScheme)}
              >
                <option value="complementary">Komplementární</option>
                <option value="monochromatic">Monochromatické</option>
                <option value="analogous">Analogické</option>
                <option value="triadic">Triadické</option>
                <option value="tetradic">Tetradické</option>
              </select>
              <small>{schemeInfo[scheme]}</small>
            </div>

            <div className="action-buttons">
              <button onClick={randomColor} className="btn-random" title="Náhodná barva">
                <Shuffle size={18} />
                Náhodná
              </button>
              
              <button 
                onClick={() => {
                  handleGenerateColors()
                  setHistory(prev => [{
                    colors: generatedColors,
                    scheme,
                    timestamp: Date.now()
                  }, ...prev.slice(0, 4)])
                }} 
                className="btn-generate"
                title="Vygenerovat"
              >
                Vygenerovat
              </button>
            </div>

            <a href="/teorie" className="theory-link">
              <Eye size={16} />
              Psychologie barev
            </a>
          </div>

          <div className="palette-section">
            {generatedColors.length > 0 && (
              <>
                <div className="palette-header">
                  <h3>Tvoje paleta</h3>
                  <button onClick={copyAllColors} className="btn-copy-all">
                    {copiedColor === 'all' ? <Check size={16} /> : <Copy size={16} />}
                    {copiedColor === 'all' ? 'Zkopírováno' : 'Kopírovat'}
                  </button>
                </div>

                <div className="palette-grid">
                  {generatedColors.map((color, idx) => {
                    const isLocked = lockedColors.has(idx)
                    const isHovered = hoverColor === idx
                    return (
                      <div
                        key={idx}
                        className={`color-box ${isLocked ? 'locked' : ''}`}
                        style={{ backgroundColor: color }}
                        onMouseEnter={() => setHoverColor(idx)}
                        onMouseLeave={() => setHoverColor(null)}
                      >
                        <span 
                          className={copiedColor === color ? 'copied' : ''}
                          onClick={() => handleCopyColor(color)}
                          style={{ cursor: 'pointer' }}
                        >
                          {copiedColor === color ? '✓ Zkopírováno' : color}
                        </span>
                        
                        {isHovered && (
                          <div className="color-controls-overlay">
                            <div className="brightness-controls">
                              <button 
                                onClick={() => {
                                  const newColor = adjustBrightness(color, 10)
                                  const newColors = [...generatedColors]
                                  newColors[idx] = newColor
                                  setGeneratedColors(newColors)
                                }}
                                className="brightness-btn"
                                title="Zesvětlit"
                              >
                                <Sun size={14} />
                              </button>
                              <button 
                                onClick={() => {
                                  const newColor = adjustBrightness(color, -10)
                                  const newColors = [...generatedColors]
                                  newColors[idx] = newColor
                                  setGeneratedColors(newColors)
                                }}
                                className="brightness-btn"
                                title="Ztmavit"
                              >
                                <Moon size={14} />
                              </button>
                            </div>
                            <div className="color-actions">
                              <button onClick={(e) => { e.stopPropagation(); handleCopyColor(color, 'rgb') }}>RGB</button>
                              <button 
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  toggleLockColor(idx);
                                }}
                                className={isLocked ? 'locked-btn' : ''}
                                title={isLocked ? 'Odemknout' : 'Zamknout'}
                              >
                                {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {generatedColors.length >= 2 && (
                  <div className="usage-preview">
                    <h4>Náhled kontrastů</h4>
                    <div className="usage-examples">
                      <div className="usage-card" style={{ 
                        backgroundColor: generatedColors[0], 
                        color: generatedColors[1] 
                      }}>
                        <span>Text na pozadí</span>
                        <small>Kontrast: {getContrastRatio(generatedColors[0], generatedColors[1])}:1</small>
                      </div>
                      {generatedColors[2] && (
                        <div className="usage-card" style={{ 
                          backgroundColor: generatedColors[2], 
                          color: '#FFFFFF' 
                        }}>
                          <span>Akcent</span>
                          <small>Kontrast: {getContrastRatio(generatedColors[2], '#FFFFFF')}:1</small>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {history.length > 0 && (
                  <div className="history-section">
                    <h4><History size={16} /> Historie palet</h4>
                    <div className="history-grid">
                      {history.map((item, idx) => (
                        <div 
                          key={item.timestamp}
                          className="history-item"
                          onClick={() => {
                            setBaseColor(item.colors[0])
                            setScheme(item.scheme)
                            setGeneratedColors(item.colors)
                          }}
                        >
                          {item.colors.map((color, i) => (
                            <div key={i} style={{ backgroundColor: color }} className="history-color" />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BarvyPage() {
  return (
    <ProtectedRoute>
      <BarvyPageContent />
    </ProtectedRoute>
  )
}
