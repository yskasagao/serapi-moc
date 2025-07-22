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
export const ignoreAdvertisement = async (adId: string): Promise<Result> => {
  const session = await getServerSession(getAuthOptions())
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }
  await mediaPrisma.userAdvertisementLog.create({
    data: {
      userId: session.user.id,
      companyAdvertisementId: adId,
      action: 'ignore',
    },
  })
  return { success: true }
}
