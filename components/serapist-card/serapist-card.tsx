import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { usePathname } from '@/i18n/routing'
import dayjs from '@/lib/dayjs'
import { incrementStar } from '@/lib/server-only/serapist/increment-star'
import { type Serapist } from '@/app/api/serapist/schema'

const key = 'star-params'
type StarParam = {
  date: string
  count: number
}
const getLocalStorage = (key: string): StarParam | null => {
  const item = window.localStorage.getItem(key)
  if (!item) {
    return null
  }
  return JSON.parse(item) as StarParam
}

type Props = {
  serapist: Serapist
}
export const SerapistCard = (props: Props) => {
  const totalStar = props.serapist.parameter
    ? props.serapist.parameter.like +
      props.serapist.parameter.looks +
      props.serapist.parameter.repeat +
      props.serapist.parameter.physical +
      props.serapist.parameter.service
    : 0
  const pathname = usePathname()
  
  // ライブ配信中の場合の特別なスタイリング
  const isLive = props.serapist.isLive === true
  const cardClasses = isLive
    ? 'flex aspect-[228/454] w-full min-w-[163px] max-w-[228px] flex-col overflow-hidden rounded-lg bg-white shadow-lg ring-2 ring-red-200 ring-opacity-60'
    : 'flex aspect-[228/454] w-full min-w-[163px] max-w-[228px] flex-col overflow-hidden rounded-lg bg-white shadow-md'
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cardClasses}
    >
      <div className='relative flex flex-grow items-center justify-center bg-gray-100'>
        {/* ライブ配信中インジケーター */}
        {isLive && (
          <div className='absolute top-2 left-2 z-10 flex items-center space-x-1 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white shadow-md'>
            <div className='h-1.5 w-1.5 animate-pulse rounded-full bg-white'></div>
            <span>LIVE</span>
          </div>
        )}
        
        <div className='aspect-square w-[88%] overflow-hidden rounded-full'>
          <Image
            src={props.serapist.avatar ?? '/noimage.jpg'}
            alt={props.serapist.nickname}
            width={200}
            height={200}
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      <button
        className='group flex items-center justify-end p-2 text-brand-icon transition-colors hover:text-brand-icon-hover'
        onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          e.preventDefault()
          const toDay = dayjs().format('YYYY-MM-DD')
          const params = getLocalStorage(key) ?? {
            date: toDay,
            count: 100,
          }
          if (params.date === toDay) {
            if (params.count > 0) {
              params.count = params.count - 1
            }
          } else {
            params.date = toDay
            params.count = 99
          }
          if (params.count < 1) {
            toast.error('1日に送れるStarの上限に達しています（1日の上限数100回')
            return
          }
          const result = await incrementStar(props.serapist.slug || '', pathname)
          if (!result.success) {
            toast.error(result.error)
            return
          }
          localStorage.setItem(key, JSON.stringify(params))
          toast.success('Starを送信しました')
        }}
      >
        <span className='mr-1 text-sm'>
          +{totalStar}
        </span>
        <svg
          width='24'
          height='24'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='transition-colors'
        >
          <path
            d='M16 2.66667L20.12 11.0133L29.3333 12.36L22.6667 18.8533L24.24 28.0133L16 23.6933L7.76 28.0133L9.33333 18.8533L2.66667 12.36L11.88 11.0133L16 2.66667Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </motion.div>
  )
}
