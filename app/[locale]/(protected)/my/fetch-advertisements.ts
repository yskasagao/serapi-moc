'use server'

import type { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from '@/lib/auth'
import companyPrisma from '@/lib/company-prisma'
import mediaPrisma from '@/lib/prisma'

const SelectResult = {
  id: true,
  trackingCode: true,
  title: true,
  image: true,
  shopName: true,
  description: true,
  rank: true,
} satisfies Prisma.CompanyAdvertisementSelect

export type Advertisement = Prisma.CompanyAdvertisementGetPayload<{ select: typeof SelectResult }>

type Result =
  | {
      success: true
      result: Advertisement[]
    }
  | {
      success: false
      error: string
    }

export const fetchAdvertisements = async (): Promise<Result> => {
  const session = await getServerSession(getAuthOptions())
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  const ignoreUserAdvertisementLogs = await mediaPrisma.userAdvertisementLog.findMany({
    where: {
      userId: session.user.id,
      action: 'ignore',
    },
    select: {
      companyAdvertisementId: true,
    },
  })
  const ignoreIds = ignoreUserAdvertisementLogs.map((log) => log.companyAdvertisementId)
  const where: Prisma.CompanyAdvertisementWhereInput = {
    id: {
      notIn: ignoreIds,
    },
    isPublic: true,
  }
  const advertisement = await companyPrisma.companyAdvertisement.findMany({
    select: SelectResult,
    where,
    orderBy: [
      {
        rank: 'desc',
      },
      {
        id: 'asc',
      },
    ],
  })

  const adIds = advertisement.map((v) => v.id)
  await companyPrisma.companyAdvertisement.updateMany({
    where: {
      id: {
        in: adIds,
      },
    },
    data: {
      impressions: {
        increment: 1,
      },
    },
  })
  return { success: true, result: advertisement }
}
