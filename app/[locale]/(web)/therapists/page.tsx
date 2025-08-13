import Link from 'next/link'
import { AVAILABLE_MOCK_SLUGS, MOCK_SERAPIST_LIST } from '@/lib/mock-serapist-data'

export default function TherapistsPage() {
  // Show mock list only in development environment
  if (process.env.USE_MOCK_DATA !== 'true') {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-4 text-2xl font-bold'>セラピスト一覧</h1>
        <p className='text-gray-600'>
          本番環境ではデータベースからセラピスト一覧を取得します。
        </p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>セラピスト一覧（開発用モックデータ）</h1>
      
      <div className='mb-6 rounded-lg bg-blue-50 p-4'>
        <h2 className='mb-2 text-lg font-semibold text-blue-800'>開発環境情報</h2>
        <p className='text-blue-700'>
          現在は開発用のモックデータを表示しています。
          <br />
          環境変数: <code className='rounded bg-blue-100 px-1'>USE_MOCK_DATA=true</code>
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {AVAILABLE_MOCK_SLUGS.map((slug) => {
          const serapist = MOCK_SERAPIST_LIST[slug]
          const totalRating = serapist.SerapisterParameter
            ? Object.values(serapist.SerapisterParameter).reduce((a, b) => a + b, 0)
            : 0
          
          return (
            <Link
              key={slug}
              href={`/therapists/${slug}`}
              className='block rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md'
            >
              <div className='flex items-center space-x-4'>
                <img
                  src={serapist.avatar || '/noimage.jpg'}
                  alt={`${serapist.nickname}のプロフィール`}
                  className='h-16 w-16 rounded-full object-cover'
                />
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold'>{serapist.nickname}</h3>
                  <p className='text-xs text-gray-500 font-mono'>{slug}</p>
                  <div className='mt-1 flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-xs text-gray-500'>総評価:</span>
                      <span className='text-sm font-medium text-orange-600'>
                        ★{totalRating}
                      </span>
                    </div>
                    <div className='text-xs text-gray-400'>
                      {serapist.comments.length} レビュー
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className='mt-8 rounded-lg bg-gray-50 p-4'>
        <h3 className='mb-2 font-semibold'>アクセス可能なURL:</h3>
        <div className='space-y-2'>
          {AVAILABLE_MOCK_SLUGS.map((slug) => {
            const serapist = MOCK_SERAPIST_LIST[slug]
            return (
              <div key={slug} className='flex items-center justify-between'>
                <div>
                  <code className='rounded bg-gray-100 px-1 text-sm'>/therapists/{slug}</code>
                  <span className='ml-2 text-sm text-gray-600'>({serapist.nickname})</span>
                </div>
                <Link 
                  href={`/therapists/${slug}`}
                  className='text-blue-600 hover:text-blue-800 text-sm'
                >
                  アクセス →
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className='mt-6 rounded-lg bg-yellow-50 p-4'>
        <h3 className='mb-2 font-semibold text-yellow-800'>使用方法</h3>
        <ul className='text-sm text-yellow-700 space-y-1'>
          <li>• 各セラピストカードをクリックで詳細ページへ移動</li>
          <li>• ブックマーク機能はモック動作（実際のDB操作なし）</li>
          <li>• Star送信機能はセッション限定カウント</li>
          <li>• コメント投稿ページも利用可能</li>
        </ul>
      </div>
    </div>
  )
}
