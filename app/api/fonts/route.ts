import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const fonts = await prisma.font.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    
    return NextResponse.json(fonts)
  } catch (error) {
    console.error('Error fetching fonts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch fonts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, url, tips } = body

    if (!name || !category || !url) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, url' },
        { status: 400 }
      )
    }

    const font = await prisma.font.create({
      data: {
        name,
        category,
        url,
        tips: tips || null
      }
    })

    return NextResponse.json(font, { status: 201 })
  } catch (error) {
    console.error('Error creating font:', error)
    return NextResponse.json(
      { error: 'Failed to create font' },
      { status: 500 }
    )
  }
}
