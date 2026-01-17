/**
 * Error handling utility functions
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const handleApiError = (error: any): string => {
  if (error instanceof AppError) {
    return error.message
  }
  
  if (error?.code === 'P2002') {
    return 'Záznam s těmito údaji již existuje'
  }
  
  if (error?.code === 'P2025') {
    return 'Záznam nenalezen'
  }
  
  if (error?.message) {
    return error.message
  }
  
  return 'Nastala neočekávaná chyba'
}

export const handleAuthError = (error: any): string => {
  const code = error?.code || ''
  
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Nesprávný email nebo heslo'
    case 'auth/email-already-in-use':
      return 'Tento email je již používán'
    case 'auth/weak-password':
      return 'Heslo je příliš slabé'
    case 'auth/invalid-email':
      return 'Neplatný formát emailu'
    case 'auth/network-request-failed':
      return 'Chyba připojení k síti'
    case 'auth/too-many-requests':
      return 'Příliš mnoho pokusů, zkuste to později'
    default:
      return error?.message || 'Nastala chyba při autentizaci'
  }
}
