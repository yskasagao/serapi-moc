import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { getAuthOptions } from '@/lib/auth'

export default async function Page() {
  const session = await getServerSession(getAuthOptions())
  if (session) {
    redirect('/experience-diary')
  }
  
  // 通常の認証ページ（モーダルが優先されるため、この内容は基本的に表示されない）
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
        <p className="text-gray-600">体験日記を書くにはログインしてください。</p>
      </div>
    </div>
  )
}
