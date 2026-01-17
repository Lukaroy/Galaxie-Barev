"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Square, Image as ImageIcon, Type, Trash2 } from 'lucide-react'
import { auth } from '@/lib/firebase'

interface CanvasItem {
  id: number
  coordsX: number
  coordsY: number
  width: number
  height: number
  elementType: { name: string }
  values: Array<{ attribute: { name: string }; value: string }>
}

interface Moodboard {
  id: number
  name: string
  elements: CanvasItem[]
}

export default function MoodboardEditorPage() {
  const params = useParams()
  const router = useRouter()
  const moodboardId = params.id as string
  
  const [moodboard, setMoodboard] = useState<Moodboard | null>(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [showImageInput, setShowImageInput] = useState(false)
  const [newColor, setNewColor] = useState('#9872C7')
  const [newText, setNewText] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchMoodboard()
  }, [moodboardId])

  const fetchMoodboard = async () => {
    try {
      const userId = auth.currentUser?.uid || 'temp-user-id'
      const response = await fetch(`/api/moodboards/${moodboardId}?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setMoodboard(data)
      } else {
        router.push('/moodboard')
      }
    } catch (error) {
      console.error('Error fetching moodboard:', error)
      router.push('/moodboard')
    }
  }

  const getContent = (item: CanvasItem) => {
    const contentValue = item.values.find(v => v.attribute.name === 'content')
    return contentValue?.value || ''
  }

  const addColor = async () => {
    if (!moodboard || !newColor || isLoading) return
    setIsLoading(true)
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'color',
          content: newColor,
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 10,
          width: 120,
          height: 120
        })
      })
      if (response.ok) {
        await fetchMoodboard()
        setShowColorPicker(false)
      }
    } catch (error) {
      console.error('Error adding color:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addText = async () => {
    if (!moodboard || !newText.trim() || isLoading) return
    setIsLoading(true)
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'text',
          content: newText,
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 10,
          width: 100,
          height: 50
        })
      })
      if (response.ok) {
        await fetchMoodboard()
        setNewText('')
        setShowTextInput(false)
      }
    } catch (error) {
      console.error('Error adding text:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addImage = async () => {
    if (!moodboard || !newImageUrl.trim() || isLoading) return
    setIsLoading(true)
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'image',
          content: newImageUrl,
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 10,
          width: 200,
          height: 200
        })
      })
      if (response.ok) {
        await fetchMoodboard()
        setNewImageUrl('')
        setShowImageInput(false)
      }
    } catch (error) {
      console.error('Error adding image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteItem = async (id: number) => {
    if (!moodboard) return
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elementId: id })
      })
      if (response.ok) await fetchMoodboard()
    } catch (error) {
      console.error('Error deleting element:', error)
    }
  }

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    setDraggedItem(itemId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    if (!moodboard || !draggedItem) return

    const canvas = e.currentTarget as HTMLElement
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          elementId: draggedItem,
          x,
          y
        })
      })

      if (response.ok) {
        await fetchMoodboard()
      }
    } catch (error) {
      console.error('Error updating element position:', error)
    } finally {
      setDraggedItem(null)
    }
  }

  if (!moodboard) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#1e1e1e', color: '#fff' }}>Načítám...</div>
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#1e1e1e',
      color: '#fff',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Top Toolbar */}
      <div style={{
        height: '48px',
        backgroundColor: '#2c2c2c',
        borderBottom: '1px solid #3c3c3c',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => router.push('/moodboard')}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3c3c3c'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div style={{ width: '1px', height: '24px', backgroundColor: '#3c3c3c' }} />

          <h2 style={{ fontSize: '14px', fontWeight: '500', margin: 0, color: '#b4b4b4' }}>
            {moodboard.name}
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setShowColorPicker(true)}
            disabled={isLoading}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#fff',
              fontSize: '13px',
              opacity: isLoading ? 0.5 : 1,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Square size={16} />
            Barva
          </button>

          <button
            onClick={() => setShowImageInput(true)}
            disabled={isLoading}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#fff',
              fontSize: '13px',
              opacity: isLoading ? 0.5 : 1,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ImageIcon size={16} />
            Obrázek
          </button>

          <button
            onClick={() => setShowTextInput(true)}
            disabled={isLoading}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#fff',
              fontSize: '13px',
              opacity: isLoading ? 0.5 : 1,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Type size={16} />
            Text
          </button>
        </div>

        <button
          onClick={fetchMoodboard}
          disabled={isLoading}
          style={{
            backgroundColor: '#5865F2',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '500',
            opacity: isLoading ? 0.5 : 1,
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#4752C4')}
          onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#5865F2')}
        >
          {isLoading ? 'Ukládám...' : 'Načíst'}
        </button>
      </div>

      {/* Canvas */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#252526',
          backgroundImage: 'linear-gradient(#2c2c2c 1px, transparent 1px), linear-gradient(90deg, #2c2c2c 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          overflow: 'auto'
        }}
      >
        {moodboard.elements.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            style={{
              position: 'absolute',
              left: `${item.coordsX / 100}%`,
              top: `${item.coordsY / 100}%`,
              cursor: 'move',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {item.elementType.name === 'color' && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div
                  style={{
                    width: item.width || 120,
                    height: item.height || 120,
                    backgroundColor: getContent(item),
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteItem(item.id)
                  }}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#ed4245',
                    border: 'none',
                    borderRadius: '3px',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#fff',
                    opacity: 0.9,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  ×
                </button>
              </div>
            )}

            {item.elementType.name === 'text' && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#2c2c2c',
                    border: '1px solid #3c3c3c',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    minWidth: item.width || 100
                  }}
                >
                  {getContent(item)}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteItem(item.id)
                  }}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#ed4245',
                    border: 'none',
                    borderRadius: '3px',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#fff',
                    opacity: 0.9,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  ×
                </button>
              </div>
            )}

            {item.elementType.name === 'image' && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={getContent(item)}
                  alt="Moodboard element"
                  style={{
                    width: item.width || 200,
                    height: item.height || 200,
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteItem(item.id)
                  }}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#ed4245',
                    border: 'none',
                    borderRadius: '3px',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#fff',
                    opacity: 0.9,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Color Picker Modal */}
      {showColorPicker && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowColorPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#2c2c2c',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #3c3c3c',
              width: '320px'
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '500' }}>Vyberte barvu</h3>
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              style={{ width: '100%', height: '60px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button
                onClick={() => setShowColorPicker(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#3c3c3c',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Zrušit
              </button>
              <button
                onClick={addColor}
                disabled={isLoading}
                style={{
                  flex: 1,
                  backgroundColor: '#5865F2',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  opacity: isLoading ? 0.5 : 1
                }}
              >
                Přidat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text Input Modal */}
      {showTextInput && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowTextInput(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#2c2c2c',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #3c3c3c',
              width: '320px'
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '500' }}>Přidat text</h3>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Zadejte text..."
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#1e1e1e',
                border: '1px solid #3c3c3c',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '13px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button
                onClick={() => setShowTextInput(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#3c3c3c',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Zrušit
              </button>
              <button
                onClick={addText}
                disabled={isLoading || !newText.trim()}
                style={{
                  flex: 1,
                  backgroundColor: '#5865F2',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff',
                  cursor: (isLoading || !newText.trim()) ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  opacity: (isLoading || !newText.trim()) ? 0.5 : 1
                }}
              >
                Přidat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Input Modal */}
      {showImageInput && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowImageInput(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#2c2c2c',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #3c3c3c',
              width: '320px'
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '500' }}>Přidat obrázek</h3>
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="URL obrázku..."
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#1e1e1e',
                border: '1px solid #3c3c3c',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '13px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button
                onClick={() => setShowImageInput(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#3c3c3c',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Zrušit
              </button>
              <button
                onClick={addImage}
                disabled={isLoading || !newImageUrl.trim()}
                style={{
                  flex: 1,
                  backgroundColor: '#5865F2',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff',
                  cursor: (isLoading || !newImageUrl.trim()) ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  opacity: (isLoading || !newImageUrl.trim()) ? 0.5 : 1
                }}
              >
                Přidat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
