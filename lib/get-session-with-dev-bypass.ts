import { getServerSession } from 'next-auth'
import type { Session } from 'next-auth'
import { getAuthOptions } from './auth'

// 開発環境用モックユーザー
// 環境変数で指定されたIDを使用、指定がない場合はデフォルトID
const mockUser = {
  id: process.env.MOCK_USER_ID || 'dev-user-01',
  name: '開発用ユーザー',
  email: 'dev@example.com',
  image: 'https://via.placeholder.com/150',
  message: '開発用のユーザーです',
}

// 開発環境用モックセッション
const mockSession: Session = {
  user: mockUser,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7日後
}

/**
 * 開発環境での認証バイパス機能付きセッション取得
 * USE_MOCK_DATA=true の場合、モックセッションを返す
 */
export const getSessionWithDevBypass = async (): Promise<Session | null> => {
  // 開発環境かつUSE_MOCK_DATAがtrueの場合、モックセッションを返す
  if (process.env.NODE_ENV === 'development' && process.env.USE_MOCK_DATA === 'true') {
    return mockSession
  }

  // 通常のセッション取得
  return await getServerSession(getAuthOptions())
}
