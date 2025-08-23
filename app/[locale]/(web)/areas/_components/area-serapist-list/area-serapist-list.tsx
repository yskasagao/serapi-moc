'use client'
import { useTranslations } from 'next-intl'
import { Pagination } from '../pagination'
import { SectionTitle } from '@/app/_components/section-title/section-title'
import { SerapistCard } from '@/components/serapist-card'
import { Link, usePathname } from '@/i18n/routing'
import { Toaster } from '@/app/_components/toaster'
import type { SerapistPaginator } from '@/app/api/serapist/schema'
import { useRouter } from 'next/navigation'

type Props = {
  areaGroup?: string
  paginator: SerapistPaginator
  currentPage: number
  perPage: number
}

export const AreaSerapistList = (props: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const changePage = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', `${page}`)
    router.replace(`${pathname}?${params.toString()}`)
  }
  const pageTranslation = useTranslations('areaSerapistList')
  return (
    <div>
      <SectionTitle>{pageTranslation('serapistList')}</SectionTitle>
      <div>
        {props.paginator.data.length === 0 && (
          <p className='text-center'>セラピストデータがありません。</p>
        )}
        <div className='grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4'>
          {props.paginator.data.map((v, index) => {
            return (
              <Link href={`/therapists/${v.slug}`} key={`area-serapist-${index}`}>
                <SerapistCard serapist={v} />
              </Link>
            )
          })}
        </div>
        <Pagination
          currentPage={props.currentPage}
          totalPages={Math.ceil(props.paginator.total / props.perPage)}
          onPageChange={changePage}
        />
        <Toaster />
      </div>
    </div>
  )
}
