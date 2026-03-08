// Konstanty a typy pro výukové segmenty (lekce/testy)
// Obsahuje: ikony, štítky obtížnosti, barvy, TypeScript typy

import {
  Palette, Type as TypeIcon, Image, Layout, Sparkles,
  BookOpen, FileQuestion
} from "lucide-react"

export { BookOpen, FileQuestion }

/** Typ pro testovou otázku - otázka, možnosti, index správné odpovědi */
export type TestQuestion = {
  question: string
  options: string[]
  correctIndex: number
}

/** Typ pro výukový segment (lekce nebo test) */
export type Segment = {
  id: number
  title: string
  slug: string
  description?: string
  content?: string
  type: "LESSON" | "TEST"
  difficulty: "BEGINNER" | "INTERMEDIATE" | "EXPERT"
  duration?: string
  icon?: string
  color?: string
  tags: string[]
  questions?: TestQuestion[]
  createdAt?: string
}

/** Mapa názvů ikon na komponenty z lucide-react */
export const iconMap: Record<string, React.ElementType> = {
  Palette,
  Type: TypeIcon,
  Image,
  Layout,
  Sparkles,
  BookOpen,
  FileQuestion
}

/** České popisky pro úrovně obtížnosti */
export const difficultyLabels: Record<string, string> = {
  BEGINNER: "Začátečník",
  INTERMEDIATE: "Pokročilý",
  EXPERT: "Expert"
}

/** Barvy pro úrovně obtížnosti (pozadí + text) */
export const difficultyColors: Record<string, { bg: string; text: string }> = {
  BEGINNER: { bg: "rgba(74, 222, 128, 0.2)", text: "#4ade80" },
  INTERMEDIATE: { bg: "rgba(251, 191, 36, 0.2)", text: "#fbbf24" },
  EXPERT: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" }
}
