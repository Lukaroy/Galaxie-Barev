import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true
          }
        },
        moodboard: {
          select: {
            id: true,
            name: true
          }
        },
        likes: {
          select: {
            userId: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    })
    
    // Transform data to include like count
    const postsWithLikes = posts.map(post => ({
      ...post,
      likeCount: post.likes.length,
      likes: post.likes.map(like => like.userId)
    }))
    
    return NextResponse.json(postsWithLikes)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { title, imageUrl, description, authorId } = await request.json()

    // Validate required fields
    if (!title || !imageUrl || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find or create default gallery moodboard for user
    let moodboard = await prisma.moodboard.findFirst({
      where: {
        userId: authorId,
        name: 'Galerie'
      }
    })

    if (!moodboard) {
      moodboard = await prisma.moodboard.create({
        data: {
          name: 'Galerie',
          userId: authorId
        }
      })
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        title,
        imageUrl,
        description: description || null,
        authorId,
        moodboardId: moodboard.id
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
        moodboard: {
          select: {
            id: true,
            name: true
          }
        },
        likes: {
          select: {
            userId: true
          }
        }
      }
    })

    // Transform to match expected format
    const postWithLikes = {
      id: post.id,
      title: post.title,
      imageUrl: post.imageUrl,
      description: post.description,
      author: post.author,
      moodboard: post.moodboard,
      likeCount: post.likes.length,
      likes: post.likes.map((like: { userId: string }) => like.userId)
    }

    return NextResponse.json(postWithLikes, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
