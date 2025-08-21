import { Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from '@/lib/dayjs'
import { type Diary } from '@/app/api/experience-diary/search/schema'
import { getActiveThemes } from '@/lib/mock-data/diary-themes'

export const DiaryCard = (props: { diary: Diary }) => {
  const truncatedContent =
    props.diary.text.length > 150 ? props.diary.text.substring(0, 150) + '...' : props.diary.text
  
  // テーマ情報を取得
  const activeThemes = getActiveThemes()
  const theme = props.diary.themeId 
    ? activeThemes.find(t => t.id === props.diary.themeId)
    : null

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md'>
      <Link href={`/experience-diary/${props.diary.id}`}>
        <div className='p-5'>
          {/* テーマタグ - タイトルより上に大きめで表示 */}
          {theme && (
            <div className='mb-4'>
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
            </div>
          )}

          <div className='mb-3'>
            <h3 className='text-lg font-semibold text-[#4a4a4a] transition-colors duration-200 hover:text-brand-ui'>
              {props.diary.title}
            </h3>
            <div className='mt-1 flex items-center justify-between'>
              <span className='text-sm text-gray-500'>
                {dayjs(props.diary.createdAt).tz().format('YYYY.MM.DD')}
              </span>
              <div className='flex items-center space-x-1'>
                <Heart className='h-4 w-4 text-brand-icon-static' />
                <span className='text-sm text-gray-500'>{props.diary.like}</span>
              </div>
            </div>
          </div>

          {/* 著者情報 */}
          <div className='mb-3 border-l-4 border-brand-ui-static pl-3 italic text-gray-600'>
            {props.diary.User.name}
          </div>

          {/* 画像がある場合は表示 */}
          {props.diary.ExperienceDiaryImage.length > 0 && (
            <div className='mb-4'>
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                {props.diary.ExperienceDiaryImage.slice(0, 2).map((item, index) => (
                  <div key={index} className='relative h-40 overflow-hidden rounded-md'>
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={`${props.diary.title}の画像 ${index + 1}`}
                      fill
                      className='object-cover'
                    />
                  </div>
                ))}
              </div>
              {props.diary.ExperienceDiaryImage.length > 2 && (
                <div className='mt-1 text-right text-sm text-gray-500'>
                  +{props.diary.ExperienceDiaryImage.length - 2}枚の画像
                </div>
              )}
            </div>
          )}

          {/* コンテンツ */}
          <p className='mb-4 line-clamp-3 text-gray-700'>{truncatedContent}</p>
        </div>
      </Link>
    </div>
  )
}
