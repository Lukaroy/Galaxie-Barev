import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { postId, userId } = await request.json()

    if (!postId || !userId) {
      return NextResponse.json(
        { error: 'postId and userId are required' },
        { status: 400 }
      )
    }

    // Check if like already exists
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId: parseInt(postId),
          userId: userId
        }
      }
    })

    if (existingLike) {
      // Unlike - remove the like
      await prisma.postLike.delete({
        where: {
          id: existingLike.id
        }
      })
      return NextResponse.json({ liked: false })
    } else {
      // Like - add the like
      await prisma.postLike.create({
        data: {
          postId: parseInt(postId),
          userId: userId
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
