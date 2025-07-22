import { Prisma } from '@prisma/client/media-db'

export const SerapistarDetailSelect = Prisma.validator<Prisma.SerapistarDefaultArgs>()({
  select: {
    id: true,
    slug: true,
    avatar: true,
    nickname: true,
    tiktok: true,
    SerapisterParameter: {
      select: {
        looks: true,
        service: true,
        physical: true,
        repeat: true,
        like: true,
      },
    },
    comments: {
      select: {
        text: true,
        textZhHans: true,
        isAnonymous: true,
        dummyUserIcon: true,
        isPublic: true,
        User: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    },
  },
})
export type SerapistarDetail = Prisma.SerapistarGetPayload<typeof SerapistarDetailSelect>
