import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function resolveParams(context: any) {
  let params = context?.params;
  if (!params) return {};
  if (typeof params.then === 'function') params = await params;
  return params;
}

export async function GET(_request: Request, context: any) {
  const { id } = await resolveParams(context);
  try {
    const user = await prisma.user.findUnique({
      where: { id: id as string },
      select: {
        id: true,
        email: true,
        userName: true,
        firstName: true,
        lastName: true,
        role: true,
        birthday: true,
      }
    });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.error(`API GET /api/users/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: any) {
  const { id } = await resolveParams(context);
  try {
    const data = await request.json();
    const updated = await prisma.user.update({
      where: { id: id as string },
      data
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error(`API PUT /api/users/${id} error:`, error);
    if (error?.code === 'P2025') return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: any) {
  const { id } = await resolveParams(context);
  try {
    const data = await request.json();
    
    if (data.userName) {
      data.userName = data.userName.toLowerCase().replace(/[^a-z0-9_.-]/g, '_').slice(0, 32);
    }
    
    if (data.userName) {
      const existingUser = await prisma.user.findUnique({
        where: { userName: data.userName }
      });
      if (existingUser && existingUser.id !== id) {
        return NextResponse.json({ 
          error: 'Toto uživatelské jméno je již používáno' 
        }, { status: 409 });
      }
    }
    
    if (data.birthday) {
      data.birthday = new Date(data.birthday);
    }
    
    const updated = await prisma.user.update({
      where: { id: id as string },
      data
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error(`API PATCH /api/users/${id} error:`, error);
    if (error?.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Uživatelské jméno je již používáno' }, { status: 409 });
    }
    return NextResponse.json({ 
      error: 'Failed to update user',
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: any) {
  const { id } = await resolveParams(context);
  try {
    await prisma.user.delete({
      where: { id: id as string }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error(`API DELETE /api/users/${id} error:`, error);
    if (error?.code === 'P2025') return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
