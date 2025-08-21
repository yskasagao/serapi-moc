// 体験日記のお題に関する型定義

export interface DiaryTheme {
  id: string
  title: string        // お題タイトル（例：「こんなセラピスト絶対NG！」）
  description: string  // お題の説明
  color: string       // 表示色（hex code）
  colorVariant?: 'red' | 'blue' | 'monochrome' | 'green' // カラーバリエーション
  category: 'negative' | 'positive' | 'neutral' | 'question' // カテゴリ
  isActive: boolean   // アクティブかどうか
  createdAt: Date
}

export interface DiaryWithTheme extends Diary {
  theme?: DiaryTheme  // お題（オプショナル）
}

// お題のカテゴリ別色定義
export const THEME_COLORS = {
  negative: '#ef4444',  // red-500
  positive: '#10b981',  // emerald-500
  neutral: '#6b7280',   // gray-500
  question: '#3b82f6'   // blue-500
} as const

// お題のカテゴリ別ラベル
export const THEME_CATEGORY_LABELS = {
  negative: 'NG体験',
  positive: 'おすすめ',
  neutral: '一般',
  question: '質問・相談'
} as const

import type { Diary } from '@/app/api/experience-diary/search/schema'