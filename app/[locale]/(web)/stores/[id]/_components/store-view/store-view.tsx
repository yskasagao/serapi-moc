'use client'
import Image from 'next/image'
import { useState } from 'react'
import { BookmarkPlus, BookmarkCheck } from 'lucide-react'
import { type StoreSNSAccount } from '@/app/api/store-sns-account/schema'
import { StoreTherapistsList } from '../store-therapists-list'
import { FashionBackground } from '@/components/fashion-background'
import { areaGroupNameMap } from '@/lib/constants'
import TwitcastIcon from '@/components/store-sns-account-card/assets/Twitcast.png'

type Props = {
  store: StoreSNSAccount
}

export const StoreView = ({ store }: Props) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  // エリア区分を日本語名で表示
  const getAreaGroupNames = (): string => {
    if (!store.areaGroups || store.areaGroups.length === 0) {
      return ''
    }
    return store.areaGroups
      .map(areaGroupId => areaGroupNameMap.get(areaGroupId) ?? areaGroupId)
      .join('・')
  }

  // プラットフォーム別アイコンコンポーネント
  const PlatformIcon = ({ platform, handle, isLive }: { platform: string, handle: string, isLive?: boolean }) => {
    const iconElement = platform === 'tiktok' 
      ? <span className='text-2xl font-bold text-black'>TT</span>
      : <Image src={TwitcastIcon} alt="TwitCasting" className='h-8 w-8' />

    const getExternalUrl = (platform: string, handle: string): string => {
      const cleanHandle = handle.replace('@', '')
      switch (platform) {
        case 'tiktok':
          return `https://www.tiktok.com/@${cleanHandle}`
        case 'twitcasting':
          return `https://twitcasting.tv/${cleanHandle}`
        default:
          return ''
      }
    }

    return (
      <a
        href={getExternalUrl(platform, handle)}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block hover:scale-105 transition-transform"
      >
        <div className='flex items-center justify-center rounded-lg bg-white p-4 shadow-md border w-16 h-16'>
          {iconElement}
        </div>
        {isLive && (
          <div className='absolute -top-1 -right-1 flex items-center space-x-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white shadow-md'>
            <div className='h-1 w-1 animate-pulse rounded-full bg-white'></div>
            <span className='text-xs'>LIVE</span>
          </div>
        )}
      </a>
    )
  }

  const handleBookmarkToggle = () => {
    // TODO: 実際のブックマーク処理を実装
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className='relative min-h-screen'>
      <FashionBackground />
      <div className='relative z-10 mx-auto mt-16 max-w-[980px] px-4 py-8'>
        <div className='flex flex-col items-center'>
          {/* プロフィールセクション */}
          <div className='w-full max-w-2xl rounded-t-lg bg-white px-4 pb-4 pt-8'>
            <div className='relative mx-auto mb-4 h-32 w-32 md:h-40 md:w-40'>
              {/* 店舗公式サイトリンク付きアイコン */}
              {store.officialUrl ? (
                <a
                  href={store.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full overflow-hidden rounded-full bg-gray-100 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={store.avatar ?? '/noimage.jpg'}
                    alt='店舗プロフィール画像'
                    width={160}
                    height={160}
                    className='object-cover'
                  />
                </a>
              ) : (
                <div className='h-full w-full overflow-hidden rounded-full bg-gray-100'>
                  <Image
                    src={store.avatar ?? '/noimage.jpg'}
                    alt='店舗プロフィール画像'
                    width={160}
                    height={160}
                    className='object-cover'
                  />
                </div>
              )}
            </div>
            
            <div className='mb-4 flex flex-col items-center justify-center gap-2'>
              <h1 className='text-center text-xl font-bold text-gray-800'>
                {store.name}
              </h1>
              
              {/* エリア表示 */}
              {getAreaGroupNames() && (
                <div className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600'>
                  {getAreaGroupNames()}
                </div>
              )}
              
              {/* ブックマークとプラットフォームアイコン横並び */}
              <div className='mt-4 flex items-center justify-center gap-8'>
                {/* プラットフォームアイコン一覧 */}
                <div className='flex items-center gap-6'>
                  {store.platforms?.map((platformData, index) => (
                    <PlatformIcon
                      key={`${platformData.platform}-${index}`}
                      platform={platformData.platform}
                      handle={platformData.handle}
                      isLive={platformData.isLive}
                    />
                  ))}
                </div>
                
                {/* ブックマークボタン（右端） */}
                <button
                  onClick={handleBookmarkToggle}
                  className={`cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 ${
                    isBookmarked ? 'text-amber-400' : 'text-gray-400'
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className='h-8 w-8' />
                  ) : (
                    <BookmarkPlus className='h-8 w-8' />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 所属セラピスト一覧セクション */}
          <StoreTherapistsList storeId={store.id} />
        </div>
      </div>
    </div>
  )
}