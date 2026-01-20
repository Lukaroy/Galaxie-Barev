"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Square, Image as ImageIcon, Type, Circle, Trash2, Copy, Download, Layers, MousePointer2, ZoomIn, ZoomOut, Move, Minus } from 'lucide-react'
import { auth } from '@/lib/firebase'

interface CanvasElement {
  id: number
  coordsX: number
  coordsY: number
  width: number
  height: number
  rotation: number
  opacity: number
  layer: number
  elementType: {
    name: string
  }
  values: Array<{
    attribute: {
      name: string
    }
    value: string
  }>
  isLocked?: boolean
  isHidden?: boolean
}

interface Moodboard {
  id: number
  name: string
  elements: CanvasElement[]
}

export default function MoodboardEditorPage() {
  const params = useParams()
  const router = useRouter()
  const moodboardId = params.id as string
  
  const [moodboard, setMoodboard] = useState<Moodboard | null>(null)
  const [activeTool, setActiveTool] = useState<'select' | 'rect' | 'circle' | 'text' | 'image'>('select')
  const [selectedElements, setSelectedElements] = useState<number[]>([])
  const [draggedElement, setDraggedElement] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizingElement, setResizingElement] = useState<{ id: number, handle: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [canvasBg, setCanvasBg] = useState('#1E1E1E')
  const [showLayersPanel, setShowLayersPanel] = useState(true)
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [history, setHistory] = useState<Moodboard[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  // Modal states
  const [showTextModal, setShowTextModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [showImageInput, setShowImageInput] = useState(false)
  const [pendingText, setPendingText] = useState('')
  const [pendingImageUrl, setPendingImageUrl] = useState('')
  const [pendingColor, setPendingColor] = useState('#9872C7')
  const [pendingFontSize, setPendingFontSize] = useState(24)
  const [pendingPosition, setPendingPosition] = useState<{ x: number, y: number } | null>(null)
  const [newColor, setNewColor] = useState('#9872C7')
  const [showExportModal, setShowExportModal] = useState(false)

  useEffect(() => {
    fetchMoodboard()
    
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElements.length > 0) {
        e.preventDefault()
        deleteSelectedElements()
      }
      
      // Escape - deselect
      if (e.key === 'Escape') {
        setSelectedElements([])
        setActiveTool('select')
      }
      
      // Ctrl/Cmd + Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }
      
      // Ctrl/Cmd + Shift + Z - Redo
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault()
        redo()
      }
      
      // Ctrl/Cmd + C - Copy
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedElements.length > 0) {
        e.preventDefault()
        copySelectedElements()
      }
      
      // Ctrl/Cmd + D - Duplicate
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedElements.length > 0) {
        e.preventDefault()
        duplicateSelectedElements()
      }
      
      // Tool shortcuts
      if (e.key === 'v') setActiveTool('select')
      if (e.key === 'r') setActiveTool('rect')
      if (e.key === 't') { setActiveTool('text'); setShowTextModal(true) }
      if (e.key === 'i') { setActiveTool('image'); setShowImageModal(true) }
      
      // Zoom
      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault()
        setZoom(100)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '+') {
        e.preventDefault()
        setZoom(prev => Math.min(prev + 10, 200))
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault()
        setZoom(prev => Math.max(prev - 10, 25))
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moodboardId, selectedElements])

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

  const getContent = (item: CanvasElement) => {
    const contentValue = item.values.find(v => v.attribute.name === 'content')
    return contentValue?.value || ''
  }

  const deleteSelectedElements = async () => {
    if (selectedElements.length === 0 || !moodboard) return

    try {
      const userId = auth.currentUser?.uid
      if (!userId) return

      for (const elementId of selectedElements) {
        await fetch(`/api/moodboards/${moodboardId}/elements/${elementId}?userId=${userId}`, {
          method: 'DELETE'
        })
      }

      await fetchMoodboard()
      setSelectedElements([])
    } catch (error) {
      console.error('Error deleting elements:', error)
    }
  }

  const copySelectedElements = () => {
    if (selectedElements.length === 0 || !moodboard) return
    // Copy logic here
  }

  const duplicateSelectedElements = async () => {
    if (selectedElements.length === 0 || !moodboard) return
    // Duplicate logic here
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setMoodboard(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setMoodboard(history[historyIndex + 1])
    }
  }

  const addColor = async () => {
    if (!moodboard || !newColor || isLoading) return

    setIsLoading(true)
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
        setActiveTool('select')
      }
    } catch (error) {
      console.error('Error adding color:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addColorAtPosition = async (x: number, y: number) => {
    if (!moodboard || isLoading) return

    setIsLoading(true)
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: activeTool === 'circle' ? 'circle' : activeTool === 'line' ? 'line' : 'color',
          content: newColor,
          x,
          y,
          width: activeTool === 'line' ? 200 : 120,
          height: activeTool === 'line' ? 4 : 120
        })
      })

      if (response.ok) {
        await fetchMoodboard()
        setActiveTool('select')
      }
    } catch (error) {
      console.error('Error adding shape:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addText = async () => {
    if (!moodboard || !pendingText.trim() || isLoading || !pendingPosition) return

    setIsLoading(true)
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'text',
          content: pendingText,
          x: pendingPosition.x,
          y: pendingPosition.y,
          width: 100,
          height: 50
        })
      })

      if (response.ok) {
        await fetchMoodboard()
        setPendingText('')
        setShowTextInput(false)
        setPendingPosition(null)
        setActiveTool('select')
      }
    } catch (error) {
      console.error('Error adding text:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addImage = async () => {
    if (!moodboard || !pendingImageUrl.trim() || isLoading || !pendingPosition) return

    setIsLoading(true)
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return
      
      const response = await fetch(`/api/moodboards/${moodboardId}/elements?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'image',
          content: pendingImageUrl,
          x: pendingPosition.x,
          y: pendingPosition.y,
          width: 200,
          height: 200
        })
      })

      if (response.ok) {
        await fetchMoodboard()
        setPendingImageUrl('')
        setShowImageInput(false)
        setPendingPosition(null)
        setActiveTool('select')
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ elementId: id })
      })

      if (response.ok) {
        await fetchMoodboard()
      }
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

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (activeTool === 'select' || isLoading) return

    const canvas = e.currentTarget as HTMLElement
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (activeTool === 'rect' || activeTool === 'circle' || activeTool === 'line') {
      addColorAtPosition(x, y)
    } else if (activeTool === 'text') {
      setPendingPosition({ x, y })
      setShowTextInput(true)
    } else if (activeTool === 'image') {
      setPendingPosition({ x, y })
      setShowImageInput(true)
    }
  }

  const exportCanvas = async (format: 'png' | 'jpg') => {
    if (!canvasRef.current) return
    
    // Použij html2canvas nebo similar library pro export
    // Pro teď jen simuluji download
    const link = document.createElement('a')
    link.download = `${moodboard?.name || 'moodboard'}.${format}`
    link.href = '#' // TODO: implement actual export
    alert(`Export do ${format.toUpperCase()} bude implementován s html2canvas knihovnou`)
  }

  const moveLayer = async (elementId: number, direction: 'up' | 'down') => {
    // TODO: Implement z-index update in database
    console.log(`Moving element ${elementId} ${direction}`)
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
            onClick={() => {
              setActiveTool('select')
              setShowColorPicker(false)
              setShowTextInput(false)
              setShowImageInput(false)
            }}
            disabled={isLoading}
            style={{
              backgroundColor: activeTool === 'select' ? '#3c3c3c' : 'transparent',
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
            onMouseEnter={(e) => !isLoading && activeTool !== 'select' && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => activeTool !== 'select' && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <MousePointer2 size={16} />
            Vybrat
          </button>

          <div style={{ width: '1px', height: '24px', backgroundColor: '#3c3c3c', margin: '0 4px' }} />

          <button
            onClick={() => setShowColorPicker(true)}
            disabled={isLoading}
            style={{
              backgroundColor: activeTool === 'rect' ? '#3c3c3c' : 'transparent',
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
            onMouseEnter={(e) => !isLoading && activeTool !== 'rect' && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => activeTool !== 'rect' && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Square size={16} />
            Obdélník
          </button>

          <button
            onClick={() => setShowColorPicker(true)}
            disabled={isLoading}
            style={{
              backgroundColor: activeTool === 'circle' ? '#3c3c3c' : 'transparent',
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
            onMouseEnter={(e) => !isLoading && activeTool !== 'circle' && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => activeTool !== 'circle' && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Circle size={16} />
            Kruh
          </button>

          <button
            onClick={() => setShowColorPicker(true)}
            disabled={isLoading}
            style={{
              backgroundColor: activeTool === 'line' ? '#3c3c3c' : 'transparent',
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
            onMouseEnter={(e) => !isLoading && activeTool !== 'line' && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => activeTool !== 'line' && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Minus size={16} />
            Čára
          </button>

          <div style={{ width: '1px', height: '24px', backgroundColor: '#3c3c3c', margin: '0 4px' }} />

          <button
            onClick={() => {
              setActiveTool('image')
            }}
            disabled={isLoading}
            style={{
              backgroundColor: activeTool === 'image' ? '#3c3c3c' : 'transparent',
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
            onMouseEnter={(e) => !isLoading && activeTool !== 'image' && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => activeTool !== 'image' && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ImageIcon size={16} />
            Obrázek
          </button>

          <button
            onClick={() => {
              setActiveTool('text')
            }}
            disabled={isLoading}
            style={{
              backgroundColor: activeTool === 'text' ? '#3c3c3c' : 'transparent',
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
            onMouseEnter={(e) => !isLoading && activeTool !== 'text' && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => activeTool !== 'text' && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Type size={16} />
            Text
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setShowLayersPanel(!showLayersPanel)}
            disabled={isLoading}
            style={{
              backgroundColor: showLayersPanel ? '#3c3c3c' : 'transparent',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '500',
              opacity: isLoading ? 0.5 : 1,
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => !isLoading && !showLayersPanel && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => !showLayersPanel && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Layers size={16} />
            Vrstvy
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            disabled={isLoading}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '500',
              opacity: isLoading ? 0.5 : 1,
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3c3c3c')}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Download size={16} />
            Export
          </button>

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
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleCanvasClick}
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: canvasBg,
          backgroundImage: 'linear-gradient(#2c2c2c 1px, transparent 1px), linear-gradient(90deg, #2c2c2c 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          overflow: 'auto',
          cursor: activeTool === 'select' ? 'default' : 'crosshair'
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
                    transition: 'opacity 0.2s',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  ×
                </button>
              </div>
            )}

            {item.elementType.name === 'circle' && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div
                  style={{
                    width: item.width || 120,
                    height: item.height || 120,
                    backgroundColor: getContent(item),
                    borderRadius: '50%',
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
                    transition: 'opacity 0.2s',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  ×
                </button>
              </div>
            )}

            {item.elementType.name === 'line' && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div
                  style={{
                    width: item.width || 200,
                    height: item.height || 4,
                    backgroundColor: getContent(item),
                    borderRadius: '2px',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
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
                    transition: 'opacity 0.2s',
                    zIndex: 10
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
                onClick={() => {
                  setShowColorPicker(false)
                  setActiveTool('select')
                }}
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
                onClick={() => {
                  setShowColorPicker(false)
                  // Aktivuj nástroj podle toho co je zvolené
                  if (activeTool !== 'rect' && activeTool !== 'circle' && activeTool !== 'line') {
                    setActiveTool('rect')
                  }
                }}
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
                Klikněte na plátno
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
              value={pendingText}
              onChange={(e) => setPendingText(e.target.value)}
              placeholder="Zadejte text..."
              autoFocus
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
                onClick={() => {
                  setShowTextInput(false)
                  setPendingText('')
                  setPendingPosition(null)
                  setActiveTool('select')
                }}
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
                disabled={isLoading || !pendingText.trim()}
                style={{
                  flex: 1,
                  backgroundColor: '#5865F2',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff',
                  cursor: (isLoading || !pendingText.trim()) ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  opacity: (isLoading || !pendingText.trim()) ? 0.5 : 1
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
              value={pendingImageUrl}
              onChange={(e) => setPendingImageUrl(e.target.value)}
              placeholder="URL obrázku..."
              autoFocus
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
                onClick={() => {
                  setShowImageInput(false)
                  setPendingImageUrl('')
                  setPendingPosition(null)
                  setActiveTool('select')
                }}
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
                disabled={isLoading || !pendingImageUrl.trim()}
                style={{
                  flex: 1,
                  backgroundColor: '#5865F2',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff',
                  cursor: (isLoading || !pendingImageUrl.trim()) ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  opacity: (isLoading || !pendingImageUrl.trim()) ? 0.5 : 1
                }}
              >
                Přidat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
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
          onClick={() => setShowExportModal(false)}
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
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '500' }}>Export plakátu</h3>
            <p style={{ color: '#b4b4b4', fontSize: '13px', marginBottom: '16px' }}>Vyberte formát exportu:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => {
                  exportCanvas('png')
                  setShowExportModal(false)
                }}
                style={{
                  backgroundColor: '#3c3c3c',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '12px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4c4c4c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3c3c3c'}
              >
                PNG (s průhledností)
              </button>
              <button
                onClick={() => {
                  exportCanvas('jpg')
                  setShowExportModal(false)
                }}
                style={{
                  backgroundColor: '#3c3c3c',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '12px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4c4c4c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3c3c3c'}
              >
                JPG (menší soubor)
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #3c3c3c',
                  borderRadius: '4px',
                  padding: '12px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  marginTop: '8px'
                }}
              >
                Zrušit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Layers Panel */}
      {showLayersPanel && moodboard && (
        <div
          style={{
            position: 'fixed',
            right: '16px',
            top: '64px',
            width: '280px',
            maxHeight: '500px',
            backgroundColor: '#2c2c2c',
            border: '1px solid #3c3c3c',
            borderRadius: '8px',
            padding: '16px',
            zIndex: 1000,
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>Vrstvy ({moodboard.elements.length})</h3>
            <button
              onClick={() => setShowLayersPanel(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#b4b4b4',
                cursor: 'pointer',
                fontSize: '18px',
                padding: 0
              }}
            >
              ×
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {moodboard.elements.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: selectedItem === item.id ? '#3c3c3c' : '#252526',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => selectedItem !== item.id && (e.currentTarget.style.backgroundColor = '#2e2e2e')}
                onMouseLeave={(e) => selectedItem !== item.id && (e.currentTarget.style.backgroundColor = '#252526')}
              >
                <span style={{ fontSize: '13px' }}>
                  {item.elementType.name === 'color' && '🟦 Obdélník'}
                  {item.elementType.name === 'circle' && '⚫ Kruh'}
                  {item.elementType.name === 'line' && '━ Čára'}
                  {item.elementType.name === 'text' && `📝 ${getContent(item).slice(0, 15)}...`}
                  {item.elementType.name === 'image' && '🖼️ Obrázek'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteItem(item.id)
                  }}
                  style={{
                    backgroundColor: '#ed4245',
                    border: 'none',
                    borderRadius: '3px',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    color: '#fff'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
