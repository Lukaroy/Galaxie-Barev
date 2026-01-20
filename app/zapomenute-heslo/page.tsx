"use client"

import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Alert from "../components/alert"
import Loading from "../components/loading"
import { ArrowLeft } from "lucide-react"

export default function ZapomenuteHesloPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email.trim()) {
      setError("Zadej svůj email")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Zadej platný email")
      return
    }

    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess("Link pro obnovení hesla byl odeslán na tvůj email!")
      setEmail("")
    } catch (err: any) {
      console.error("Password reset error:", err)
      if (err.code === "auth/user-not-found") {
        setError("Uživatel s tímto emailem neexistuje")
      } else if (err.code === "auth/too-many-requests") {
        setError("Příliš mnoho pokusů. Zkus to později.")
      } else {
        setError("Nepodařilo se odeslat email. Zkus to znovu.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="login-container">
      <button
        onClick={() => router.push("/prihlaseni")}
        style={{
          background: "transparent",
          border: "none",
          color: "rgba(255, 255, 255, 0.7)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.95rem",
          transition: "color 0.2s",
          padding: 0
        }}
      >
        <ArrowLeft size={20} />
        Zpět
      </button>

      <h2>
        Zapomněl si heslo?
        <span>Obnovíme ho.</span>
      </h2>
      <p className="signup-link">
        Zadej svůj email a pošleme ti link pro obnovení hesla.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {success && <Alert message={success} type="success" />}
        {error && <Alert message={error} />}

        <button type="submit" className="login-button">
          Obnovit heslo
        </button>
      </form>

      <p className="signup-link" style={{ marginTop: "1.5rem" }}>
        Vzpomněl sis? <a href="/prihlaseni">Přihlásit se!</a>
      </p>
    </div>
  )
}
