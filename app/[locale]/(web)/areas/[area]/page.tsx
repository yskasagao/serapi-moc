import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { AreaSerapistList } from '../_components/area-serapist-list'
import { API_ORIGIN, areaGroupNameMap, ORIGIN } from '@/lib/constants'
import type { SerapistPaginator } from '@/app/api/serapist/schema'

type Props = {
  params: Promise<{ area: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const PerPage = 12
const fetchSerapistByAreaGroup = async (
  areaGroup: string,
  page: number,
): Promise<SerapistPaginator> => {
  const params = new FormData()
  params.set('areaGroup', areaGroup)
  params.set('page', `${page}`)
  params.set('limit', `${PerPage}`)
  const ret = await fetch(`${API_ORIGIN}/api/serapist/fetch-active-by-area`, {
    method: 'POST',
    body: params,
    cache: 'no-cache',
  })
  return (await ret.json()) as SerapistPaginator
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params
  const searchParams = await props.searchParams
  const page = searchParams.page ? Number(searchParams.page) : 1
  const groupName = areaGroupNameMap.get(params.area)
  if (page > 1) {
    return {
      title: `TikTokで${groupName}の推しセラピスト探し ${page}ページ目 - 女性用風俗のコミュニティサイト`,
      description: `TikTokで${groupName}の推しの女性用風俗セラピストを見つけて応援。女子目線のリアルな口コミが見れて、推し活仲間も見つかるコミュニティサイトです。`,
      alternates: {
        canonical: `${ORIGIN}/areas/${params.area}`,
      },
    }
  }
  return {
    title: `TikTokで${groupName}の推しセラピスト探し - 女性用風俗のコミュニティサイト`,
    description: `TikTokで${groupName}の推しの女性用風俗セラピストを見つけて応援。女子目線のリアルな口コミが見れて、推し活仲間も見つかるコミュニティサイトです。`,
    alternates: {
      canonical: `${ORIGIN}/areas/${params.area}`,
    },
  }
}

export default async function Page(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const page = searchParams.page ? Number(searchParams.page) : 1

  const pageTranslations = await getTranslations('areaSerapistList')
  const areaTranslations = await getTranslations('area')

  const AREA_GROUP_MAP_NAME = new Map([
    ['hokkaido', areaTranslations('hokkaido')],
    ['tohoku', areaTranslations('tohoku')],
    ['kanto', areaTranslations('kanto')],
    ['chubu', areaTranslations('chubu')],
    ['kansai', areaTranslations('kansai')],
    ['chugoku-shikoku', areaTranslations('chugoku-shikoku')],
    ['kyusyu-okinawa', areaTranslations('kyusyu-okinawa')],
  ])

  const areaGroupName = AREA_GROUP_MAP_NAME.get(params.area)
  if (!areaGroupName) {
    return notFound()
  }
  const paginator = await fetchSerapistByAreaGroup(params.area, page)
  return (
    <main className='container mx-auto max-w-[980px] px-4 py-8'>
      <h1 className='mb-6 text-center text-2xl font-semibold text-gray-600'>
        {pageTranslations('title', { area: areaGroupName })}
      </h1>
      <AreaSerapistList
        paginator={paginator}
        currentPage={page}
        areaGroup={areaGroupName}
        perPage={PerPage}
      />
    </main>
  )
}
