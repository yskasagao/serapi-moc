import type { ProfileSchema } from '@/app/[locale]/(protected)/my/_components/profile-view'

// 開発環境用のモックデータ
export const MOCK_USER_DATA: ProfileSchema = {
  name: '開発用ユーザー',
  image: 'https://via.placeholder.com/150',
  message: '開発用のユーザーです',
  Comment: [
    {
      id: 'mock-comment-1',
      text: 'これは開発用のコメントです。',
      isPublic: true,
      createdAt: new Date('2024-01-15'),
      Serapistar: {
        slug: 'mock-serapist',
        nickname: 'モックセラピスト',
        avatar: 'https://via.placeholder.com/100',
      },
    },
    {
      id: 'mock-comment-2',
      text: 'こちらも開発用のサンプルコメントです。',
      isPublic: true,
      createdAt: new Date('2024-01-10'),
      Serapistar: {
        slug: 'mock-serapist-2',
        nickname: 'モックセラピスト2',
        avatar: 'https://via.placeholder.com/100',
      },
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
