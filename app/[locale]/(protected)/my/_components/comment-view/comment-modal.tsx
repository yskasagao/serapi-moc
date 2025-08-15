'use client'

import { Heart, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import dayjs from '@/lib/dayjs'

type Props = {
  isOpen: boolean
  onClose: () => void
  comments: {
    text: string
    id: string
    Serapistar: {
      nickname: string
      avatar: string | null
    } | null
    isPublic: boolean
    createdAt: Date
  }[]
}

export const CommentsModal = (props: Props) => {
  return (
    <>
      {props.isOpen && (
        <Modal 
          title={
            <div className="flex items-center">
              <MessageSquare className='mr-2 h-5 w-5 text-brand-icon-static' />
              口コミ・ファンメ
            </div>
          }
          size="large"
          onClose={props.onClose}
        >
          <div className='hidden-scrollbar grid max-h-[500px] gap-4 overflow-y-auto py-4'>
            {props.comments.map((comment) => (
              <div key={comment.id} className='space-y-2 rounded-lg border border-gray-200 p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='text-muted-foreground text-xs'>
                    {dayjs(comment.createdAt).tz().format('YYYY-MM-DD')}
                  </span>
                  <Badge
                    variant={comment.isPublic ? 'default' : 'destructive'}
                    className={comment.isPublic ? 'bg-[#18a2ff]' : 'bg-[#ff4b5c]'}
                  >
                    {comment.isPublic ? '公開' : '限定公開'}
                  </Badge>
                </div>
                <div className='space-y-2'>
                  <div className='mb-2 rounded-lg bg-gray-100 p-3'>
                    <p className='text-sm'>{comment.text}</p>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <Heart className='h-4 w-4 text-brand-icon-static' />
                    <span className='text-muted-foreground text-xs'>0</span>
                  </div>
                </div>
                <div className='flex items-center justify-end space-x-2'>
                  <span className='text-muted-foreground text-xs'>
                    {comment.Serapistar?.nickname}
                  </span>
                  <figure className='relative h-8 w-8 overflow-hidden rounded-full'>
                    <Image
                      src={comment.Serapistar?.avatar ?? ''}
                      alt={comment.Serapistar?.nickname ?? ''}
                      width={32}
                      height={32}
                      className='object-cover'
                    />
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  )
}
