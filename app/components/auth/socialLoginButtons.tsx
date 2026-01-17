"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    } catch (err: any) {
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
    } catch (err: any) {
      onError(handleAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="social-login">
      <button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Načítám..." : "Google"}
      </button>
      <button onClick={handleAppleLogin} disabled={loading}>
        {loading ? "Načítám..." : "Apple"}
      </button>
    </div>
  )
}
