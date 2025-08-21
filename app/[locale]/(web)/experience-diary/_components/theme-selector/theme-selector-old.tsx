'use client'

import { useState } from 'react'
import type { DiaryTheme } from '@/lib/types/diary-theme'
import { getActiveThemes } from '@/lib/mock-data/diary-themes'
import { ChevronLeft, ChevronRight, Edit3 } from 'lucide-react'
import Link from 'next/link'

interface ThemeSelectorProps {
  selectedThemeId?: string
  onThemeSelect?: (themeId: string | null) => void
}

export const ThemeSelector = ({ selectedThemeId, onThemeSelect }: ThemeSelectorProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const activeThemes = getActiveThemes()
  
  // 1度に表示するお題数（レスポンシブ対応）
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
        <h2 className="text-lg font-semibold text-gray-800">📝 今月のテーマ</h2>
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
              className={`rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-brand-ui bg-brand-ui/10 shadow-md'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className="mt-0.5 h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: theme.color }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className={`font-medium text-sm ${
                    isSelected ? 'text-brand-ui' : 'text-gray-800'
                  }`}>
                    {theme.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                    {theme.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      
      {selectedThemeId && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <span>選択中:</span>
          <span className="rounded-full bg-brand-ui/10 px-2 py-1 text-brand-ui font-medium">
            {activeThemes.find(t => t.id === selectedThemeId)?.title}
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