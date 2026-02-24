"use client"

import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Loading from "@/app/loading"
import { isValidName } from "@/lib/validator"
import { handleApiError, handleAuthError } from "@/lib/errorHandling"

type HintType = "error" | "success" | "info"

type UserProfile = {
  id: string
  email: string | null
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

  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    userName: ""
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isDirty, setIsDirty] = useState(false)

  const [usernameHint, setUsernameHint] = useState("")
  const [usernameHintType, setUsernameHintType] = useState<HintType>("info")

  const [firstNameHint, setFirstNameHint] = useState("")
  const [firstNameHintType, setFirstNameHintType] = useState<HintType>("info")

  const [lastNameHint, setLastNameHint] = useState("")
  const [lastNameHintType, setLastNameHintType] = useState<HintType>("info")


  useEffect(() => {
    if (!authLoading && !user) router.push("/prihlaseni")
    if (user) loadProfile()
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
        setError("Nepodařilo se načíst profil. Zkus stránku obnovit.")
      }
    } catch (err) {
      setError("Něco se pokazilo při načítání profilu. Zkontroluj připojení.")
    } finally {
      setLoading(false)
    }
  }


  const validateUsername = (username: string) => {
    setIsDirty(true)

    if (!username) {
      setUsernameHint("")
      setUsernameHintType("info")
      return
    }

    if (username.length < 3) {
      setUsernameHint(`Ještě ${3 - username.length} znaky`)
      setUsernameHintType("info")
      return
    }

    if (username.length >= 12) {
      setUsernameHint("Uživatelské jméno je moc dlouhé")
      setUsernameHintType("error")
      return
    }

    if (!/^[a-z0-9_.-]+$/.test(username)) {
      setUsernameHint("Použij jen malá písmena, čísla a znaky _ . -")
      setUsernameHintType("error")
      return
    }

    if (username.startsWith(".") || username.startsWith("-")) {
      setUsernameHint("Uživatelské jméno nemůže začínat tečkou nebo pomlčkou")
      setUsernameHintType("error")
      return
    }

    setUsernameHint("✓ Vypadá dobře")
    setUsernameHintType("success")
  }

  const validateName = (
    name: string,
    setHint: (v: string) => void,
    setHintType: (v: HintType) => void,
    label: string
  ) => {
    setIsDirty(true)

    if (!name) {
      setHint("")
      setHintType("info")
      return
    }

    if (!isValidName(name)) {
      setHint(`${label} může obsahovat jen písmena`)
      setHintType("error")
      return
    }

    if (name.length < 3) {
      setHint(`Ještě ${3 - name.length} znaky`)
      setHintType("info")
      return
    }

    if (name.length > 20) {
      setHint(`${label} je moc dlouhé`)
      setHintType("error")
      return
    }

    setHint("✓ Vypadá dobře")
    setHintType("success")
  }


  const handleSave = async () => {
    if (!user || !profile) return

    setError("")
    setSuccess("")
    setSaving(true)

    const trimmedUsername = editData.userName.trim()
    const trimmedFirstName = editData.firstName.trim()
    const trimmedLastName = editData.lastName.trim()

    if (!trimmedUsername) {
      setError("Uživatelské jméno nemůže být prázdné")
      setSaving(false)
      return
    }

    if (trimmedUsername.length < 3) {
      setError("Uživatelské jméno je moc krátké")
      setSaving(false)
      return
    }

    if (trimmedUsername.length >= 12) {
      setError("Uživatelské jméno je moc dlouhé")
      setSaving(false)
      return
    }

    if (!/^[a-z0-9_.-]+$/.test(trimmedUsername)) {
      setError("Použij jen malá písmena, čísla a znaky _ . -")
      setSaving(false)
      return
    }

    if (trimmedUsername.startsWith(".") || trimmedUsername.startsWith("-")) {
      setError("Uživatelské jméno nemůže začínat tečkou nebo pomlčkou")
      setSaving(false)
      return
    }

    if (!isValidName(trimmedFirstName)) {
      setError("Jméno může obsahovat jen písmena")
      setSaving(false)
      return
    }

    if (trimmedFirstName.length < 3) {
      setError("Vaše jméno je moc krátké")
      setSaving(false)
      return
    }

    if (trimmedFirstName.length > 20) {
      setError("Vaše jméno je moc dlouhé")
      setSaving(false)
      return
    }

    if (!isValidName(trimmedLastName)) {
      setError("Příjmení může obsahovat jen písmena")
      setSaving(false)
      return
    }

    if (trimmedLastName.length < 3) {
      setError("Vaše příjmení je moc krátké")
      setSaving(false)
      return
    }

    if (trimmedLastName.length > 20) {
      setError("Vaše příjmení je moc dlouhé")
      setSaving(false)
      return
    }

    try {
      const response = await fetch(`/api/users/${user.uid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update profile")
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      setEditing(false)
      setIsDirty(false)
      setSuccess("Super! Profil je aktualizovaný")

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName:
            `${editData.firstName} ${editData.lastName}`.trim() ||
            editData.userName
        })
      }

      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      const message = err.code?.startsWith("auth/")
        ? handleAuthError(err)
        : handleApiError(err)
      setError(message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (!profile) return

    setEditData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      userName: profile.userName || ""
    })

    setEditing(false)
    setIsDirty(false)

    setUsernameHint("")
    setFirstNameHint("")
    setLastNameHint("")

    setUsernameHintType("info")
    setFirstNameHintType("info")
    setLastNameHintType("info")

    setError("")
    setSuccess("")
  }


  if (authLoading || loading) return <Loading />
  if (!user || !profile) return null

  return (
    <div className="profil-page">
      <div className="profil-container">

        <div className="page-header-unified">
          <h1 className="page-title-gradient">Tvůj profil</h1>
          <p className="page-subtitle">Upravuj své údaje</p>
        </div>

        <div className="profile-header">
          <div className="profile-avatar-large">
            {profile.firstName?.[0] || profile.userName[0]}
          </div>
          <div className="profile-info">
            <h3>{profile.firstName} {profile.lastName}</h3>
            <p className="username">@{profile.userName}</p>
            <span className="role-badge">
              {profile.role === "ADMIN" ? "Admin" : "Uživatel"}
            </span>
          </div>
        </div>

        {success && <div className="alert-success">{success}</div>}
        {error && <div className="alert-error">{error}</div>}

        <div className="profile-form">

          <div className="form-field">
            <label>Uživatelské jméno</label>
            {editing ? (
              <>
                <input
                  value={editData.userName}
                  onChange={e => {
                    const v = e.target.value.toLowerCase()
                    setEditData({ ...editData, userName: v })
                    validateUsername(v)
                  }}
                  maxLength={12}
                />
                {usernameHint && isDirty && (
                  <div className={`field-hint ${usernameHintType}`}>
                    {usernameHint}
                  </div>
                )}
              </>
            ) : (
              <div className="field-value">@{profile.userName}</div>
            )}
          </div>

          <div className="form-field">
            <label>Jméno</label>
            {editing ? (
              <>
                <input
                  value={editData.firstName}
                  onChange={e => {
                    setEditData({ ...editData, firstName: e.target.value })
                    validateName(
                      e.target.value,
                      setFirstNameHint,
                      setFirstNameHintType,
                      "Jméno"
                    )
                  }}
                  maxLength={21}
                />
                {firstNameHint && isDirty && (
                  <div className={`field-hint ${firstNameHintType}`}>
                    {firstNameHint}
                  </div>
                )}
              </>
            ) : (
              <div className="field-value">{profile.firstName || "-"}</div>
            )}
          </div>

          <div className="form-field">
            <label>Příjmení</label>
            {editing ? (
              <>
                <input
                  value={editData.lastName}
                  onChange={e => {
                    setEditData({ ...editData, lastName: e.target.value })
                    validateName(
                      e.target.value,
                      setLastNameHint,
                      setLastNameHintType,
                      "Příjmení"
                    )
                  }}
                  maxLength={21}
                />
                {lastNameHint && isDirty && (
                  <div className={`field-hint ${lastNameHintType}`}>
                    {lastNameHint}
                  </div>
                )}
              </>
            ) : (
              <div className="field-value">{profile.lastName || "-"}</div>
            )}
          </div>

          <div className="form-field">
            <label>Email</label>
            <div className="field-value locked">{profile.email}</div>
            <small className="field-hint info">Email nelze změnit</small>
          </div>

          <div className="form-actions">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn-save"
                  disabled={saving}
                >
                  {saving ? "Ukládám..." : "Uložit změny"}
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
              <button
                onClick={() => setEditing(true)}
                className="btn-edit"
              >
                Upravit profil
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
