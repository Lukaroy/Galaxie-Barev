import { initializeApp, getApps, cert } from 'firebase-admin/app'

// Initialize Firebase Admin SDK only once
if (!getApps().length) {
  try {
    // V produkci použijte správné credentials
    // Pro development můžete použít Firebase emulator nebo nastavit GOOGLE_APPLICATION_CREDENTIALS
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  } catch (error) {
    console.error('Firebase admin initialization error:', error)
  }
}

export { getAuth } from 'firebase-admin/auth'
