import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { SerapistPaginator } from '@/app/api/serapist/schema'
import { API_ORIGIN, ORIGIN } from '@/lib/constants'
import { AreaSerapistList } from './_components/area-serapist-list'

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.searchParams
  const page = params.page ? Number(params.page) : 1
  if (page > 1) {
    return {
      title: `TikTokで全国の推しセラピスト探し ${page}ページ目 - 女性用風俗のコミュニティサイト`,
      description: `TikTokで全国の推しの女性用風俗セラピストを見つけて応援。女子目線のリアルな口コミが見れて、推し活仲間も見つかるコミュニティサイトです。`,
      alternates: {
        canonical: `${ORIGIN}/areas`,
      },
    }
  }
  return {
    title: `TikTokで全国の推しセラピスト探し - 女性用風俗のコミュニティサイト`,
    description: `TikTokで全国の推しの女性用風俗セラピストを見つけて応援。女子目線のリアルな口コミが見れて、推し活仲間も見つかるコミュニティサイトです。`,
    alternates: {
      canonical: `${ORIGIN}/areas`,
    },
  }
}
const PerPage = 12
const fetchActive = async (page: number): Promise<SerapistPaginator> => {
  const params = new FormData()
  params.set('page', `${page}`)
  params.set('limit', `${PerPage}`)
  const ret = await fetch(`${API_ORIGIN}/api/serapist/fetch-active-all`, {
    method: 'POST',
    body: params,
    cache: 'no-cache',
  })
  return (await ret.json()) as SerapistPaginator
}
export default async function Page(props: Props) {
  const params = await props.searchParams
  const page = params.page ? Number(params.page) : 1
  const pageTranslations = await getTranslations('areaSerapistList')
  const paginator = await fetchActive(page)
  return (
    <main className='container mx-auto max-w-[980px] px-4 py-8'>
      <h1 className='mb-6 text-center text-2xl font-semibold text-gray-600'>
        {pageTranslations('title', { area: '全国' })}
      </h1>
      <AreaSerapistList paginator={paginator} currentPage={page} perPage={PerPage} />
    </main>
  )
}
