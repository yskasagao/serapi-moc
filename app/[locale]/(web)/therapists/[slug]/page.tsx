import { type Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { cache } from 'react'
import { SerapisterView } from './_components/serapister-view'
import { type SerapistarDetail } from './_components/serapister-view/type'
import { getAuthOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { APP_NAME, ORIGIN } from '@/lib/constants'
import { getMockSerapistBySlug } from '@/lib/mock-serapist-data'

type Props = {
  params: Promise<{ slug: string }>
}

const fetchSerapistar = cache(async (slug: string): Promise<SerapistarDetail> => {
  // 開発環境でモックデータを使用する場合
  const mockData = getMockSerapistBySlug(slug)
  if (mockData) {
    return mockData
  }

  // 本番環境: データベースからデータを取得
  return prisma.serapistar.findFirst({
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
        where: {
          deletedAt: null,
        },
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
        orderBy: {
          id: 'desc',
        },
      },
    },
    where: {
      slug,
      isActive: true,
    },
  })
})

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params
  const serapister = await fetchSerapistar(params.slug)
  return {
    title: `セラピスト「${serapister.nickname}」の評価・口コミ・ファンメッセージ | ${APP_NAME}`,
    description: `セラピスト「${serapister.nickname}」の利用者の評価や口コミを掲載中。リアルな声をもとにあなたにぴったりの癒し体験を。`,
    alternates: {
      canonical: `${ORIGIN}/therapists/${params.slug}`,
    },
  }
}

export default async function Page(props: Props) {
  try {
    const params = await props.params
    const serapister = await fetchSerapistar(params.slug)
    
    // 開発環境でモックデータを使用している場合はブックマークはサンプル状態
    let isBookmarked = false
    const mockData = getMockSerapistBySlug(params.slug)
    if (mockData) {
      // モックデータの場合はサンプル状態を返す
      isBookmarked = false // または true でサンプル状態
    } else {
      // 本番環境: 実際のブックマーク状態をチェック
      const session = await getServerSession(getAuthOptions())
      if (session) {
        const bookmark = await prisma.bookmark.findFirst({
          where: {
            serapistarId: serapister.id,
            userId: session.user.id,
          },
        })
        isBookmarked = bookmark !== null
      }
    }
    
    const flushMessage = (await cookies()).get('flush')

    return (
      <SerapisterView
        serapistar={serapister}
        message={flushMessage?.value}
        isBookmarked={isBookmarked}
      />
    )
  } catch {
    return notFound()
  }
}
