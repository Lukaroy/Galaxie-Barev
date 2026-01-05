"use client"

import { useAuth } from "@/lib/useAuth"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"

type ProfileData = {
  firstName?: string
  lastName?: string
  email?: string
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/prihlaseni")
    }

    if (user) {
      loadProfile()
    }
  }, [user, loading])

  const loadProfile = async () => {
    if (!user) return

    const ref = doc(db, "users", user.uid)
    const snap = await getDoc(ref)

    if (snap.exists()) {
      setProfile(snap.data())
    } else {
      setProfile({ email: user.email || "" })
    }
  }

  if (loading) return <p>Načítám…</p>
  if (!user) return null

  return (
    <div style={{ maxWidth: 500, margin: "50px auto" }}>
      <h1>Můj profil</h1>

      <p><b>Email:</b> {user.email}</p>
      <p><b>UID:</b> {user.uid}</p>
    </div>
  )
}
