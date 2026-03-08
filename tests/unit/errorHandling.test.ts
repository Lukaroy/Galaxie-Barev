import { describe, it, expect } from 'vitest'
import { handleApiError, handleAuthError } from '@/lib/errorHandling'

describe('handleApiError', () => {
  it('returns message for Prisma unique constraint violation (P2002)', () => {
    expect(handleApiError({ code: 'P2002' })).toBe('Záznam s těmito údaji již existuje')
  })

  it('returns message for Prisma not found (P2025)', () => {
    expect(handleApiError({ code: 'P2025' })).toBe('Záznam nenalezen')
  })

  it('returns error.message if present', () => {
    expect(handleApiError({ message: 'Something went wrong' })).toBe('Something went wrong')
  })

  it('returns fallback for unknown errors', () => {
    expect(handleApiError({})).toBe('Nastala neočekávaná chyba')
    expect(handleApiError(null)).toBe('Nastala neočekávaná chyba')
    expect(handleApiError(undefined)).toBe('Nastala neočekávaná chyba')
  })
})

describe('handleAuthError', () => {
  it('handles user-not-found', () => {
    expect(handleAuthError({ code: 'auth/user-not-found' })).toBe('Nesprávný email nebo heslo')
  })

  it('handles wrong-password', () => {
    expect(handleAuthError({ code: 'auth/wrong-password' })).toBe('Nesprávný email nebo heslo')
  })

  it('handles email-already-in-use', () => {
    expect(handleAuthError({ code: 'auth/email-already-in-use' })).toBe('Tento email je již používán')
  })

  it('handles weak-password', () => {
    expect(handleAuthError({ code: 'auth/weak-password' })).toBe('Heslo je příliš slabé')
  })

  it('handles invalid-email', () => {
    expect(handleAuthError({ code: 'auth/invalid-email' })).toBe('Neplatný formát emailu')
  })

  it('handles network-request-failed', () => {
    expect(handleAuthError({ code: 'auth/network-request-failed' })).toBe('Chyba připojení k síti')
  })

  it('handles too-many-requests', () => {
    expect(handleAuthError({ code: 'auth/too-many-requests' })).toBe('Příliš mnoho pokusů, zkuste to později')
  })

  it('returns error.message for unknown codes', () => {
    expect(handleAuthError({ code: 'auth/unknown', message: 'Custom msg' })).toBe('Custom msg')
  })

  it('returns fallback when no message or code', () => {
    expect(handleAuthError({})).toBe('Nastala chyba při autentizaci')
    expect(handleAuthError(null)).toBe('Nastala chyba při autentizaci')
  })
})
