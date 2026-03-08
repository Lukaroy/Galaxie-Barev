// Sdílené TypeScript typy pro celou aplikaci

// Typy pro barevné palety
export type ColorScheme = 'complementary' | 'monochromatic' | 'analogous' | 'triadic' | 'tetradic'

export interface PaletteHistory {
  colors: string[]
  scheme: ColorScheme
  timestamp: number
}
