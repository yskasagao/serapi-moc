'use client'

import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { type z } from 'zod'
import { type PostCommentSchema } from '../form/schema'
import { postComment } from './actions'
import { CommentButton } from '@/app/_components/comment-button'
import { Toaster } from '@/app/_components/toaster'

import LockIcon from '@assets/icon-lock.svg'
import CloseSVG from '@assets/icon_close.svg'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
  },
  overlay: {
    zIndex: 2,
  },
}

type Props = {
  isOpen: boolean
  onClose: () => void
  targetSlug: string
  postUser: {
    icon: string
    userName: string
  }
  data: z.infer<typeof PostCommentSchema>
}

export const ConfirmModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <Toaster />
      <div className='h-screen w-screen max-w-[750px] pt-16'>
        <div className='p-4'>
          <nav className='flex'>
            <button onClick={props.onClose} className='ml-auto'>
              <CloseSVG width={24} height={24} />
            </button>
          </nav>
        </div>
        <form
          className='mx-auto flex max-w-[380px] flex-col px-4'
          action={async (formData: FormData) => {
            setIsLoading(true)
            const result = await postComment(formData)
            setIsLoading(false)
            if (!result.success) {
              toast.error('保存できませんでした。')
            }
          }}
        >
          <input type='hidden' name='targetSlug' value={props.targetSlug} />
          <input
            type='hidden'
            name='isAnonymous'
            value={props.data.isAnonymous ? 'true' : undefined}
          />
          <input type='hidden' name='isPrivate' value={props.data.isPrivate ? `true` : undefined} />
          <input type='hidden' name='message' value={props.data.message} />
          {props.data.isAnonymous && (
            <input type='hidden' name='dummyIcon' value={props.postUser.icon} />
          )}
          <p className='font-bold'>投稿確認</p>
          <div className='mb-8 mt-4 flex items-center'>
            <figure className='relative h-[48px] w-[48px] overflow-hidden rounded-full bg-[#F5F5F5]'>
              <Image src={props.postUser.icon} alt={''} fill className='object-cover' />
            </figure>
            <p className='ml-4 text-sm'>
              {props.data.isAnonymous ? '匿名' : props.postUser.userName}
            </p>
          </div>
          {props.data.isPrivate && (
            <div>
              <p className='flex h-[24px] w-[160px] items-center justify-center rounded-full border border-[#FE2C55] text-sm text-[#FE2C55]'>
                <LockIcon className='mr-2 h-[20px] w-[20px]' />
                非公開メッセージ
              </p>
            </div>
          )}
          <p className='mt-4 max-h-[120px] overflow-y-auto whitespace-pre-wrap'>
            {props.data.message}
          </p>
          <CommentButton
            label={isLoading ? '送信中' : '口コミ・ファンメ投稿'}
            disabled={isLoading}
            className='mt-8'
            type='submit'
          />
        </form>
      </div>
    </Modal>
  )
}
