import type { ProfileSchema } from '@/app/[locale]/(protected)/my/_components/profile-view'

// 開発環境用のモックデータ
export const MOCK_USER_DATA: ProfileSchema = {
  name: '開発用ユーザー',
  image: 'https://via.placeholder.com/150',
  message: '開発用のユーザーです',
  Comment: [

    },
  ],
  Bookmark: [
    {
      Serapistar: {
        slug: 'bookmarked-serapist',
        nickname: 'ブックマークしたセラピスト',
        avatar: 'https://via.placeholder.com/100',
        shop: {
          name: 'サンプル店舗',
        },
        SerapisterParameter: {
          service: 4,
          like: 5,
          looks: 4,
          physical: 4,
          repeat: 5,
        },
      },
    },
  ],
}

/**
 * 開発環境でモックデータを使用する場合のユーザーデータ取得
 */
export const getUserDataWithDevMock = <T>(mockData: T): T | null => {
  if (process.env.USE_MOCK_DATA === 'true') {
    return mockData
  }
  return null // モックを使用しない場合はnullを返す
}
