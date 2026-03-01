"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/app/components/ProtectedRoute"
import Loading from "@/app/loading"
import Alert from "../components/alert"
import { User, Mail, Lock, Trash2, Save, Eye, EyeOff, ShieldAlert } from "lucide-react"
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"

function NastaveniContent() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")  
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [saving, setSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showDeletePw, setShowDeletePw] = useState(false)

  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [resetEmailLoading, setResetEmailLoading] = useState(false)

  if (authLoading) return <Loading />

  if (!user) {
    router.push("/prihlaseni")
    return null
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Vyplň všechna pole")
      return
    }

    if (newPassword.length < 8) {
      setError("Nové heslo musí mít alespoň 8 znaků")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Hesla se neshodují")
      return
    }

    setSaving(true)

    try {
      const firebaseUser = auth.currentUser
      if (!firebaseUser || !firebaseUser.email) throw new Error("Uživatel nenalezen")

      const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword)
      await reauthenticateWithCredential(firebaseUser, credential)
      await updatePassword(firebaseUser, newPassword)

      setSuccess("Heslo bylo úspěšně změněno")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      console.error(err)
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") setError("Nesprávné současné heslo")
      else if (err.code === "auth/weak-password") setError("Nové heslo je příliš slabé")
      else setError("Nepodařilo se změnit heslo")
    } finally {
      setSaving(false)
    }
  }

  const handleSendResetEmail = async () => {
    if (!user?.email) return
    setResetEmailLoading(true)
    setError("")
    setSuccess("")
    try {
      await sendPasswordResetEmail(auth, user.email)
      setResetEmailSent(true)
      setSuccess(`Na ${user.email} byl odeslán odkaz pro obnovení hesla.`)
    } catch (err: any) {
      console.error(err)
      if (err.code === "auth/too-many-requests") setError("Příliš mnoho pokusů. Zkus to později.")
      else setError("Nepodařilo se odeslat email. Zkus to znovu.")
    } finally {
      setResetEmailLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setError("")

    if (!deletePassword) {
      setError("Zadej heslo pro potvrzení")
      return
    }

    setSaving(true)

    try {
      const firebaseUser = auth.currentUser
      if (!firebaseUser || !firebaseUser.email) throw new Error("Uživatel nenalezen")

      const credential = EmailAuthProvider.credential(firebaseUser.email, deletePassword)
      await reauthenticateWithCredential(firebaseUser, credential)
      await deleteUser(firebaseUser)

      router.push("/")
    } catch (err: any) {
      console.error(err)
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") setError("Nesprávné heslo")
      else setError("Nepodařilo se smazat účet")
      setSaving(false)
    }
  }

  return (
    <div className="profil-page">
      <div className="profil-container">

        <div className="page-header-unified">
          <h1 className="page-title-gradient">Nastavení</h1>
          <p className="page-subtitle">Spravuj své heslo a účet</p>
        </div>

        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <div className="profile-header">
          <div className="profile-avatar-large">
            <User size={30} />
          </div>
          <div className="profile-info">
            <h3>{user.displayName || user.email}</h3>
            <p className="username">
              <Mail size={16} /> {user.email}
            </p>
          </div>
        </div>

        <div className="profile-form">
          <h3 className="settings-section-heading">
            <Lock size={18} /> Změna hesla
          </h3>
          <p className="settings-section-desc">Zadej současné heslo a zvol si nové</p>
          <form onSubmit={handlePasswordChange}>
            <div className="form-row">
              <div className="form-field">
                <label>Současné heslo</label>
                <div className="pw-input-wrapper">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button type="button" className="pw-toggle-btn" onClick={() => setShowCurrent(v => !v)}>
                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="form-field">
                <label>Nové heslo</label>
                <div className="pw-input-wrapper">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button type="button" className="pw-toggle-btn" onClick={() => setShowNew(v => !v)}>
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="form-field">
                <label>Potvrdit nové heslo</label>
                <div className="pw-input-wrapper">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button type="button" className="pw-toggle-btn" onClick={() => setShowConfirm(v => !v)}>
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-save" type="submit" disabled={saving}>
                <Save size={16} /> {saving ? "Ukládám..." : "Změnit heslo"}
              </button>
            </div>
          </form>

          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-color, rgba(255,255,255,0.08))" }}>
            <p className="settings-section-desc">
              Nebo pošli si odkaz pro obnovení hesla na <strong>{user.email}</strong>
            </p>
            <button
              type="button"
              className="btn-save"
              style={{ marginTop: "0.5rem" }}
              onClick={handleSendResetEmail}
              disabled={resetEmailLoading || resetEmailSent}
            >
              <Mail size={16} /> {resetEmailSent ? "Email odeslán ✓" : resetEmailLoading ? "Odesílám..." : "Zaslat reset hesla emailem"}
            </button>
          </div>
        </div>

        <div className="profile-form danger-zone-card">
          <h3 className="danger-heading">
            <ShieldAlert size={18} /> Nebezpečná zóna
          </h3>
          <p className="settings-section-desc">Nenávratné akce týkající se tvého účtu</p>

          <div className="danger-zone-content">
            {!showDeleteConfirm ? (
              <>
                <p className="danger-zone-text">Smazáním účtu přijdeš o všechna svá data, moodboardy a nastavení. Tato akce je nevratná.</p>
                <button
                  className="btn-danger"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 size={15} /> Smazat účet
                </button>
              </>
            ) : (
              <div className="form-field">
                <label>Potvrď heslem</label>
                <div className="pw-input-wrapper">
                  <input
                    type={showDeletePw ? "text" : "password"}
                    placeholder="Zadej heslo pro potvrzení"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                  />
                  <button type="button" className="pw-toggle-btn" onClick={() => setShowDeletePw(v => !v)}>
                    {showDeletePw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <div className="form-actions">
                  <button
                    className="btn-danger"
                    onClick={handleDeleteAccount}
                    disabled={saving}
                  >
                    {saving ? "Mazání..." : "Ano, smazat účet"}
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setDeletePassword("")
                    }}
                  >
                    Zrušit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NastaveniPage() {
  return (
    <ProtectedRoute>
      <NastaveniContent />
    </ProtectedRoute>
  )
}
