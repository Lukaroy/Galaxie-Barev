import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type')
    const difficulty = req.nextUrl.searchParams.get('difficulty')
    
    const where: Record<string, unknown> = {}
    if (type) where.type = type
    if (difficulty) where.difficulty = difficulty
    
    const segments = await prisma.segment.findMany({
      where,
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(segments)
  } catch {
    return NextResponse.json({ error: "Chyba při načítání segmentů" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      title, 
      slug, 
      description, 
      content,
      type = 'LESSON',
      difficulty = 'BEGINNER',
      duration,
      icon,
      color,
      tags = [],
      questions
    } = body
    
    const segment = await prisma.segment.create({
      data: { 
        title, 
        slug, 
        description, 
        content,
        type,
        difficulty,
        duration,
        icon,
        color,
        tags,
        questions
      }
    })
    return NextResponse.json(segment, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
