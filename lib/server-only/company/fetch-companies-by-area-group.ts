'use server'
import { type Prisma } from '@prisma/client/company-db'
import z from 'zod'
import prisma from '@/lib/company-prisma'
import { CompanySchema, type Company } from '@/lib/server-only/company/schema'

type Props = {
  areaGroup: string
  page?: number
  limit?: number
}

export const fetchCompaniesByAreaGroup = async (
  props: Props,
): Promise<{ total: number; companies: Company[] }> => {
  const where: Prisma.CompanyWhereInput = {
    CompanyArea: {
      some: {
        areaGroup: props.areaGroup,
      },
    },
  }
  const total = await prisma.company.count({ where })
  const companies = z.array(CompanySchema).parse(
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
      where,
      orderBy: {
        id: 'desc',
      },
    }),
  )
  return { total, companies }
}
