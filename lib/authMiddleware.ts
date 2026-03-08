// Middleware pro autorizaci API rout - ověření uživatele a admin role

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './prisma'

// Ověření, že uživatel je přihlášený (má platný token)
export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized - Missing token' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  
  try {
    
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

// Ověření, že uživatel má roli ADMIN
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

