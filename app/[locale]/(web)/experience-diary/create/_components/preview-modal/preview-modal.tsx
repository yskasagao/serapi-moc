'use client'

import { useRef } from 'react'
import { Camera, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PreviewContent } from '../preview-content'
import { BaseModal } from '@/components/base-modal'

type PreviewModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  text: string
  images: string[]
  themeId?: string
  totalPages: number
  isMobile: boolean
  userName: string
  handleScreenshot: () => void
  isSaving: boolean
}

export const PreviewModal = ({
  isOpen,
  onClose,
  title,
  text,
  images,
  themeId,
  totalPages,
  isMobile,
  userName,
  handleScreenshot,
  isSaving,
}: PreviewModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const formattedDate = new Date()
    .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '.')

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title='体験日記プレビュー'
      icon={FileText}
      maxWidth='sm:max-w-[740px]'
      className='flex h-[calc(100vh-8rem)] flex-col'
    >
      <div className='mb-4 flex-1 overflow-y-auto overflow-x-hidden px-3'>
        <div ref={contentRef}>
          <PreviewContent
            title={title}
            text={text}
            images={images}
            themeId={themeId}
            date={formattedDate}
            isScreenshot={false}
            isMobile={isMobile}
            userName={userName}
          />
        </div>
      </div>

      <div className='mt-auto flex-shrink-0'>
        <Button
          onClick={handleScreenshot}
          disabled={isSaving}
          className='text-brand-secondary bg-ui-background border-brand-secondary hover:bg-ui-hover group inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:border-black'
        >
          <Camera className='text-brand-primary mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110' />
          {isSaving
            ? '保存中...'
            : totalPages > 1
              ? `体験日記を${totalPages}枚の画像に分割して保存`
              : '体験日記を画像にして保存'}
        </Button>
      </div>
    </BaseModal>
  )
}
