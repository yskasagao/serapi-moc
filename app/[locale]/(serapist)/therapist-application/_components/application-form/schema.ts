import z from 'zod'
export const ApplicationFormSchema = z
  .object({
    nickname: z.string().min(1, { message: 'nicknameを入力してください' }),
    twitter: z.string().optional(),
    tiktok: z.string().min(1, {}),
    age: z.number().optional(),
    height: z.number().optional(),
    weight: z.number().optional(),
  })
  .and(
    z.union([
      z.object({ shopId: z.string().cuid(), customShop: z.literal('').optional() }),
      z.object({
        shopId: z.literal('').optional(),
        customShop: z.string().min(1, { message: 'shopIdまたはcustomShopのどちらかが必須です' }),
      }),
    ]),
  )
