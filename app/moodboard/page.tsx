"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Image as ImageIcon, Palette, Type } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'

interface MoodboardItem {
  id: number
  name: string
  createdAt: Date
  elements: any[]
}

export default function MoodboardPage() {
  const [moodboards, setMoodboards] = useState<MoodboardItem[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [moodboardToDelete, setMoodboardToDelete] = useState<number | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/prihlaseni')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchMoodboards()
    }
  }, [user])

  const fetchMoodboards = async () => {
    try {
      setFetchError('')
      const userId = user?.uid || 'temp-user-id'
      const response = await fetch(`/api/moodboards?userId=${userId}`)

      if (response.ok) {
        const data = await response.json()
        setMoodboards(data)
      } else {
        const errorText = await response.text()
        console.error('Error fetching moodboards:', errorText)
        setFetchError('Nepodařilo se načíst moodboardy. Zkus to za chvíli znovu.')
      }
    } catch (error) {
      console.error('Error fetching moodboards:', error)
      setFetchError('Něco se pokazilo. Zkontroluj připojení k internetu.')
    }
  }

  const handleCreateMoodboard = async () => {
    const trimmedTitle = newTitle.trim()
    
    if (!trimmedTitle) {
      alert('Dávej tomu nějaké jméno, že jo? 😊')
      return
    }
    
    if (trimmedTitle.length < 2) {
      alert('Jméno je moc krátké, dávej minimálně 2 znaky')
      return
    }

    if (isLoading) return

    setIsLoading(true)
    try {
      const userId = user?.uid || 'temp-user-id'
      const response = await fetch('/api/moodboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: trimmedTitle,
          userId: userId
        })
      })

      if (response.ok) {
        const newMoodboard = await response.json()
        setNewTitle('')
        setShowCreateModal(false)
        // Přesměrujeme na nově vytvořený moodboard
        router.push(`/moodboard/${newMoodboard.id}`)
      } else {
        const error = await response.json()
        console.error('Error creating moodboard:', error)
        alert(error.error?.includes('name') 
          ? 'Už máš moodboard s tímhle jménem. Zkus něco jiného.'
          : 'Nepodařilo se vytvořit moodboard. Zkus to ještě jednou.')
      }
    } catch (error) {
      console.error('Error creating moodboard:', error)
      alert('Něco se pokazilo. Zkontroluj připojení.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMoodboard = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setMoodboardToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!moodboardToDelete) return

    try {
      const userId = user?.uid || 'temp-user-id'
      const response = await fetch(`/api/moodboards/${moodboardToDelete}?userId=${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMoodboards(moodboards.filter(m => m.id !== moodboardToDelete))
        setShowDeleteModal(false)
        setMoodboardToDelete(null)
      } else {
        console.error('Error deleting moodboard')
      }
    } catch (error) {
      console.error('Error deleting moodboard:', error)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '20vh' }}>
        <motion.div 
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Načítám...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            GALAXIE BAREV
          </h1>
          <p className="subtitle" style={{ fontSize: '1.5rem', color: '#9872C7' }}>
            Moodboard
          </p>
        </div>

        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="button-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto 2rem',
            padding: '1rem 2rem',
            backgroundColor: '#9872C7',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          whileHover={{ scale: 1.05, backgroundColor: '#7d5ba8' }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={24} />
          Vytvořit nový moodboard
        </motion.button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <AnimatePresence>
            {moodboards.map((moodboard, index) => (
              <motion.div
                key={moodboard.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => router.push(`/moodboard/${moodboard.id}`)}
                style={{
                  backgroundColor: 'rgba(152, 114, 199, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(152, 114, 199, 0.3)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(152, 114, 199, 0.6)',
                  boxShadow: '0 8px 30px rgba(152, 114, 199, 0.3)'
                }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteMoodboard(moodboard.id, e)
                  }}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(255, 0, 0, 0.7)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 0, 0, 0.9)', scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={18} color="white" />
                </motion.button>

                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  {moodboard.name}
                </h3>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    <ImageIcon size={16} />
                    <span>{moodboard.elements.filter((e: any) => e.elementType.name === 'image').length}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    <Palette size={16} />
                    <span>{moodboard.elements.filter((e: any) => e.elementType.name === 'color').length}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    <Type size={16} />
                    <span>{moodboard.elements.filter((e: any) => e.elementType.name === 'text').length}</span>
                  </div>
                </div>

                <div style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '1rem'
                }}>
                  {new Date(moodboard.createdAt).toLocaleDateString('cs-CZ')}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {moodboards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            <Palette size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.2rem' }}>
              Zatím nemáte žádné moodboardy
            </p>
            <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Vytvořte si první moodboard a začněte sbírat inspiraci
            </p>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'rgba(20, 20, 40, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(152, 114, 199, 0.4)',
                borderRadius: '20px',
                padding: '2rem',
                maxWidth: '500px',
                width: '100%'
              }}
            >
              <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: 'white',
                textAlign: 'center'
              }}>
                Nový Moodboard
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1rem'
                }}>
                  Název
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Např. Letní kolekce 2026"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateMoodboard()
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(152, 114, 199, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(152, 114, 199, 0.6)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(152, 114, 199, 0.3)'}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <motion.button
                  onClick={() => setShowCreateModal(false)}
                  disabled={isLoading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    opacity: isLoading ? 0.5 : 1
                  }}
                  whileHover={!isLoading ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}
                  whileTap={!isLoading ? { scale: 0.95 } : {}}
                >
                  Zrušit
                </motion.button>
                <motion.button
                  onClick={handleCreateMoodboard}
                  disabled={!newTitle.trim() || isLoading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: (newTitle.trim() && !isLoading) ? '#9872C7' : 'rgba(152, 114, 199, 0.3)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: (newTitle.trim() && !isLoading) ? 'pointer' : 'not-allowed',
                    fontWeight: '600'
                  }}
                  whileHover={(newTitle.trim() && !isLoading) ? { backgroundColor: '#7d5ba8', scale: 1.05 } : {}}
                  whileTap={(newTitle.trim() && !isLoading) ? { scale: 0.95 } : {}}
                >
                  {isLoading ? 'Vytvářím...' : 'Vytvořit'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'rgba(20, 20, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '2rem',
                borderRadius: '16px',
                border: '2px solid rgba(152, 114, 199, 0.3)',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center'
              }}
            >
              <Trash2 size={48} color="#ff4444" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
                Smazat?
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
                Tato akce je nevratná.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <motion.button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Zrušit
                </motion.button>
                <motion.button
                  onClick={confirmDelete}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                  whileHover={{ backgroundColor: '#cc0000' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Smazat
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #9872C7;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          margin: 0 auto 20px auto;
        }
      `}</style>
    </div>
  )
}