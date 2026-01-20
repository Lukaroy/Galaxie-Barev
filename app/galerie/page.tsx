"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Plus, X, Search } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import Loading from "../components/loading"

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

export default function GaleriePage() {
  const { user } = useAuth()

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
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
    if (!user) return alert("Musíš být přihlášen/a")
    if (!newPost.title || !newPost.imageUrl) return alert("Vyplň název a obrázek")

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
    } catch (err) {
      console.error(err)
      alert("Nepodařilo se přidat příspěvek")
    } finally {
      setUploading(false)
    }
  }

const handleDeletePin = async (pinId: number) => {
  console.log("Deleting pinId:", pinId);

  try {
    const res = await fetch(`/api/gallery-pins/${pinId}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Nepodařilo se smazat příspěvek");
    setPosts(prev => prev.filter(p => p.id !== pinId));
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

  const toggleLike = async (pinId: number) => {
    if (!user) return alert("Pro lajkování musíš být přihlášen/a")
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

        {/* HEADER */}
        <div className="galerie-header">
          <div className="galerie-title-section">
            <h1 className="galerie-title">Galerie</h1>
            <p className="galerie-subtitle">Sdílej své kreativní práce s komunitou</p>
          </div>
          <motion.button
            className="add-post-button"
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={22} /> Přidat příspěvek
          </motion.button>
        </div>

        {/* SEARCH */}
        <div className="galerie-search-section">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Hledat..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* POSTS GRID */}
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
                        onClick={e => {
                          e.stopPropagation()
                          handleDeletePin(post.id)
                        }}
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
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="modal-backdrop"
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
              <h2>Přidat příspěvek</h2>
              <form className="add-post-form" onSubmit={handleAddPost}>
                <input
                  type="text"
                  placeholder="Název"
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                  placeholder="Popis"
                  value={newPost.description}
                  onChange={e => setNewPost({ ...newPost, description: e.target.value })}
                />
                <div className="file-input-wrapper">
                  {selectedFile ? selectedFile.name : "Vyber soubor"}
                  <input type="file" accept="image/*" onChange={handleFileSelect} />
                </div>
                {previewUrl && <img src={previewUrl} className="preview-image" alt="Preview" />}
                <button type="submit" disabled={uploading}>
                  {uploading ? "Přidávám..." : "Přidat"}
                </button>
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
    </div>
  )
}
