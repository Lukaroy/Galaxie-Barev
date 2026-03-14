// API pro konkrétního uživatele - načtení (GET), úprava (PUT/PATCH), smazání (DELETE)

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';



function isPrismaError(error: unknown): error is { code: string; message: string } {
  return typeof error === 'object' && error !== null && 'code' in error;
}

export async function GET(request: Request, context: { params: { id: string } }) {
  // Next.js 16+ App Router: context.params is a Promise
  const params = await context.params;
  console.log("API GET /api/users/[id] params:", params);
  if (!params || !params.id) {
    console.error("API GET /api/users/[id] - id is missing in params", params);
    return NextResponse.json({ error: 'Missing id in params', params }, { status: 400 });
  }
  const { id } = params;
  console.log("API GET /api/users/[id] id:", id);
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
    if (!user) {
      console.warn(`User not found for id: ${id}`);
      return NextResponse.json({ error: 'User not found', id }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(`API GET /api/users/${id} error:`, error, 'id:', id);
    return NextResponse.json({ error: 'Failed to fetch user', details: error instanceof Error ? error.message : String(error), id }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    const data = await request.json();
    const updated = await prisma.user.update({
      where: { id: id as string },
      data
    });
    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error(`API PUT /api/users/${id} error:`, error);
    if (isPrismaError(error) && error.code === 'P2025') return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const params = await context.params;
  const { id } = params;
  try {
    const data = await request.json();
    console.log("PATCH /api/users/[id] - incoming data:", data);
    
    if (data.userName) {
      data.userName = data.userName.toLowerCase().replace(/[^a-z0-9_.-]/g, '_').slice(0, 32);
    }
    
    if (data.userName) {
      const existingUser = await prisma.user.findUnique({
        where: { userName: data.userName }
      });
      if (existingUser && existingUser.id !== id) {
        console.warn("PATCH /api/users/[id] - userName already used:", data.userName);
        return NextResponse.json({ 
          error: 'Toto uživatelské jméno je již používáno' 
        }, { status: 409 });
      }
    }
    
    if (data.birthday) {
      data.birthday = new Date(data.birthday);
    }
    
    try {
      const updated = await prisma.user.update({
        where: { id: id as string },
        data
      });
      console.log("PATCH /api/users/[id] - update success:", updated);
      return NextResponse.json(updated);
    } catch (dbError) {
      console.error("PATCH /api/users/[id] - prisma update error:", dbError);
      throw dbError;
    }
  } catch (error: unknown) {
    console.error(`API PATCH /api/users/${id} error:`, error);
    if (isPrismaError(error) && error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (isPrismaError(error) && error.code === 'P2002') {
      return NextResponse.json({ error: 'Uživatelské jméno je již používáno' }, { status: 409 });
    }
    return NextResponse.json({ 
      error: 'Failed to update user',
      details: error instanceof Error ? error.message : error
    }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    await prisma.user.delete({
      where: { id: id as string }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error(`API DELETE /api/users/${id} error:`, error);
    if (isPrismaError(error) && error.code === 'P2025') return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
