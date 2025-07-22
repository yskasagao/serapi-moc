import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import { usePathname } from '@/i18n/routing'
import dayjs from '@/lib/dayjs'
import { incrementStar } from '@/lib/server-only/serapist/increment-star'
import { type Serapist } from '@/lib/server-only/serapist/schema'

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
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='flex aspect-[228/454] w-full min-w-[163px] max-w-[228px] flex-col overflow-hidden rounded-lg bg-white shadow-md'
    >
      <div className='relative flex flex-grow items-center justify-center bg-gray-100'>
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
        className='flex items-center justify-end p-2'
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
        <span className='mr-1 text-sm' style={{ color: 'rgb(254, 44, 85)' }}>
          +{totalStar}
        </span>
        <svg
          width='24'
          height='24'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16 2.66667L20.12 11.0133L29.3333 12.36L22.6667 18.8533L24.24 28.0133L16 23.6933L7.76 28.0133L9.33333 18.8533L2.66667 12.36L11.88 11.0133L16 2.66667Z'
            stroke='rgb(254, 44, 85)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </motion.div>
  )
}
