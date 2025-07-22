import z from 'zod'

export const CompanySchema = z.object({
  url: z.string(),
  image: z.string(),
  imageZhHans: z.string(),
  name: z.string(),
  CompanyArea: z.array(
    z.object({
      area: z.string(),
      areaGroup: z.string(),
    }),
  ),
})
export type Company = z.infer<typeof CompanySchema>
