import { PrismaClient } from '@prisma/client/company-db'

declare global {
  /* eslint no-var: 0 */
  var companyPrisma: PrismaClient | undefined
}

const client =
  globalThis.companyPrisma ??
  new PrismaClient({
    log: ['query'],
  })
if (process.env.NODE_ENV !== 'production') globalThis.companyPrisma = client

// eslint-disable-next-line import/no-default-export
export default client
