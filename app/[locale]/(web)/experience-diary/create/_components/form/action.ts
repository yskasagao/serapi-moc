'use server'
import { type Result } from '@/types/api'
import { z } from 'zod'
import { getServerSession } from 'next-auth/next'
import { nanoid } from 'nanoid'
import sharp from 'sharp'
import { getAuthOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { type Prisma } from '@prisma/client/media-db'
import { storeImage } from '@/lib/server-only/store-image'
const formSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  images: z.array(z.instanceof(File)),
})
export const createDiary = async (formData: FormData): Promise<Result> => {
  const session = await getServerSession(getAuthOptions())
  if (!session) {
    return { success: false, error: 'unauthorized' }
  }
  const parsed = formSchema.safeParse({
    title: formData.get('title'),
    text: formData.get('text'),
    images: formData.getAll('images'),
  })
  if (!parsed.success) {
    return {
      success: false,
      error: 'パラメータが不正です',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const images: string[] = []
  if (parsed.data.images.length > 0) {
    for (const image of parsed.data.images) {
      if (image.size === 0) {
        continue
      }
      const identifier = `${new Date().getTime()}-${nanoid(12)}`
      const imageBuffer = await image.arrayBuffer()
      const webpBuffer = await sharp(imageBuffer).webp().toBuffer()

      const uploadResult = await storeImage(webpBuffer, `diary-assets/image-${identifier}.webp`)

      if (!uploadResult.success) {
        return { success: false, error: '画像の保存に失敗しました' }
      }

      if (uploadResult.data) {
        images.push(uploadResult.data.url)
      }
    }
  }

  const data: Prisma.ExperienceDiaryCreateInput = {
    title: parsed.data.title,
    text: parsed.data.text,
    User: {
      connect: {
        id: session.user.id,
      },
    },
  }
  if (images.length > 0) {
    data.ExperienceDiaryImage = {
      create: images.map((v) => {
        return {
          image: v,
        }
      }),
    }
  }

  await prisma.experienceDiary.create({
    data,
  })

  return { success: true }
}
