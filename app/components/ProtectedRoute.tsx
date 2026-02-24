"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import Loading from "@/app/loading"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/prihlaseni")
    }
  }, [user, loading, router])

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
