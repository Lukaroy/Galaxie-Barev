import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'

    const moodboard = await prisma.moodboard.findFirst({
      where: { id: parseInt(id), userId }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    const elements = await prisma.element.findMany({
      where: { moodboardId: parseInt(id) },
      include: {
        elementType: true,
        values: {
          include: { attribute: true }
        }
      },
      orderBy: { zIndex: 'asc' }
    })

    return NextResponse.json(elements)
  } catch (error) {
    console.error('Error fetching elements:', error)
    return NextResponse.json({ error: 'Failed to fetch elements' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'

    const body = await request.json()
    const { elementId } = body

    const element = await prisma.element.findFirst({
      where: {
        id: elementId,
        moodboard: { id: parseInt(id), userId }
      }
    })

    if (!element) {
      return NextResponse.json({ error: 'Element not found' }, { status: 404 })
    }

    // Cascade delete handles ElementValues automatically
    await prisma.element.delete({
      where: { id: elementId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting element:', error)
    return NextResponse.json({ error: 'Failed to delete element' }, { status: 500 })
  }
}
