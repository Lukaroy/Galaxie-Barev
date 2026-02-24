import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { pinId, userId } = await request.json()

    if (!pinId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const existingLike = await prisma.galleryPinLike.findUnique({
      where: {
        pinId_userId: {
          pinId,
          userId
        }
      }
    })

    if (existingLike) {
      await prisma.galleryPinLike.delete({
        where: {
          id: existingLike.id
        }
      })
      return NextResponse.json({ liked: false })
    } else {
      await prisma.galleryPinLike.create({
        data: {
          pinId,
          userId
        }
      })
      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}
