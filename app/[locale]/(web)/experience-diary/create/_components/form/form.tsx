'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Camera, Eye, FileText, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { PaginatedPreviewContent } from '../paginated-preview-content'
import toast from 'react-hot-toast'
import html2canvas from 'html2canvas'
import { Toaster } from '@/app/_components/toaster'
import { createDiary } from './action'
import { useMediaQuery } from '@/lib/use-media-query'
import { PreviewModal } from '../preview-modal'
import { getActiveThemes } from '@/lib/mock-data/diary-themes'
import { ChevronDown, ChevronUp } from 'lucide-react'

type diaryData = {
  title: string
  text: string
  images: string[]
  themeId?: string
}

type Props = {
  userName: string
}

export const Form = (props: Props) => {
  const searchParams = useSearchParams()
  const [diaryData, setDiaryData] = useState<diaryData>({
    title: '',
    text: '',
    images: [],
    themeId: undefined,
  })

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [showTempPreview, setShowTempPreview] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [generationProgress, setGenerationProgress] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isThemeExpanded, setIsThemeExpanded] = useState(false)
  const activeThemes = getActiveThemes()
  const selectedTheme = diaryData.themeId ? activeThemes.find(t => t.id === diaryData.themeId) : null

  // クエリパラメータからテーマIDを取得して初期設定
  useEffect(() => {
    const themeId = searchParams.get('themeId')
    if (themeId && !diaryData.themeId && activeThemes.find(t => t.id === themeId)) {
      setDiaryData(prev => ({
        ...prev,
        themeId: themeId
      }))
      setIsThemeExpanded(true) // テーマが設定されている場合は展開状態にする
    }
  }, [searchParams]) // activeThemesを依存配列から削除し、diaryData.themeIdの条件を追加

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setDiaryData((prev) => {
        return {
          ...prev,
          images: [...prev.images, ...newImages],
        }
      })
    }
  }

  // コンテンツの長さに基づいて必要なページ数を計算
  useEffect(() => {
    // 文字数に基づいてページ数を決定
    const contentLength = diaryData.text.length
    const charsPerPage = 500 // 1ページあたりの文字数（調整可能）

    let pages = Math.ceil(contentLength / charsPerPage)

    // 画像の数も考慮
    const imagesPerPage = 2 // 1ページあたりの画像数（調整可能）
    const imagePages =
      diaryData.images.length > 0 ? Math.ceil(diaryData.images.length / imagesPerPage) : 0

    // コンテンツと画像の両方を考慮した最終的なページ数
    pages = Math.max(pages, imagePages, 1)

    setTotalPages(pages)
  }, [diaryData.text, diaryData.images])

  const handleScreenshot = async () => {
    if (diaryData.text.length === 0 && diaryData.images.length === 0) {
      toast.error(`内容がありません\nテキストまたは画像を追加してください`)
      return
    }

    setIsGeneratingImage(true)
    setShowTempPreview(true)
    setCurrentPage(1)
    setGenerationProgress(0)

    try {
      // 各ページを順番に処理
      for (let page = 1; page <= totalPages; page++) {
        setCurrentPage(page)
        setGenerationProgress(Math.floor(((page - 1) / totalPages) * 100))

        // DOMの更新を待つ
        await new Promise((resolve) => setTimeout(resolve, 100))

        if (previewRef.current) {
          // 画像の読み込みを待つ
          await Promise.all(
            Array.from(previewRef.current.querySelectorAll('img')).map(
              (img) =>
                img.complete ||
                new Promise((resolve) => {
                  img.onload = resolve
                }),
            ),
          )

          // デバイスに応じてスケールを調整
          const scale = isMobile ? 1.5 : 2

          const style = document.createElement('style')
          document.head.appendChild(style)
          style.sheet?.insertRule('body > div:last-child img { display: inline-block; }')

          const canvas = await html2canvas(previewRef.current, {
            scale,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
          })
          style.remove()

          const image = canvas.toDataURL('image/png')
          const link = document.createElement('a')
          link.href = image
          link.download = `体験日記_${page}of${totalPages}.png`
          link.click()

          // 少し待ってから次のページを処理
          await new Promise((resolve) => setTimeout(resolve, 300))
        }

        setGenerationProgress(Math.floor((page / totalPages) * 100))
      }
      toast.success('画像の保存が完了しました')
    } catch (error) {
      console.error('Screenshot failed:', error)
      toast.error('画像の生成に失敗しました\nもう一度お試しいただくか、内容を短くしてください')
    } finally {
      setIsGeneratingImage(false)
      setShowTempPreview(false)
      setGenerationProgress(0)
    }
  }

  const formattedDate = new Date()
    .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '.')
  return (
    <div className='screenshot container mx-auto max-w-2xl px-4 py-6'>
      <Toaster />
      <div className='mb-4 border-b border-gray-100 pb-3'>
        <Link
          href='/experience-diary'
          className='group inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-brand-ui shadow-sm transition-all duration-200 hover:border-brand-ui hover:bg-gray-50'
        >
          <ArrowLeft className='mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5' />
          <span className='tracking-wide'>一覧に戻る</span>
        </Link>
      </div>
      <h1 className='mb-6 flex items-center text-base font-medium text-gray-700'>
        <FileText className='mr-2 h-5 w-5 text-brand-icon-static' />
        体験日記を作成
      </h1>
      <form
        action={(formData: FormData) => {
          startTransition(async () => {
            const ret = await createDiary(formData)
            if (ret.success) {
              toast.success('体験日記を投稿しました')
            } else {
              toast.error(ret.error)
            }
          })
        }}
        className='border-custom divide-y divide-gray-100 rounded-lg border bg-white shadow-sm'
      >
        {/* フォーム入力セクション */}
        <div className='space-y-4 p-6'>
          {/* タイトルセクション */}
          <div className='mb-4'>
            <label htmlFor='title' className='mb-1.5 block text-sm font-medium text-gray-700'>
              タイトル
            </label>
            <Input
              id='title'
              value={diaryData.title}
              onChange={(e) => setDiaryData({ ...diaryData, title: e.target.value })}
              placeholder='体験の題名を入力してください'
              required
              className='bg-white'
              name='title'
            />
          </div>

          {/* テーマ選択セクション */}
          <div className='mb-4'>
            <label className='mb-1.5 block text-sm font-medium text-gray-700'>
              テーマ（任意）
            </label>
            <div className='space-y-2'>
              <button
                type='button'
                onClick={() => setIsThemeExpanded(!isThemeExpanded)}
                className='flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
              >
                <span>
                  {selectedTheme ? (
                    <span className='flex items-center'>
                      <span 
                        className="text-base mr-1 leading-none"
                        style={{ color: selectedTheme.color }}
                      >
                        #
                      </span>
                      <span 
                        className="leading-none text-sm font-semibold"
                        style={{ color: selectedTheme.color }}
                      >
                        {selectedTheme.title}
                      </span>
                    </span>
                  ) : (
                    'テーマを選択してください'
                  )}
                </span>
                {isThemeExpanded ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
              </button>
              
              {isThemeExpanded && (
                <div className='max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white p-2'>
                  <div className='mb-2'>
                    <button
                      type='button'
                      onClick={() => {
                        setDiaryData({ ...diaryData, themeId: undefined })
                        setIsThemeExpanded(false)
                      }}
                      className='w-full rounded p-2 text-left text-sm text-gray-500 hover:bg-gray-50'
                    >
                      テーマなし
                    </button>
                  </div>
                  <div className='space-y-1'>
                    {activeThemes.map((theme) => (
                      <button
                        key={theme.id}
                        type='button'
                        onClick={() => {
                          setDiaryData({ ...diaryData, themeId: theme.id })
                          setIsThemeExpanded(false)
                        }}
                        className='grid grid-cols-[auto_1fr] w-full gap-3 rounded p-2 text-left hover:bg-gray-50'
                      >
                        <div className='flex items-center justify-center h-full'>
                          <span 
                            className="text-2xl leading-none"
                            style={{ color: theme.color }}
                          >
                            #
                          </span>
                        </div>
                        <div className='flex-1 min-w-0 flex items-center'>
                          <div className='font-medium text-sm text-gray-900'>
                            {theme.title}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {selectedTheme && (
              <input type='hidden' name='themeId' value={selectedTheme.id} />
            )}
          </div>

          {/* 内容セクション */}
          <div className='mb-4'>
            <label htmlFor='content' className='mb-1.5 block text-sm font-medium text-gray-700'>
              内容
            </label>
            <Textarea
              id='content'
              value={diaryData.text}
              onChange={(e) => setDiaryData({ ...diaryData, text: e.target.value })}
              placeholder='体験の詳細を記入してください'
              rows={10}
              required
              className='resize-none bg-white'
              name='text'
            />
          </div>

          {/* 画像セクション */}
          <div>
            <div className='space-y-3'>
              <div className='flex flex-wrap gap-2'>
                {diaryData.images.map((img, index) => (
                  <div key={index} className='relative h-20 w-20'>
                    <Image
                      src={img || '/placeholder.svg'}
                      alt={`Uploaded ${index + 1}`}
                      className='h-full w-full rounded object-cover'
                      fill
                    />
                  </div>
                ))}
              </div>
              <label className='inline-flex cursor-pointer items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50'>
                <ImageIcon className='mr-2 h-4 w-4 text-gray-500' />
                画像を追加
                <input
                  type='file'
                  className='hidden'
                  onChange={handleImageUpload}
                  multiple
                  accept='image/*'
                  name='images'
                />
              </label>
            </div>
          </div>
        </div>

        {/* アクションボタンセクション */}
        <div className='space-y-4 bg-gray-50 p-6'>
          <Button
            type='button'
            onClick={() => setIsPreviewOpen(true)}
            className='inline-flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50'
          >
            <Eye className='mr-2 h-4 w-4 text-gray-500' />
            プレビュー
          </Button>
          <div className='flex space-x-4'>
            <Button
              type='submit'
              disabled={isPending}
              className='inline-flex flex-1 items-center justify-center rounded-md border border-brand-ui bg-brand-ui px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-brand-ui-hover'
            >
              {isPending ? '投稿中' : '投稿する'}
            </Button>
            <Button
              type='button'
              onClick={handleScreenshot}
              disabled={isGeneratingImage}
              className='group inline-flex flex-1 items-center justify-center rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:border-black hover:bg-gray-50'
            >
              <Camera className='mr-2 h-4 w-4 text-brand-icon transition-transform duration-200 group-hover:scale-110' />
              {isGeneratingImage
                ? `生成中... ${generationProgress}%`
                : totalPages > 1
                  ? `画像にして保存 (${totalPages}枚)`
                  : '画像にして保存'}
            </Button>
          </div>
          {totalPages > 1 && !isGeneratingImage && (
            <p className='text-muted-foreground text-center text-xs'>
              内容の長さに基づいて、{totalPages}枚の画像に分割されます
            </p>
          )}
        </div>
      </form>
      <PreviewModal
        isOpen={isPreviewOpen}
        title={diaryData.title}
        text={diaryData.text}
        images={diaryData.images}
        themeId={diaryData.themeId}
        onClose={() => setIsPreviewOpen(false)}
        totalPages={totalPages}
        isMobile={isMobile}
        userName={props.userName}
        handleScreenshot={handleScreenshot}
        isSaving={isGeneratingImage}
      />
      {showTempPreview && (
        <>
          <div className='fixed bottom-0 left-0 right-0 top-0 z-[-3] flex items-center justify-center bg-white'>
            <div
              ref={previewRef}
              className={`relative ${isMobile ? 'max-w-[400px]' : 'max-w-[700px]'}`}
            >
              <PaginatedPreviewContent
                title={diaryData.title}
                text={diaryData.text}
                images={diaryData.images}
                themeId={diaryData.themeId}
                date={formattedDate}
                currentPage={currentPage}
                totalPages={totalPages}
                isMobile={isMobile}
                userName={props.userName}
              />
            </div>
          </div>
          <div className='fixed bottom-0 left-0 right-0 top-0 z-[-2] bg-white'></div>
        </>
      )}
    </div>
  )
}
