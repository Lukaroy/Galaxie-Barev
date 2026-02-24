"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loginUser } from "@/lib/auth"
import { handleAuthError } from "@/lib/errorHandling"
import Alert from "../alert"
import SocialLoginButtons from "./socialLoginButtons"
import Loading from "@/app/loading"
import { Eye, EyeOff } from "lucide-react"


export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Registrace byla úspěšná! Nyní se můžeš přihlásit.")
    }
  }, [searchParams])

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email.trim()) {
      setError("Zadej svůj email")
      return
    }
    
    if (!isEmailValid(email)) {
      setError("Tohle nevypadá jako platný email")
      return
    }
    
    if (!password || password.length < 8) {
      setError("Heslo musí mít aspoň 8 znaků")
      return
    }
    
    setLoading(true)

    try {
      await loginUser(email, password)
      router.push("/")
    } catch (err: any) {
      const errorMsg = handleAuthError(err)
      if (errorMsg.includes("user-not-found") || errorMsg.includes("wrong-password")) {
        setError("Neplatný email nebo heslo. Zkontroluj údaje a zkus to znovu.")
      } else if (errorMsg.includes("too-many-requests")) {
        setError("Příliš mnoho pokusů. Zkus to za chvíli.")
      } else {
        setError(errorMsg)
      }
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="login-container">
      <h2>
        Ahoj!
        <span>Vítej zpátky!</span>
      </h2>

      <p className="signup-link">
        Nemáš účet? <a href="/registrace">Vytvořit si nový!</a>
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={e => {
            setEmail(e.target.value)
            if (touched.email && error) setError("")
          }}
          onBlur={() => setTouched({...touched, email: true})}
          className={touched.email && email && !isEmailValid(email) ? "input-warning" : ""}
        />

        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Tvoje heslo"
            value={password}
            autoComplete="current-password"
            onChange={e => {
              setPassword(e.target.value)
              if (touched.password && error) setError("")
            }}
            onBlur={() => setTouched({...touched, password: true})}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <a href="/zapomenute-heslo" className="forgot-password">
          Zapomněl si heslo?
        </a>

        {success && <Alert message={success} type="success" />}
        {error && <Alert message={error} />}

        <button type="submit" className="login-button">
          Přihlásit se
        </button>
      </form>

      <div className="divider">
        <span>nebo se přihlásit s</span>
      </div>

      <SocialLoginButtons onError={setError} />
    </div>
  )
}
