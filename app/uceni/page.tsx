"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Trash2, Plus, BookOpen, FileQuestion, ChevronRight, 
  Palette, Type as TypeIcon, Image, Layout, Sparkles
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import slugify from "slugify"
import Loading from "@/app/loading"
import { useToast } from "@/app/components/Toast"
import ProtectedRoute from "@/app/components/ProtectedRoute"

type Segment = {
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
  createdAt: string
}

type TestQuestion = {
  question: string
  options: string[]
  correctIndex: number
}

const iconMap: Record<string, React.ElementType> = {
  Palette,
  Type: TypeIcon,
  Image,
  Layout,
  Sparkles,
  BookOpen,
  FileQuestion
}

const difficultyLabels: Record<string, string> = {
  BEGINNER: "Začátečník",
  INTERMEDIATE: "Pokročilý",
  EXPERT: "Expert"
}

const difficultyColors: Record<string, { bg: string; text: string }> = {
  BEGINNER: { bg: "rgba(74, 222, 128, 0.2)", text: "#4ade80" },
  INTERMEDIATE: { bg: "rgba(251, 191, 36, 0.2)", text: "#fbbf24" },
  EXPERT: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444" }
}

function UceniPageContent() {
  const { user, loading: authLoading } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  
  const [segments, setSegments] = useState<Segment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>("Vše")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Vše")
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [segmentToDelete, setSegmentToDelete] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    type: "LESSON" as "LESSON" | "TEST",
    difficulty: "BEGINNER" as "BEGINNER" | "INTERMEDIATE" | "EXPERT",
    duration: "",
    icon: "BookOpen",
    color: "#9872C7",
    tags: ""
  })
  const [questions, setQuestions] = useState<TestQuestion[]>([])

  const isAdmin = user?.role === "ADMIN"

  useEffect(() => {
    fetchSegments()
  }, [])

  const fetchSegments = async () => {
    try {
      const res = await fetch("/api/segments")
      if (res.ok) {
        const data = await res.json()
        setSegments(data)
      }
    } catch (err) {
      console.error("Chyba při načítání:", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredSegments = segments.filter(s => {
    const segmentType = s.type || "LESSON"
    const segmentDifficulty = s.difficulty || "BEGINNER"
    const matchType = selectedType === "Vše" || 
      (selectedType === "Lekce" && segmentType === "LESSON") ||
      (selectedType === "Testy" && segmentType === "TEST")
    const matchDiff = selectedDifficulty === "Vše" || 
      difficultyLabels[segmentDifficulty] === selectedDifficulty
    return matchType && matchDiff
  })

  const handleCreateSegment = async () => {
    if (!formData.title.trim()) {
      showToast("Zadej název!", "warning")
      return
    }
    if (formData.type === "TEST" && questions.length === 0) {
      showToast("Test musí mít alespoň jednu otázku!", "warning")
      return
    }

    setIsSubmitting(true)
    const slug = slugify(formData.title, { lower: true, strict: true })
    const tags = formData.tags.split(",").map(t => t.trim()).filter(Boolean)

    try {
      const res = await fetch("/api/segments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug,
          tags,
          questions: formData.type === "TEST" ? questions : null
        })
      })
      
      if (res.ok) {
        resetForm()
        setShowCreateModal(false)
        await fetchSegments()
        showToast("Segment byl vytvořen!", "success")
      } else {
        const err = await res.json()
        showToast(err.error || "Chyba při vytváření", "error")
      }
    } catch {
      showToast("Chyba při spojení se serverem", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteSegment = async () => {
    if (!segmentToDelete) return
    try {
      const res = await fetch(`/api/segments/${segmentToDelete}`, { method: "DELETE" })
      if (res.ok) {
        setSegments(prev => prev.filter(s => s.id !== segmentToDelete))
        setShowDeleteModal(false)
        setSegmentToDelete(null)
        showToast("Segment smazán", "success")
      }
    } catch {
      showToast("Chyba při mazání", "error")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      type: "LESSON",
      difficulty: "BEGINNER",
      duration: "",
      icon: "BookOpen",
      color: "#9872C7",
      tags: ""
    })
    setQuestions([])
  }

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctIndex: 0 }])
  }

  const updateQuestion = (index: number, field: string, value: string | number) => {
    const updated = [...questions]
    if (field === "question") {
      updated[index].question = value as string
    } else if (field === "correctIndex") {
      updated[index].correctIndex = value as number
    }
    setQuestions(updated)
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions]
    updated[qIndex].options[oIndex] = value
    setQuestions(updated)
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const getIcon = (iconName?: string) => {
    const IconComponent = iconMap[iconName || "BookOpen"] || BookOpen
    return IconComponent
  }

  if (authLoading || loading) return <Loading />

  return (
    <div className="uceni-page">
      <div className="uceni-container">
        <div className="page-header-unified">
          <h1 className="page-title-gradient">Škola designu</h1>
          <p className="page-subtitle">Lekce a testy pro zdokonalení tvých dovedností</p>
        </div>

        {/* Filters */}
        <div className="uceni-filters">
          <div className="filter-group">
            <span className="filter-label">Typ:</span>
            {["Vše", "Lekce", "Testy"].map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`filter-btn ${selectedType === t ? "active" : ""}`}
              >
                {t === "Lekce" && <BookOpen size={16} />}
                {t === "Testy" && <FileQuestion size={16} />}
                {t}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <span className="filter-label">Obtížnost:</span>
            {["Vše", "Začátečník", "Pokročilý", "Expert"].map(d => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`filter-btn ${selectedDifficulty === d ? "active" : ""}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Admin Add Button */}
        {isAdmin && (
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className="uceni-add-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={20} /> Přidat segment
          </motion.button>
        )}

        {/* Segments Grid */}
        <div className="uceni-module-grid">
          <AnimatePresence>
            {filteredSegments.map((segment, index) => {
              const IconComponent = getIcon(segment.icon)
              const segmentDifficulty = segment.difficulty || "BEGINNER"
              const segmentType = segment.type || "LESSON"
              const diffColors = difficultyColors[segmentDifficulty] || difficultyColors.BEGINNER
              
              return (
                <motion.div
                  key={segment.id}
                  className="uceni-module-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  whileHover={{ y: -4 }}
                  onClick={() => router.push(`/uceni/${segment.slug}`)}
                  style={{ cursor: "pointer" }}
                >
                  {isAdmin && (
                    <button
                      className="uceni-card-delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSegmentToDelete(segment.id)
                        setShowDeleteModal(true)
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}

                  <div className="uceni-module-top">
                    <div
                      className="uceni-module-icon"
                      style={{ background: segment.color || "#9872C7" }}
                    >
                      <IconComponent size={22} color="white" />
                    </div>
                    <div className="uceni-module-badges">
                      <span
                        className="uceni-card-type"
                        style={{
                          background: segmentType === "TEST" ? "rgba(239,68,68,0.15)" : "rgba(59,130,246,0.15)",
                          color: segmentType === "TEST" ? "#ef4444" : "#3b82f6"
                        }}
                      >
                        {segmentType === "TEST" ? <FileQuestion size={11} /> : <BookOpen size={11} />}
                        {segmentType === "TEST" ? "Test" : "Lekce"}
                      </span>
                    </div>
                  </div>

                  <h3 className="uceni-module-title">{segment.title}</h3>
                  {segment.description && (
                    <p className="uceni-module-desc">{segment.description}</p>
                  )}

                  <div className="uceni-module-footer">
                    {(segment.tags?.length ?? 0) > 0 && (
                      <div className="uceni-module-tags">
                        {segment.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="uceni-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <span className="uceni-module-action">
                      {segmentType === "TEST" ? "Spustit test" : "Otevřít lekci"}
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredSegments.length === 0 && !loading && (
          <motion.div
            className="moodboard-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BookOpen size={56} className="moodboard-empty-icon" />
            <h2 className="moodboard-empty-title">Nic tu není</h2>
            <p className="moodboard-empty-subtitle">Pro zvolenou kategorii nebo obtížnost nemáme žádný obsah.</p>
            <motion.button
              className="moodboard-empty-cta"
              onClick={() => { setSelectedType("Vše"); setSelectedDifficulty("Vše") }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Zobrazit vše
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              className="modal-content modal-large"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-large-header">
                <h2 className="modal-title">
                  <Plus size={24} /> Nový segment
                </h2>
              </div>

              <div className="modal-large-body">
                <div className="modal-form">
                <div className="modal-row">
                  <div className="modal-field">
                    <label>Název</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Např. Základy barev"
                      className="modal-input"
                    />
                  </div>
                  <div className="modal-field">
                    <label>Typ</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as "LESSON" | "TEST" })}
                      className="modal-select"
                    >
                      <option value="LESSON">Lekce</option>
                      <option value="TEST">Test</option>
                    </select>
                  </div>
                </div>

                <div className="modal-row">
                  <div className="modal-field">
                    <label>Obtížnost</label>
                    <select
                      value={formData.difficulty}
                      onChange={e => setFormData({ ...formData, difficulty: e.target.value as "BEGINNER" | "INTERMEDIATE" | "EXPERT" })}
                      className="modal-select"
                    >
                      <option value="BEGINNER">Začátečník</option>
                      <option value="INTERMEDIATE">Pokročilý</option>
                      <option value="EXPERT">Expert</option>
                    </select>
                  </div>
                  <div className="modal-field">
                    <label>Délka</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="Např. 15 min"
                      className="modal-input"
                    />
                  </div>
                </div>

                <div className="modal-row">
                  <div className="modal-field">
                    <label>Ikona</label>
                    <select
                      value={formData.icon}
                      onChange={e => setFormData({ ...formData, icon: e.target.value })}
                      className="modal-select"
                    >
                      <option value="BookOpen">Kniha</option>
                      <option value="Palette">Paleta</option>
                      <option value="Type">Typografie</option>
                      <option value="Image">Obrázek</option>
                      <option value="Layout">Layout</option>
                      <option value="Sparkles">Efekty</option>
                      <option value="FileQuestion">Otázka</option>
                    </select>
                  </div>
                  <div className="modal-field">
                    <label>Barva</label>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={e => setFormData({ ...formData, color: e.target.value })}
                      className="modal-color"
                    />
                  </div>
                </div>

                <div className="modal-field">
                  <label>Krátký popis</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Stručný popis segmentu..."
                    className="modal-textarea"
                    rows={2}
                  />
                </div>

                <div className="modal-field">
                  <label>Tagy (oddělené čárkou)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="design, barvy, teorie"
                    className="modal-input"
                  />
                </div>

                {formData.type === "LESSON" && (
                  <div className="modal-field">
                    <label>Obsah lekce</label>
                    <textarea
                      value={formData.content}
                      onChange={e => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Obsah lekce (podporuje markdown)..."
                      className="modal-textarea"
                      rows={6}
                    />
                  </div>
                )}

                {formData.type === "TEST" && (
                  <div className="modal-field">
                    <label>Otázky testu</label>
                    <div className="questions-list">
                      {questions.map((q, qIndex) => (
                        <div key={qIndex} className="question-item">
                          <div className="question-header">
                            <span>Otázka {qIndex + 1}</span>
                            <button 
                              type="button"
                              onClick={() => removeQuestion(qIndex)}
                              className="question-remove"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={q.question}
                            onChange={e => updateQuestion(qIndex, "question", e.target.value)}
                            placeholder="Zadej otázku..."
                            className="modal-input"
                          />
                          <div className="options-grid">
                            {q.options.map((opt, oIndex) => (
                              <div key={oIndex} className="option-row">
                                <input
                                  type="radio"
                                  name={`correct-${qIndex}`}
                                  checked={q.correctIndex === oIndex}
                                  onChange={() => updateQuestion(qIndex, "correctIndex", oIndex)}
                                />
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={e => updateOption(qIndex, oIndex, e.target.value)}
                                  placeholder={`Odpověď ${oIndex + 1}`}
                                  className="modal-input option-input"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={addQuestion} className="add-question-btn">
                        <Plus size={16} /> Přidat otázku
                      </button>
                    </div>
                  </div>
                )}
                </div>
              </div>

              <div className="modal-large-footer">
                <button
                  onClick={() => { setShowCreateModal(false); resetForm() }}
                  className="modal-btn-cancel"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleCreateSegment}
                  className="modal-btn-confirm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Vytvářím..." : "Vytvořit"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className="modal-content modal-content-small"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <Trash2 size={48} color="#ff4444" className="modal-icon" />
              <h2 className="modal-title">Smazat segment?</h2>
              <p className="modal-text">Tato akce je nevratná.</p>
              <div className="modal-buttons modal-buttons-center">
                <button onClick={() => setShowDeleteModal(false)} className="modal-btn-cancel">
                  Zrušit
                </button>
                <button onClick={handleDeleteSegment} className="modal-btn-delete">
                  Smazat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function UceniPage() {
  return (
    <ProtectedRoute>
      <UceniPageContent />
    </ProtectedRoute>
  )
}
