"use client"

import { useState, useEffect, use, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, Clock, BookOpen, FileQuestion, CheckCircle, XCircle,
  Palette, Type as TypeIcon, Image, Layout, Sparkles, Award, RotateCcw,
  Edit3, Save, X, Bold, Italic, Heading1, Heading2, Heading3, 
  ImagePlus, List, Quote, Code, Eye, EyeOff, Trash2
} from "lucide-react"
import { useRouter } from "next/navigation"
import Loading from "@/app/loading"
import ProtectedRoute from "@/app/components/ProtectedRoute"
import { useAuth } from "@/hooks/useAuth"

type TestQuestion = {
  question: string
  options: string[]
  correctIndex: number
}

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

function SegmentDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const isAdmin = user?.role === "ADMIN"
  
  const [segment, setSegment] = useState<Segment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Edit state
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editDuration, setEditDuration] = useState("")
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [imageMap, setImageMap] = useState<Record<string, string>>({})
  const imageCounter = useRef(0)
  
  // Test state
  const [testStarted, setTestStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetchSegment()
  }, [resolvedParams.slug])
  
  useEffect(() => {
    if (segment) {
      setEditContent(segment.content || "")
      setEditTitle(segment.title)
      setEditDescription(segment.description || "")
      setEditDuration(segment.duration || "")
    }
  }, [segment])

  const fetchSegment = async () => {
    try {
      const res = await fetch(`/api/segments/${resolvedParams.slug}`)
      if (res.ok) {
        const data = await res.json()
        setSegment(data)
        if (data.type === "TEST" && data.questions) {
          setSelectedAnswers(new Array(data.questions.length).fill(null))
        }
      } else {
        setError("Segment nebyl nalezen")
      }
    } catch {
      setError("Chyba při načítání")
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (iconName?: string) => {
    return iconMap[iconName || "BookOpen"] || BookOpen
  }
  
  // Editor functions
  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editContent.substring(start, end)
    const newText = editContent.substring(0, start) + before + selectedText + after + editContent.substring(end)
    
    setEditContent(newText)
    
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }
  
  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const newText = editContent.substring(0, start) + text + editContent.substring(start)
    setEditContent(newText)
    
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + text.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }
  
  const handleSave = async () => {
    if (!segment) return
    
    // Resolve img:N placeholders back to data URLs before saving
    const resolveContent = (text: string) =>
      text.replace(/\(img:(\d+)\)/g, (_m, n) => {
        const url = imageMap[`img:${n}`]
        return url ? `(${url})` : `(img:${n})`
      })

    setSaving(true)
    try {
      const res = await fetch(`/api/segments/${segment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          content: resolveContent(editContent),
          duration: editDuration || null
        })
      })
      
      if (res.ok) {
        const updated = await res.json()
        setSegment(updated)
        setIsEditing(false)
        setImageMap({})
        imageCounter.current = 0
      } else {
        alert("Chyba při ukládání")
      }
    } catch {
      alert("Chyba při ukládání")
    } finally {
      setSaving(false)
    }
  }
  
  const handleInsertImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      const key = `img:${++imageCounter.current}`
      const label = `obrázek ${imageCounter.current}`
      setImageMap(prev => ({ ...prev, [key]: dataUrl }))
      insertAtCursor(`\n![${label}](${key})\n`)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (!segment?.questions) return
    if (currentQuestionIndex < segment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateResults = () => {
    if (!segment?.questions) return
    let correct = 0
    segment.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) {
        correct++
      }
    })
    setScore(correct)
    setShowResults(true)
  }

  const resetTest = () => {
    setTestStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers(new Array(segment?.questions?.length || 0).fill(null))
    setShowResults(false)
    setScore(0)
  }

  if (loading) return <Loading />
  
  if (error || !segment) {
    return (
      <div className="profil-page">
        <div className="lesson-container">
          <div className="segment-error">
            <h2>{error || "Segment nenalezen"}</h2>
            <button onClick={() => router.push("/uceni")} className="segment-back-btn">
              <ArrowLeft size={20} /> Zpět na seznam
            </button>
          </div>
        </div>
      </div>
    )
  }

  const IconComponent = getIcon(segment.icon)
  const segmentDifficulty = segment.difficulty || "BEGINNER"
  const segmentType = segment.type || "LESSON"
  const diffColors = difficultyColors[segmentDifficulty] || difficultyColors.BEGINNER

  // Render Test Mode
  if (segmentType === "TEST") {
    const questions = segment.questions || []
    
    if (!testStarted && !showResults) {
      return (
        <div className="profil-page">
          <div className="lesson-container">
            <button onClick={() => router.push("/uceni")} className="segment-back-link">
              <ArrowLeft size={18} /> Zpět na seznam
            </button>

            <motion.div 
              className="test-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="test-hero" style={{ borderColor: segment.color || "#684d89" }}>
                <div 
                  className="test-hero-icon"
                  style={{ background: `linear-gradient(135deg, ${segment.color || "#684d89"}, ${segment.color || "#684d89"}cc)` }}
                >
                  <FileQuestion size={48} color="white" />
                </div>
                <h1 className="test-hero-title">{segment.title}</h1>
                <div className="segment-badges" style={{ justifyContent: "center" }}>
                  <span className="segment-type-badge test">
                    <FileQuestion size={14} /> Test
                  </span>
                  <span 
                    className="segment-diff-badge"
                    style={{ background: diffColors.bg, color: diffColors.text }}
                  >
                    {difficultyLabels[segmentDifficulty]}
                  </span>
                  {segment.duration && (
                    <span className="segment-duration">
                      <Clock size={14} /> {segment.duration}
                    </span>
                  )}
                </div>
              </div>

              {segment.description && (
                <p className="segment-description" style={{ textAlign: "center" }}>{segment.description}</p>
              )}

              <div className="test-stats-row">
                <div className="test-stat-card">
                  <span className="test-stat-num">{questions.length}</span>
                  <span className="test-stat-label">Otázek</span>
                </div>
                <div className="test-stat-card">
                  <span className="test-stat-num">60%</span>
                  <span className="test-stat-label">K úspěchu</span>
                </div>
                <div className="test-stat-card">
                  <span className="test-stat-num">{segment.duration || "—"}</span>
                  <span className="test-stat-label">Doba trvání</span>
                </div>
              </div>

              <div className="test-info-box">
                <h3>Pravidla testu</h3>
                <ul>
                  <li><CheckCircle size={16} /> Výběr z více možností</li>
                  <li><CheckCircle size={16} /> Můžeš se vracet k předchozím otázkám</li>
                  <li><CheckCircle size={16} /> Výsledek se zobrazí ihned po dokončení</li>
                </ul>
              </div>

              <motion.button
                onClick={() => setTestStarted(true)}
                className="test-start-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Spustit test
              </motion.button>
            </motion.div>
          </div>
        </div>
      )
    }

    if (showResults) {
      const percentage = Math.round((score / questions.length) * 100)
      const passed = percentage >= 60
      
      return (
        <div className="profil-page">
          <div className="lesson-container">
            <motion.div 
              className="test-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={`results-header ${passed ? "passed" : "failed"}`}>
                {passed ? (
                  <Award size={64} className="results-icon" />
                ) : (
                  <XCircle size={64} className="results-icon" />
                )}
                <h1>{passed ? "Gratulujeme!" : "Zkus to znovu"}</h1>
                <p className="results-subtitle">
                  {passed 
                    ? "Test jsi úspěšně dokončil!" 
                    : "Bohužel jsi nedosáhl potřebného skóre."}
                </p>
              </div>

              <div className="results-score">
                <div className="score-circle" style={{ 
                  background: passed 
                    ? "rgba(74, 222, 128, 0.15)" 
                    : "rgba(239, 68, 68, 0.15)",
                  borderColor: passed ? "#4ade80" : "#ef4444"
                }}>
                  <span className="score-number">{percentage}%</span>
                  <span className="score-label">{score} z {questions.length}</span>
                </div>
              </div>

              <div className="results-answers">
                <h3>Přehled odpovědí</h3>
                {questions.map((q, i) => {
                  const isCorrect = selectedAnswers[i] === q.correctIndex
                  return (
                    <div key={i} className={`result-item ${isCorrect ? "correct" : "wrong"}`}>
                      <div className="result-icon">
                        {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </div>
                      <div className="result-content">
                        <p className="result-question">{q.question}</p>
                        <p className="result-answer">
                          Tvá odpověď: {q.options[selectedAnswers[i] ?? 0]}
                          {!isCorrect && (
                            <span className="correct-answer">
                              Správně: {q.options[q.correctIndex]}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="results-actions">
                <button onClick={resetTest} className="retry-btn">
                  <RotateCcw size={18} /> Zkusit znovu
                </button>
                <button onClick={() => router.push("/uceni")} className="back-btn">
                  <ArrowLeft size={18} /> Zpět na seznam
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )
    }

    // Active test
    const currentQuestion = questions[currentQuestionIndex]
    
    return (
      <div className="profil-page">
        <div className="lesson-container">
          <div className="test-progress">
            <span>Otázka {currentQuestionIndex + 1} z {questions.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              className="test-question-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="question-text">{currentQuestion.question}</h2>

              <div className="options-list">
                {currentQuestion.options.map((option, oIndex) => (
                  <motion.button
                    key={oIndex}
                    className={`option-btn ${selectedAnswers[currentQuestionIndex] === oIndex ? "selected" : ""}`}
                    onClick={() => handleAnswerSelect(oIndex)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + oIndex)}
                    </span>
                    <span className="option-text">{option}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="test-navigation">
            <button 
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="nav-btn prev"
            >
              <ArrowLeft size={18} /> Předchozí
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === null}
              className="nav-btn next"
            >
              {currentQuestionIndex === questions.length - 1 ? "Dokončit" : "Další"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Lesson Mode
  return (
    <div className="profil-page">
      <div className="lesson-container">
        <div className="segment-top-bar">
          <button onClick={() => router.push("/uceni")} className="segment-back-link">
            <ArrowLeft size={18} /> Zpět na seznam
          </button>
          
          {isAdmin && !isEditing && segment.content && (
            <button 
              onClick={() => setIsEditing(true)} 
              className="segment-edit-btn"
            >
              <Edit3 size={18} /> Upravit
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header - editable in edit mode */}
          {isEditing ? (
            <div className="edit-header-section">
              <div className="edit-field">
                <label>Název lekce</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="edit-input"
                  placeholder="Název lekce"
                />
              </div>
              <div className="edit-field">
                <label>Popis</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="edit-textarea-small"
                  placeholder="Krátký popis lekce"
                  rows={2}
                />
              </div>
              <div className="edit-field">
                <label>Doba trvání</label>
                <input
                  type="text"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  className="edit-input"
                  placeholder="např. 15 min"
                />
              </div>
            </div>
          ) : (
            <>
              {/* Hero banner */}
              <div
                className="lesson-hero"
                style={{ background: `linear-gradient(135deg, ${segment.color || "#9872C7"}33 0%, ${segment.color || "#9872C7"}11 100%)`, borderLeftColor: segment.color || "#9872C7" }}
              >
                <div
                  className="lesson-hero-icon"
                  style={{ background: segment.color || "#9872C7" }}
                >
                  <IconComponent size={36} color="white" />
                </div>
                <div className="lesson-hero-text">
                  <div className="segment-badges">
                    <span className="segment-type-badge lesson">
                      <BookOpen size={14} /> Lekce
                    </span>
                    <span 
                      className="segment-diff-badge"
                      style={{ background: diffColors.bg, color: diffColors.text }}
                    >
                      {difficultyLabels[segmentDifficulty]}
                    </span>
                    {segment.duration && (
                      <span className="segment-duration">
                        <Clock size={14} /> {segment.duration}
                      </span>
                    )}
                  </div>
                  <h1 className="segment-title">{segment.title}</h1>
                </div>
              </div>

              {segment.description && (
                <p className="segment-description">{segment.description}</p>
              )}

              {(segment.tags?.length ?? 0) > 0 && (
                <div className="segment-tags">
                  {segment.tags.map((tag, i) => (
                    <span key={i} className="segment-tag">{tag}</span>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Content section */}
          {isEditing ? (
            <div className="content-editor">
              <div className="editor-toolbar">
                <input ref={imageInputRef} type="file" accept="image/*" hidden onChange={handleInsertImageFile} />
                <div className="toolbar-group">
                  <button 
                    onClick={() => insertText("# ", "")} 
                    title="Nadpis 1"
                    className="toolbar-btn"
                  >
                    <Heading1 size={18} />
                  </button>
                  <button 
                    onClick={() => insertText("## ", "")} 
                    title="Nadpis 2"
                    className="toolbar-btn"
                  >
                    <Heading2 size={18} />
                  </button>
                  <button 
                    onClick={() => insertText("### ", "")} 
                    title="Nadpis 3"
                    className="toolbar-btn"
                  >
                    <Heading3 size={18} />
                  </button>
                </div>
                
                <div className="toolbar-divider" />
                
                <div className="toolbar-group">
                  <button 
                    onClick={() => insertText("**", "**")} 
                    title="Tučné"
                    className="toolbar-btn"
                  >
                    <Bold size={18} />
                  </button>
                  <button 
                    onClick={() => insertText("*", "*")} 
                    title="Kurzíva"
                    className="toolbar-btn"
                  >
                    <Italic size={18} />
                  </button>
                  <button 
                    onClick={() => insertText('```\n', '\n```')} 
                    title="Kódový blok"
                    className="toolbar-btn"
                  >
                    <Code size={18} />
                  </button>
                </div>
                
                <div className="toolbar-divider" />
                
                <div className="toolbar-group">
                  <button 
                    onClick={() => imageInputRef.current?.click()}
                    title="Vložit obrázek"
                    className="toolbar-btn"
                  >
                    <ImagePlus size={18} />
                  </button>
                  <button 
                    onClick={() => insertAtCursor("\n- ")} 
                    title="Seznam"
                    className="toolbar-btn"
                  >
                    <List size={18} />
                  </button>
                  <button 
                    onClick={() => insertAtCursor("\n> ")} 
                    title="Citace"
                    className="toolbar-btn"
                  >
                    <Quote size={18} />
                  </button>
                </div>
                
                <div className="toolbar-divider" />
                
                <div className="toolbar-group">
                  <button 
                    onClick={() => setShowPreview(!showPreview)} 
                    title={showPreview ? "Skrýt náhled" : "Zobrazit náhled"}
                    className={`toolbar-btn ${showPreview ? "active" : ""}`}
                  >
                    {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className={`editor-content ${showPreview ? "with-preview" : ""}`}>
                <textarea
                  ref={textareaRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="content-textarea"
                  placeholder={"Obsah lekce... Použijte Markdown formátování:\n# Nadpis 1\n## Nadpis 2\n**tučný text**\n*kurzíva*\n```\nkod\n```"}
                />
                {showPreview && (
                  <div className="preview-pane">
                    <div
                      className="markdown-content"
                      dangerouslySetInnerHTML={{ __html: formatContent(editContent, imageMap) }}
                    />
                  </div>
                )}
              </div>
              
              <div className="editor-help">
                <p>
                  <strong>Formátování:</strong> # Nadpis 1, ## Nadpis 2, ### Nadpis 3, 
                  **tučný**, *kurzíva*, `kód`, ![alt](url) pro obrázky, [text](url) pro odkazy
                </p>
              </div>
              
              <div className="editor-actions">
                <button 
                  onClick={() => {
                    setIsEditing(false)
                    setEditContent(segment.content || "")
                    setEditTitle(segment.title)
                    setEditDescription(segment.description || "")
                    setEditDuration(segment.duration || "")
                    setImageMap({})
                    imageCounter.current = 0
                  }} 
                  className="cancel-btn"
                  disabled={saving}
                >
                  <X size={18} /> Zrušit
                </button>
                <button 
                  onClick={handleSave} 
                  className="save-btn"
                  disabled={saving}
                >
                  {saving ? (
                    <>Ukládám...</>
                  ) : (
                    <><Save size={18} /> Uložit změny</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="lesson-content">
              {segment.content ? (
                <div 
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: formatContent(segment.content) }}
                />
              ) : (
                <div className="no-content">
                  <BookOpen size={48} />
                  <p>Obsah lekce zatím není k dispozici.</p>
                  {isAdmin && (
                    <button onClick={() => setIsEditing(true)} className="add-content-btn">
                      <Edit3 size={18} /> Přidat obsah
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function formatContent(content: string, imageMap: Record<string, string> = {}): string {
  // Resolve short img:N references to actual data URLs
  let html = Object.keys(imageMap).length
    ? content.replace(/\(img:(\d+)\)/g, (_m, n) => {
        const url = imageMap[`img:${n}`]
        return url ? `(${url})` : `(img:${n})`
      })
    : content
  html = html
    // Fenced code blocks first (before inline code)
    .replace(/```([^\n]*)\n([\s\S]*?)```/g, (_match, _lang, code) =>
      `<pre><code class="code-block">${code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`
    )
    // Images: ![alt](url)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="content-image" />')
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code (not inside pre blocks)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr />')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')

  // Wrap consecutive li items in ul
  html = html.replace(/(<li>.*<\/li>(\n)?)+/g, (match) => `<ul>${match}</ul>`)

  // Wrap remaining text in paragraphs
  html = html.replace(/^([^<\n].+)$/gm, (match) => {
    if (match.startsWith('<') || match.trim() === '') return match
    return `<p>${match}</p>`
  })

  return html.replace(/<p><\/p>/g, '').replace(/<p>\s*<\/p>/g, '')
}

export default function SegmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <ProtectedRoute>
      <SegmentDetailContent params={params} />
    </ProtectedRoute>
  )
}
