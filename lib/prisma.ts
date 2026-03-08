// Prisma klient - singleton instance pro přístup k databázi
// Podporuje Prisma Accelerate i přímé PostgreSQL připojení

import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prismaInitOptions = process.env.PRISMA_ACCELERATE_URL
  ? { accelerateUrl: process.env.PRISMA_ACCELERATE_URL }
  : { adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) } as ConstructorParameters<typeof PrismaClient>[0]

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaInitOptions)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma