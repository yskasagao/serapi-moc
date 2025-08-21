'use client'

import { useState } from 'react'
import type { DiaryTheme } from '@/lib/types/diary-theme'
import { getActiveThemes } from '@/lib/mock-data/diary-themes'
import { ChevronLeft, ChevronRight, Edit3, Sticker } from 'lucide-react'
import Link from 'next/link'

interface ThemeSelectorProps {
  selectedThemeId?: string
  onThemeSelect?: (themeId: string | null) => void
}

export const ThemeSelector = ({ selectedThemeId, onThemeSelect }: ThemeSelectorProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const activeThemes = getActiveThemes()
  
  // 1度に表示するお題数（2カラム）
  const themesPerView = 2
  const maxIndex = Math.max(0, activeThemes.length - themesPerView)
  
  const visibleThemes = activeThemes.slice(currentIndex, currentIndex + themesPerView)
  
  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }
  
  const goToNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
  }
  
  const handleThemeClick = (themeId: string) => {
    const newSelectedId = selectedThemeId === themeId ? null : themeId
    onThemeSelect?.(newSelectedId)
  }
  
  if (activeThemes.length === 0) {
    return null
  }
  
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-600 flex items-center">
          <Sticker className="mr-2 h-5 w-5" />
          今月のテーマ
        </h2>
        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            aria-label="前のお題を表示"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            aria-label="次のお題を表示"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visibleThemes.map((theme) => {
          const isSelected = selectedThemeId === theme.id
          return (
            <div
              key={theme.id}
              className={`rounded-lg border-2 p-4 h-40 flex flex-col transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'shadow-md bg-white'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
              style={{
                borderColor: isSelected ? theme.color : undefined,
                backgroundColor: isSelected ? `${theme.color}08` : undefined
              }}
            >
              <button
                onClick={() => handleThemeClick(theme.id)}
                className="text-left flex-1 mb-3"
              >
                <div className="flex items-start">

                  <div className="min-w-0 flex-1">
                    <h3 
                      className={`font-medium text-xl mb-2 flex items-center ${
                        isSelected ? '' : 'text-gray-800'
                      }`}
                    >
                      <span 
                        className="text-3xl mr-1 leading-none"
                        style={{ color: theme.color }}
                      >
                        #
                      </span>
                      <span
                        className="leading-none"
                        style={{
                          color: isSelected ? theme.color : undefined
                        }}
                      >
                        {theme.title}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </button>
              
              <div className="flex justify-end">
                <Link
                  href={`/experience-diary/create?themeId=${theme.id}`}
                  className="inline-flex items-center justify-center rounded-md border-2 px-3 py-2 font-medium transition-colors w-20"
                  style={{ fontSize: '14px' }}
                  style={{
                    borderColor: theme.color,
                    color: theme.color
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement
                    target.style.backgroundColor = theme.color
                    target.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement
                    target.style.backgroundColor = 'transparent'
                    target.style.color = theme.color
                  }}
                >
                  <Edit3 className="mr-1" style={{ width: '14px', height: '14px' }} />
                  投稿
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      
      {selectedThemeId && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <span>選択中:</span>
          <span 
            className="inline-flex items-center gap-2 font-medium text-sm"

          >
            <span 
              className="text-lg mr-1"
              style={{ color: activeThemes.find(t => t.id === selectedThemeId)?.color }}
            >
              #
            </span>
            <span style={{ color: activeThemes.find(t => t.id === selectedThemeId)?.color }}>
              {activeThemes.find(t => t.id === selectedThemeId)?.title}
            </span>
          </span>
          <button
            onClick={() => onThemeSelect?.(null)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="お題の選択を解除"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}