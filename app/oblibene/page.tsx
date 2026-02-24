"use client"

import React, { useState, useEffect } from 'react'
import ProtectedRoute from '@/app/components/ProtectedRoute'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Loading from '@/app/loading'

type GalleryPin = {
  id: number
  title: string
  imageUrl: string
  description: string | null
  createdAt: string
  author: {
    id: string
    userName: string
    firstName: string | null
    lastName: string | null
  }
}

function OblibeneContent() {
  const { user } = useAuth()
  const [pins, setPins] = useState<GalleryPin[]>([])
  const [loading, setLoading] = useState(true)
  const [imageModal, setImageModal] = useState<{ show: boolean, imageUrl: string, title: string } | null>(null)

  useEffect(() => {
    if (user) fetchLikedPins()
  }, [user])

  const fetchLikedPins = async () => {
    try {
      const response = await fetch(`/api/gallery-pins/liked?userId=${user?.uid}`)
      if (!response.ok) throw new Error('Failed to fetch liked pins')
      const data = await response.json()
      setPins(data)
    } catch (error) {
      console.error('Error fetching liked pins:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnlike = async (pinId: number) => {
    if (!user) return
    try {
      const response = await fetch('/api/gallery-pins/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinId, userId: user.uid })
      })
      if (response.ok) setPins(pins.filter(pin => pin.id !== pinId))
    } catch (error) {
      console.error('Error unliking pin:', error)
    }
  }

  const openImageModal = (imageUrl: string, title: string) => setImageModal({ show: true, imageUrl, title })
  const closeImageModal = () => setImageModal(null)

  const downloadImage = (imageUrl: string, title: string) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `${title.replace(/[^a-z0-9]/gi, '_')}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) return <Loading />

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="page-header-unified">
          <h1 className="page-title-gradient">Oblíbené</h1>
          <p className="page-subtitle">Tvoje oblíbené piny z galerie</p>
        </div>

        {pins.length === 0 ? (
          <div className="empty-favorites">
            <Heart size={64} className="empty-heart" />
            <h2>Zatím nemáš žádné oblíbené piny</h2>
            <p>Začni prozkoumávat galerii a označuj si piny, které se ti líbí!</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {pins.map((pin) => {
              const authorName = pin.author.firstName && pin.author.lastName
                ? `${pin.author.firstName} ${pin.author.lastName}`
                : pin.author.userName
              return (
                <motion.div
                  key={pin.id}
                  className="pin-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openImageModal(pin.imageUrl, pin.title)}
                >
                  <div className="pin-image-wrapper">
                    <img src={pin.imageUrl} alt={pin.title} className="pin-image" />
                    <button
                      className="pin-unlike-btn"
                      onClick={(e) => { e.stopPropagation(); handleUnlike(pin.id) }}
                    >
                      <Heart size={20} fill="white" color="white" />
                    </button>
                  </div>

                  <div className="pin-info">
                    <h3>{pin.title}</h3>
                    {pin.description && <p className="pin-description">{pin.description}</p>}
                    <div className="pin-author">
                      <div className="author-avatar">{authorName.charAt(0).toUpperCase()}</div>
                      <span className="author-name">{authorName}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {imageModal?.show && (
          <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="image-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="image-modal-close" onClick={closeImageModal}><X size={24} color="white" /></button>
              <button className="image-modal-download" onClick={() => downloadImage(imageModal.imageUrl, imageModal.title)}>
                Stáhnout
              </button>
              <img src={imageModal.imageUrl} alt={imageModal.title} className="modal-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function OblibenePage() {
  return (
    <ProtectedRoute>
      <OblibeneContent />
    </ProtectedRoute>
  )
}
