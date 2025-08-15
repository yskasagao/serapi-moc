import type { StoreSNSAccount } from '@/app/api/store-sns-account/schema'

// 店舗SNSアカウントのモックデータ生成関数
export const generateMockStoreSNSAccount = (index: number): StoreSNSAccount => {
  const storeNames = [
    'リラクゼーション東京', 'ヒーリングスパ大阪', 'ウェルネス名古屋', 'マッサージ福岡',
    'ビューティー札幌', 'セラピー横浜', 'リフレッシュ神戸', 'リラックス京都',
    'ヘルスケア仙台', 'アロマ広島', 'エステ千葉', 'ボディケア沖縄'
  ]
  
  // 7エリア区分ID（lib/constants.ts の areaGroupNameMap のキー）
  const areaGroupIds = [
    'hokkaido', 'tohoku', 'kanto', 'chubu', 
    'kansai', 'chugoku-shikoku', 'kyusyu-okinawa'
  ]
  
  const storeName = storeNames[index % storeNames.length]
  
  // 各店舗に1-3個のエリアをランダムに割り当て
  const areaCount = Math.floor(Math.random() * 3) + 1 // 1-3個
  const selectedAreas: string[] = []
  for (let i = 0; i < areaCount; i++) {
    const areaIndex = (index + i) % areaGroupIds.length
    const areaId = areaGroupIds[areaIndex]
    if (!selectedAreas.includes(areaId)) {
      selectedAreas.push(areaId)
    }
  }
  
  // 店舗名をローマ字風に変換
  const romanizedNames = [
    'relaxation_tokyo', 'healing_spa_osaka', 'wellness_nagoya', 'massage_fukuoka',
    'beauty_sapporo', 'therapy_yokohama', 'refresh_kobe', 'relax_kyoto',
    'healthcare_sendai', 'aroma_hiroshima', 'este_chiba', 'bodycare_okinawa'
  ]
  const romanizedName = romanizedNames[index % romanizedNames.length]
  
  // 複数プラットフォーム対応（1-2個のプラットフォーム）
  const platformCount = Math.random() > 0.6 ? 2 : 1 // 40%の確率で2つのプラットフォーム
  const allPlatforms = ['tiktok', 'twitcasting'] as const
  const platforms = []
  
  for (let i = 0; i < platformCount; i++) {
    const platform = allPlatforms[i % allPlatforms.length]
    const handle = `@${romanizedName}${platformCount > 1 ? `_${platform}` : ''}`
    const isLive = (index === 1 || index === 4 || index === 6) && i === 0 // 最初のプラットフォームがライブ中
    
    platforms.push({
      platform,
      handle,
      isLive
    })
  }
  
  return {
    id: `store-sns-${index}`,
    name: `${storeName}店`,
    avatar: `https://picsum.photos/200/200?random=store${index}`,
    officialUrl: `https://example.com/store-${romanizedName}`, // 公式サイトURL
    platforms,
    areaGroups: selectedAreas,
  }
}

// 複数の店舗SNSアカウントデータを生成
export const generateMockStoreSNSAccounts = (count: number = 12): StoreSNSAccount[] => {
  const accounts: StoreSNSAccount[] = []
  for (let i = 0; i < count; i++) {
    accounts.push(generateMockStoreSNSAccount(i))
  }
  return accounts
}

// ライブ配信中の店舗SNSアカウントのみを取得
export const generateMockLiveStoreSNSAccounts = (): StoreSNSAccount[] => {
  const allAccounts = generateMockStoreSNSAccounts()
  return allAccounts.filter(account => 
    account.platforms?.some(platform => platform.isLive === true) ?? false
  )
}
