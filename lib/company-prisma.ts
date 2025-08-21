// import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

declare global {
  /* eslint no-var: 0 */
  var companyPrisma: PrismaClient | undefined
}

const client = (() => {
  try {
    return globalThis.companyPrisma ??
      new PrismaClient({
        log: ['query'],
      })
  } catch (error) {
    console.warn('Company Prisma client initialization failed, using mock mode:', error.message)
    return {
      company: {
        findMany: () => Promise.resolve([]),
        findFirst: () => Promise.resolve(null),
        create: () => Promise.resolve({}),
        update: () => Promise.resolve({}),
        delete: () => Promise.resolve({}),
      },
      $connect: () => Promise.resolve(),
      $disconnect: () => Promise.resolve(),
    } as any
  }
})()
if (process.env.NODE_ENV !== 'production') globalThis.companyPrisma = client

// eslint-disable-next-line import/no-default-export
export default client
