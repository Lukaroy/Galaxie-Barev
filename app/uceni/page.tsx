"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Palette, Type as TypeIcon, Image, Layout, Sparkles, ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'

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

export default function LearningPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Vše')

  const filteredLessons = selectedDifficulty === 'Vše' 
    ? lessons 
    : lessons.filter(l => l.difficulty === selectedDifficulty)

  return (
    <div className="learning-page">
      <div className="learning-container">
        <motion.div 
          className="learning-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-icon">
            <Book size={48} />
          </div>
          <h1>Škola designu</h1>
          <p className="header-subtitle">
            Zlepši svoje dovednosti krok za krokem. Praktické lekce, který ti pomohou tvořit lepší design.
          </p>
        </motion.div>

        <motion.div 
          className="difficulty-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {['Vše', 'Začátečník', 'Pokročilý', 'Expert'].map((diff) => (
            <button
              key={diff}
              className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="lessons-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className="lesson-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8, boxShadow: `0 20px 40px ${lesson.color}30` }}
            >
              <div className="lesson-icon" style={{ background: `linear-gradient(135deg, ${lesson.color}, ${lesson.color}dd)` }}>
                <lesson.icon size={32} />
              </div>

              <div className="lesson-content">
                <div className="lesson-meta">
                  <span className={`difficulty-badge ${lesson.difficulty.toLowerCase()}`}>
                    {lesson.difficulty}
                  </span>
                  <span className="duration">{lesson.duration}</span>
                </div>

                <h3>{lesson.title}</h3>
                <p className="lesson-description">{lesson.description}</p>

                <div className="lesson-topics">
                  {lesson.topics.map((topic, i) => (
                    <span key={i} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>

                <button className="start-lesson-btn">
                  <Play size={16} />
                  Začít lekci
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredLessons.length === 0 && (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>Žádné lekce pro tuhle obtížnost. Zkus jinou kategorii!</p>
          </motion.div>
        )}

        <motion.div 
          className="learning-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2>Připravený začít?</h2>
          <p>Všechny lekce jsou interaktivní a postavené na praktických příkladech.</p>
          <Link href="/barvy">
            <button className="cta-button">
              Zkusit barvy <ChevronRight size={20} />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
