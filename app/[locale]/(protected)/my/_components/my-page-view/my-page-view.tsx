'use client'
import { useState } from 'react'
import { AdvertisementCard } from '@/app/[locale]/(protected)/my/_components/advertisement-card/advertisement-card'
import { AdvertisementSwiperView } from '@/app/[locale]/(protected)/my/_components/advertisement-swiper-view'
import {
  type ProfileSchema,
  ProfileView,
} from '@/app/[locale]/(protected)/my/_components/profile-view'
import { type Advertisement } from '@/app/[locale]/(protected)/my/fetch-advertisements'

type Props = {
  advertisements: Advertisement[]
  user: ProfileSchema
  isOpenModalUserModal: boolean
}
export const MyPageView = (props: Props) => {
  const [ads, setAds] = useState<Advertisement[]>(props.advertisements)
  const sRankAds = ads.filter((v) => v.rank === 'S')
  const aRankAds = ads.filter((v) => v.rank === 'A')
  const leftAds: Advertisement[] = []
  const rightAds: Advertisement[] = []
  ads.forEach((item, index) => {
    if (index % 2 === 0) {
      leftAds.push(item)
    } else {
      rightAds.push(item)
    }
  })
  return (
    <div className='container mx-auto px-4 py-8 lg:max-w-[1280px]'>
      {sRankAds.length > 0 && (
        <AdvertisementSwiperView
          advertisements={sRankAds}
          afterCloseAllAd={() => {
            setAds((p) => p.filter((v) => v.rank !== 'S'))
          }}
          afterCloseAd={(id) => {
            setAds((p) => p.filter((v) => v.id !== id))
          }}
        />
      )}
      <div className='lg:flex lg:space-x-8'>
        <div className='hidden space-y-4 lg:block lg:w-1/4'>
          {leftAds.map((ad) => {
            return (
              <AdvertisementCard
                advertisement={ad}
                key={ad.id}
                afterCloseAd={(id) => {
                  setAds((p) => p.filter((v) => v.id !== id))
                }}
              />
            )
          })}
        </div>
        <div className='mx-auto max-w-[640px] lg:w-1/2'>
          <ProfileView user={props.user} isOpenModal={props.isOpenModalUserModal} />
          <div className='mt-8 space-y-4 lg:hidden'>
            {aRankAds.map((ad) => {
              return (
                <AdvertisementCard
                  advertisement={ad}
                  key={ad.id}
                  afterCloseAd={(id) => {
                    setAds((p) => p.filter((v) => v.id !== id))
                  }}
                />
              )
            })}
          </div>
        </div>
        <div className='hidden space-y-4 lg:block lg:w-1/4'>
          {rightAds.map((ad) => {
            return (
              <AdvertisementCard
                advertisement={ad}
                key={ad.id}
                afterCloseAd={(id) => {
                  setAds((p) => p.filter((v) => v.id !== id))
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
