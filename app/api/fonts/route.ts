import { NextResponse } from 'next/server'
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
