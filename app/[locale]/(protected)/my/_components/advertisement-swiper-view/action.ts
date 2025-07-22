'use server'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from '@/lib/auth'
import mediaPrisma from '@/lib/prisma'
type Result =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }
export const ignoreAdvertisements = async (adIds: string[]): Promise<Result> => {
  const session = await getServerSession(getAuthOptions())
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }
  await mediaPrisma.userAdvertisementLog.createMany({
    data: adIds.map((adId) => {
      return {
        userId: session.user.id,
        companyAdvertisementId: adId,
        action: 'ignore',
      }
    }),
  })
  return { success: true }
}
