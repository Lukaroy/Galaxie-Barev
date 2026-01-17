"use client"

import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Loading from "../components/loading"
import { motion, AnimatePresence } from "framer-motion"

type UserProfile = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  userName: string
  role: string
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // Editační stav
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    userName: ""
  })
  
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [usernameHint, setUsernameHint] = useState("")
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/prihlaseni")
    }

    if (user) {
      loadProfile()
    }
  }, [user, authLoading])

  const loadProfile = async () => {
    if (!user) return
    
    try {
      const response = await fetch(`/api/users/${user.uid}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setEditData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          userName: data.userName || ""
        })
      } else {
        // Někdy API vrátí chybu - zobrazíme upozornění
        setError("Nepodařilo se načíst profil. Zkus stránku obnovit.")
      }
    } catch (err) {
      console.error("Failed to load profile:", err)
      setError("Něco se pokazilo při načítání profilu. Zkontroluj připojení.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user || !profile) return
    
    setError("")
    setSuccess("")
    setSaving(true)

    // Validace vstupu
    const trimmedUsername = editData.userName.trim()
    
    if (!trimmedUsername) {
      setError("Hele, uživatelské jméno nemůže být prázdné")
      setSaving(false)
      return
    }

    if (trimmedUsername.length < 3) {
      setError("Uživatelské jméno je moc krátké (minimálně 3 znaky)")
      setSaving(false)
      return
    }
    
    if (trimmedUsername.length > 32) {
      setError("Uživatelské jméno je moc dlouhé (maximálně 32 znaků)")
      setSaving(false)
      return
    }

    if (!/^[a-z0-9_.-]+$/.test(trimmedUsername)) {
      setError("Použij jen malá písmena, čísla a znaky _ . -")
      setSaving(false)
      return
    }
    
    // Kontrola speciálních případů
    if (trimmedUsername.startsWith('.') || trimmedUsername.startsWith('-')) {
      setError("Uživatelské jméno nemůže začínat tečkou nebo pomlčkou")
      setSaving(false)
      return
    }

    try {
      const response = await fetch(`/api/users/${user.uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update profile')
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      setEditing(false)
      setIsDirty(false)
      setSuccess("Super! Profil je aktualizovaný 🎉")
      
      // Aktualizace Firebase display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${editData.firstName} ${editData.lastName}`.trim() || editData.userName
        })
      }
      
      // Automatické schování success zprávy po 3 sekundách
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      const errorMsg = err.message || "Nepodařilo se aktualizovat profil"
      setError(errorMsg.includes("username") && errorMsg.includes("taken") 
        ? "Tohle uživatelské jméno už někdo používá, zkus jiné" 
        : errorMsg)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setEditData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        userName: profile.userName || ""
      })
    }
    setEditing(false)
    setError("")
    setSuccess("")
    setUsernameHint("")
    setIsDirty(false)
  }
  
  const validateUsername = (username: string) => {
    setIsDirty(true)
    
    if (!username) {
      setUsernameHint("")
      return
    }
    
    if (username.length < 3) {
      setUsernameHint("Ještě " + (3 - username.length) + " znaky")
      return
    }
    
    if (!/^[a-z0-9_.-]+$/.test(username)) {
      setUsernameHint("⚠️ Nepovolené znaky")
      return
    }
    
    if (username.startsWith('.') || username.startsWith('-')) {
      setUsernameHint("⚠️ Nemůže začínat . nebo -")
      return
    }
    
    setUsernameHint("✓ Vypadá dobře")
  }

  if (authLoading || loading) return <Loading />
  if (!user || !profile) return null

  return (
    <div className="profil-page">
      <div className="profil-container">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {profile.firstName?.[0] || profile.userName[0]}
          </div>
          <div className="profile-info">
            <h3>{profile.firstName} {profile.lastName}</h3>
            <p className="username">@{profile.userName}</p>
            <span className="role-badge">
              {profile.role === 'ADMIN' ? '👑 Admin' : profile.role === 'MODERATOR' ? '⭐ Moderátor' : '✨ Uživatel'}
            </span>
          </div>
        </div>

        {success && (
          <div className="alert-success">
            ✓ {success}
          </div>
        )}
        
        {error && (
          <div className="alert-error">
            ⚠ {error}
          </div>
        )}

        <div className="profile-form">
          <div className="form-row">
            <div className="form-field">
              <label>Uživatelské jméno</label>
              {editing ? (
                <div>
                  <input
                    type="text"
                    value={editData.userName}
                    onChange={e => {
                      const newUsername = e.target.value.toLowerCase()
                      setEditData({...editData, userName: newUsername})
                      validateUsername(newUsername)
                    }}
                    placeholder="uzivatelske_jmeno"
                    maxLength={32}
                  />
                  {usernameHint && isDirty && (
                    <small className="field-hint">{usernameHint}</small>
                  )}
                </div>
              ) : (
                <div className="field-value">@{profile.userName}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Jméno</label>
              {editing ? (
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={e => setEditData({...editData, firstName: e.target.value})}
                  placeholder="Tvoje jméno"
                />
              ) : (
                <div className="field-value">{profile.firstName || "-"}</div>
              )}
            </div>

            <div className="form-field">
              <label>Příjmení</label>
              {editing ? (
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={e => setEditData({...editData, lastName: e.target.value})}
                  placeholder="Tvoje příjmení"
                />
              ) : (
                <div className="field-value">{profile.lastName || "-"}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Email</label>
              <div className="field-value locked">{profile.email}</div>
              <small className="field-hint">Email nelze změnit</small>
            </div>
          </div>

          <div className="form-actions">
            {editing ? (
              <>
                <button 
                  onClick={handleSave} 
                  className="btn-save"
                  disabled={saving}
                >
                  {saving ? "Ukládám..." : "💾 Uložit změny"}
                </button>
                <button 
                  onClick={handleCancel} 
                  className="btn-cancel"
                  disabled={saving}
                >
                  Zrušit
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="btn-edit">
                ✏️ Upravit profil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
