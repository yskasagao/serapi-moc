import { DiarySchema } from '@/app/api/experience-diary/search/schema'
import prisma from '@/lib/prisma'
import type { Metadata } from 'next'
import { cache } from 'react'
import { DiaryView } from './_components/diary-view'

type Props = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { id } = await props.params
  const diary = await fetchDiary(id)
  return {
    title: `${diary.title} | ${diary.User.name}のセラピスト体験日記`,
    description: `${diary.User.name}によるセラピスト体験日記「${diary.title}」。${diary.text.slice(
      0,
      100,
    )}...`,
  }
}

const fetchDiary = cache(async (id: string) => {
  const ret = await prisma.experienceDiary.findFirst({
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
    where: {
      id,
    },
  })
  return DiarySchema.parse(ret)
})

export default async function Page(props: Props) {
  const { id } = await props.params
  const diary = await fetchDiary(id)
  return <DiaryView diary={diary} />
}
