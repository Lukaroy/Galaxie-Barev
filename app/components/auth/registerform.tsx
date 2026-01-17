"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/lib/auth"
import { isValidEmail, isValidName } from "@/lib/validator"
import { handleAuthError } from "@/lib/errorHandling"
import Alert from "../alert"
import SocialLoginButtons from "./socialLoginButtons"
import Loading from "../loading"

export default function RegisterForm() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{
    strength: string
    color: string
    tips: string
  }>({ strength: "", color: "", tips: "" })
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  })

  // Funkce pro kontrolu síly hesla s lepším feedbackem
  const checkPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) {
      setPasswordStrength({ strength: "", color: "", tips: "" })
      return
    }
    
    let strength = 0
    const tips: string[] = []
    
    if (pwd.length >= 8) {
      strength++
    } else {
      tips.push("aspoň 8 znaků")
    }
    
    if (pwd.length >= 12) strength++
    
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) {
      strength++
    } else {
      tips.push("velká i malá písmena")
    }
    
    if (/\d/.test(pwd)) {
      strength++
    } else {
      tips.push("čísla")
    }
    
    if (/[^a-zA-Z0-9]/.test(pwd)) {
      strength++
    } else {
      tips.push("speciální znak")
    }

    if (strength <= 2) {
      setPasswordStrength({ 
        strength: "Slabé 😟", 
        color: "#ff4444",
        tips: tips.length > 0 ? `Zkus přidat: ${tips.join(", ")}` : ""
      })
    } else if (strength <= 3) {
      setPasswordStrength({ 
        strength: "Střední 😐", 
        color: "#ffaa00",
        tips: tips.length > 0 ? `Ještě: ${tips.join(", ")}` : ""
      })
    } else {
      setPasswordStrength({ 
        strength: "Silné 😎", 
        color: "#00cc44",
        tips: "Super! Tohle je dobré heslo."
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Vylepšená validace s lepším feedbackem
    const trimmedFirstName = firstName.trim()
    const trimmedLastName = lastName.trim()
    
    if (!trimmedFirstName || !trimmedLastName) {
      setError("Vypln celé jméno, prosím")
      return
    }
    
    if (!isValidName(trimmedFirstName)) {
      setError("Jméno může obsahovat jen písmena")
      return
    }
    
    if (!isValidName(trimmedLastName)) {
      setError("Příjmení může obsahovat jen písmena")
      return
    }

    if (!isValidEmail(email)) {
      setError("Tohle nevypadá jako platný email")
      return
    }

    if (password.length < 6) {
      setError("Heslo musí mít minimálně 6 znaků")
      return
    }
    
    if (password.length < 8) {
      setError("Pro lepší zabezpečení doporučujeme aspoň 8 znaků")
      return
    }

    setLoading(true)

    try {
      await registerUser(trimmedFirstName, trimmedLastName, email, password)
      // Přesměrování po úspěšné registraci
      router.push("/")
    } catch (err: any) {
      const errorMsg = handleAuthError(err)
      // Zlepšení chybových zpráv
      if (errorMsg.includes("email-already-in-use")) {
        setError("Tento email se už používá. Zkus se spíš přihlásit?")
      } else if (errorMsg.includes("weak-password")) {
        setError("Tohle heslo je moc slabé. Zkus silnejší kombinaci.")
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
    <div className="register-container">
      <h2>
        ZAČNI DNES!
        <span>Vytvořit si nový účet.</span>
      </h2>

      <p className="signup-link">
        Máš již založený účet? <a href="/prihlaseni">Přihlásit se!</a>
      </p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="name-row">
          <input
            type="text"
            placeholder="Jméno"
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value)
              if (touched.firstName && error) setError("")
            }}
            onBlur={() => setTouched({...touched, firstName: true})}
            required
          />
          <input
            type="text"
            placeholder="Příjmení"
            value={lastName}
            onChange={e => {
              setLastName(e.target.value)
              if (touched.lastName && error) setError("")
            }}
            onBlur={() => setTouched({...touched, lastName: true})}
            required
          />
        </div>

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
          required
        />
        
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Zadej tvoje heslo"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              checkPasswordStrength(e.target.value)
            }}
            required
            minLength={6}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms" className="terms">
            souhlasit s podmínkami <a href="/terms">Terms & Conditions</a>
          </label>
        </div>

        {error && <Alert message={error} />}

        <button type="submit" className="register-button">
          Vytvořit účet
        </button>
      </form>

      <div className="divider">
        <span>nebo se registruj s</span>
      </div>

      <SocialLoginButtons onError={setError} />
    </div>
  )
}
