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
        <div className='max-w-xl rounded-lg bg-white/80 px-4 py-6 shadow-lg md:p-6'>
          <h1 className='mb-4 text-right whitespace-pre-wrap text-2xl font-bold text-[#ff7e8a] md:text-4xl'>
            {t('text')}
          </h1>
          {/* SP用: 2行表示 */}
          <div className='font-medium text-[#4a4a4a] block md:hidden' style={{fontSize: '1rem'}}>
            <div className='text-center'>新しい出会いが見つかる、</div>
            <div className='text-right'>女風コミュニティサイト</div>
          </div>
          {/* PC用: 1行表示 */}
          <p className='text-right font-medium text-[#4a4a4a] hidden md:block' style={{fontSize: '1rem'}}>
            {t('site')}
          </p>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ff7e8a] via-[#ff9eb8] to-[#ffc0cb]' />
    </div>
  )
}
