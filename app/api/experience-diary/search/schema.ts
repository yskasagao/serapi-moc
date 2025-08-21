import z from 'zod'

export const DiarySchema = z.object({
  id: z.string().cuid(),
  like: z.number(),
  text: z.string(),
  title: z.string(),
  createdAt: z.date(),
  themeId: z.string().optional(), // テーマIDを追加
  User: z.object({
    name: z.string(),
  }),
  ExperienceDiaryImage: z.array(
    z.object({
      image: z.string().url(),
    }),
  ),
})

export const ResponseDataSchema = z.object({
  data: z.array(DiarySchema),
  nextCursor: z.string().optional(),
  sort: z.enum(['latest', 'like', 'oldest']),
})

export type Diary = z.infer<typeof DiarySchema>
export type DiaryPagination = z.infer<typeof ResponseDataSchema>
