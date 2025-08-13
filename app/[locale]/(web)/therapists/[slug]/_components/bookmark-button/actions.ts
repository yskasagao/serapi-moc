'use server'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getMockSerapistBySlug } from '@/lib/mock-serapist-data'

type Result =
  | {
      success: true
      message: string
    }
  | {
      success: false
      error: string
    }

export const toggleBookmark = async (targetSlug: string): Promise<r> => {
  // Check if using mock data in development
  const mockData = getMockSerapistBySlug(targetSlug)
  if (mockData) {
    // Return success for mock environment (no actual database operation)
    return {
      success: true,
      message: 'Bookmark toggled (development mock)',
    }
  }

  // Production: actual bookmark processing
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
      error: 'Target not found',
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
