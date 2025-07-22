'use client'

import { X } from 'lucide-react'
import React, { useTransition } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { AdvertisementCard } from '@/app/[locale]/(protected)/my/_components/advertisement-card/advertisement-card'
import { ignoreAdvertisements } from '@/app/[locale]/(protected)/my/_components/advertisement-swiper-view/action'
import { type Advertisement } from '@/app/[locale]/(protected)/my/fetch-advertisements'

type Props = {
  advertisements: Advertisement[]
  afterCloseAd: (id: string) => void
  afterCloseAllAd: () => void
}

export const AdvertisementSwiperView = (props: Props) => {
  const [isPending, startTransition] = useTransition()
  const handleClick = () => {
    startTransition(async () => {
      const result = await ignoreAdvertisements(props.advertisements.map((ad) => ad.id))
      if (result.success) {
        props.afterCloseAllAd()
      }
    })
  }
  return (
    <div className='relative pb-8 md:hidden'>
      <button
        className='absolute -top-2 right-0 z-20 rounded-full bg-white p-1.5 shadow-md'
        aria-label='Close carousel'
        disabled={isPending}
        onClick={handleClick}
      >
        <X className='h-4 w-4 text-[#ff7e8a]' />
      </button>
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        className='mySwiper !pb-8'
      >
        {props.advertisements.map((ad) => (
          <SwiperSlide key={ad.id} className='px-2 py-4'>
            <AdvertisementCard advertisement={ad} afterCloseAd={props.afterCloseAd} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
