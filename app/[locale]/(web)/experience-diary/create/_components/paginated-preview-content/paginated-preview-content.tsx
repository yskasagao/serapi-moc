'use client'

import { useMemo } from 'react'
import { PreviewContent } from '@/app/[locale]/(web)/experience-diary/create/_components/preview-content'

type PaginatedPreviewContentProps = {
  title: string
  text: string
  images: string[]
  date: string
  currentPage: number
  totalPages: number
  isMobile: boolean
  userName: string
}

export const PaginatedPreviewContent = ({
  title,
  text,
  images,
  date,
  currentPage,
  totalPages,
  isMobile,
  userName,
}: PaginatedPreviewContentProps) => {
  // コンテンツを分割する
  const paginatedContent = useMemo(() => {
    // 1ページあたりの最大文字数（調整可能）
    const charsPerPage = 500

    // コンテンツを分割
    if (text.length <= charsPerPage || totalPages === 1) {
      return text
    }

    // ページ数に基づいて均等に分割
    const segmentSize = Math.ceil(text.length / totalPages)
    const start = (currentPage - 1) * segmentSize
    let end = start + segmentSize

    // 最後のページの場合は残りすべて
    if (currentPage === totalPages) {
      end = text.length
    }

    return text.substring(start, end)
  }, [text, currentPage, totalPages])

  // 画像を分割する
  const paginatedImages = useMemo(() => {
    if (images.length === 0) return []

    // 画像がある場合は、ページごとに均等に分配
    const imagesPerPage = Math.ceil(images.length / totalPages)
    const start = (currentPage - 1) * imagesPerPage
    let end = start + imagesPerPage

    // 最後のページの場合は残りすべて
    if (currentPage === totalPages) {
      end = images.length
    }

    return images.slice(start, end)
  }, [images, currentPage, totalPages])

  return (
    <PreviewContent
      title={title}
      text={paginatedContent}
      images={paginatedImages}
      date={date}
      isMobile={isMobile}
      isScreenshot={true}
      totalPage={totalPages}
      currentPage={currentPage}
      userName={userName}
    />
  )
}
