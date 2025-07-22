import type { Diary, DiaryPagination } from '@/app/api/experience-diary/search/schema'

// 体験談のサンプルテキスト
const sampleDiaryTexts = [
  '初めて利用させていただきました。とても丁寧な接客で、リラックスできました。施術も上手で、また利用したいと思います。スタッフの方の笑顔が素敵でした。',
  '友人の紹介で行ってみました。想像以上に良かったです！雰囲気も良く、時間を忘れて楽しめました。次回も予約を取りたいと思います。',
  '前から気になっていたお店でした。期待通りの素晴らしいサービスでした。特に〇〇さんの施術が最高でした。また絶対に行きます！',
  'SNSで話題になっていたので行ってみました。口コミ通り、とても良いお店でした。癒やされました〜。写真もたくさん撮らせてもらいました。',
  '2回目の利用です。前回も良かったのですが、今回はさらに良かったです。スタッフの皆さんの成長を感じます。また来月も予約しました。',
  '誕生日に自分へのご褒美として利用しました。特別な時間を過ごせました。プレゼントも頂いて嬉しかったです。素敵な誕生日になりました。',
  '出張先で利用しました。疲れていたのですが、すっかり癒やされました。地方にもこんな素敵なお店があるんですね。また出張の際は利用します。',
  '初心者でも安心して利用できました。スタッフの方が優しく説明してくれて、緊張せずに楽しめました。友達にも紹介したいと思います。'
]

const sampleTitles = [
  '初めての利用で大満足！',
  '友人紹介で素晴らしい体験',
  '期待以上のサービスでした',
  'SNSで話題のお店に行ってみた',
  'リピート利用で今回も最高',
  '誕生日の特別な時間',
  '出張先での癒やしの時間',
  '初心者でも安心のお店'
]

const sampleUserNames = [
  'さくら', 'みお', 'あやか', 'ゆい', 'りな', 'かな', 'えみ', 'ひな',
  'まい', 'ゆき', 'れい', 'すず', 'あん', 'みく', 'のあ', 'ちか'
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
  totalCount: number = 50,
  sort: 'latest' | 'like' | 'oldest' = 'latest'
): DiaryPagination => {
  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit, totalCount)
  
  let data: Diary[] = []
  for (let i = startIndex; i < endIndex; i++) {
    data.push(generateMockDiary(i))
  }
  
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
  
  const totalPages = Math.ceil(totalCount / limit)
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
  limit: number = 10
): DiaryPagination => {
  // 検索クエリに応じて結果数を調整
  const baseCount = query.length > 0 ? Math.floor(Math.random() * 20) + 5 : 0
  return generateMockDiaryPagination(page, limit, baseCount, 'latest')
}
