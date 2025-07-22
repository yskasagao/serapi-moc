'use client'
import { MessageSquare } from 'lucide-react'
import { useToggle } from 'react-use'
import { CommentsModal } from '@/app/[locale]/(protected)/my/_components/comment-view/comment-modal'
import { Button } from '@/components/ui/button'

type Props = {
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

export const CommentView = (props: Props) => {
  const [isOpenModal, toggleIsOpenModal] = useToggle(false)
  return (
    <>
      <CommentsModal isOpen={isOpenModal} onClose={toggleIsOpenModal} comments={props.comments} />
      <Button
        variant='outline'
        className='border-custom h-auto w-full justify-start border py-4'
        onClick={toggleIsOpenModal}
      >
        <MessageSquare className='mr-2 h-5 w-5 text-gray-600' />
        <div className='flex flex-col items-start'>
          <span className='font-medium'>口コミ・ファンメ</span>
          <span className='text-muted-foreground text-sm'>
            あなたが投稿した口コミ・ファンメッセージ
          </span>
        </div>
      </Button>
    </>
  )
}
