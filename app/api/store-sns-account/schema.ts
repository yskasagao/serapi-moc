import z from 'zod'

export const StoreSNSAccountSchema = z.object({
  id: z.string(),
  name: z.string(),                                    // 店舗名・アカウント名
  avatar: z.string().nullable(),                       // アイコン画像
  platform: z.enum(['tiktok', 'twitcasting']),        // SNSプラットフォーム（TikTok・ツイキャス）
  handle: z.string(),                                  // @username
  isLive: z.boolean().optional(),                     // ライブ配信中フラグ
  areaGroups: z.array(z.string()).optional(),         // エリア区分（7区分のID配列）
})

export type StoreSNSAccount = z.infer<typeof StoreSNSAccountSchema>

export const StoreSNSAccountListSchema = z.array(StoreSNSAccountSchema)

export type StoreSNSAccountList = z.infer<typeof StoreSNSAccountListSchema>
