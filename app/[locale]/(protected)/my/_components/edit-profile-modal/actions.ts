'use server'

import { type Prisma } from '@prisma/client'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth/next'
import sharp from 'sharp'
import z from 'zod'
import { getAuthOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { storeImage } from '@/lib/server-only/store-image'

const EditSchema = z.object({
  name: z.string().min(1, { message: 'nameを入力してください。' }),
  icon: z
    .custom<FileList>()
    .transform((file) => file[0])
    .nullable(),
  message: z.string().max(160, { message: '160文字以内で入力してください。' }).nullable(),
  presetIcon: z.string(),
})
type Result =
  | {
      success: true
      message: string
    }
  | {
      success: false
      error: string
    }

export const edit = async (formData: FormData): Promise<Result> => {
  const session = await getServerSession(getAuthOptions())
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }
  const parsed = EditSchema.safeParse({
    name: formData.get('name'),
    message: formData.get('message'),
    icon: formData.getAll('icon'),
    presetIcon: formData.get('presetIcon'),
  })
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.message,
    }
  }
  const file = parsed.data.icon
  let newIcon: string | undefined = undefined
  if (file !== null && file !== undefined && file.size > 0) {
    const iconBuffer = await file.arrayBuffer()
    const width = 128
    const r = width / 2
    const circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`)
    const identifier = `${new Date().getTime()}-${nanoid(12)}`
    const webpBuffer = await sharp(iconBuffer)
      .resize(128, 128)
      .composite([
        {
          input: circleShape,
          blend: 'dest-in',
        },
      ])
      .webp()
      .toBuffer()
    const uploadResult = await storeImage(webpBuffer, `user-icons/${identifier}.webp`)
    if (!uploadResult.success) {
      return { success: false, error: 'failure upload image' }
    }
    newIcon = uploadResult.data?.url
  }
  const updateData: Prisma.UserUpdateInput = {
    name: parsed.data.name,
    message: parsed.data.message,
  }
  if (newIcon) {
    updateData.image = newIcon
  }
  if (parsed.data.presetIcon) {
    updateData.image = parsed.data.presetIcon
  }
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: updateData,
  })
  revalidatePath('/my')
  return {
    success: true,
    message: 'アカウントを更新しました。',
  }
}
