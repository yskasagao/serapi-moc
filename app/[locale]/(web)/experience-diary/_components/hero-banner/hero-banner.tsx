'use client'

import Image from 'next/image'
import FVImage from './assets/media_ex_fv.jpeg'
import { WriteDiaryButton } from '../write-diary-button'

export const HeroBanner = () => {
  return (
    <div className='relative min-h-[250px] w-full overflow-hidden bg-gradient-to-br from-[#e6f3ff] via-[#fff0f5] to-[#e6f3ff] md:min-h-[400px]'>
      <svg
        className='absolute inset-0 h-full w-full opacity-[0.08] md:opacity-[0.15]'
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        fill='none'
      >
        <defs>
          <pattern
            id='hero-pattern'
            x='0'
            y='0'
            width='40'
            height='40'
            patternUnits='userSpaceOnUse'
          >
            <path d='M.5 40V.5H40' fill='none' stroke='currentColor' strokeOpacity='.1' />
            <circle cx='20' cy='20' r='1' fill='currentColor' fillOpacity='.1' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#hero-pattern)' />
      </svg>
      {/* イラスト背景 - モバイルとPC共通のデザイン */}
      <div className='absolute inset-0 z-0'>
        <div className='relative h-full w-full'>
          <Image
            src={FVImage}
            alt='セラピスト体験日記のイメージイラスト'
            fill
            className='object-contain object-right opacity-75 md:object-right-bottom'
            priority
          />
          {/* 共通のオーバーレイグラデーション */}
          <div className='absolute inset-0 bg-gradient-to-t from-white/95 via-white/60 to-white/10' />
          <div className='absolute inset-0 bg-gradient-to-r from-white/40 to-transparent' />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className='container relative z-10 mx-auto px-4 py-6 md:py-12'>
        <div className='mx-auto max-w-md md:ml-0 md:mr-auto md:max-w-xl'>
          {/* テキストコンテンツ - PCでも同様のスタイルを適用 */}
          <div className='relative z-10 rounded-xl border border-white/50 bg-white/85 p-4 text-center shadow-sm backdrop-blur-sm md:p-6 md:text-left'>
            <h1 className='mb-4 text-2xl font-bold text-[#4a4a4a] md:mb-6 md:text-4xl lg:text-5xl'>
              <span className='mb-1 block text-[#ff7e8a] md:mb-2'>セラピスト体験日記</span>
              <span className='text-xl md:text-3xl lg:text-4xl'>あなたの体験が、誰かの選択に</span>
            </h1>

            {/* PCビューでのみ表示する説明文 */}
            <p className='mb-6 hidden max-w-lg text-lg text-gray-600 md:block'>
              実際の体験談を通じて、あなたにぴったりのセラピストを見つけましょう。
              あなたも体験を共有して、みんなの参考になる情報を提供しませんか？
            </p>

            {/* 日記作成ボタン - 認証状態による分岐 */}
            <WriteDiaryButton />
          </div>
        </div>
      </div>

      {/* 波状の装飾 */}
      <div className='absolute bottom-0 left-0 w-full overflow-hidden'>
        <svg
          className='text-background relative h-4 w-full md:h-12'
          preserveAspectRatio='none'
          viewBox='0 0 1200 120'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z'
            className='fill-current opacity-20'
          />
          <path
            d='M985.66 92.83C906.67 72 823.78 31 743.84 14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84 11.73-114 31.07-172 41.86A600.21 600.21 0 010 27.35V120h1200V95.8c-67.81 23.08-144.29 15.47-214.34-3z'
            className='fill-current opacity-10'
          />
        </svg>
      </div>

      {/* グラデーションライン */}
      <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ff7e8a] via-[#ff9eb8] to-[#ffc0cb]' />
    </div>
  )
}
