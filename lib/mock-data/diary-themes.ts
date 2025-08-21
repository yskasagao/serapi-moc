import type { DiaryTheme } from '@/lib/types/diary-theme'

// テーマのカラーバリエーション定義
export const THEME_COLOR_VARIANTS = {
  red: '#FE2C55',      // serapi brand red
  blue: '#3b82f6',     // blue-500  
  monochrome: '#6b7280', // gray-500
  green: '#10b981'     // emerald-500
} as const

// お題のダミーデータ（4色バリエーション対応）
export const mockDiaryThemes: DiaryTheme[] = [
  {
    id: 'theme_ng_therapist',
    title: 'こんなセラピスト絶対NG！',
    description: '避けるべきセラピストの特徴や体験談を共有しましょう',
    color: THEME_COLOR_VARIANTS.red,
    colorVariant: 'red',
    category: 'negative',
    isActive: true,
    createdAt: new Date('2025-08-01')
  },
  {
    id: 'theme_first_visit',
    title: '初回訪問で感動した体験',
    description: '初めて利用した時の特別な体験やサービスについて',
    color: THEME_COLOR_VARIANTS.green,
    colorVariant: 'green',
    category: 'positive',
    isActive: true,
    createdAt: new Date('2025-08-05')
  },
  {
    id: 'theme_birthday_special',
    title: '誕生日・記念日の特別体験',
    description: '特別な日に受けたサービスの思い出を教えてください',
    color: THEME_COLOR_VARIANTS.blue,
    colorVariant: 'blue',
    category: 'positive',
    isActive: true,
    createdAt: new Date('2025-08-10')
  },
  {
    id: 'theme_unexpected_surprise',
    title: '期待以上だった意外なサービス',
    description: '予想していなかった素晴らしいサービスや対応について',
    color: THEME_COLOR_VARIANTS.monochrome,
    colorVariant: 'monochrome',
    category: 'positive',
    isActive: true,
    createdAt: new Date('2025-08-12')
  }
]

// アクティブなお題のみを取得
export const getActiveThemes = (): DiaryTheme[] => {
  return mockDiaryThemes.filter(theme => theme.isActive)
}

// IDからお題を取得
export const getThemeById = (id: string): DiaryTheme | undefined => {
  return mockDiaryThemes.find(theme => theme.id === id)
}

// カテゴリ別にお題を取得
export const getThemesByCategory = (category: DiaryTheme['category']): DiaryTheme[] => {
  return mockDiaryThemes.filter(theme => theme.category === category && theme.isActive)
}