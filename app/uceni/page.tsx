"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Palette, Type as TypeIcon, Image, Layout, Sparkles, ChevronRight, Play, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ProtectedRoute from '@/app/components/ProtectedRoute'

type Lesson = {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Začátečník' | 'Pokročilý' | 'Expert'
  icon: any
  color: string
  topics: string[]
}

const lessons: Lesson[] = [
  {
    id: 'barvy-zaklady',
    title: 'Základy barevné teorie',
    description: 'Nauč se pracovat s barvami jako profík. Barevný kruh, komplementární barvy a harmonie.',
    duration: '15 min',
    difficulty: 'Začátečník',
    icon: Palette,
    color: '#9872C7',
    topics: ['Barevný kruh', 'Komplementární barvy', 'Harmonické kombinace']
  },
  {
    id: 'typografie',
    title: 'Typografie v designu',
    description: 'Vyber správný font a vytvoř čitelný, krásný text. Párování fontů a hierarchie.',
    duration: '20 min',
    difficulty: 'Začátečník',
    icon: TypeIcon,
    color: '#684D89',
    topics: ['Výběr fontu', 'Párování fontů', 'Typografická hierarchie']
  },
  {
    id: 'moodboardy',
    title: 'Tvorba moodboardů',
    description: 'Získej inspiraci a uspořádej své nápady vizuálně. Od koncepce po finální board.',
    duration: '25 min',
    difficulty: 'Pokročilý',
    icon: Layout,
    color: '#9B7EBD',
    topics: ['Hledání inspirace', 'Kompozice', 'Export a sdílení']
  },
  {
    id: 'obrazky-optimalizace',
    title: 'Práce s obrázky',
    description: 'Optimalizuj obrázky pro web, ořezávej a uprav je jako boss.',
    duration: '18 min',
    difficulty: 'Pokročilý',
    icon: Image,
    color: '#CFBEE4',
    topics: ['Formáty obrázků', 'Komprese', 'Responzivita']
  },
  {
    id: 'pokrocile-techniky',
    title: 'Pokročilé designové techniky',
    description: 'Gradient mastery, stíny, efekty a další pokročilé triky pro wow efekt.',
    duration: '30 min',
    difficulty: 'Expert',
    icon: Sparkles,
    color: '#4F3173',
    topics: ['Gradienty', 'Stíny a depth', 'Blend modes', 'Efekty']
  },
]

function LearningPageContent() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Vše')

  const filteredLessons = selectedDifficulty === 'Vše' 
    ? lessons 
    : lessons.filter(l => l.difficulty === selectedDifficulty)

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "#0a0015 url('/background.png') center/cover fixed",
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #9872C7 0%, #7B5FA0 100%)",
            marginBottom: "1.5rem"
          }}>
            <Book size={40} color="white" />
          </div>
          <h1 style={{ 
            fontSize: "3rem", 
            fontWeight: "700", 
            marginBottom: "0.5rem",
            color: "white",
            letterSpacing: "-0.02em"
          }}>
            Škola designu
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: "400",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Zlepši svoje dovednosti krok za krokem. Praktické lekce, který ti pomohou tvořit lepší design.
          </p>
        </motion.div>

        {/* Difficulty Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "3rem"
          }}
        >
          {['Vše', 'Začátečník', 'Pokročilý', 'Expert'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                border: "none",
                background: selectedDifficulty === diff ? "#9872C7" : "rgba(255, 255, 255, 0.05)",
                color: "white",
                fontSize: "0.95rem",
                fontWeight: selectedDifficulty === diff ? "600" : "400",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                if (selectedDifficulty !== diff) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"
                }
              }}
              onMouseLeave={(e) => {
                if (selectedDifficulty !== diff) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"
                }
              }}
            >
              {diff}
            </button>
          ))}
        </motion.div>

        {/* Lessons Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "1rem",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "border-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(152, 114, 199, 0.3)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)"}
            >
              {/* Lesson Icon */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                borderRadius: "1rem",
                background: `linear-gradient(135deg, ${lesson.color}, ${lesson.color}dd)`,
                marginBottom: "1.25rem"
              }}>
                <lesson.icon size={32} color="white" />
              </div>

              {/* Meta Info */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}>
                <span style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  background: lesson.difficulty === 'Začátečník' ? "rgba(74, 222, 128, 0.2)" :
                             lesson.difficulty === 'Pokročilý' ? "rgba(251, 191, 36, 0.2)" :
                             "rgba(239, 68, 68, 0.2)",
                  color: lesson.difficulty === 'Začátečník' ? "#4ade80" :
                         lesson.difficulty === 'Pokročilý' ? "#fbbf24" :
                         "#ef4444"
                }}>
                  {lesson.difficulty}
                </span>
                <span style={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.5)"
                }}>
                  {lesson.duration}
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "white",
                marginBottom: "0.75rem",
                letterSpacing: "-0.01em"
              }}>
                {lesson.title}
              </h3>
              <p style={{
                fontSize: "0.95rem",
                color: "rgba(255, 255, 255, 0.5)",
                lineHeight: "1.6",
                marginBottom: "1.25rem"
              }}>
                {lesson.description}
              </p>

              {/* Topics */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.5rem"
              }}>
                {lesson.topics.map((topic, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "0.5rem",
                      background: "rgba(152, 114, 199, 0.15)",
                      color: "#9872C7",
                      fontSize: "0.8rem",
                      fontWeight: "500"
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Start Button */}
              <button style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.9rem",
                borderRadius: "0.75rem",
                border: "none",
                background: "#9872C7",
                color: "white",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#7B5FA0"
                e.currentTarget.style.transform = "scale(1.02)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#9872C7"
                e.currentTarget.style.transform = "scale(1)"
              }}
              >
                <Play size={16} />
                Začít lekci
                <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          >
            <p style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "1.1rem"
            }}>
              Žádné lekce pro tuhle obtížnost. Zkus jinou kategorii!
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: "rgba(152, 114, 199, 0.1)",
            border: "1px solid rgba(152, 114, 199, 0.2)",
            borderRadius: "1rem",
            marginTop: "2rem"
          }}
        >
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "white",
            marginBottom: "1rem",
            letterSpacing: "-0.01em"
          }}>
            Připravený začít?
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: "2rem",
            maxWidth: "600px",
            margin: "0 auto 2rem"
          }}>
            Všechny lekce jsou interaktivní a postavené na praktických příkladech.
          </p>
          <Link href="/barvy" style={{ textDecoration: "none" }}>
            <button style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2.5rem",
              borderRadius: "0.75rem",
              border: "none",
              background: "#9872C7",
              color: "white",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 4px 20px rgba(152, 114, 199, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7B5FA0"
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 6px 25px rgba(152, 114, 199, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#9872C7"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(152, 114, 199, 0.4)"
            }}
            >
              Zkusit barvy
              <ArrowRight size={20} />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default function LearningPage() {
  return (
    <ProtectedRoute>
      <LearningPageContent />
    </ProtectedRoute>
  )
}
