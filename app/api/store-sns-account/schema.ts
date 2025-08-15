import z from 'zod'

const PlatformAccountSchema = z.object({
  platform: z.enum(['tiktok', 'twitcasting']),          // SNSプラットフォーム
  handle: z.string(),                                    // @username
  isLive: z.boolean().optional(),                       // このプラットフォームでのライブ配信中フラグ
})

export const StoreSNSAccountSchema = z.object({
  id: z.string(),
  name: z.string(),                                      // 店舗名・アカウント名
  avatar: z.string().nullable(),                         // アイコン画像
  officialUrl: z.string().optional(),                    // 店舗公式サイトURL
  platforms: z.array(PlatformAccountSchema),             // 複数プラットフォームアカウント
  areaGroups: z.array(z.string()).optional(),           // エリア区分（7区分のID配列）
})

export type StoreSNSAccount = z.infer<typeof StoreSNSAccountSchema>

export const StoreSNSAccountListSchema = z.array(StoreSNSAccountSchema)

export type StoreSNSAccountList = z.infer<typeof StoreSNSAccountListSchema>
