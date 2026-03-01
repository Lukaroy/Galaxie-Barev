"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Image as ImageIcon, Palette, Type, Layers, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import { useToast } from '@/app/components/Toast'

interface MoodboardItem {
  id: number
  name: string
  createdAt: string
  elements: { elementType?: { name: string } }[]
}

export default function MoodboardPage() {
  const [moodboards, setMoodboards] = useState<MoodboardItem[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [moodboardToDelete, setMoodboardToDelete] = useState<number | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [canvasPreset, setCanvasPreset] = useState('A4-portrait')
  const [canvasWidth, setCanvasWidth] = useState(794)
  const [canvasHeight, setCanvasHeight] = useState(1123)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const { user, loading } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/prihlaseni')
  }, [loading, user, router])

  const fetchMoodboards = useCallback(async () => {
    if (!user) return
    setIsFetching(true)
    try {
      const res = await fetch(`/api/moodboards?userId=${user.uid}`)
      if (res.ok) {
        const data = await res.json()
        setMoodboards(data)
      }
    } catch (err) {
      console.error('Chyba při načítání moodboardů:', err)
    } finally {
      setIsFetching(false)
    }
  }, [user])

  // Fetch on mount and when user changes
  useEffect(() => {
    if (user) fetchMoodboards()
  }, [user, fetchMoodboards])

  // Re-fetch when page regains focus (e.g. navigating back from editor)
  useEffect(() => {
    const onFocus = () => { if (user) fetchMoodboards() }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [user, fetchMoodboards])

  const CANVAS_PRESETS: Record<string, { label: string; w: number; h: number }> = {
    'A4-portrait':   { label: 'A4 na výšku',   w: 794,  h: 1123 },
    'A4-landscape':  { label: 'A4 na šířku',   w: 1123, h: 794  },
    'A3-portrait':   { label: 'A3 na výšku',   w: 1123, h: 1587 },
    'screen-hd':     { label: 'Obrazovka HD',   w: 1280, h: 720  },
    'screen-fhd':    { label: 'Obrazovka FHD',  w: 1920, h: 1080 },
    'instagram-sq':  { label: 'Instagram 1:1', w: 1080, h: 1080 },
    'instagram-story':{ label: 'IG Story 9:16', w: 1080, h: 1920 },
    'custom':        { label: 'Vlastní',        w: canvasWidth, h: canvasHeight },
  }

  const applyPreset = (preset: string) => {
    setCanvasPreset(preset)
    if (preset !== 'custom') {
      setCanvasWidth(CANVAS_PRESETS[preset].w)
      setCanvasHeight(CANVAS_PRESETS[preset].h)
    }
  }

  const handleCreateMoodboard = async () => {
    const title = newTitle.trim()
    if (!title) {
      showToast('Zadej název moodboardu!', 'warning')
      return
    }

    if (isLoading) return
    setIsLoading(true)

    try {
      const userId = user?.uid || 'temp-user-id'
      const res = await fetch('/api/moodboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title, userId, canvasWidth, canvasHeight })
      })
      if (res.ok) {
        const data = await res.json()
        setNewTitle('')
        setShowCreateModal(false)
        showToast('Moodboard byl vytvořen', 'success')
        router.push(`/moodboard/${data.id}?w=${canvasWidth}&h=${canvasHeight}`)
      } else {
        const err = await res.json()
        showToast(err.error?.includes('name') ? 'Moodboard s tímto názvem již existuje.' : 'Chyba při vytváření moodboardu.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Chyba při spojení se serverem.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMoodboard = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setMoodboardToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (moodboardToDelete === null) return
    try {
      const userId = user?.uid || 'temp-user-id'
      const res = await fetch(`/api/moodboards/${moodboardToDelete}?userId=${userId}`, { method: 'DELETE' })
      if (res.ok) {
        setMoodboards(prev => prev.filter(m => m.id !== moodboardToDelete))
        setMoodboardToDelete(null)
        setShowDeleteModal(false)
        showToast('Moodboard byl smazán', 'success')
      }
    } catch (err) {
      console.error(err)
      showToast('Chyba při mazání moodboardu', 'error')
    }
  }

  if (loading) return <Loading />

  if (!user) return null

  return (
    <div className='moodboard-page'>
      <div className="page-header-unified">
        <h1 className="page-title-gradient">Moodboard</h1>
        <p className="page-subtitle">Tvoje inspirační nástěnky</p>
      </div>

      {moodboards.length > 0 && (
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className='moodboard-create-btn'
          whileHover={{ scale: 1.05, backgroundColor: '#7d5ba8' }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={24} /> Vytvořit nový moodboard
        </motion.button>
      )}

      {isFetching && moodboards.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <Loader2 size={36} style={{ color: '#9872C7', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <>
          <div className='moodboard-grid'>
            <AnimatePresence>
          {moodboards.map((m, i) => {
            const imgCount = m.elements.filter(e => e.elementType?.name === 'image').length
            const shapeCount = m.elements.filter(e => e.elementType?.name === 'rect' || e.elementType?.name === 'circle').length
            const textCount = m.elements.filter(e => e.elementType?.name === 'text').length
            const totalElements = m.elements.length

            return (
              <motion.div 
                key={m.id} 
                className='moodboard-card'
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }} 
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(152,114,199,0.35)' }}
                onClick={() => router.push(`/moodboard/${m.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className='moodboard-card-preview'>
                  <div className='moodboard-card-preview-icons'>
                    <ImageIcon size={22} className='preview-icon' />
                    <Palette size={22} className='preview-icon' />
                    <Type size={22} className='preview-icon' />
                  </div>
                  <motion.button 
                    onClick={(e) => handleDeleteMoodboard(m.id, e)} 
                    className='moodboard-delete-btn'
                    whileHover={{ backgroundColor: 'rgba(255,0,0,0.9)', scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} color="white" />
                  </motion.button>
                </div>

                <div className='moodboard-card-body'>
                  <h3 className='moodboard-card-title'>{m.name}</h3>

                  <div className='moodboard-card-stats'>
                    <div className='moodboard-stat'>
                      <ImageIcon size={14} /><span>{imgCount}</span>
                    </div>
                    <div className='moodboard-stat'>
                      <Palette size={14} /><span>{shapeCount}</span>
                    </div>
                    <div className='moodboard-stat'>
                      <Type size={14} /><span>{textCount}</span>
                    </div>
                    <span className='moodboard-total'>{totalElements} prvků</span>
                  </div>

                  <div className='moodboard-card-footer'>
                    <span className='moodboard-card-date'>
                      {new Date(m.createdAt).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className='moodboard-card-open'>Otevřít →</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {!isFetching && moodboards.length === 0 && (
        <motion.div 
          className='moodboard-empty'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Layers size={56} className='moodboard-empty-icon' />
          <h2 className='moodboard-empty-title'>Zatím žádné moodboardy</h2>
          <p className='moodboard-empty-subtitle'>Vytvoř si první nástěnku a začni sbírat inspiraci pro své projekty.</p>
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className='moodboard-empty-cta'
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={20} /> Vytvořit první moodboard
          </motion.button>
        </motion.div>
      )}
      </>
      )}

      <AnimatePresence>
        {showCreateModal && (
          <motion.div 
            className='modal-overlay' 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div 
              className='modal-content modal-moodboard-create' 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              onClick={e => e.stopPropagation()}
            >
              <div className='modal-header-icon'>
                <Palette size={28} color="#9872C7" />
              </div>
              <h2 className='modal-title'>Nový Moodboard</h2>

              <div className='modal-form'>
                <div className='modal-field'>
                  <label>Název</label>
                  <input 
                    type="text" 
                    value={newTitle} 
                    onChange={e => setNewTitle(e.target.value)} 
                    placeholder="Např. Můj plakát 2026" 
                    onKeyDown={e => e.key === 'Enter' && handleCreateMoodboard()} 
                    className='modal-input' 
                    autoFocus
                  />
                </div>

                <div className='modal-field'>
                  <label>Formát plátna</label>
                  <div className='canvas-presets-grid'>
                    {Object.entries(CANVAS_PRESETS).filter(([k]) => k !== 'custom').map(([key, val]) => (
                      <button
                        key={key}
                        type='button'
                        className={`canvas-preset-btn ${canvasPreset === key ? 'active' : ''}`}
                        onClick={() => applyPreset(key)}
                      >
                        {val.label}
                        <span className='canvas-preset-dim'>{val.w}×{val.h}</span>
                      </button>
                    ))}
                    <button
                      type='button'
                      className={`canvas-preset-btn ${canvasPreset === 'custom' ? 'active' : ''}`}
                      onClick={() => setCanvasPreset('custom')}
                    >
                      Vlastní
                      <span className='canvas-preset-dim'>px</span>
                    </button>
                  </div>
                </div>

                {canvasPreset === 'custom' && (
                  <div className='modal-row'>
                    <div className='modal-field'>
                      <label>Šířka (px)</label>
                      <input type='number' value={canvasWidth} onChange={e => setCanvasWidth(Number(e.target.value))} className='modal-input' min={100} max={10000} />
                    </div>
                    <div className='modal-field'>
                      <label>Výška (px)</label>
                      <input type='number' value={canvasHeight} onChange={e => setCanvasHeight(Number(e.target.value))} className='modal-input' min={100} max={10000} />
                    </div>
                  </div>
                )}

                <div className='canvas-size-summary'>
                  Rozměry plátna: <strong>{canvasWidth} × {canvasHeight} px</strong>
                </div>
              </div>

              <div className='modal-buttons'>
                <motion.button 
                  onClick={() => setShowCreateModal(false)} 
                  className='modal-btn-cancel' 
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  Zrušit
                </motion.button>
                <motion.button 
                  onClick={handleCreateMoodboard} 
                  className='modal-btn-confirm' 
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? 'Vytvářím...' : 'Vytvořit'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div className='modal-overlay' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDeleteModal(false)}>
            <motion.div className='modal-content modal-content-small' initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <Trash2 size={48} color="#ff4444" className='modal-icon' />
              <h2 className='modal-title'>Smazat?</h2>
              <p className='modal-text'>Tato akce je nevratná.</p>
              <div className='modal-buttons modal-buttons-center'>
                <motion.button onClick={() => setShowDeleteModal(false)} className='modal-btn-cancel' whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>Zrušit</motion.button>
                <motion.button onClick={confirmDelete} className='modal-btn-delete' whileHover={{ backgroundColor: '#cc0000' }}>Smazat</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
