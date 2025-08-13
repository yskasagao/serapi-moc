'use client'
import { Mail, Star } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BookmarkButton } from '../bookmark-button'
import { CommentCard } from '../comment-card/comment-card'
import { type SerapistarDetail } from './type'
import { Toaster } from '@/app/_components/toaster'
import { FashionBackground } from '@/components/fashion-background'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from '@/i18n/routing'
import dayjs from '@/lib/dayjs'
import { incrementStar } from '@/lib/server-only/serapist/increment-star'

const calcTotalStar = (serapistar: SerapistarDetail): number => {
  return serapistar.SerapisterParameter
    ? serapistar.SerapisterParameter.like +
        serapistar.SerapisterParameter.looks +
        serapistar.SerapisterParameter.repeat +
        serapistar.SerapisterParameter.physical +
        serapistar.SerapisterParameter.service
    : 0
}

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
  serapistar: SerapistarDetail
  message?: string
  isBookmarked: boolean
}

export const SerapisterView = ({ serapistar, message, isBookmarked }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isFlush, setIsFlush] = useState<boolean>(false)
  useEffect(() => {
    if (!isFlush && message) {
      setIsFlush(true)
      toast.success(message)
    }
  }, [isFlush, message])
  const t = useTranslations('serapister-view')
  return (
    <div className='relative min-h-screen'>
      <FashionBackground />
      <Toaster />
      <div className='relative z-10 mx-auto mt-16 max-w-[980px] px-4 py-8'>
        <div className='flex flex-col items-center'>
          <div className='w-full max-w-2xl rounded-t-lg bg-white px-4 pb-4 pt-8'>
            <div className='relative mx-auto mb-4 h-32 w-32 md:h-40 md:w-40'>
              <div className='h-full w-full overflow-hidden rounded-full bg-gray-100'>
                <a
                  href={`https://www.tiktok.com/@${serapistar.tiktok}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={serapistar.avatar ?? '/noimage.jpg'}
                    alt='セラピストプロフィール画像'
                    width={160}
                    height={160}
                    className='object-cover'
                  />
                </a>
              </div>
            </div>
            <div className='mb-4 flex flex-col items-center justify-center gap-2'>
              <h1 className='text-center text-xl font-bold'>
                <a
                  href={`https://www.tiktok.com/@${serapistar.tiktok}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {serapistar.nickname}
                </a>
              </h1>
              <div className='mt-2 flex items-center justify-center gap-6'>
                <button
                  onClick={async () => {
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
                    const result = await incrementStar(serapistar.slug || '', pathname)
                    if (!result.success) {
                      toast.error(result.error)
                      return
                    }
                    localStorage.setItem(key, JSON.stringify(params))
                    toast.success('Starを送信しました')
                  }}
                  className='flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-brand-icon focus:outline-none'
                >
                  <Star className='h-8 w-8 fill-current' />
                  <span className='text-2xl'>+{calcTotalStar(serapistar)}</span>
                </button>
                <BookmarkButton isBookmarked={isBookmarked} targetSlug={serapistar.slug} />
              </div>
            </div>
          </div>
          <div className='w-full max-w-2xl rounded-b-lg bg-gray-50 px-4 pb-8'>
            {/* Message Button */}
            <Button
              size='lg'
              className='mb-8 w-full border-2 border-brand-ui bg-white font-bold font-medium text-brand-ui hover:bg-gray-50'
              onClick={() => {
                router.push(`/therapists/${serapistar.slug}/post-comment`)
              }}
            >
              <Mail className='mr-2 h-5 w-5 text-brand-ui' />
              {t('post-comment-button-text')}
            </Button>
            <p className='mb-8 max-w-2xl text-center text-sm text-gray-600'>{t('description')}</p>
            <div className='w-full max-w-2xl space-y-4'>
              <h2 className='mb-4 text-base text-gray-600'>{t('comment-list-text')}</h2>
              {serapistar.comments.length === 0 && (
                <p className='mt-8 text-center text-sm'>{t('empty-comment')}</p>
              )}
              {serapistar.comments.map((v, index) => {
                return <CommentCard comment={v} key={index} />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
