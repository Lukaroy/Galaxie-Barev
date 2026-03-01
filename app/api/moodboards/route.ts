import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'
    const moodboards = await prisma.moodboard.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        canvasWidth: true,
        canvasHeight: true,
        bgColor: true,
        userId: true,
        elements: {
          select: {
            id: true,
            elementType: { select: { name: true } },
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(moodboards)
  } catch (error) {
    console.error('Error fetching moodboards:', error)
    return NextResponse.json({ error: 'Failed to fetch moodboards' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, userId } = body

    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    if (!userId) return NextResponse.json({ error: 'UserId is required' }, { status: 400 })

    const moodboard = await prisma.moodboard.create({
      data: {
        name,
        userId,
        canvasWidth: body.canvasWidth || 794,
        canvasHeight: body.canvasHeight || 1123,
      }
    })

    console.log('Created moodboard:', moodboard)

    return NextResponse.json(moodboard, { status: 201 })
  } catch (error) {
    console.error('Error creating moodboard:', error)
    return NextResponse.json({ error: 'Failed to create moodboard' }, { status: 500 })
  }
}
