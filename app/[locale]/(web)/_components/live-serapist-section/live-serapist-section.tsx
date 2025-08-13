'use client'
import { type Serapist } from '@/app/api/serapist/schema'
import { type StoreSNSAccount } from '@/app/api/store-sns-account/schema'
import { useTranslations } from 'next-intl'
import { LiveSectionTitle } from '@/app/_components/live-section-title/live-section-title'
import { Link } from '@/i18n/routing'
import { SerapistCard } from '@/components/serapist-card'
import { StoreSNSAccountCard } from '@/components/store-sns-account-card'

type Props = {
  serapistList: Serapist[]
  storeSNSAccountList: StoreSNSAccount[]
}

export const LiveSerapistSection = (props: Props) => {
  const pageTranslation = useTranslations('liveSerapistList')
  
  // ライブ配信中のセラピストのみをフィルタリング
  const liveSerapists = props.serapistList.filter(serapist => serapist.isLive === true)
  
  // ライブ配信中の店舗SNSアカウントのみをフィルタリング
  const liveStoreSNSAccounts = props.storeSNSAccountList.filter(account => account.isLive === true)
  
  // ライブ配信中のコンテンツがない場合は何も表示しない
  if (liveSerapists.length === 0 && liveStoreSNSAccounts.length === 0) {
    return null
  }
  
  return (
    <div className='mb-12'>
      <LiveSectionTitle>{pageTranslation('title')}</LiveSectionTitle>
      <div className='grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4'>
        {/* ライブ配信中セラピストカード */}
        {liveSerapists.map((serapist) => {
          return (
            <Link href={`/therapists/${serapist.slug}`} key={`serapist-${serapist.slug}`}>
              <SerapistCard serapist={serapist} />
            </Link>
          )
        })}
        
        {/* ライブ配信中店舗SNSアカウントカード */}
        {liveStoreSNSAccounts.map((account) => {
          return (
            <div key={`store-sns-${account.id}`}>
              <StoreSNSAccountCard storeSNSAccount={account} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
