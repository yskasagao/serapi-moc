import type { Serapist, SerapistPaginator } from '@/app/api/serapist/schema'

// セラピストのモックデータ生成関数
export const generateMockSerapist = (index: number): Serapist => {
  const names = [
    'みか', 'あやか', 'ゆい', 'りな', 'ももか', 'さくら', 'あいり', 'なな',
    'えみ', 'ひな', 'まい', 'ゆき', 'みお', 'れい', 'かな', 'すず',
    'あん', 'みく', 'こはる', 'ちか', 'ゆめ', 'のあ', 'りお', 'しおり'
  ]
  
  const areas = ['東京', '大阪', '名古屋', '福岡', '札幌', '横浜', '神戸', '京都']
  
  const tiktokIds = [
    '@mika_therapy', '@ayaka_relax', '@yui_healing', '@rina_massage',
    '@momoka_beauty', '@sakura_salon', '@airi_wellness', '@nana_spa',
    null, null // 一部のセラピストはTikTokアカウントなし
  ]
  
  const twitterIds = [
    '@mika_th', '@ayaka_rl', '@yui_hl', '@rina_mg',
    '@momoka_bt', '@sakura_sl', '@airi_wl', '@nana_sp',
    null, null // 一部のセラピストはTwitterアカウントなし
  ]

  const name = names[index % names.length]
  const area = areas[index % areas.length]
  
  return {
    slug: `${name.toLowerCase()}-${area.toLowerCase()}-${index}`,
    nickname: `${name}（${area}）`,
    twitter: twitterIds[index % twitterIds.length],
    tiktok: tiktokIds[index % tiktokIds.length],
    avatar: `https://picsum.photos/200/200?random=${index}`, // ランダムな画像
    parameter: {
      like: Math.floor(Math.random() * 5) + 1,      // 1-5の評価
      service: Math.floor(Math.random() * 5) + 1,   // 1-5の評価
      looks: Math.floor(Math.random() * 5) + 1,     // 1-5の評価
      physical: Math.floor(Math.random() * 5) + 1,  // 1-5の評価
      repeat: Math.floor(Math.random() * 5) + 1,    // 1-5の評価
    }
  }
}

// ページネーション付きセラピストデータ生成
export const generateMockSerapistPaginator = (
  page: number = 1, 
  limit: number = 12, 
  totalCount: number = 100
): SerapistPaginator => {
  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit, totalCount)
  
  const data: Serapist[] = []
  for (let i = startIndex; i < endIndex; i++) {
    data.push(generateMockSerapist(i))
  }
  
  const totalPages = Math.ceil(totalCount / limit)
  const hasNextPage = page < totalPages
  
  return {
    data,
    nextPage: hasNextPage ? page + 1 : undefined,
    total: totalCount
  }
}
