import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { uid, email, firstName, lastName, username } = body

    if (!uid || !email) {
      return NextResponse.json(
        { error: 'Missing uid or email' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: uid }
    })

    const sanitize = (s = '') =>
      s.toLowerCase().replace(/[^a-z0-9_.-]/g, '_').slice(0, 32)

    const baseUserName =
      username
        ? sanitize(username)
        : sanitize(email.split('@')[0]) ||
          `user_${uid.slice(0, 8)}`

    let finalUserName = baseUserName

    if (!existingUser) {
      let counter = 1

      while (
        await prisma.user.findUnique({
          where: { userName: finalUserName }
        })
      ) {
        finalUserName = `${baseUserName}_${counter}`
        counter++

        if (counter > 100) {
          finalUserName = `user_${uid.slice(0, 8)}`
          break
        }
      }
    } else {
      finalUserName = existingUser.userName
    }

    const user = await prisma.user.upsert({
      where: { id: uid },
      create: {
        id: uid,
        email,
        firstName,
        lastName,
        userName: finalUserName,
      },
      update: {
        email,
        firstName,
        lastName,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.error('sync-user POST error:', error)

    // zachytíme případný unique email conflict z DB
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists in database' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to sync user',
        details:
          error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}