// Zpracování chyb z API a Firebase do českých hlášek

export const handleApiError = (error: unknown): string => {
  const err = error as Record<string, unknown> | null | undefined
  if (err?.code === 'P2002') {
    return 'Záznam s těmito údaji již existuje'
  }
  
  if (err?.code === 'P2025') {
    return 'Záznam nenalezen'
  }
  
  if (typeof err?.message === 'string') {
    return err.message
  }
  
  return 'Nastala neočekávaná chyba'
}

export const handleAuthError = (error: unknown): string => {
  const err = error as Record<string, unknown> | null | undefined
  const code = (err?.code as string) || ''
  
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
      return (typeof err?.message === 'string' ? err.message : null) || 'Nastala chyba při autentizaci'
  }
}
