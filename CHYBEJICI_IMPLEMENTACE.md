# Chybějící implementace

## ❌ Autorizační role a zabezpečení

### 1. Přidat role do databáze

**Soubor:** `prisma/schema.prisma`

```prisma
enum UserRole {
  USER
  ADMIN
  MODERATOR
}

model User {
  id        String      @id @default(cuid())
  email     String      @unique
  firstName String?     @db.VarChar(64)
  lastName  String?     @db.VarChar(64)
  userName  String      @unique @db.VarChar(32)
  birthday  DateTime?
  role      UserRole    @default(USER)  // ← PŘIDAT
  
  moodboards Moodboard[]
  posts      Post[]
  postLikes  PostLike[]
}
```

Po úpravě spustit: `npx prisma migrate dev --name add_user_roles`

---

### 2. Vytvořit middleware pro autorizaci

**Vytvořit:** `lib/authMiddleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from './firebase'
import { prisma } from './prisma'

export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  
  try {
    // Ověř Firebase token
    const decodedToken = await auth.verifyIdToken(token)
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.uid }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return { user }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }
}

export async function requireAdmin(request: NextRequest) {
  const authResult = await requireAuth(request)
  
  if (authResult instanceof NextResponse) return authResult
  
  if (authResult.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
  }
  
  return authResult
}
```

---

### 3. Zabezpečit API endpoint pro změnu role

**Vytvořit:** `app/api/users/[uid]/role/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/authMiddleware'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  // Pouze admin může měnit role
  const authResult = await requireAdmin(request)
  if (authResult instanceof NextResponse) return authResult

  try {
    const body = await request.json()
    const { role } = body

    if (!['USER', 'ADMIN', 'MODERATOR'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: params.uid },
      data: { role }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('PATCH /api/users/[uid]/role error:', error)
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 })
  }
}
```

---

### 4. Zabezpečit existující endpointy

**Upravit:** `app/api/users/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireAdmin } from '@/lib/authMiddleware'
import { userService } from '@/services/userService'

// GET /api/users - vyžaduje přihlášení
export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request)
  if (authResult instanceof NextResponse) return authResult

  try {
    const users = await userService.getAllUsers()
    return NextResponse.json(users)
  } catch (error) {
    console.error('API GET /api/users error:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

// POST /api/users - pouze admin
export async function POST(request: NextRequest) {
  const authResult = await requireAdmin(request)
  if (authResult instanceof NextResponse) return authResult

  try {
    const body = await request.json()
    const { email, userName, firstName, lastName, birthday } = body
    
    if (!email || !userName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const created = await userService.createUser({ 
      email, userName, firstName, lastName, birthday 
    } as any)
    
    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    console.error('API POST /api/users error:', error)
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Unique constraint failed' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
```

---

## ✅ Co je již hotové

- ✅ Login/registrace formuláře
- ✅ Validace hesla (8+ znaků, velké písmeno, číslo, speciální znak)
- ✅ Firebase autentizace
- ✅ Sync uživatelů do Prisma
- ✅ Generátor barevných kombinací (5 schémat)
- ✅ Responzivní design

## 🔧 Kroky k dokončení

1. Přidat `role` pole do User modelu v Prisma
2. Spustit migraci databáze
3. Vytvořit `authMiddleware.ts` s `requireAuth()` a `requireAdmin()`
4. Implementovat `/api/users/[uid]/role/route.ts`
5. Zabezpečit všechny citlivé API endpointy
6. Otestovat autorizaci (normální user vs admin)
