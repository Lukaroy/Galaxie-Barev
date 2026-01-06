"use client"

import { useState } from "react"
import { registerUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { loginWithGoogle } from "@/lib/auth"

export default function RegisterForm() {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await registerUser(email, password)
      router.push("/")
    } catch (err: any) {
  console.error(err)
  setError(err.message)
}
  }

  return (
    <div className="register-container">
      <h2>Začni dnes! <span>Vytvořit si nový účet!</span></h2>

      <p className="signup-link">
        Máš již založený účet? <a href="/prihlaseni">Přihlásit se!</a>
      </p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="name-row">
          <input
            type="text"
            placeholder="Jméno"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Příjmení"
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          required
          className="full-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Tvoje heslo"
          required
          className="full-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label className="terms">
          <input type="checkbox" required /> Souhlasím s podmínkami{" "}
          <a href="/terms">Terms and Conditions</a>
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="register-button">
          Vytvořit účet
        </button>

        <div className="divider">
          <span>nebo se registruj pomocí</span>
        </div>
      </form>

      <div className="social-login">
        <button className="google">Google</button>
        <button className="apple">Apple</button>
      </div>
    </div>
  )
}
