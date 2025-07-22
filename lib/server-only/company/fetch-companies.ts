'use server'

import z from 'zod'
import prisma from '@/lib/company-prisma'
import { CompanySchema } from '@/lib/server-only/company/schema'

export const fetchCompanies = async () => {
  return z.array(CompanySchema).parse(
    await prisma.company.findMany({
      select: {
        url: true,
        image: true,
        imageZhHans: true,
        name: true,
        CompanyArea: {
          select: {
            area: true,
            areaGroup: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    }),
  )
}
