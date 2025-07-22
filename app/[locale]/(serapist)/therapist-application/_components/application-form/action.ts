'use server'
import { ApplicationFormSchema } from '@/app/[locale]/(serapist)/therapist-application/_components/application-form/schema'
import mediaPrisma from '@/lib/prisma'
type Result =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }

export const application = async (formData: FormData): Promise<Result> => {
  const parsed = ApplicationFormSchema.safeParse({
    nickname: formData.get('nickname'),
    shopId: formData.get('shopId'),
    customShop: formData.get('customShop'),
    tiktok: formData.get('tiktok'),
    twitter: formData.get('twitter'),
    age: Number(formData.get('age')),
    height: Number(formData.get('height')),
    weight: Number(formData.get('weight')),
  })
  if (!parsed.success) {
    return { success: false, error: parsed.error.toString() }
  }
  await mediaPrisma.applicationSerapistar.create({
    data: {
      nickname: parsed.data.nickname,
      shopId: (parsed.data.shopId ?? '').length > 0 ? parsed.data.shopId : undefined,
      customShop: parsed.data.customShop,
      tiktok: parsed.data.tiktok,
      twitter: parsed.data.twitter,
      age: parsed.data.age,
      height: parsed.data.height,
      weight: parsed.data.weight,
    },
  })
  return { success: true }
}
