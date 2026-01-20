import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requireAdmin } from '@/lib/authMiddleware';
import { prisma } from '@/lib/prisma';


export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        userName: true,
        firstName: true,
        lastName: true,
        role: true,
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('API GET /api/users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdmin(request);
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();
    const { email, userName, firstName, lastName, birthday } = body;
    if (!email || !userName) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const created = await prisma.user.create({
      data: {
        email,
        userName,
        firstName,
        lastName,
        birthday: birthday ? new Date(birthday) : null,
      }
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('API POST /api/users error:', error);
    if (error?.code === 'P2002') return NextResponse.json({ error: 'Unique constraint failed' }, { status: 409 });
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
