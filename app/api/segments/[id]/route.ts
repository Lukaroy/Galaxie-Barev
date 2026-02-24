import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    // Zkusíme najít podle ID nebo slugu
    const segment = await prisma.segment.findFirst({
      where: {
        OR: [
          { id: isNaN(Number(id)) ? undefined : Number(id) },
          { slug: id }
        ]
      }
    })
    
    if (!segment) {
      return NextResponse.json({ error: "Segment nenalezen" }, { status: 404 })
    }
    
    return NextResponse.json(segment)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Chyba při načítání segmentu" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await req.json()

  try {
    const segment = await prisma.segment.update({
      where: { id: Number(id) },
      data: body
    })
    return NextResponse.json(segment)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Chyba při aktualizaci segmentu" }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    await prisma.segment.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: "Segment smazán" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Chyba při mazání segmentu" }, { status: 500 })
  }
}
