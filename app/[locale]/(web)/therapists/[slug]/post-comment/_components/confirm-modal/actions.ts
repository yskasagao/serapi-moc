'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { getLocale } from 'next-intl/server'
import { z } from 'zod'
import { PostCommentSchema } from '../form/schema'
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

const schema = PostCommentSchema.extend({
  targetSlug: z.string(),
  dummyIcon: z.string().optional(),
})

export const postComment = async (formData: FormData): Promise<Result> => {
  const session = await getServerSession(getAuthOptions())
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.message,
    }
  }
  const serapistar = await prisma.serapistar.findFirst({
    where: {
      slug: parsed.data.targetSlug,
    },
  })
  if (!serapistar) {
    return {
      success: false,
      error: 'ターゲットが存在しません',
    }
  }
  await prisma.comment.create({
    data: {
      userId: session.user.id,
      serapistarId: serapistar.id,
      text: parsed.data.message,
      isPublic: !parsed.data.isPrivate,
      isAnonymous: parsed.data.isAnonymous,
      dummyUserIcon: parsed.data.isAnonymous ? parsed.data.dummyIcon : '',
    },
  })
  const locale = await getLocale()
  const cookieStore = await cookies()
  cookieStore.set('flush', 'メッセージ投稿完了', { maxAge: 3 })
  if (locale === 'ja') {
    revalidatePath(`/therapists/${parsed.data.targetSlug}`)
    redirect(`/therapists/${parsed.data.targetSlug}`)
  } else {
    revalidatePath(`/${locale}/therapists/${parsed.data.targetSlug}`)
    redirect(`/${locale}/therapists/${parsed.data.targetSlug}`)
  }
}
