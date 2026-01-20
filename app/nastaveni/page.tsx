"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/app/components/ProtectedRoute"
import Loading from "../components/loading"
import Alert from "../components/alert"
import { User, Mail, Lock, Trash2, Save } from "lucide-react"
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth"
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
      if (err.code === "auth/wrong-password") setError("Nesprávné současné heslo")
      else if (err.code === "auth/weak-password") setError("Nové heslo je příliš slabé")
      else setError("Nepodařilo se změnit heslo")
    } finally {
      setSaving(false)
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
      if (err.code === "auth/wrong-password") setError("Nesprávné heslo")
      else setError("Nepodařilo se smazat účet")
      setSaving(false)
    }
  }

  return (
    <div className="profil-page">
      <div className="profil-container">
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
          <h3>
            <Lock size={20} /> Změna hesla
          </h3>
          <form onSubmit={handlePasswordChange}>
            <div className="form-row">
              <div className="form-field">
                <label>Současné heslo</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Nové heslo</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Potvrdit nové heslo</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-save" type="submit" disabled={saving}>
                <Save size={16} /> {saving ? "Ukládám..." : "Změnit heslo"}
              </button>
            </div>
          </form>
        </div>

        <div className="profile-form">
          <h3 style={{ color: "#ff6b6b" }}>
            <Trash2 size={20} /> Nebezpečná zóna
          </h3>
          {!showDeleteConfirm ? (
            <button
              className="btn-cancel"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Smazat účet
            </button>
          ) : (
            <div className="form-field">
              <input
                type="password"
                placeholder="Zadej heslo pro potvrzení"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
              <div className="form-actions">
                <button
                  className="btn-save"
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
  )
}

export default function NastaveniPage() {
  return (
    <ProtectedRoute>
      <NastaveniContent />
    </ProtectedRoute>
  )
}
