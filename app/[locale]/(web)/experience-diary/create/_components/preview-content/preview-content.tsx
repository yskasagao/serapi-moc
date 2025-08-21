import Image from 'next/image'
import { getActiveThemes } from '@/lib/mock-data/diary-themes'

type BasePreviewProps = {
  title: string
  text: string
  images: string[]
  themeId?: string
  date: string
  isMobile: boolean
  userName: string
}

type ScreenShopPreviewProps = BasePreviewProps & {
  isScreenshot: true
  currentPage: number
  totalPage: number
}

type NormalPreviewProps = BasePreviewProps & {
  isScreenshot: false
}

type PreviewContentProps = NormalPreviewProps | ScreenShopPreviewProps

export const PreviewContent = (props: PreviewContentProps) => {
  // テーマ情報の取得
  const activeThemes = getActiveThemes()
  const selectedTheme = props.themeId ? activeThemes.find(t => t.id === props.themeId) : null
  

  
  // デバイスに応じたスタイルを適用
  const containerClasses = props.isMobile
    ? 'bg-ui-background p-6 rounded-lg w-full max-w-[400px] border-4 border-brand-primary shadow-xl relative mx-auto'
    : 'bg-ui-background p-8 rounded-lg w-full max-w-[700px] border-4 border-brand-primary shadow-xl relative mx-auto'

  const imageHeight = props.isMobile ? 'h-32' : 'h-40'

  return (
    <div className={containerClasses}>
      <div className={`absolute right-4 top-4 ${props.isMobile ? 'w-16' : 'w-20'}`}>
        <Image
          src='/serapiLOGO.jpeg'
          alt='Serapi'
          width={80}
          height={30}
          className='h-auto w-full'
        />
      </div>
      {/* 装飾的な要素 - 常に表示 */}
      <div className='bg-brand-primary absolute -left-4 -top-4 h-20 w-20 rounded-full opacity-5' />
      <div className='bg-brand-light absolute -bottom-4 -right-4 h-20 w-20 rounded-full opacity-5' />

      <div className='relative z-10'>

        {/* テーマラベル */}
        {selectedTheme && (
          <div className={`${props.isMobile ? 'pt-8 mb-6' : 'pt-6 mb-8'}`}>
            <div 
              style={{ 
                display: 'inline-block',
                border: `2px solid ${selectedTheme.color}`,
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                padding: props.isMobile ? '4px 16px' : '6px 16px',
                fontSize: props.isMobile ? '16px' : '18px',
                fontWeight: '600',
                color: selectedTheme.color,
                verticalAlign: 'middle'
              }}
            >
              <span style={{ 
                fontSize: props.isMobile ? '20px' : '24px', 
                marginRight: '4px', 
                color: selectedTheme.color,
                verticalAlign: 'middle'
              }}>
                #
              </span>
              <span style={{ 
                color: selectedTheme.color,
                verticalAlign: 'middle'
              }}>
                {selectedTheme.title}
              </span>
            </div>
          </div>
        )}
        
        <h2
          className={`${
            props.isMobile ? 'text-lg' : 'text-xl'
          } text-brand-primary ${selectedTheme ? 'mb-6' : 'mb-6 pt-16'} font-bold drop-shadow-sm`}
        >
          {props.title || '無題の体験日記'}
        </h2>
        <div className='border-brand-primary text-ui-foreground mb-6 border-l-4 pl-4 italic'>
          {props.userName}
        </div>



        <p
          className={`${
            props.isMobile ? 'text-sm' : 'text-base'
          } text-ui-foreground mb-6 whitespace-pre-wrap leading-relaxed`}
        >
          {props.text ?? '内容なし'}
        </p>

        {props.images.length > 0 && (
          <div className='mb-6'>
            {/* 「画像ギャラリー」の見出しを削除 */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {props.images.map((img, index) => (
                <img
                  key={index}
                  src={img || '/placeholder.svg'}
                  alt={`画像 ${index + 1}`}
                  className={`w-full ${imageHeight} rounded-lg object-cover shadow-md transition-shadow duration-300 hover:shadow-lg`}
                  crossOrigin='anonymous'
                />
              ))}
            </div>
          </div>
        )}
        <div className='border-ui-border text-brand-secondary mt-8 flex items-center justify-between border-t pt-4 text-sm'>
          <span>{props.date}</span>
        </div>
      </div>
    </div>
  )
}
