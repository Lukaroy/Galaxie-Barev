"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Plus, X, Trash2, Image as ImageIcon } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import Loading from "@/app/loading"
import ProtectedRoute from '@/app/components/ProtectedRoute'
import { useToast } from '@/app/components/Toast'

type Post = {
  id: number
  title: string
  description: string | null
  imageUrl: string
  createdAt: string
  author: {
    id: string
    userName: string
    firstName?: string | null
    lastName?: string | null
  }
  likes: string[]
}

function GaleriePageContent() {
  const { user } = useAuth()
  const { showToast } = useToast()

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [pinToDelete, setPinToDelete] = useState<number | null>(null)
  const [newPost, setNewPost] = useState({ title: "", description: "", imageUrl: "" })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [imageModal, setImageModal] = useState<{ show: boolean; imageUrl: string; title: string } | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/gallery-pins")
        if (!res.ok) throw new Error("Failed to fetch posts")
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
      setNewPost(prev => ({ ...prev, imageUrl: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      showToast("Musíš být přihlášen/a", "error")
      return
    }
    if (!newPost.title || !newPost.imageUrl) {
      showToast("Vyplň název a obrázek", "warning")
      return
    }

    setUploading(true)
    try {
      const res = await fetch("/api/gallery-pins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPost, authorId: user.uid })
      })
      if (!res.ok) throw new Error("Failed to add post")
      const createdPost = await res.json()
      setPosts([createdPost, ...posts])
      setShowAddModal(false)
      setNewPost({ title: "", description: "", imageUrl: "" })
      setSelectedFile(null)
      setPreviewUrl("")
      showToast("Příspěvek byl úspěšně přidán", "success")
    } catch (err) {
      console.error(err)
      showToast("Nepodařilo se přidat příspěvek", "error")
    } finally {
      setUploading(false)
    }
  }

  const handleDeletePin = (pinId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setPinToDelete(pinId)
    setShowDeleteModal(true)
  }

  const confirmDeletePin = async () => {
    if (pinToDelete === null) return
    
    try {
      const res = await fetch(`/api/gallery-pins/${pinToDelete}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Nepodařilo se smazat příspěvek")
      setPosts(prev => prev.filter(p => p.id !== pinToDelete))
      setPinToDelete(null)
      setShowDeleteModal(false)
      showToast("Příspěvek byl smazán", "success")
    } catch (err: unknown) {
      console.error(err)
      showToast(err instanceof Error ? err.message : "Chyba při mazání", "error")
    }
  }

  const toggleLike = async (pinId: number) => {
    if (!user) {
      showToast("Pro lajkování musíš být přihlášen/a", "warning")
      return
    }
    const pin = posts.find(p => p.id === pinId)
    if (!pin || pin.author.id === user.uid) return

    try {
      const res = await fetch("/api/gallery-pins/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pinId, userId: user.uid })
      })
      if (!res.ok) throw new Error("Failed to toggle like")
      const { liked } = await res.json()
      setPosts(prev =>
        prev.map(p =>
          p.id === pinId
            ? { ...p, likes: liked ? [...p.likes, user.uid] : p.likes.filter(id => id !== user.uid) }
            : p
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.userName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getAuthorName = (author: Post["author"]) =>
    author.firstName && author.lastName ? `${author.firstName} ${author.lastName}` : author.userName

  if (loading) return <Loading />

  return (
    <div className="galerie-page">
      <div className="galerie-container">

        <div className="page-header-unified">
          <h1 className="page-title-gradient">Galerie</h1>
          <p className="page-subtitle">Sdílej své kreativní práce s komunitou</p>
        </div>

        <div className="galerie-toolbar">
          <div className="galerie-search-box">
            <input
              type="text"
              className="galerie-search-input"
              placeholder="Hledat příspěvky..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <motion.button
            className="add-post-button"
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} /> Přidat příspěvek
          </motion.button>
        </div>

        <div className="masonry-grid">
          {filteredPosts.map(post => {
            const isAuthor = user?.uid === post.author.id
            const isLiked = user ? post.likes.includes(user.uid) : false

            return (
              <motion.div key={post.id} className="masonry-item" whileHover={{ scale: 1.02 }}>
                <div
                  className="post-image-wrapper"
                  onClick={() => setImageModal({ show: true, imageUrl: post.imageUrl, title: post.title })}
                >
                  <img src={post.imageUrl} alt={post.title} className="post-image" />

                  {isAuthor && (
                    <div className="delete-button-wrapper">
                      <button
                        className="delete-button"
                        onClick={e => handleDeletePin(post.id, e)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}

                  {user && !isAuthor && (
                    <div className="like-button-wrapper">
                      <button
                        className={`like-button ${isLiked ? "liked" : ""}`}
                        onClick={e => {
                          e.stopPropagation()
                          toggleLike(post.id)
                        }}
                      >
                        <Heart size={20} fill={isLiked ? "white" : "none"} color={isLiked ? "white" : "#ff4444"} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  {post.description && <p className="post-description">{post.description}</p>}
                  <div className="post-author">
                    <div className="author-avatar">{getAuthorName(post.author).charAt(0).toUpperCase()}</div>
                    <span className="author-name">{getAuthorName(post.author)}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredPosts.length === 0 && !loading && (
          <motion.div
            className="moodboard-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ImageIcon size={56} className="moodboard-empty-icon" />
            <h2 className="moodboard-empty-title">Žádné příspěvky</h2>
            <p className="moodboard-empty-subtitle">Zatím tu nic není. Buď první, kdo sdílí svou práci!</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className="modal-title">Přidat příspěvek</h2>
              <form onSubmit={handleAddPost}>
                <input
                  type="text"
                  placeholder="Název příspěvku"
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  className="modal-input"
                />
                <textarea
                  placeholder="Popis (nepovinné)"
                  value={newPost.description}
                  onChange={e => setNewPost({ ...newPost, description: e.target.value })}
                  className="modal-textarea"
                  rows={3}
                />
                <div className="modal-file-upload">
                  <div className="modal-file-dropzone">
                    {previewUrl ? (
                      <div className="modal-file-preview">
                        <img src={previewUrl} alt="Preview" />
                        <button 
                          type="button" 
                          className="modal-file-remove"
                          onClick={() => { setSelectedFile(null); setPreviewUrl(""); setNewPost(prev => ({ ...prev, imageUrl: "" })) }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Plus size={32} className="modal-file-icon" />
                        <span>Klikni pro nahrání obrázku</span>
                        <span className="modal-file-hint">PNG, JPG, GIF do 10MB</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileSelect} />
                  </div>
                </div>
                <div className="modal-buttons">
                  <motion.button 
                    type="button"
                    onClick={() => setShowAddModal(false)} 
                    className="modal-btn-cancel"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    Zrušit
                  </motion.button>
                  <motion.button 
                    type="submit" 
                    className="modal-btn-confirm"
                    disabled={uploading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {uploading ? "Přidávám..." : "Přidat příspěvek"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {imageModal?.show && (
          <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setImageModal(null)}
          >
            <motion.div
              className="image-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="image-modal-close" onClick={() => setImageModal(null)}>
                <X size={24} color="white" />
              </button>
              <img src={imageModal.imageUrl} alt={imageModal.title} className="modal-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
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
              <h2 className="modal-title">Smazat příspěvek?</h2>
              <p className="modal-text">Tato akce je nevratná.</p>
              <div className="modal-buttons modal-buttons-center">
                <motion.button
                  onClick={() => setShowDeleteModal(false)}
                  className="modal-btn-cancel"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  Zrušit
                </motion.button>
                <motion.button
                  onClick={confirmDeletePin}
                  className="modal-btn-delete"
                  whileHover={{ backgroundColor: "#cc0000" }}
                >
                  Smazat
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GaleriePage() {
  return (
    <ProtectedRoute>
      <GaleriePageContent />
    </ProtectedRoute>
  )
}

