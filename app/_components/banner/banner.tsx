import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import KeyImage from './assets/banner.jpg'
export const Banner = async () => {
  const t = await getTranslations('components.banner')
  return (
    <div className='relative h-[300px] w-full overflow-hidden bg-gradient-to-r from-[#e6f3ff] to-[#fff0f5]'>
      <div className='absolute inset-0 flex items-center'>
        <Image
          src={KeyImage}
          alt='お客様を癒すセラピスト'
          width={600}
          height={300}
          className='h-full object-cover opacity-50'
          priority={true}
        />
        <div className='absolute inset-0 bg-gradient-to-r from-[#e6f3ff]/80 via-transparent to-[#fff0f5]/80' />
      </div>
      <div
        className='absolute inset-0 flex flex-col items-end justify-center px-4 sm:pr-8'
        data-id='30'
      >
        <div className='max-w-xl rounded-lg bg-white/80 p-6 shadow-lg'>
          <h1 className='mb-4 flex items-center justify-end whitespace-pre-wrap text-3xl font-bold text-[#ff7e8a] md:text-4xl'>
            <svg
              viewBox='0 0 24 24'
              fill='currentColor'
              className='mr-2 h-8 w-8'
              aria-hidden='true'
            >
              <path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z' />
            </svg>
            {t('text')}
          </h1>
          <p className='text-right text-xl font-medium text-[#4a4a4a] md:text-2xl'>{t('site')}</p>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ff7e8a] via-[#ff9eb8] to-[#ffc0cb]' />
    </div>
  )
}
