import type { Serapist, SerapistPaginator } from '@/app/api/serapist/schema'

// セラピストのモックデータ生成関数
export const generateMockSerapist = (index: number): Serapist => {
  // 実在するセラピストの正しいslugを使用（重複を避けるため最大4つまで）
  const validTherapists = [
    {
      slug: '3YSiF88rv9qF',
      nickname: 'ゆい',
      twitter: '@yui_sample',
      tiktok: '@yui_sample',
      avatar: 'https://via.placeholder.com/200x200?text=ゆい'
    },
    {
      slug: 'kL9mN2pQ5rTx',
      nickname: 'あい',
      twitter: '@ai_sample',
      tiktok: '@ai_sample',
      avatar: 'https://via.placeholder.com/200x200?text=あい'
    },
    {
      slug: 'wX8vY7zB4cDe',
      nickname: 'みか',
      twitter: '@mika_sample',
      tiktok: '@mika_sample',
      avatar: 'https://via.placeholder.com/200x200?text=みか'
    },
    {
      slug: 'fH6gJ5kM3nPr',
      nickname: 'さくら',
      twitter: '@sakura_sample',
      tiktok: '@sakura_sample',
      avatar: 'https://via.placeholder.com/200x200?text=さくら'
    }
  ]
  
  // インデックスが4以上の場合は生成しない（重複を避けるため）
  if (index >= validTherapists.length) {
    return null as any // この場合は呼び出し側でフィルタリングする
  }
  
  const therapist = validTherapists[index]
  
  return {
    slug: therapist.slug,
    nickname: therapist.nickname,
    twitter: therapist.twitter,
    tiktok: therapist.tiktok,
    avatar: therapist.avatar,
    isLive: index === 0 || index === 2 || index === 7, // インデックス0,2,7のセラピストがライブ配信中
    parameter: {
      like: Math.floor(Math.random() * 5) + 1,      // 1-5の評価
      service: Math.floor(Math.random() * 5) + 1,   // 1-5の評価
      looks: Math.floor(Math.random() * 5) + 1,     // 1-5の評価
      physical: Math.floor(Math.random() * 5) + 1,  // 1-5の評価
      repeat: Math.floor(Math.random() * 5) + 1     // 1-5の評価
    }
  }
}

// ページネーション付きセラピストデータ生成
export const generateMockSerapistPaginator = (
  page: number = 1, 
  limit: number = 12, 
  totalCount: number = 4 // 実在するセラピスト数に制限
): SerapistPaginator => {
  const maxTherapists = 4 // 実在するセラピストは4人のみ
  const actualTotal = Math.min(totalCount, maxTherapists)
  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit, actualTotal)
  
  const data: Serapist[] = []
  for (let i = startIndex; i < endIndex; i++) {
    const therapist = generateMockSerapist(i)
    if (therapist) {
      data.push(therapist)
    }
  }
  
  const totalPages = Math.ceil(actualTotal / limit)
  const hasNextPage = page < totalPages
  
  return {
    data,
    nextPage: hasNextPage ? page + 1 : undefined,
    total: actualTotal
  }
}