'use client'
import { type Serapist } from '@/app/api/serapist/schema'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/app/_components/section-title/section-title'
import { Link } from '@/i18n/routing'
import { SerapistCard } from '@/components/serapist-card'

type Props = {
  serapistList: Serapist[]
}
export const SerapistSection = (props: Props) => {
  const pageTranslation = useTranslations('serapistList')
  const commonTranslation = useTranslations('common')
  
  // LIVE配信中のセラピストは除外（重複表示回避）
  const nonLiveSerapists = props.serapistList.filter(serapist => serapist.isLive !== true)
  
  return (
    <div>
      <SectionTitle>{pageTranslation('title')}</SectionTitle>
      <div>
        {nonLiveSerapists.length === 0 && (
          <p className='text-center'>セラピストデータがありません。</p>
        )}
        <div className='grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4'>
          {nonLiveSerapists.map((v) => {
            return (
              <Link href={`/therapists/${v.slug}`} key={v.slug}>
                <SerapistCard key={v.slug} serapist={v} />
              </Link>
            )
          })}
        </div>
        <div className='mt-8 flex w-full justify-center'>
          <Link
            href={`/areas`}
            className='rounded-md border border-gray-800 bg-white px-8 py-2 text-sm font-medium text-gray-800 transition-colors duration-300 hover:bg-gray-100'
          >
            {commonTranslation('readMore')}
          </Link>
        </div>
      </div>
    </div>
  )
}
