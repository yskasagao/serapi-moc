import z from 'zod'

export const SerapistSchema = z.object({
  slug: z.string(),
  nickname: z.string(),
  twitter: z.string().nullable(),
  tiktok: z.string().nullable(),
  avatar: z.string().nullable(),
  parameter: z
    .object({
      like: z.number(),
      service: z.number(),
      looks: z.number(),
      physical: z.number(),
      repeat: z.number(),
    })
    .nullable(),
})
export type Serapist = z.infer<typeof SerapistSchema>
