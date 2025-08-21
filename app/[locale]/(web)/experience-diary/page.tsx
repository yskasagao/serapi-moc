import { HeroBanner } from './_components/hero-banner'
import { DiarySearchView } from '@/app/[locale]/(web)/experience-diary/_components/diary-search-view'
import type { Metadata } from 'next'
import { API_ORIGIN, APP_NAME } from '@/lib/constants'
import { cookies } from 'next/headers'
import { type DiaryPagination } from '@/app/api/experience-diary/search/schema'

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `セラピスト体験日記 | ${APP_NAME}`,
    description:
      'あなたの体験が、誰かの選択に！実際の体験談を通じて、あなたにぴったりのセラピストを見つけましょう。 あなたも体験を共有して、みんなの参考になる情報を提供しませんか？',
  }
}

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page(props: Props) {
  const params = await props.searchParams
  const cookieStore = await cookies()
  const searchParams = new URLSearchParams()
  if (params.q) {
    searchParams.set('q', params.q as string)
  }
  if (params.sort) {
    searchParams.set('sort', params.sort as string)
  }
  if (params.themeId) {
    searchParams.set('themeId', params.themeId as string)
  }
  const ret = await fetch(`${API_ORIGIN}/api/experience-diary/search?${searchParams.toString()}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  const result = (await ret.json()) as DiaryPagination
  return (
    <div>
      <HeroBanner />
      <div className='mx-auto max-w-[980px] px-4 py-8'>
        <DiarySearchView data={result.data} nextCursor={result.nextCursor} sort={result.sort} />
      </div>
    </div>
  )
}
