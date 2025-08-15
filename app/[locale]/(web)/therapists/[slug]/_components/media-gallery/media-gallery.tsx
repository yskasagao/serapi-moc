'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Play, Mic } from 'lucide-react'

type MediaItem = {
  id: string
  type: 'image' | 'video' | 'voice'
  url: string
  thumbnail?: string
  alt?: string
  duration?: number // ボイスメモの長さ（秒）
}

type Props = {
  mediaItems: MediaItem[]
}

export const MediaGallery = ({ mediaItems }: Props) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  if (!mediaItems || mediaItems.length === 0) {
    return null
  }

  return (
    <>
      {/* メディアギャラリー */}
      <div className="w-full max-w-2xl bg-white px-4 py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mediaItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100"
              onClick={() => setSelectedMedia(item)}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.alt || 'セラピスト画像'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : item.type === 'video' ? (
                <>
                  <Image
                    src={item.thumbnail || item.url}
                    alt={item.alt || 'セラピスト動画'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity group-hover:bg-opacity-40">
                    <div className="rounded-full bg-white bg-opacity-90 p-3">
                      <Play className="h-6 w-6 text-gray-700" fill="currentColor" />
                    </div>
                  </div>
                </>
              ) : (
                // ボイスメモ
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-brand-ui to-brand-ui-hover p-4 transition-transform duration-300 group-hover:scale-105">
                  <div className="rounded-full bg-white bg-opacity-90 p-4 mb-3">
                    <Mic className="h-8 w-8 text-brand-icon" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white mb-1">ボイスメモ</p>
                    {item.duration && (
                      <p className="text-xs text-white opacity-90">
                        {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* モーダル */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === 'image' ? (
              <Image
                src={selectedMedia.url}
                alt={selectedMedia.alt || 'セラピスト画像'}
                width={800}
                height={600}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            ) : selectedMedia.type === 'video' ? (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="max-h-[90vh] max-w-[90vw]"
              >
                お使いのブラウザは動画再生に対応していません。
              </video>
            ) : (
              // ボイスメモのモーダル表示
              <div className="flex flex-col items-center justify-center bg-white rounded-lg p-8 max-w-md">
                <div className="rounded-full bg-gradient-to-br from-brand-ui to-brand-ui-hover p-6 mb-6">
                  <Mic className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">ボイスメモ</h3>
                {selectedMedia.duration && (
                  <p className="text-gray-600 mb-6">
                    長さ: {Math.floor(selectedMedia.duration / 60)}分{selectedMedia.duration % 60}秒
                  </p>
                )}
                <audio
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="w-full max-w-sm"
                >
                  お使いのブラウザは音声再生に対応していません。
                </audio>
              </div>
            )}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              ✕ 閉じる
            </button>
          </div>
        </div>
      )}
    </>
  )
}