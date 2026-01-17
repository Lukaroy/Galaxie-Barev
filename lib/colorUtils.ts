/**
 * Color utility functions for color scheme generation
 */

export interface HSL {
  h: number
  s: number
  l: number
}

/**
 * Konverze HEX → HSL
 */
export const hexToHSL = (hex: string): HSL => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

/**
 * Konverze HSL → HEX
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  h = h / 360
  s = s / 100
  l = l / 100

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const r = hue2rgb(p, q, h + 1/3)
  const g = hue2rgb(p, q, h)
  const b = hue2rgb(p, q, h - 1/3)

  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

/**
 * Generování barevného schématu podle typu
 */
export const generateColorScheme = (baseColor: string, scheme: 'complementary' | 'monochromatic' | 'analogous' | 'triadic' | 'tetradic'): string[] => {
  const { h, s, l } = hexToHSL(baseColor)
  let colors: string[] = [baseColor]

  switch (scheme) {
    case 'complementary':
      colors.push(hslToHex((h + 180) % 360, s, l))
      break

    case 'monochromatic':
      colors.push(
        hslToHex(h, s, Math.min(l + 15, 90)),
        hslToHex(h, s, Math.max(l - 15, 10)),
        hslToHex(h, Math.max(s * 0.6, 0), l),
        hslToHex(h, Math.min(s * 1.3, 100), l)
      )
      break

    case 'analogous':
      colors.push(
        hslToHex((h + 30) % 360, s, l),
        hslToHex((h - 30 + 360) % 360, s, l)
      )
      break

    case 'triadic':
      colors.push(
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l)
      )
      break

    case 'tetradic':
      colors.push(
        hslToHex((h + 90) % 360, s, l),
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 270) % 360, s, l)
      )
      break
  }

  return colors
}

/**
 * Generuje náhodnou HEX barvu
 */
export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

/**
 * Zkopíruje text do schránky
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}
