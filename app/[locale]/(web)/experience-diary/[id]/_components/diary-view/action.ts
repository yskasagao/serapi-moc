'use server'
import prisma from '@/lib/prisma'
import { type Result } from '@/types/api'
import { revalidatePath } from 'next/cache'

export const incrementLike = async (id: string): Promise<Result> => {
  const target = await prisma.experienceDiary.findFirst({
    where: {
      id,
    },
  })
  if (!target) {
    return { success: false, error: 'not found' }
  }

  await prisma.experienceDiary.update({
    where: {
      id,
    },
    data: {
      like: {
        increment: 1,
      },
    },
  })

  revalidatePath(`/experience-diary/${id}`)
  return { success: true }
}

export const decrementLike = async (id: string): Promise<Result> => {
  const target = await prisma.experienceDiary.findFirst({
    where: {
      id,
    },
  })
  if (!target) {
    return { success: false, error: 'not found' }
  }

  if (target.like === 0) {
    return { success: false, error: 'operation error' }
  }

  await prisma.experienceDiary.update({
    where: {
      id,
    },
    data: {
      like: {
        decrement: 1,
      },
    },
  })
  revalidatePath(`/experience-diary/${id}`)
  return { success: true }
}
