import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const likedPins = await prisma.galleryPinLike.findMany({
      where: {
        userId: userId
      },
      include: {
        pin: {
          include: {
            author: {
              select: {
                id: true,
                userName: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    const pins = likedPins.map(like => like.pin);

    return NextResponse.json(pins);
  } catch (error) {
    console.error('Error fetching liked pins:', error);
    return NextResponse.json({ error: 'Failed to fetch liked pins' }, { status: 500 });
  }
}
