import type { Diary, DiaryPagination } from '@/app/api/experience-diary/search/schema'
import { getActiveThemes } from './diary-themes'

// 体験談のサンプルテキスト
const sampleDiaryTexts = [
  '初めて利用させていただきました。とても丁寧な接客で、リラックスできました。施術も上手で、また利用したいと思います。',
  '友人の紹介で行ってみました。想像以上に良かったです！雰囲気も良く、時間を忘れて楽しめました。',
  '前から気になっていたお店でした。期待通りの素晴らしいサービスでした。また絶対に行きます！',
  'SNSで話題になっていたので行ってみました。口コミ通り、とても良いお店でした。癒やされました〜。'
]

const sampleTitles = [
  '初めての利用で大満足！',
  '友人紹介で素晴らしい体験',
  '期待以上のサービスでした',
  'SNSで話題のお店に行ってみた'
]

const sampleUserNames = [
  'さくら', 'みお', 'あやか', 'ゆい'
]

// UUIDライクなIDを生成（実際のcuidではないが、見た目は似せる）
const generateMockId = (index: number): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = 'c'
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result + index.toString().padStart(3, '0')
}

// 体験日記のモックデータ生成関数
export const generateMockDiary = (index: number): Diary => {
  const title = sampleTitles[index % sampleTitles.length]
  const text = sampleDiaryTexts[index % sampleDiaryTexts.length]
  const userName = sampleUserNames[index % sampleUserNames.length]
  
  // テーマIDを全ての日記に設定（デザイン確認用）
  const activeThemes = getActiveThemes()
  const themeId = activeThemes.length > 0 
    ? activeThemes[index % activeThemes.length].id 
    : undefined
  
  // 1-3枚の画像をランダムに生成
  const imageCount = Math.floor(Math.random() * 3) + 1
  const images = []
  for (let i = 0; i < imageCount; i++) {
    images.push({
      image: `https://picsum.photos/400/300?random=diary${index}_${i}`
    })
  }
  
  // 作成日をランダムに設定（過去30日以内）
  const daysAgo = Math.floor(Math.random() * 30)
  const createdAt = new Date()
  createdAt.setDate(createdAt.getDate() - daysAgo)
  
  return {
    id: generateMockId(index),
    like: Math.floor(Math.random() * 50) + 1, // 1-50のいいね数
    text,
    title,
    createdAt,
    themeId,
    User: {
      name: userName
    },
    ExperienceDiaryImage: images
  }
}

// ページネーション付き体験日記データ生成
export const generateMockDiaryPagination = (
  page: number = 1,
  limit: number = 10,
  totalCount: number = 12,
  sort: 'latest' | 'like' | 'oldest' = 'latest',
  filterThemeId?: string
): DiaryPagination => {
  const startIndex = (page - 1) * limit
  
  let allData: Diary[] = []
  // 基本データを生成
  for (let i = 0; i < totalCount; i++) {
    allData.push(generateMockDiary(i))
  }
  
  // テーマでフィルタリング
  if (filterThemeId) {
    allData = allData.filter(diary => diary.themeId === filterThemeId)
  }
  
  const endIndex = Math.min(startIndex + limit, allData.length)
  let data = allData.slice(startIndex, endIndex)
  
  // ソート処理
  switch (sort) {
    case 'latest':
      data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    case 'oldest':
      data.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      break
    case 'like':
      data.sort((a, b) => b.like - a.like)
      break
  }
  
  const actualTotalCount = filterThemeId ? allData.length : totalCount
  const totalPages = Math.ceil(actualTotalCount / limit)
  const hasNextPage = page < totalPages
  
  return {
    data,
    nextCursor: hasNextPage ? generateMockId(endIndex) : undefined,
    sort
  }
}

// 検索結果用のモックデータ生成
export const generateMockDiarySearchResults = (
  query: string,
  page: number = 1,
  limit: number = 10,
  filterThemeId?: string
): DiaryPagination => {
  // 検索クエリに応じて結果数を調整
  const baseCount = query.length > 0 ? Math.floor(Math.random() * 20) + 5 : 0
  return generateMockDiaryPagination(page, limit, baseCount, 'latest', filterThemeId)
}
