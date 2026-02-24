"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Image as ImageIcon, Palette, Type } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(false)
  const { user, loading } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/prihlaseni')
  }, [loading, user, router])

  useEffect(() => {
    if (user) fetchMoodboards()
  }, [user])

  const fetchMoodboards = async () => {
    try {
      const userId = user?.uid || 'temp-user-id'
      const res = await fetch(`/api/moodboards?userId=${userId}`)
      if (res.ok) {
        const data = await res.json()
        setMoodboards(data)
      }
    } catch (err) {
      console.error('Chyba při načítání moodboardů:', err)
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
        body: JSON.stringify({ name: title, userId })
      })
      if (res.ok) {
        setNewTitle('')
        setShowCreateModal(false)
        await fetchMoodboards()
        showToast('Moodboard byl vytvořen', 'success')
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

      <motion.button
        onClick={() => setShowCreateModal(true)}
        className='moodboard-create-btn'
        whileHover={{ scale: 1.05, backgroundColor: '#7d5ba8' }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} /> Vytvořit nový moodboard
      </motion.button>

      <div className='moodboard-grid'>
        <AnimatePresence>
          {moodboards.map((m, i) => (
            <motion.div 
              key={m.id} 
              className='moodboard-card'
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(152,114,199,0.6)', boxShadow: '0 8px 30px rgba(152,114,199,0.3)' }}
              onClick={() => router.push(`/moodboard/${m.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <motion.button 
                onClick={(e) => handleDeleteMoodboard(m.id, e)} 
                className='moodboard-delete-btn'
                whileHover={{ backgroundColor: 'rgba(255,0,0,0.9)', scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={18} color="white" />
              </motion.button>

              <h3 className='moodboard-card-title'>{m.name}</h3>

              <div className='moodboard-card-stats'>
                <div className='moodboard-stat'>
                  <ImageIcon size={16} /> {m.elements.filter(e => e.elementType?.name === 'image').length}
                </div>
                <div className='moodboard-stat'>
                  <Palette size={16} /> {m.elements.filter(e => e.elementType?.name === 'color').length}
                </div>
                <div className='moodboard-stat'>
                  <Type size={16} /> {m.elements.filter(e => e.elementType?.name === 'text').length}
                </div>
              </div>

              <div className='moodboard-card-date'>
                {new Date(m.createdAt).toLocaleDateString('cs-CZ')}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {moodboards.length === 0 && (
        <div className='moodboard-empty'>
          <Palette size={64} className='moodboard-empty-icon' />
          <p className='moodboard-empty-title'>Zatím nemáte žádné moodboardy</p>
          <p className='moodboard-empty-subtitle'>Vytvořte si první moodboard a začněte sbírat inspiraci</p>
        </div>
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
              className='modal-content' 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              onClick={e => e.stopPropagation()}
            >
              <div className='modal-header-icon'>
                <Palette size={32} color="#9872C7" />
              </div>
              <h2 className='modal-title'>Nový Moodboard</h2>
              <p className='modal-text'>Zadej název pro svůj nový moodboard</p>
              <input 
                type="text" 
                value={newTitle} 
                onChange={e => setNewTitle(e.target.value)} 
                placeholder="Např. Můj plakát 2026" 
                onKeyDown={e => e.key === 'Enter' && handleCreateMoodboard()} 
                className='modal-input' 
                autoFocus
              />
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
