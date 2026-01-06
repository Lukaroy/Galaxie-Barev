"use client"

import { useState } from "react"
import { loginUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { loginWithGoogle } from "@/lib/auth"

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await loginUser(email, password)
      router.push("/")
    } catch (err: any) {
      setError("Nesprávný email nebo heslo")
    }
  }

  return (
    <div className="login-container">
      <h2>Ahoj! <span>Vítej zpátky!</span></h2>

      <p className="signup-link">
        Nemáš účet? <a href="/registrace">Vytvořit si nový!</a>
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          autoComplete="on"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Tvoje heslo"
          required
          value={password}
          autoComplete="on"
          onChange={e => setPassword(e.target.value)}
        />

        <a href="/reset-hesla" className="forgot-password">
          Zapomněl si heslo?
        </a>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-button">
          Přihlásit se
        </button>

        <div className="divider">
          <span>nebo se přihlaš pomocí</span>
        </div>
      </form>

      <div className="social-login">
        <button className="google">Google</button>
        <button className="apple">Apple</button>
      </div>
    </div>
  )
}
