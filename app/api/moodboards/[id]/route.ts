import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'
    console.log('Fetching moodboard:', { id, userId })

    const moodboard = await prisma.moodboard.findFirst({
      where: {
        id: parseInt(id),
        userId
      },
      include: {
        elements: {
          include: {
            elementType: true,
            values: {
              include: {
                attribute: true
              }
            }
          }
        }
      }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    return NextResponse.json(moodboard)
  } catch (error) {
    console.error('Error fetching moodboard:', error)
    return NextResponse.json({ error: 'Failed to fetch moodboard' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'
    console.log('Deleting moodboard:', { id, userId })

    const moodboard = await prisma.moodboard.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    // Get all elements for this moodboard
    const elements = await prisma.element.findMany({
      where: { moodboardId: parseInt(id) }
    })

    // Delete all element values first (foreign key constraint)
    for (const element of elements) {
      await prisma.elementValue.deleteMany({
        where: { elementId: element.id }
      })
    }

    // Delete all elements
    await prisma.element.deleteMany({
      where: { moodboardId: parseInt(id) }
    })

    // Finally delete the moodboard
    await prisma.moodboard.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting moodboard:', error)
    return NextResponse.json({ error: 'Failed to delete moodboard' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    console.log('Updating moodboard:', { id, userId })
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    const moodboard = await prisma.moodboard.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    const updated = await prisma.moodboard.update({
      where: { id: parseInt(id) },
      data: { name }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating moodboard:', error)
    return NextResponse.json({ error: 'Failed to update moodboard' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { elementsData } = body

    const moodboard = await prisma.moodboard.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    const updated = await prisma.moodboard.update({
      where: { id: parseInt(id) },
      data: { name: moodboard.name } // Temporary: just update to keep data
    })

    return NextResponse.json({ success: true, moodboard: updated })
  } catch (error) {
    console.error('Error updating moodboard data:', error)
    return NextResponse.json({ error: 'Failed to update moodboard data' }, { status: 500 })
  }
}
