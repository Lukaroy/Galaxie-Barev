import { useEffect, useState } from "react"
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import { auth } from "../lib/firebase"

export type AppUser = {
  uid: string
  email: string | null
  displayName: string | null
  role: "USER" | "ADMIN"
  firstName?: string | null
  lastName?: string | null
  userName?: string
}

export const useAuth = () => {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: FirebaseUser | null) => {
      if (!currentUser) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        let res = await fetch(`/api/users/${currentUser.uid}`)
        
        // If user doesn't exist in DB (404), sync them first
        if (res.status === 404) {
          const syncRes = await fetch('/api/internal/sync-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: currentUser.uid,
              email: currentUser.email,
              firstName: currentUser.displayName?.split(' ')[0] || '',
              lastName: currentUser.displayName?.split(' ').slice(1).join(' ') || '',
            })
          })
          
          if (syncRes.ok) {
            res = await fetch(`/api/users/${currentUser.uid}`)
          }
        }
        
        if (!res.ok) throw new Error("Failed to fetch profile")
        const data = await res.json()

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          role: data.role,
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.userName,
        })
      } catch (err) {
        console.error("Failed to fetch user profile", err)
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          role: "USER",
        })
      } finally {
        setLoading(false)
      }
    })

    // Správně: konec funkce s return
    return () => unsubscribe()
  }, [])

  return { user, loading }
}
