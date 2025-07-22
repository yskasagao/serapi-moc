import type { Metadata } from 'next'
import { StoreForm } from './_components/store-form'
import { defaultMetaData } from '@/lib/meta'

export const metadata: Metadata = {
  ...defaultMetaData,
  title: 'Serapister | 公認店舗申請ページ',
  description: '公認店舗として登録することで、優先的に表示され露出度がアップします。無料で簡単に申請可能です。',
  robots: {
    index: true,
  },
}

export default function Page() {
  return <StoreForm />
}
