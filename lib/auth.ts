import { auth } from "./firebase"
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { isValidPassword } from "./validator"

// Registrace s jménem a příjmením
export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  if (!isValidPassword(password))
    throw new Error(
      "Heslo musí mít alespoň 8 znaků, velké písmeno, číslo a speciální znak."
    )

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  // Uložíme uživatele do Prisma databáze
  await syncUserToPrisma(userCredential.user.uid, {
    email,
    firstName,
    lastName,
  })

  return userCredential.user
}

// Login
export const loginUser = async (email: string, password: string) =>
  (await signInWithEmailAndPassword(auth, email, password)).user

// Google login
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)

  // Zjistíme jméno a příjmení z Google OAuth
  const firstName = result.user.displayName?.split(" ")[0] || ""
  const lastName = result.user.displayName?.split(" ").slice(1).join(" ") || ""

  await syncUserToPrisma(result.user.uid, {
    email: result.user.email!,
    firstName,
    lastName,
  })

  return result.user
}

// Apple login
export const loginWithApple = async () => {
  const provider = new OAuthProvider("apple.com")
  const result = await signInWithPopup(auth, provider)

  const firstName = result.user.displayName?.split(" ")[0] || ""
  const lastName = result.user.displayName?.split(" ").slice(1).join(" ") || ""

  await syncUserToPrisma(result.user.uid, {
    email: result.user.email!,
    firstName,
    lastName,
  })

  return result.user
}

// Logout
export const logoutUser = async () => await signOut(auth)

// --- pomocná funkce pro sync do Prismy ---
const syncUserToPrisma = async (
  uid: string,
  data: {
    email: string
    firstName?: string
    lastName?: string
    username?: string
  }
) => {
  const resp = await fetch('/api/internal/sync-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, ...data }),
  })
  
  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`Failed to sync user: ${body}`)
  }
  
  return resp.json()
}
