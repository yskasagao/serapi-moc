'use client'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useTransition } from 'react'
import { ignoreAdvertisement } from '@/app/[locale]/(protected)/my/_components/advertisement-card/action'
import { type Advertisement } from '@/app/[locale]/(protected)/my/fetch-advertisements'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  advertisement: Advertisement
  afterCloseAd: (id: string) => void
}

export const AdvertisementCard = async (props: Props) => {
  const [isPending, startTransition] = useTransition()
  const handleClick = () => {
    startTransition(async () => {
      const result = await ignoreAdvertisement(props.advertisement.id)
      if (result.success) {
        props.afterCloseAd(props.advertisement.id)
      }
    })
  }

  return (
    <Card className='relative w-full max-w-sm shadow-md transition-shadow hover:shadow-lg'>
      <Button
        onClick={handleClick}
        disabled={isPending}
        variant='ghost'
        size='sm'
        className='absolute right-2 top-2 z-10 h-6 w-6 rounded-full p-0 hover:bg-gray-100'
      >
        <X className='h-4 w-4 text-[#ff7e8a]' />
      </Button>
      <CardContent className='p-2 pt-12'>
        <div className='relative mb-3 h-24 w-full'>
          <Image
            src={props.advertisement.image}
            alt={props.advertisement.title}
            layout='fill'
            objectFit='cover'
            className='rounded-md'
          />
        </div>
        <h3 className='mb-1 line-clamp-2 text-base font-bold'>{props.advertisement.title}</h3>
        <p className='text-muted-foreground mb-2 text-xs'>{props.advertisement.shopName}</p>
        <p className='text-sm font-semibold text-[#ff7e8a]'>{props.advertisement.description}</p>
      </CardContent>
    </Card>
  )
}