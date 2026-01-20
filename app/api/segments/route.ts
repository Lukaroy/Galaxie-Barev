import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const segments = await prisma.segment.findMany({ orderBy: { createdAt: "desc" } });
    return new Response(JSON.stringify(segments), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Chyba při načítání segmentů:", err);
    return new Response(JSON.stringify({ error: "Chyba při načítání segmentů" }), { status: 500 });
  }
}
