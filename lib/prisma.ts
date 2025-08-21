// import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const isDebug = process.env.NODE_ENV !== 'production'
const prismaClientSingleton = () => {
  try {
    return isDebug
      ? new PrismaClient({
          log: [
            {
              level: 'query',
              emit: 'event',
            },
          ],
        })
      : new PrismaClient()
  } catch (error) {
    console.warn('Prisma client initialization failed, using mock mode:', error.message)
    // Return a mock client for development
    return {
      user: {
        findMany: () => Promise.resolve([]),
        findFirst: () => Promise.resolve(null),
        create: () => Promise.resolve({}),
        update: () => Promise.resolve({}),
        delete: () => Promise.resolve({}),
      },
      $on: () => {},
      $connect: () => Promise.resolve(),
      $disconnect: () => Promise.resolve(),
    } as any
  }
}

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

// eslint-disable-next-line import/no-default-export
export default prisma

if (isDebug && !globalThis.prisma) {
  globalThis.prisma = prisma
  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
  })
}
