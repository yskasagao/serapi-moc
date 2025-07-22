import Image from 'next/image'
import { useLocale } from 'next-intl'
import { areaNameTranslations } from '@/lib/constants'
import type { Company } from '@/lib/server-only/company/schema'
type Props = {
  company: Company
}
export const CompanyCard = (props: Props) => {
  const locale = useLocale()

  const areaName = props.company.CompanyArea.map((v) => {
    if (locale === 'ch') {
      const translation = areaNameTranslations.get(locale)
      if (translation) {
        return translation[v.area]
      }
      return v.area
    } else {
      return v.area
    }
  }).join('・')

  const image =
    locale == 'ja'
      ? props.company.image
      : props.company.imageZhHans
        ? props.company.imageZhHans
        : props.company.image
  return (
    <div key={props.company.name} className='w-full overflow-hidden rounded-lg bg-white shadow-md'>
      <div className='relative aspect-square'>
        <Image src={image} alt={props.company.name} fill className='h-full w-full' />
      </div>
      <div className='p-2'>
        <h3 className='mb-1 truncate text-sm font-semibold text-gray-700'>{props.company.name}</h3>
        <p className='truncate text-xs text-gray-600'>{areaName}</p>
      </div>
    </div>
  )
}
