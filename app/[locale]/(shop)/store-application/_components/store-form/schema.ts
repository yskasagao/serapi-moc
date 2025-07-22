import z from 'zod'

export const StoreApplicationSchema = z.object({
  storeName: z.string().min(1, { message: '店舗名を入力してください' }),
  homepageUrl: z.string().url({ message: '正しいURLを入力してください' }).optional().or(z.literal('')),
  storeImage: z.instanceof(File).optional(),
  businessNumber: z.string().min(1, { message: '事業者番号を入力してください' }),
  prefecture: z.string().min(1, { message: 'エリアを選択してください' }),
  email: z.string().email({ message: '正しいメールアドレスを入力してください' }),
})

export type StoreApplicationData = z.infer<typeof StoreApplicationSchema>
