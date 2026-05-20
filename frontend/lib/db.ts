import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    const connectionString = process.env.DATABASE_URL

    if (!connectionString) {
      throw new Error('DATABASE_URL is not configured')
    }

    neonConfig.webSocketConstructor = ws

    globalForPrisma.prisma = new PrismaClient({
      adapter: new PrismaNeon({ connectionString }),
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    })
  }

  return globalForPrisma.prisma
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return getPrismaClient()[prop as keyof PrismaClient]
  },
})
