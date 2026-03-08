import { describe, it, expect } from 'vitest'
import { hexToHSL, hslToHex, generateColorScheme, generateRandomColor } from '@/lib/colorUtils'

describe('hexToHSL', () => {
  it('converts pure red', () => {
    const hsl = hexToHSL('#ff0000')
    expect(hsl.h).toBeCloseTo(0, 0)
    expect(hsl.s).toBeCloseTo(100, 0)
    expect(hsl.l).toBeCloseTo(50, 0)
  })

  it('converts pure green', () => {
    const hsl = hexToHSL('#00ff00')
    expect(hsl.h).toBeCloseTo(120, 0)
    expect(hsl.s).toBeCloseTo(100, 0)
    expect(hsl.l).toBeCloseTo(50, 0)
  })

  it('converts pure blue', () => {
    const hsl = hexToHSL('#0000ff')
    expect(hsl.h).toBeCloseTo(240, 0)
    expect(hsl.s).toBeCloseTo(100, 0)
    expect(hsl.l).toBeCloseTo(50, 0)
  })

  it('converts white', () => {
    const hsl = hexToHSL('#ffffff')
    expect(hsl.s).toBeCloseTo(0, 0)
    expect(hsl.l).toBeCloseTo(100, 0)
  })

  it('converts black', () => {
    const hsl = hexToHSL('#000000')
    expect(hsl.s).toBeCloseTo(0, 0)
    expect(hsl.l).toBeCloseTo(0, 0)
  })

  it('converts mid-gray', () => {
    const hsl = hexToHSL('#808080')
    expect(hsl.s).toBeCloseTo(0, 0)
    expect(hsl.l).toBeCloseTo(50, 0)
  })
})

describe('hslToHex', () => {
  it('converts pure red HSL to hex', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000')
  })

  it('converts pure green HSL to hex', () => {
    expect(hslToHex(120, 100, 50)).toBe('#00ff00')
  })

  it('converts pure blue HSL to hex', () => {
    expect(hslToHex(240, 100, 50)).toBe('#0000ff')
  })

  it('converts white', () => {
    expect(hslToHex(0, 0, 100)).toBe('#ffffff')
  })

  it('converts black', () => {
    expect(hslToHex(0, 0, 0)).toBe('#000000')
  })
})

describe('hexToHSL -> hslToHex roundtrip', () => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000', '#ff8800', '#8844cc']

  for (const hex of colors) {
    it(`roundtrips ${hex}`, () => {
      const { h, s, l } = hexToHSL(hex)
      const result = hslToHex(h, s, l)
      expect(result).toBe(hex)
    })
  }
})

describe('generateColorScheme', () => {
  it('complementary returns 2 colors', () => {
    const colors = generateColorScheme('#ff0000', 'complementary')
    expect(colors).toHaveLength(2)
    expect(colors[0]).toBe('#ff0000')
  })

  it('monochromatic returns 5 colors', () => {
    const colors = generateColorScheme('#3366cc', 'monochromatic')
    expect(colors).toHaveLength(5)
    expect(colors[0]).toBe('#3366cc')
  })

  it('analogous returns 3 colors', () => {
    const colors = generateColorScheme('#ff0000', 'analogous')
    expect(colors).toHaveLength(3)
  })

  it('triadic returns 3 colors', () => {
    const colors = generateColorScheme('#ff0000', 'triadic')
    expect(colors).toHaveLength(3)
  })

  it('tetradic returns 4 colors', () => {
    const colors = generateColorScheme('#ff0000', 'tetradic')
    expect(colors).toHaveLength(4)
  })

  it('all returned colors are valid hex', () => {
    const schemes = ['complementary', 'monochromatic', 'analogous', 'triadic', 'tetradic'] as const
    for (const scheme of schemes) {
      const colors = generateColorScheme('#3388ff', scheme)
      for (const color of colors) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/)
      }
    }
  })

  it('complementary color is 180° opposite', () => {
    const colors = generateColorScheme('#ff0000', 'complementary')
    const baseHsl = hexToHSL(colors[0])
    const compHsl = hexToHSL(colors[1])
    const hueDiff = Math.abs(baseHsl.h - compHsl.h)
    expect(hueDiff).toBeCloseTo(180, 0)
  })
})

describe('generateRandomColor', () => {
  it('returns valid hex color', () => {
    const color = generateRandomColor()
    expect(color).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('returns different colors on multiple calls', () => {
    const colors = new Set(Array.from({ length: 10 }, () => generateRandomColor()))
    // With 10 random colors, extremely unlikely to get all the same
    expect(colors.size).toBeGreaterThan(1)
  })
})
