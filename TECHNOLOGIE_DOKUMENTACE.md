# Kompletní technologická dokumentace - Galaxie Barev

## Přehled projektu

**Galaxie Barev** je moderní webová aplikace pro designéry a kreativce, která kombinuje:
- Generování barevných palet
- Správu fontů
- Vytváření moodboardů
- Design příručku
- Sociální funkce (posty, lajky)
- Uživatelské profily s rolemi

---

## 1. Frontend Framework - Next.js 16.1.1

### Co to je?
Next.js je React framework od Vercel, který přidává k Reactu:
- **Server-Side Rendering (SSR)** - stránky se renderují na serveru
- **Static Site Generation (SSG)** - pre-renderování při buildu
- **App Router** - moderní file-based routing
- **API Routes** - backend endpointy v Next.js
- **Automatic Code Splitting** - rychlejší načítání

### Jak je použit v projektu?

#### App Router (Next.js 14+)
```
app/
├── page.tsx              # Úvodní stránka "/"
├── layout.tsx            # Root layout (Navbar, fonts)
├── loading.tsx           # Loading state
├── barvy/page.tsx        # "/barvy" stránka
├── fonty/page.tsx        # "/fonty" stránka
├── teorie/page.tsx       # "/teorie" kniha
├── profil/page.tsx       # "/profil" uživatelský profil
└── api/                  # Backend API endpointy
    ├── users/route.ts    # GET/POST /api/users
    └── moodboards/route.ts
```

#### Server Components vs Client Components

**Server Component** (default):
```typescript
// app/page.tsx
export default function HomePage() {
  // Renderuje se na serveru
  // Nemá přístup k browser API (localStorage, window)
  return <div>Úvodní stránka</div>
}
```

**Client Component** (s `"use client"`):
```typescript
// app/profil/page.tsx
"use client"
import { useState } from 'react'

export default function ProfilePage() {
  // Renderuje se v browseru
  // Má přístup k hooks (useState, useEffect)
  const [editing, setEditing] = useState(false)
  return <div>Profil</div>
}
```

#### Metadata pro SEO
```typescript
// app/layout.tsx
export const metadata = {
  title: 'Galaxie Barev - Kreativní nástroje',
  description: 'Platforma pro designéry...',
  keywords: ['barvy', 'design', 'moodboard'],
  openGraph: {
    title: 'Galaxie Barev',
    images: ['/og-image.png']
  }
}
```

#### Next.js Konfigurace
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  turbopack: {},  // Použití Turbopack v dev mode
  webpack(config, { isServer }) {
    // Prevence bundlování Node.js modulů do klienta
    if (!isServer) {
      config.resolve.fallback = {
        dns: false,
        fs: false,
        net: false
      }
    }
    return config
  }
}
```

---

## 2. React 19.2.3

### Co to je?
React je JavaScript knihovna pro vytváření UI komponent.

### Jak funguje v projektu?

#### Komponenty
```typescript
// app/components/navbar.tsx
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Domů</Link>
      <Link href="/barvy">Barvy</Link>
    </nav>
  )
}
```

#### Hooks
```typescript
"use client"
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  // useState - lokální stav komponenty
  const [user, setUser] = useState(null)
  
  // useEffect - side efekty (API calls)
  useEffect(() => {
    async function loadUser() {
      const res = await fetch('/api/users/me')
      const data = await res.json()
      setUser(data)
    }
    loadUser()
  }, []) // [] = spustí se jednou při mount
  
  return <div>{user?.name}</div>
}
```

#### Custom Hook
```typescript
// hooks/useAuth.ts
"use client"
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe // Cleanup
  }, [])
  
  return { user, loading }
}
```

---

## 3. TypeScript 5

### Co to je?
TypeScript přidává typový systém k JavaScriptu, čímž zachytí chyby při psaní kódu.

### Jak je použit?

#### Typy pro databázové modely
```typescript
// types/index.ts
export type User = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  userName: string
  role: 'USER' | 'ADMIN' | 'MODERATOR'
}

export type Moodboard = {
  id: number
  name: string
  userId: string
  createdAt: Date
  elements: Element[]
}
```

#### API Route s typováním
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await prisma.user.create({ data: body })
  return NextResponse.json(user, { status: 201 })
}
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,              // Striktní typování
    "noEmit": true,              // Next.js kompiluje
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],            // Import alias: @/lib/prisma
      "@prisma/client": ["generated/prisma/client"]
    }
  }
}
```

---

## 4. Prisma 7.2.0 - ORM

### Co to je?
Prisma je moderní ORM (Object-Relational Mapping) pro práci s databází přes TypeScript objekty místo SQL.

### Jak funguje?

#### 1. Schema definice
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  userName  String   @unique
  role      UserRole @default(USER)
  posts     Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  authorId String
  author   User   @relation(fields: [authorId], references: [id])
}
```

#### 2. Generování klienta
```bash
npx prisma generate
# Vytvoří typovaný klient v generated/prisma/
```

#### 3. Použití v kódu
```typescript
// lib/prisma.ts
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ 
    connectionString: process.env.DATABASE_URL 
  })
})
```

#### 4. CRUD operace

**Create:**
```typescript
const user = await prisma.user.create({
  data: {
    id: 'firebase-uid',
    email: 'user@example.com',
    userName: 'johndoe',
    role: 'USER'
  }
})
```

**Read:**
```typescript
// Jeden uživatel
const user = await prisma.user.findUnique({
  where: { id: 'firebase-uid' }
})

// Všichni uživatelé
const users = await prisma.user.findMany()

// S filtrem
const admins = await prisma.user.findMany({
  where: { role: 'ADMIN' }
})

// S relacemi
const userWithPosts = await prisma.user.findUnique({
  where: { id: 'uid' },
  include: { posts: true }
})
```

**Update:**
```typescript
await prisma.user.update({
  where: { id: 'uid' },
  data: { firstName: 'Jan' }
})
```

**Delete:**
```typescript
await prisma.user.delete({
  where: { id: 'uid' }
})
```

#### 5. Migrace
```bash
# Vytvoř novou migraci
npx prisma migrate dev --name add_user_roles

# Aplikuj migrace na produkci
npx prisma migrate deploy

# Otevři GUI pro prohlížení dat
npx prisma studio  # http://localhost:5555
```

#### 6. Relace v Prisma

**One-to-Many:**
```prisma
model User {
  id    String @id
  posts Post[]
}

model Post {
  id       Int    @id
  authorId String
  author   User   @relation(fields: [authorId], references: [id])
}
```

**Many-to-Many:**
```prisma
model Post {
  id    Int        @id
  likes PostLike[]
}

model User {
  id        String     @id
  postLikes PostLike[]
}

model PostLike {
  id     Int    @id
  postId Int
  userId String
  post   Post   @relation(fields: [postId], references: [id])
  user   User   @relation(fields: [userId], references: [id])
  @@unique([postId, userId])
}
```

---

## 5. PostgreSQL - Databáze

### Co to je?
PostgreSQL je open-source relační databáze s pokročilými funkcemi.

### Kde je hostovaná?
**Prisma Postgres** - cloud databáze na `db.prisma.io`

### Tabulky v projektu:

1. **User** - Uživatelé
   - `id` (String, cuid)
   - `email` (String, unique)
   - `userName` (String, unique)
   - `firstName`, `lastName` (String, nullable)
   - `role` (enum: USER/ADMIN/MODERATOR)
   - `birthday` (DateTime, nullable)

2. **Font** - Fonty
   - `id` (Int, autoincrement)
   - `name` (VARCHAR 64)
   - `category` (VARCHAR 32)
   - `url` (Text)
   - `tips` (Text, nullable)

3. **Palette** - Barevné palety
   - `id` (Int)
   - `mainColor` (VARCHAR 7, hex)
   - `mixinColors` (String[], PostgreSQL array)
   - `tags` (String[], PostgreSQL array)
   - `description` (Text, nullable)

4. **Moodboard** - Nálazové tabule
   - `id` (Int)
   - `name` (VARCHAR 255)
   - `userId` (String, Firebase UID)
   - `createdAt` (DateTime)
   - `elements` (relace Element[])

5. **Element** - Elementy v moodboardu
   - `id` (Int)
   - `name` (VARCHAR 32)
   - `coordsX`, `coordsY` (Int, pozice)
   - `width`, `height` (Int, rozměry)
   - `opacity` (Int, 0-100)
   - `rotation` (Int, stupně)
   - `layer` (Int, z-index)
   - `elementTypeId`, `moodboardId` (foreign keys)

6. **Post** - Příspěvky
   - `id` (Int)
   - `title` (VARCHAR 64)
   - `imageUrl` (Text)
   - `authorId` (String)
   - `moodboardId` (Int)

7. **PostLike** - Lajky
   - `id` (Int)
   - `postId`, `userId` (foreign keys)
   - Unique constraint: jeden uživatel = jeden lajk na post

---

## 6. Firebase - Autentizace

### Co to je?
Firebase Authentication poskytuje ready-made řešení pro přihlašování uživatelů.

### Jak funguje?

#### Klientská autentizace
```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
})

export const auth = getAuth(app)
```

#### Login komponenta
```typescript
// app/components/auth/loginform.tsx
"use client"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function LoginForm() {
  async function handleEmailLogin(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Získej ID token pro backend
      const idToken = await user.getIdToken()
      
      // Synchronizuj uživatele do Prisma databáze
      await fetch('/api/internal/sync-user', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        })
      })
      
      // Přesměruj
      window.location.href = '/profil'
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  
  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value
      handleEmailLogin(email, password)
    }}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Heslo" />
      <button type="submit">Přihlásit</button>
      <button type="button" onClick={handleGoogleLogin}>
        Google přihlášení
      </button>
    </form>
  )
}
```

#### Serverová verifikace
```typescript
// lib/firebase-admin.ts
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    })
  })
}

export async function verifyToken(idToken: string) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    return decodedToken // { uid, email, ... }
  } catch (error) {
    throw new Error('Invalid token')
  }
}
```

#### Auth Middleware pro API routes
```typescript
// lib/authMiddleware.ts
import { NextRequest } from 'next/server'
import { verifyToken } from './firebase-admin'

export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing token')
  }
  
  const token = authHeader.split('Bearer ')[1]
  const decodedToken = await verifyToken(token)
  
  return decodedToken.uid
}
```

#### Chráněný API endpoint
```typescript
// app/api/users/[id]/route.ts
import { requireAuth } from '@/lib/authMiddleware'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await requireAuth(request)
    
    // Ověř, že uživatel upravuje svůj profil
    if (userId !== params.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: body
    })
    
    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}
```

#### useAuth Hook
```typescript
// hooks/useAuth.ts
"use client"
import { useState, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    
    return () => unsubscribe()
  }, [])
  
  return { user, loading }
}
```

---

## 7. Tailwind CSS 4

### Co to je?
Tailwind je utility-first CSS framework - místo psaní CSS tříd používáš utility classes.

### Jak funguje?

#### PostCSS konfigurace
```javascript
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {}
  }
}
```

#### Použití v komponentách
```typescript
// Místo psaní CSS
export default function Button() {
  return (
    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
      Klikni
    </button>
  )
}

// Odpovídá CSS:
// .button {
//   padding: 1.5rem 1rem;
//   background: #9333ea;
//   color: white;
//   border-radius: 0.5rem;
// }
// .button:hover {
//   background: #7e22ce;
// }
```

#### Custom CSS v globals.css
```css
/* app/globals.css */

/* Galaxie design systém */
:root {
  --color-primary: #684D89;
  --color-secondary: #9B7EBD;
  --color-light: #CFBEE4;
}

/* Kniha design */
.book-page {
  background: linear-gradient(to bottom, #f8f5f0, #f0ebe3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

/* Profil design */
.profile-avatar-galaxy {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #684D89, #9B7EBD);
  border-radius: 50%;
}
```

---

## 8. Framer Motion - Animace

### Co to je?
Framer Motion je knihovna pro animace a interaktivní efekty v Reactu.

### Příklady použití:

```typescript
"use client"
import { motion } from 'framer-motion'

// Fade in animace
export function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

// Slide in animace
export function SlideIn({ children }) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  )
}

// Hover efekt
export function HoverCard({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="card"
    >
      {children}
    </motion.div>
  )
}

// Stagger children animace
export function StaggerList({ items }) {
  return (
    <motion.ul
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

---

## 9. Lucide React - Ikony

### Co to je?
Lucide je knihovna s 1000+ moderními SVG ikonami.

### Použití:
```typescript
import { 
  BookOpen, 
  Palette, 
  Type, 
  Layout, 
  Monitor,
  ChevronLeft,
  ChevronRight,
  User,
  Settings
} from 'lucide-react'

export function TheoryPage() {
  return (
    <div>
      <BookOpen size={48} color="#684D89" />
      <h1>Design příručka</h1>
      
      <Palette size={32} />
      <span>Barvy</span>
      
      <Type size={32} />
      <span>Typografie</span>
    </div>
  )
}
```

---

## 10. React Hot Toast - Notifikace

### Použití:
```typescript
"use client"
import toast, { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <button onClick={() => toast.success('Uloženo!')}>
        Ulož
      </button>
    </>
  )
}

// Typy toastů:
toast.success('Úspěch!')
toast.error('Chyba!')
toast.loading('Načítání...')
toast('Notifikace')

// S promise:
toast.promise(
  saveData(),
  {
    loading: 'Ukládám...',
    success: 'Uloženo!',
    error: 'Chyba při ukládání'
  }
)
```

---

## 11. Google Fonts

### Použití v Next.js:
```typescript
// app/layout.tsx
import { Montserrat, Inder } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-montserrat'
})

const inder = Inder({
  weight: '400',
  variable: '--font-inder',
  subsets: ['latin']
})

export default function RootLayout({ children }) {
  return (
    <html lang="cs" className={`${montserrat.variable} ${inder.variable}`}>
      <body className="font-montserrat">
        {children}
      </body>
    </html>
  )
}
```

```css
/* globals.css */
:root {
  --font-montserrat: 'Montserrat', sans-serif;
  --font-inder: 'Inder', sans-serif;
}

body {
  font-family: var(--font-montserrat);
}

h1 {
  font-family: var(--font-montserrat);
  font-weight: 700;
}
```

---

## 12. Express 5.2.1 - Server Middleware

### Použití pro custom server logic:
```typescript
// server.ts (pokud budeš potřebovat)
import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  
  // Custom middleware
  server.use(express.json())
  
  // Custom route
  server.post('/api/webhook', (req, res) => {
    console.log('Webhook received:', req.body)
    res.json({ success: true })
  })
  
  // Next.js handler pro všechno ostatní
  server.all('*', (req, res) => handle(req, res))
  
  server.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
  })
})
```

---

## Komplexní flow aplikace

### 1. Registrace uživatele

```
1. Uživatel vyplní formulář (registrace/page.tsx)
2. Firebase vytvoří účet → vrátí UID
3. Frontend zavolá POST /api/internal/sync-user
4. Backend vytvoří záznam v Prisma User tabulce
5. Uživatel je přesměrován na /profil
```

### 2. Přihlášení

```
1. Firebase ověří credentials
2. Vrátí ID token
3. Frontend pošle token v Authorization header
4. Backend ověří token přes Firebase Admin
5. Vrátí data z Prisma databáze
```

### 3. Vytvoření Moodboardu

```
1. POST /api/moodboards s Authorization header
2. Backend ověří uživatele
3. Prisma vytvoří Moodboard záznam
4. Vrátí { id, name, userId, createdAt }
5. Frontend přesměruje na /moodboard/[id]
```

### 4. Renderování stránky

```
Next.js:
1. Přijme request na /teorie
2. Najde app/teorie/page.tsx
3. Zkontroluje "use client" → renderuje v browseru
4. Vrátí HTML + hydrate React komponentu
5. Client side routing (bez refresh stránky)
```

---

## Environment Variables (.env)

```env
# PostgreSQL
DATABASE_URL="postgres://...@db.prisma.io:5432/postgres?sslmode=require"

# Firebase Client (public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (private)
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

---

## Build a Deployment

### Development:
```bash
npm run dev
# Spustí Next.js dev server s Turbopack
# http://localhost:3000
```

### Production Build:
```bash
npm run build
# 1. Kompiluje TypeScript
# 2. Bundluje JS/CSS
# 3. Optimalizuje obrázky
# 4. Pre-renderuje statické stránky

npm run start
# Spustí production server
```

### Deployment na Vercel:
```bash
# 1. Pushni na GitHub
# 2. Připoj repo na vercel.com
# 3. Nastav env variables
# 4. Deploy automaticky při push
```

---

## Příkazy pro vývoj

```bash
# Instalace
npm install

# Development server
npm run dev

# Databáze
npx prisma generate           # Vygeneruj klienta
npx prisma migrate dev        # Vytvoř migraci
npx prisma migrate deploy     # Aplikuj migrace
npx prisma studio             # GUI databáze

# Build
npm run build
npm run start

# Linting
npm run lint

# TypeScript check
npx tsc --noEmit
```

---

## Architektura projektu

```
Frontend (React/Next.js)
    ↓
Firebase Auth (přihlášení)
    ↓
API Routes (/api/*)
    ↓
Auth Middleware (ověření tokenu)
    ↓
Prisma ORM
    ↓
PostgreSQL Databáze
```

---

**Autor:** Galaxie Barev Team  
**Verze:** 2.0  
**Datum:** 17. ledna 2026  
**Technologie:** Next.js 16, React 19, Prisma 7, PostgreSQL, Firebase, TypeScript 5
