import { z } from 'zod'

export const AuthFormSchema = z.object({
  featureName: z.string().optional(),
})

export type AuthFormProps = z.infer<typeof AuthFormSchema>
