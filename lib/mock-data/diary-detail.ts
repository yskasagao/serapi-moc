import type { Diary } from '@/app/api/experience-diary/search/schema'
import { getActiveThemes } from './diary-themes'

// 詳細ページ用のモックデータマップ
const mockDiaryDetails: Record<string, Diary> = {
  // 既存の一覧ページで表示されているIDに対応するダミーデータ
  'chd32l93tfa021zvt3xfzyvj6018': {
    id: 'chd32l93tfa021zvt3xfzyvj6018',
    title: '期待以上のサービスでした',
    text: `前から気になっていたお店でした。期待通りの素晴らしいサービスでした。特に〇〇さんの施術が最高でした。また絶対に行きます！

お店の雰囲気もとても良く、清潔感があって安心できました。スタッフの方々もとても親切で、初回でも緊張することなくリラックスして過ごすことができました。

施術の技術レベルも高く、丁寧に対応していただけました。時間もたっぷりとってくださり、満足度の高い体験でした。

料金も適正で、コストパフォーマンスが良いと思います。友人にも紹介したいと思える素晴らしいお店でした。`,
    like: 50,
    createdAt: new Date('2025-08-20'),
    User: {
      name: 'あやか'
    },
    ExperienceDiaryImage: [
      { image: 'https://picsum.photos/400/300?random=diary18_0' },
      { image: 'https://picsum.photos/400/300?random=diary18_1' },
      { image: 'https://picsum.photos/400/300?random=diary18_2' }
    ],
    themeId: 'theme_unexpected_surprise'
  },
  'cgvtiaag4su97dfv2xcr7rllo017': {
    id: 'cgvtiaag4su97dfv2xcr7rllo017',
    title: '友人紹介で素晴らしい体験',
    text: '友人の紹介で行ってみました。想像以上に良かったです！雰囲気も良く、時間を忘れて楽しめました。次回も予約を取りたいと思います。\n\n友人が「絶対に気に入ると思う」と言っていましたが、本当にその通りでした。お店の内装も素敵で、入った瞬間から特別な気分になれました。\n\nスタッフの方の接客も素晴らしく、一人一人に寄り添った丁寧な対応をしてくださいます。施術中も適度な会話で楽しく過ごせました。\n\n価格も良心的で、この品質でこの価格は本当にお得だと思います。また近いうちに予約を取って伺いたいと思います。',
    like: 19,
    createdAt: new Date('2025-08-16'),
    User: {
      name: 'みお'
    },
    ExperienceDiaryImage: [
      { image: 'https://picsum.photos/400/300?random=diary17_0' },
      { image: 'https://picsum.photos/400/300?random=diary17_1' },
      { image: 'https://picsum.photos/400/300?random=diary17_2' }
    ],
    themeId: 'theme_first_visit'
  },
  'cv75jngkhhswezp9805mhd1vd013': {
    id: 'cv75jngkhhswezp9805mhd1vd013',
    title: '誕生日の特別な時間',
    text: '誕生日に自分へのご褒美として利用しました。特別な時間を過ごせました。プレゼントも頂いて嬉しかったです。素敵な誕生日になりました。\n\n事前に誕生日であることをお伝えしていたところ、素敵なサプライズを用意してくださいました。小さなプレゼントもいただき、とても感動しました。\n\n施術も特別に丁寧にしていただき、心身ともにリフレッシュできました。日頃の疲れも忘れて、贅沢な時間を過ごすことができました。\n\n一年に一度の特別な日を、こんなに素敵に過ごせて本当に良かったです。来年の誕生日もまた利用させていただきたいと思います。',
    like: 35,
    createdAt: new Date('2025-08-15'),
    User: {
      name: 'みく'
    },
    ExperienceDiaryImage: [
      { image: 'https://picsum.photos/400/300?random=diary13_0' },
      { image: 'https://picsum.photos/400/300?random=diary13_1' },
      { image: 'https://picsum.photos/400/300?random=diary13_2' }
    ],
    themeId: 'theme_birthday_special'
  },
  'cz52mcm73z4a6hs9tff89ij71001': {
    id: 'cz52mcm73z4a6hs9tff89ij71001',
    title: '友人紹介で素晴らしい体験',
    text: `友人の紹介で行ってみました。想像以上に良かったです！雰囲気も良く、時間を忘れて楽しめました。次回も予約を取りたいと思います。

口コミでは良いお店だと聞いていましたが、実際に体験してみると期待以上でした。施設も清潔で、リラックスできる空間作りがされています。

スタッフの皆さんのプロ意識の高さにも感動しました。一人一人のお客様を大切にしている姿勢が伝わってきます。

今度は別の友人も一緒に来たいと思っています。きっと喜んでもらえると確信しています。`,
    like: 14,
    createdAt: new Date('2025-08-10'),
    User: {
      name: 'みお'
    },
    ExperienceDiaryImage: [
      { image: 'https://picsum.photos/400/300?random=diary1_0' },
      { image: 'https://picsum.photos/400/300?random=diary1_1' },
      { image: 'https://picsum.photos/400/300?random=diary1_2' }
    ],
    themeId: 'theme_first_visit'
  },
  'clut4ovt8wfic6ty4e3kuzukk008': {
    id: 'clut4ovt8wfic6ty4e3kuzukk008',
    title: '初めての利用で大満足！',
    text: `初めて利用させていただきました。とても丁寧な接客で、リラックスできました。施術も上手で、また利用したいと思います。スタッフの方の笑顔が素敵でした。

初回だったので少し緊張していましたが、スタッフの方が優しく迎えてくださり、すぐに緊張がほぐれました。

施術の説明も分かりやすく、不安なく体験することができました。技術力の高さも感じられ、とても満足しています。

お店の雰囲気も落ち着いていて、日常を忘れてリラックスできる空間でした。次回の予約もすでに取らせていただきました。`,
    like: 29,
    createdAt: new Date('2025-08-10'),
    User: {
      name: 'まい'
    },
    ExperienceDiaryImage: [
      { image: 'https://picsum.photos/400/300?random=diary8_0' }
    ],
    themeId: 'theme_ng_therapist'
  }
}

// IDからモックデータを取得する関数
export const getMockDiaryDetail = (id: string): Diary | null => {
  return mockDiaryDetails[id] || null
}

// すべてのモックデータIDを取得する関数
export const getAllMockDiaryIds = (): string[] => {
  return Object.keys(mockDiaryDetails)
}

// 追加のダミーデータを生成する関数（存在しないIDの場合）
export const generateFallbackMockDiary = (id: string): Diary => {
  const titles = [
    '素晴らしい体験でした',
    '初回利用で大満足',
    'リピート確定のお店',
    '友人にもおすすめしたい',
    '期待を上回るサービス'
  ]
  
  const texts = [
    'とても素敵な体験をさせていただきました。スタッフの方々の対応も丁寧で、施術の技術も高く、心身ともにリフレッシュできました。',
    '初めての利用でしたが、丁寧な説明とプロフェッショナルな技術で安心して体験できました。また利用したいと思います。',
    '何度か利用していますが、毎回満足度の高いサービスを提供していただいています。信頼できるお店です。',
    '友人の紹介で伺いましたが、想像以上に良いお店でした。今度は他の友人も一緒に来たいと思います。',
    '期待していた以上の素晴らしいサービスでした。料金も適正で、コストパフォーマンスが良いと感じました。'
  ]
  
  const names = ['さくら', 'ゆい', 'あやか', 'みお', 'かな']
  
  const randomIndex = Math.abs(id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 5
  
  // テーマIDを生成（全てのフォールバックデータにテーマを設定）
  const activeThemes = getActiveThemes()
  const themeId = activeThemes.length > 0 
    ? activeThemes[randomIndex % activeThemes.length].id 
    : undefined
  
  return {
    id,
    title: titles[randomIndex],
    text: `${texts[randomIndex]}

${texts[(randomIndex + 1) % 5]}`,
    like: Math.floor(Math.random() * 40) + 10,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // 過去30日以内
    themeId,
    User: {
      name: names[randomIndex]
    },
    ExperienceDiaryImage: [
      { image: `https://picsum.photos/400/300?random=${id}_0` },
      { image: `https://picsum.photos/400/300?random=${id}_1` }
    ]
  }
}