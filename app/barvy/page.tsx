"use client"

import React, { useState } from 'react'

type Scheme = 'complementary' | 'analogous' | 'triadic' | 'monochrome'

function clamp(n: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, n))
}

function hexToHsl(hex: string) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h = h * 60
  }

  return { h, s, l }
}

function hslToHex(h: number, s: number, l: number) {
  h = ((h % 360) + 360) % 360
  s = clamp(s)
  l = clamp(l)

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  const R = Math.round((r + m) * 255)
  const G = Math.round((g + m) * 255)
  const B = Math.round((b + m) * 255)

  const toHex = (v: number) => v.toString(16).padStart(2, '0')
  return `#${toHex(R)}${toHex(G)}${toHex(B)}`.toUpperCase()
}

function generateScheme(hex: string, scheme: Scheme) {
  const { h, s, l } = hexToHsl(hex)
  const colors: string[] = []

  const base = hex.toUpperCase()
  colors.push(base)

  switch (scheme) {
    case 'complementary': {
      const c = hslToHex(h + 180, s, l)
      colors.push(c)
      break
    }
    case 'analogous': {
      colors.push(hslToHex(h - 30, s, l))
      colors.push(hslToHex(h + 30, s, l))
      break
    }
    case 'triadic': {
      colors.push(hslToHex(h + 120, s, l))
      colors.push(hslToHex(h + 240, s, l))
      break
    }
    case 'monochrome': {
      colors.push(hslToHex(h, clamp(s * 0.6), clamp(l * 0.9)))
      colors.push(hslToHex(h, clamp(s * 0.3), clamp(l * 0.5)))
      break
    }
  }

  // Ensure unique and valid hex values
  return Array.from(new Set(colors))
}

export default function ColorGenerator() {
  const [base, setBase] = useState('#5F3CFF')
  const [scheme, setScheme] = useState<Scheme>('complementary')
  const [palette, setPalette] = useState<string[]>(() => generateScheme('#5F3CFF', 'complementary'))

  function update() {
    setPalette(generateScheme(base, scheme))
  }

  function randomize() {
    const rand = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`.toUpperCase()
    setBase(rand)
    setPalette(generateScheme(rand, scheme))
  }

  async function copy(hex: string) {
    try {
      await navigator.clipboard.writeText(hex)
      // small visual cue could be added later
    } catch (e) {
      console.error('Clipboard error', e)
    }
  }

  return (
    <div className="color-gen">
      <div className="controls">
        <label className="color-input">
          <span>1. Vyber barvu</span>
          <div className="color-row">
            <input aria-label="Vyber barvu" type="color" value={base} onChange={(e) => setBase(e.target.value.toUpperCase())} />
            <input className="hex-input" value={base} onChange={(e) => setBase(e.target.value)} />
          </div>
        </label>

        <label className="scheme-select">
          <span>2. Vyber barevnou kombinaci</span>
          <select value={scheme} onChange={(e) => setScheme(e.target.value as Scheme)}>
            <option value="complementary">Komplementární</option>
            <option value="analogous">Analogická</option>
            <option value="triadic">Triadická</option>
            <option value="monochrome">Monochromatická</option>
          </select>
        </label>

        <div className="controls-row">
          <button className="button primary" onClick={update}>Generovat</button>
          <button className="button secondary" onClick={randomize}>Náhodně</button>
        </div>
      </div>

      <div className="palette">
        {palette.map((c) => (
          <div key={c} className="swatch" style={{ background: c }} onClick={() => copy(c)} title={`Klikni pro kopírování ${c}`}>
            <div className="swatch-label">{c}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
