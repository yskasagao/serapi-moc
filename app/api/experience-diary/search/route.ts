// GETでデータを返す例（query paramでページ指定など）
import prisma from '@/lib/prisma'
import { type Prisma } from '@prisma/client'
import z from 'zod'
import { DiarySchema, ResponseDataSchema } from './schema'
import { generateMockDiaryPagination, generateMockDiarySearchResults, useMockData } from '@/lib/mock-data'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') ?? 20)
  const sort = searchParams.get('sort') ?? 'latest'
  const cursor = searchParams.get('cursor')
  const query = searchParams.get('q') ?? undefined
  const themeId = searchParams.get('themeId') ?? undefined

  // モックデータを使用する場合
  if (useMockData()) {
    if (query) {
      const mockData = generateMockDiarySearchResults(query, 1, limit, themeId)
      return Response.json(mockData)
    } else {
      const mockData = generateMockDiaryPagination(1, limit, 80, sort as 'latest' | 'like' | 'oldest', themeId)
      return Response.json(mockData)
    }
  }
  const orderBy: Prisma.ExperienceDiaryOrderByWithRelationInput =
    sort === 'latest' ? { id: 'desc' } : sort === 'like' ? { like: 'desc' } : { id: 'asc' }
  const where: Prisma.ExperienceDiaryWhereInput = {}
  if (query) {
    where.text = {
      contains: query,
    }
  }

  const ret = await prisma.experienceDiary.findMany({
    select: {
      id: true,
      title: true,
      text: true,
      createdAt: true,
      like: true,
      ExperienceDiaryImage: {
        select: {
          image: true,
        },
      },
      User: {
        select: {
          name: true,
        },
      },
    },
    cursor: cursor ? { id: cursor } : undefined,
    where,
    take: limit + 1,
    orderBy,
  })
  const nextCursor = ret[limit]?.id ?? undefined
  const sliced = ret.slice(0, limit)
  const parsedData = z.array(DiarySchema).parse(sliced)
  return Response.json(ResponseDataSchema.parse({ data: parsedData, nextCursor, sort }))
}
