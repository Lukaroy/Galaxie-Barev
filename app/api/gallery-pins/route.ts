import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pins = await prisma.galleryPin.findMany({
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true
          }
        },
        likes: {
          select: {
            userId: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    const pinsWithLikes = pins.map(pin => ({
      ...pin,
      likeCount: pin.likes.length,
      likes: pin.likes.map(like => like.userId)
    }))
    
    return NextResponse.json(pinsWithLikes)
  } catch (error) {
    console.error('Error fetching gallery pins:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery pins' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { title, imageUrl, description, authorId } = await request.json()

    if (!title || !imageUrl || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const pin = await prisma.galleryPin.create({
      data: {
        title,
        imageUrl,
        description: description || null,
        authorId
      },
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true
          }
        },
        likes: {
          select: {
            userId: true
          }
        }
      }
    })

    const pinWithLikes = {
      ...pin,
      likeCount: pin.likes.length,
      likes: pin.likes.map(like => like.userId)
    }

    return NextResponse.json(pinWithLikes, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery pin:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery pin' },
      { status: 500 }
    )
  }
}
