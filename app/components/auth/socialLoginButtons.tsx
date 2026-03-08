"use client"

// Tlačítka pro přihlášení přes sociální sítě (Google, Apple)

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { loginWithGoogle, loginWithApple } from "@/lib/auth"
import { handleAuthError } from "@/lib/errorHandling"

interface SocialLoginButtonsProps {
  onError: (message: string) => void
}

export default function SocialLoginButtons({ onError }: SocialLoginButtonsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      router.push("/")
    } catch (err: unknown) {
      onError(handleAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  const handleAppleLogin = async () => {
    setLoading(true)
    try {
      await loginWithApple()
      router.push("/")
    } catch (err: unknown) {
      onError(handleAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="social-login">
      <button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? ("Načítám...") : (<><Image src="/google.svg" width={20} height={20} alt="Google" />Google</>)}
      </button>
      <button onClick={handleAppleLogin} disabled={loading}>
        {loading ? ("Načítám...") : (<><Image src="/apple.svg" width={20} height={20} alt="Apple" />Apple</>)}
      </button>
    </div>
  )
}
