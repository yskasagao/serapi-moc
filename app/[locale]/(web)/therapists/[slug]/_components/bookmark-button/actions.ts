'use server'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
type Result =
  | {
      success: true
      message: string
    }
  | {
      success: false
      error: string
    }

export const toggleBookmark = async (targetSlug: string): Promise<Result> => {
  const session = await getServerSession(getAuthOptions())
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }
  const serapistar = await prisma.serapistar.findFirst({
    where: {
      slug: targetSlug,
    },
  })
  if (!serapistar) {
    return {
      success: false,
      error: 'ターゲットが存在しません',
    }
  }
  const bookmark = await prisma.bookmark.findFirst({
    where: {
      serapistarId: serapistar.id,
      userId: session.user.id,
    },
  })

  if (!bookmark) {
    await prisma.bookmark.create({
      data: {
        serapistarId: serapistar.id,
        userId: session.user.id,
      },
    })
  } else {
    await prisma.bookmark.delete({
      where: {
        id: bookmark.id,
      },
    })
  }
  revalidatePath(`/therapists/${targetSlug}`)
  return {
    success: true,
    message: '',
  }
}
