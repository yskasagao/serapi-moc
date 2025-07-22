'use client'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { SectionTitle } from '@/app/_components/section-title/section-title'
import { CompanyCard } from '@/components/company-card'
import { type Company } from '@/lib/server-only/company/schema'

type Props = {
  companies: Company[]
}
const limit = 16
export const CompanyList = (props: Props) => {
  const [currentLimit, setCurrentLimit] = useState<number>(limit)
  const displayCompanies = useMemo(() => {
    return props.companies.slice(0, currentLimit)
  }, [props.companies, currentLimit])
  const more = () => {
    setCurrentLimit((p) => {
      return p + limit
    })
  }
  const pageTranslation = useTranslations('shopList')
  const commonTranslation = useTranslations('common')
  return (
    <div>
      <SectionTitle>{pageTranslation('title')}</SectionTitle>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {displayCompanies.map((v) => {
          return (
            <a key={v.url} href={v.url} target='_blank' rel={'nofollow noreferrer'}>
              <CompanyCard key={v.name} company={v} />
            </a>
          )
        })}
      </div>
      {displayCompanies.length !== props.companies.length && (
        <div className='mt-8 flex w-full justify-center'>
          <button
            onClick={more}
            className='rounded-md border border-gray-800 bg-white px-8 py-2 text-sm font-medium text-gray-800 transition-colors duration-300 hover:bg-gray-100'
          >
            {commonTranslation('readMore')}
          </button>
        </div>
      )}
    </div>
  )
}
