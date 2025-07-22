import prisma from '@/lib/prisma'
import { SerapistPaginatorSchema, SerapistSchema } from '../schema'
import z from 'zod'
import type { Prisma } from '@prisma/client/media-db'
import { generateMockSerapistPaginator, useMockData } from '@/lib/mock-data'

const FormData = z.object({
  areaGroup: z.enum([
    'hokkaido',
    'tohoku',
    'kanto',
    'chubu',
    'kansai',
    'chugoku-shikoku',
    'kyusyu-okinawa',
  ]),
  page: z.preprocess((val) => {
    if (typeof val === 'string') {
      return Number.parseInt(val)
    }
    return val
  }, z.number().nullish()),
  limit: z.preprocess((val) => {
    if (typeof val === 'string') {
      return Number.parseInt(val)
    }
    return val
  }, z.number().nullish()),
})

export const POST = async (request: Request) => {
  const formData = await request.formData()

  const parsed = FormData.parse({
    areaGroup: formData.get('areaGroup'),
    page: formData.get('page'),
    limit: formData.get('limit'),
  })

  const limit = parsed.limit ?? 32
  const page = parsed.page ?? 1

  // モックデータを使用する場合
  if (useMockData()) {
    // エリアごとに異なる件数でモックデータを生成
    const areaCounts: Record<string, number> = {
      'hokkaido': 20,
      'tohoku': 15,
      'kanto': 80,
      'chubu': 35,
      'kansai': 60,
      'chugoku-shikoku': 25,
      'kyusyu-okinawa': 30
    }
    const totalCount = areaCounts[parsed.areaGroup] || 30
    const mockData = generateMockSerapistPaginator(page, limit, totalCount)
    return Response.json(mockData)
  }

  const where: Prisma.SerapistarWhereInput = {
    isActive: true,
    shop: {
      areas: {
        some: {
          areaGroup: parsed.areaGroup,
        },
      },
    },
  }

  const total = await prisma.serapistar.count({
    where,
  })
  const users = await prisma.serapistar.findMany({
    orderBy: {
      id: 'desc',
    },
    where,
    skip: (page - 1) * limit,
    take: limit,
    include: {
      SerapistarTiktokInfo: true,
      SerapisterParameter: {
        select: {
          like: true,
          service: true,
          looks: true,
          physical: true,
          repeat: true,
        },
      },
    },
  })
  const totalPages = Math.ceil(total / limit)
  const hasNextPage = page < totalPages
  const results = users.map((v) => {
    return SerapistSchema.parse({
      slug: v.slug,
      nickname: v.nickname,
      twitter: v.twitter,
      tiktok: v.tiktok,
      avatar: v.avatar,
      parameter: v.SerapisterParameter,
    })
  })

  return Response.json(
    SerapistPaginatorSchema.parse({
      data: results,
      nextPage: hasNextPage ? page + 1 : undefined,
      total,
    }),
  )
}
