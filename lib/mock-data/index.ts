// モックデータの統合エクスポート

// セラピスト関連
export {
  generateMockSerapist,
  generateMockSerapistPaginator
} from './serapist'

// 会社関連
export {
  generateMockCompany,
  generateMockCompanies,
  generateMockCompaniesByArea
} from './company'

// 体験日記関連
export {
  generateMockDiary,
  generateMockDiaryPagination,
  generateMockDiarySearchResults
} from './diary'

// 開発環境判定ユーティリティ
export const isDevelopment = process.env.NODE_ENV === 'development'

// モックデータを使用するかどうかの判定
export const useMockData = () => {
  return isDevelopment && process.env.USE_MOCK_DATA === 'true'
}
