import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './prisma'

/**
 * Middleware pro ověření autentizace uživatele
 * Očekává Firebase ID token v Authorization header
 */
export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized - Missing token' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  
  try {
    // V produkci bys měl ověřit Firebase token pomocí Firebase Admin SDK
    // Pro zjednodušení předpokládáme, že token je platné UID
    // TODO: Přidat Firebase Admin SDK verifikaci
    
    const user = await prisma.user.findUnique({
      where: { id: token }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return { user }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }
}

/**
 * Middleware pro ověření admin oprávnění
 * Volá requireAuth a následně kontroluje roli
 */
export async function requireAdmin(request: NextRequest) {
  const authResult = await requireAuth(request)
  
  if (authResult instanceof NextResponse) {
    return authResult
  }
  
  if (authResult.user.role !== 'ADMIN') {
    return NextResponse.json({ 
      error: 'Forbidden - Admin access required' 
    }, { status: 403 })
  }
  
  return authResult
}

/**
 * Middleware pro ověření moderátora nebo admina
 */
export async function requireModerator(request: NextRequest) {
  const authResult = await requireAuth(request)
  
  if (authResult instanceof NextResponse) {
    return authResult
  }
  
  if (authResult.user.role !== 'ADMIN' && authResult.user.role !== 'MODERATOR') {
    return NextResponse.json({ 
      error: 'Forbidden - Moderator access required' 
    }, { status: 403 })
  }
  
  return authResult
}
