import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/authMiddleware'
import { prisma } from '@/lib/prisma'

/**
 * PATCH /api/users/[id]/role
 * Změní roli uživatele (pouze pro adminy)
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  
  // Pouze admin může měnit role
  const authResult = await requireAdmin(request)
  if (authResult instanceof NextResponse) return authResult

  try {
    const body = await request.json()
    const { role } = body

    // Validace role
    if (!['USER', 'ADMIN', 'MODERATOR'].includes(role)) {
      return NextResponse.json({ 
        error: 'Invalid role. Allowed: USER, ADMIN, MODERATOR' 
      }, { status: 400 })
    }

    // Aktualizace role
    const user = await prisma.user.update({
      where: { id: params.id },
      data: { role },
      select: {
        id: true,
        email: true,
        userName: true,
        firstName: true,
        lastName: true,
        role: true
      }
    })

    return NextResponse.json({ 
      message: 'Role updated successfully',
      user 
    })
  } catch (error: any) {
    console.error('PATCH /api/users/[id]/role error:', error)
    
    if (error?.code === 'P2025') {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to update role' 
    }, { status: 500 })
  }
}

/**
 * GET /api/users/[id]/role
 * Získá roli uživatele (pouze pro přihlášené)
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        userName: true,
        role: true
      }
    })

    if (!user) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 })
    }

    return NextResponse.json({ role: user.role })
  } catch (error) {
    console.error('GET /api/users/[id]/role error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch role' 
    }, { status: 500 })
  }
}
