import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("params =", params);  // Tady uvidíš { id: "13" } pokud je složka správně
  const pinId = parseInt(params.id);
  console.log("pinId =", pinId);

  if (isNaN(pinId)) {
    return NextResponse.json({ error: "Invalid pin ID" }, { status: 400 });
  }

  try {
    const deletedPin = await prisma.galleryPin.delete({
      where: { id: pinId },
    });
    return NextResponse.json({ success: true, deletedPin });
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Pin not found" }, { status: 404 });
    }
    console.error("Error deleting pin:", err);
    return NextResponse.json({ error: "Failed to delete pin" }, { status: 500 });
  }
}
