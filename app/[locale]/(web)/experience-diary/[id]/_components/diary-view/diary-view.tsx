'use client'

import { type Diary } from '@/app/api/experience-diary/search/schema'
import Link from 'next/link'
import { ArrowLeft, Flag, Heart, Share2 } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useTransition } from 'react'
import {
  decrementLike,
  incrementLike,
} from '@/app/[locale]/(web)/experience-diary/[id]/_components/diary-view/action'
import { getActiveThemes } from '@/lib/mock-data/diary-themes'
type Props = {
  diary: Diary
}

const storageKey = 'serapi:diary:liked-list'

export const DiaryView = (props: Props) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isPending, startTransition] = useTransition()

  // テーマ情報を取得
  const activeThemes = getActiveThemes()
  const theme = props.diary.themeId 
    ? activeThemes.find(t => t.id === props.diary.themeId)
    : null

  const handleLike = () => {
    const storeData = localStorage.getItem(storageKey)
    const likedList = storeData === null ? [] : (JSON.parse(storeData) as string[])
    const isLiked = likedList.find((v) => v === props.diary.id) !== undefined
    if (!isLiked) {
      startTransition(async () => {
        const ret = await incrementLike(props.diary.id)
        if (ret.success) {
          localStorage.setItem(storageKey, JSON.stringify([...likedList, props.diary.id]))
        }
      })
    } else {
      startTransition(async () => {
        const ret = await decrementLike(props.diary.id)
        if (ret.success) {
          localStorage.setItem(
            storageKey,
            JSON.stringify(likedList.filter((v) => v !== props.diary.id)),
          )
        }
      })
    }
    setIsLiked(!isLiked)
  }

  const handleShare = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: props.diary.title,
          text: `${props.diary.title} - セラピスト体験日記`,
          url: window.location.href,
        })
        .catch((error) => console.log('共有エラー:', error))
    } else {
      // Web Share APIがサポートされていない場合
      alert('URLをコピーしました！')
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  useEffect(() => {
    const storeData = localStorage.getItem(storageKey)
    const likedList = storeData === null ? [] : (JSON.parse(storeData) as string[])
    const isLiked = likedList.find((v) => v === props.diary.id) !== undefined
    setIsLiked(isLiked)
  }, [props.diary])

  return (
    <div className='mx-auto max-w-3xl px-4 py-6'>
      {/* 戻るボタン */}
      <div className='mb-4'>
        <Link
          href='/experience-diary'
          className='group inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-ui shadow-sm transition-all duration-200 hover:border-brand-ui hover:bg-gray-50'
        >
          <ArrowLeft className='mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5' />
          <span className='tracking-wide'>一覧に戻る</span>
        </Link>
      </div>

      {/* メインコンテンツ */}
      <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
        <div className='p-6 md:p-8'>
          {/* タイトルと日付 */}
          <h1 className='mb-4 text-2xl font-bold text-[#4a4a4a]'>{props.diary.title}</h1>
          <div className='mb-6 flex items-center justify-between'>
            <span className='text-sm text-gray-500'>
              {dayjs(props.diary.createdAt).tz().format('YYYY.MM.DD')}
            </span>
            <div className='flex items-center space-x-1'>
              <Heart
                className={`h-5 w-5 ${isLiked ? 'fill-brand-icon-static text-brand-icon-static' : 'text-gray-400'}`}
              />
              <span className='text-sm text-gray-500'>{props.diary.like}</span>
            </div>
          </div>

          {/* テーマハッシュタグ情報 */}
          {theme && (
            <div className='mb-6 rounded-lg bg-gray-50 p-4'>
              <div className='flex items-start space-x-3'>
                <span 
                  className='inline-flex items-center rounded-full border-2 bg-white px-3 py-1 text-sm font-semibold'
                  style={{ 
                    borderColor: theme.color,
                    color: theme.color 
                  }}
                >
                  <span 
                    className="text-base mr-1 leading-none"
                    style={{ color: theme.color }}
                  >
                    #
                  </span>
                  <span className="leading-none">
                    {theme.title}
                  </span>
                </span>
                <div>
                  <p className='text-sm text-gray-700'>{theme.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* 著者情報 */}
          <div className='mb-6 rounded-r-md border-l-4 border-brand-ui-static bg-gray-50 py-2 pl-4 italic text-gray-600'>
            {props.diary.User.name}
          </div>

          {/* 画像がある場合は表示 */}
          {props.diary.ExperienceDiaryImage.length > 0 && (
            <div className='mb-8'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {props.diary.ExperienceDiaryImage.map((diaryImage, index) => (
                  <div key={index} className='relative h-60 overflow-hidden rounded-lg'>
                    <Image
                      src={diaryImage.image || '/placeholder.svg'}
                      alt={`${props.diary.title}の画像 ${index + 1}`}
                      fill
                      className='object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* コンテンツ */}
          <div className='prose mb-8 max-w-none'>
            <p className='mb-4 whitespace-pre-wrap leading-relaxed text-gray-700'>
              {props.diary.text}
            </p>
          </div>

          {/* アクションボタン */}
          <div className='flex flex-wrap gap-4 border-t border-gray-100 pt-4'>
            <Button
              disabled={isPending}
              onClick={handleLike}
              variant='outline'
              className={`flex items-center gap-2 ${
                isLiked ? 'border-brand-ui-static text-brand-ui-static' : ''
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-brand-icon-static text-brand-icon-static' : ''}`} />
              {isLiked ? 'いいね済み' : 'いいね'}
            </Button>
            <Button onClick={handleShare} variant='outline' className='flex items-center gap-2'>
              <Share2 className='h-4 w-4' />
              共有する
            </Button>
            <Button variant='outline' className='ml-auto flex items-center gap-2 text-gray-500'>
              <Flag className='h-4 w-4' />
              報告する
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
