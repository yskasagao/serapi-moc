import type { Metadata } from 'next'
import { ResultView } from './_components/result-view'
import { defaultMetaData } from '@/lib/meta'

export const metadata: Metadata = {
  ...defaultMetaData,
  title: 'Serapister | カウンセリングデータ入力完了',
  robots: {
    index: false,
  },
}

export default async function Page() {
  return <ResultView />
}
