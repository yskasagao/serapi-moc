'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { type StoreSNSAccount } from '@/app/api/store-sns-account/schema'
import { areaGroupNameMap } from '@/lib/constants'
import TwitcastIcon from './assets/Twitcast.png' // ツイキャスアイコン（PNG）

type Props = {
  storeSNSAccount: StoreSNSAccount
}

export const StoreSNSAccountCard = (props: Props) => {
  // ライブ配信中の場合の特別なスタイリング
  const isLive = props.storeSNSAccount.isLive === true
  const cardClasses = isLive
    ? 'flex aspect-[228/454] w-full min-w-[163px] max-w-[228px] flex-col overflow-hidden rounded-lg bg-white shadow-lg ring-2 ring-red-200 ring-opacity-60'
    : 'flex aspect-[228/454] w-full min-w-[163px] max-w-[228px] flex-col overflow-hidden rounded-lg bg-white shadow-md'

  // プラットフォーム別アイコン
  const getPlatformIcon = () => {
    switch (props.storeSNSAccount.platform) {
      case 'tiktok':
        return <span className='text-xs font-bold text-black'>TT</span>
      case 'twitcasting':
        return <Image src={TwitcastIcon} alt="TwitCasting" className='h-4 w-4' />
      default:
        return null
    }
  }

  // エリア区分を日本語名で表示
  const getAreaGroupNames = (): string => {
    if (!props.storeSNSAccount.areaGroups || props.storeSNSAccount.areaGroups.length === 0) {
      return ''
    }
    return props.storeSNSAccount.areaGroups
      .map(areaGroupId => areaGroupNameMap.get(areaGroupId) ?? areaGroupId)
      .join('・')
  }

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

        {/* プラットフォームアイコン */}
        <div className='absolute top-2 right-2 z-10 flex items-center justify-center rounded-full bg-white p-1.5 shadow-md'>
          {getPlatformIcon()}
        </div>
        
        <div className='aspect-square w-[88%] overflow-hidden rounded-lg'>
          <Image
            src={props.storeSNSAccount.avatar ?? '/noimage.jpg'}
            alt={props.storeSNSAccount.name}
            width={200}
            height={200}
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      
      <div className='flex flex-col items-center justify-center p-2 text-center'>
        <h3 className='mb-1 truncate text-sm font-medium text-gray-800'>
          {props.storeSNSAccount.name}
        </h3>
        <p className='mb-1 truncate text-xs text-gray-600'>
          {props.storeSNSAccount.handle}
        </p>
        {/* エリア区分表示 */}
        {getAreaGroupNames() && (
          <div className='text-xs text-gray-500'>
            {getAreaGroupNames()}
          </div>
        )}
      </div>
    </motion.div>
  )
}
