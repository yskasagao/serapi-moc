import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { StoreView } from './_components/store-view'
import { type StoreSNSAccount } from '@/app/api/store-sns-account/schema'
import { APP_NAME, ORIGIN } from '@/lib/constants'
import { generateMockStoreSNSAccounts } from '@/lib/mock-data/store-sns-account'

type Props = {
  params: Promise<{ id: string }>
}

const fetchStore = cache(async (id: string): Promise<StoreSNSAccount> => {
  // 開発環境でモックデータを使用する場合
  const mockStores = generateMockStoreSNSAccounts()
  const mockStore = mockStores.find(store => store.id === id)
  
  if (mockStore) {
    return mockStore
  }

  // 本番環境: データベースからデータを取得
  // TODO: 実際のデータベース取得処理を実装
  throw new Error('Store not found')
})

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params
  try {
    const store = await fetchStore(params.id)
    return {
      title: `${store.name}の店舗情報・所属セラピスト一覧 | ${APP_NAME}`,
      description: `${store.name}の詳細情報と所属セラピスト一覧。${store.platform}で配信中の人気店舗です。`,
      alternates: {
        canonical: `${ORIGIN}/stores/${params.id}`,
      },
    }
  } catch {
    return {
      title: `店舗情報 | ${APP_NAME}`,
    }
  }
}

export default async function Page(props: Props) {
  try {
    const params = await props.params
    const store = await fetchStore(params.id)
    
    return (
      <StoreView
        store={store}
      />
    )
  } catch {
    return notFound()
  }
}