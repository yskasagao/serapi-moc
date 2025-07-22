import z from 'zod'

export const PostCommentSchema = z.object({
  isAnonymous: z.coerce.boolean(),
  isPrivate: z.coerce.boolean(),
  message: z.string().min(1).max(1000),
})
