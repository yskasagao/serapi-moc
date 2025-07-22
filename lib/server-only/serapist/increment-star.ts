'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

type Result =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }

const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}
const Field = ['looks', 'service', 'physical', 'repeat', 'like'] as const

export const incrementStar = async (slug: string, _revalidatePath: string): Promise<Result> => {
  try {
    const field = Field[getRandomArbitrary(0, Field.length)] as string
    const serapist = await prisma.serapistar.findUniqueOrThrow({
      where: {
        slug,
      },
    })
    await prisma.serapisterParameter.update({
      data: {
        [field]: {
          increment: 1,
        },
      },
      where: {
        serapistarId: serapist.id,
      },
    })
    revalidatePath(_revalidatePath)
    return {
      success: true,
    }
  } catch (e: unknown) {
    console.error(e)
    return { success: false, error: '保存に失敗しました。' }
  }
}
