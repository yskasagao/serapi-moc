import { PrismaClient } from '@prisma/client/media-db'

const isDebug = process.env.NODE_ENV !== 'production'
const prismaClientSingleton = () => {
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
