import type { Metadata } from 'next'
import { ApplicationForm } from './_components/application-form'
import { defaultMetaData } from '@/lib/meta'
import mediaPrisma from '@/lib/prisma'

export const metadata: Metadata = {
  ...defaultMetaData,
  title: 'Serapister | セラピスト登録ページ',
  robots: {
    index: true,
  },
}

export default async function Page() {
  const shops = await mediaPrisma.shop.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  return <ApplicationForm shopList={shops} />
}
