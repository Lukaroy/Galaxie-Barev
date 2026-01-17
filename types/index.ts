// API response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
}

// User types
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR'

export interface User {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  userName: string
  birthday?: Date | null
  role: UserRole
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  firstName: string
  lastName: string
}

// Palette types
export type ColorScheme = 'complementary' | 'monochromatic' | 'analogous' | 'triadic' | 'tetradic'

export interface PaletteHistory {
  colors: string[]
  scheme: ColorScheme
  timestamp: number
}

export interface Palette {
  id: number
  mainColor: string
  mixinColors: string[]
  tags: string[]
  description?: string | null
}

// Moodboard types
export interface Moodboard {
  id: number
  name: string
  createdAt: Date
  userId: string
  elements?: Element[]
}

export interface Element {
  id: number
  name: string
  coordsX: number
  coordsY: number
  opacity: number
  rotation: number
  height: number
  width: number
  layer: number
  elementTypeId: number
  moodboardId: number
}
