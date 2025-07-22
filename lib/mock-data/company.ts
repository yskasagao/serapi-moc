import type { Company } from '@/lib/server-only/company/schema'

// 会社のモックデータ生成関数
export const generateMockCompany = (index: number): Company => {
  const companyNames = [
    'リラクゼーションサロン東京', 'ヒーリングスパ大阪', 'ウェルネスセンター名古屋',
    'マッサージスタジオ福岡', 'ビューティーサロン札幌', 'セラピールーム横浜',
    'リフレッシュスパ神戸', 'リラックスルーム京都', 'ヘルスケアサロン仙台',
    'アロマテラピー広島', 'エステティックサロン千葉', 'ボディケア沖縄'
  ]
  
  const areas = [
    { area: '渋谷', areaGroup: '東京' },
    { area: '新宿', areaGroup: '東京' },
    { area: '池袋', areaGroup: '東京' },
    { area: '梅田', areaGroup: '大阪' },
    { area: '難波', areaGroup: '大阪' },
    { area: '栄', areaGroup: '名古屋' },
    { area: '天神', areaGroup: '福岡' },
    { area: 'すすきの', areaGroup: '札幌' },
    { area: 'みなとみらい', areaGroup: '横浜' },
    { area: '三宮', areaGroup: '神戸' },
    { area: '河原町', areaGroup: '京都' },
    { area: '国分町', areaGroup: '仙台' }
  ]
  
  const baseUrl = 'https://example-salon'
  const companyName = companyNames[index % companyNames.length]
  const area = areas[index % areas.length]
  
  return {
    url: `${baseUrl}${index}.com`,
    image: `https://picsum.photos/400/300?random=company${index}`,
    imageZhHans: `https://picsum.photos/400/300?random=company_zh${index}`,
    name: companyName,
    CompanyArea: [area]
  }
}

// 複数の会社データを生成
export const generateMockCompanies = (count: number = 20): Company[] => {
  const companies: Company[] = []
  for (let i = 0; i < count; i++) {
    companies.push(generateMockCompany(i))
  }
  return companies
}

// エリアごとの会社データを生成
export const generateMockCompaniesByArea = (areaGroup: string, count: number = 10): Company[] => {
  const areaMap: Record<string, string[]> = {
    '東京': ['渋谷', '新宿', '池袋', '銀座', '原宿'],
    '大阪': ['梅田', '難波', '心斎橋', '天王寺', '京橋'],
    '名古屋': ['栄', '名駅', '金山', '大須', '今池'],
    '福岡': ['天神', '博多', '中洲', '薬院', '西新'],
    '札幌': ['すすきの', '大通', '札幌駅前', '中島公園', '円山'],
    '横浜': ['みなとみらい', '関内', '横浜駅', '中華街', '元町'],
    '神戸': ['三宮', '元町', 'ハーバーランド', '新開地', '灘'],
    '京都': ['河原町', '祇園', '烏丸', '京都駅', '嵐山']
  }
  
  const areas = areaMap[areaGroup] || ['中心部']
  const companies: Company[] = []
  
  for (let i = 0; i < count; i++) {
    const area = areas[i % areas.length]
    companies.push({
      url: `https://example-salon-${areaGroup.toLowerCase()}${i}.com`,
      image: `https://picsum.photos/400/300?random=${areaGroup}${i}`,
      imageZhHans: `https://picsum.photos/400/300?random=${areaGroup}_zh${i}`,
      name: `${areaGroup}${area}サロン${i + 1}`,
      CompanyArea: [{ area, areaGroup }]
    })
  }
  
  return companies
}
