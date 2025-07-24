import type { Metadata } from 'next'
import { ApplicationForm } from './_components/application-form'
import { StoreRegistrationSection } from './_components/store-registration-section'
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
  return (
    <div className='min-h-screen'>
      {/* セラピスト申請セクション */}
      <div className='bg-gradient-to-r from-[#e6f3ff] to-[#fff0f5]'>
        <ApplicationForm shopList={shops} />
      </div>
      
      {/* 店舗オーナーセクション */}
      <div className='bg-[#f8f9fa]'>
        <StoreRegistrationSection />
      </div>
    </div>
  )
}
