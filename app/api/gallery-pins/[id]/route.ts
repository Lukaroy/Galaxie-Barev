import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const pinId = Number(id)

  if (Number.isNaN(pinId)) {
    return NextResponse.json(
      { error: "Invalid pin ID" },
      { status: 400 }
    )
  }

  try {
    const deletedPin = await prisma.galleryPin.delete({
      where: { id: pinId },
    })

    return NextResponse.json({ success: true, deletedPin })
  } catch (err: unknown) {
    const prismaError = err as { code?: string }
    if (prismaError.code === "P2025") {
      return NextResponse.json(
        { error: "Pin not found" },
        { status: 404 }
      )
    }

    console.error("Error deleting pin:", err)
    return NextResponse.json(
      { error: "Failed to delete pin" },
      { status: 500 }
    )
  }
}
