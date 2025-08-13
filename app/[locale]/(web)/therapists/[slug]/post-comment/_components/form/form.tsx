'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { type User } from 'next-auth'
import { useForm } from 'react-hook-form'
import { useToggle } from 'react-use'
import type z from 'zod'
import { ConfirmModal } from '../confirm-modal'
import { PostCommentSchema } from './schema'
import { Checkbox } from '@/app/_components/checkbox/checkbox'
import { CommentButton } from '@/app/_components/comment-button'
import { MessageCircle } from 'lucide-react'

type Props = {
  user: User
  anonymousIcon: string
  targetSlug: string
}

export const Form = (props: Props) => {
  const {
    register,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<z.infer<typeof PostCommentSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(PostCommentSchema),
    defaultValues: {
      isAnonymous: false,
      isPrivate: false,
      message: '',
    },
  })
  const [isOpenModal, toggleIsOpenModal] = useToggle(false)
  const userIcon = watch('isAnonymous') ? props.anonymousIcon : props.user.image
  
  return (
    <section>
      <ConfirmModal
        isOpen={isOpenModal}
        onClose={toggleIsOpenModal}
        data={getValues()}
        targetSlug={props.targetSlug}
        postUser={{
          userName: props.user.name ?? '',
          icon: userIcon ?? '',
        }}
      />
      
      <h1 className='mb-6 flex items-center text-base font-medium text-gray-700'>
        <MessageCircle className='mr-2 h-5 w-5 text-brand-icon-static' />
        口コミ・ファンメ投稿
      </h1>
      
      <div className='border-custom divide-y divide-gray-100 rounded-lg border bg-white shadow-sm'>
        {/* 匿名設定セクション */}
        <div className='space-y-4 bg-gray-50 p-6'>
          <div className='space-y-3'>
            <Checkbox label='匿名にする' {...register('isAnonymous')} id='isAnonymous' />
            <p className='text-xs text-gray-600'>
              ※匿名にすると名前とアイコンを隠すことができます
            </p>
          </div>
          
          {/* ユーザー情報表示 */}
          <div className='flex items-center rounded-md bg-white p-4 shadow-sm'>
            <figure className='relative h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
              <Image src={userIcon ?? ''} alt={''} fill className='object-cover' />
            </figure>
            <p className='ml-4 font-medium text-gray-700'>
              {watch('isAnonymous') ? '匿名' : props.user.name}
            </p>
          </div>
        </div>
        
        {/* 公開設定セクション */}
        <div className='space-y-4 bg-gray-50 p-6'>
          <div className='space-y-3'>
            <Checkbox label='非公開にする' {...register('isPrivate')} id='isPrivate' />
            <p className='text-xs text-gray-600'>
              ※非公開メッセージにすると公認のセラピスト本人しか読めないメッセージになります
            </p>
          </div>
        </div>
        
        {/* メッセージ入力セクション */}
        <div className='space-y-4 p-6'>
          <div>
            <label htmlFor='message' className='mb-2 block text-sm font-medium text-gray-700'>
              メッセージ
            </label>
            <textarea
              {...register('message')}
              id='message'
              rows={6}
              className='block w-full resize-none rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-900 transition-colors duration-200 focus:border-brand-ui focus:outline-none focus:ring-1 focus:ring-brand-ui'
              placeholder='コメントを入力してください'
            ></textarea>
            <p className='mt-2 text-right text-sm text-gray-500'>
              {watch('message').length}/1000
            </p>
          </div>
        </div>
        
        {/* アクションボタンセクション */}
        <div className='bg-gray-50 p-6'>
          <CommentButton
            label='口コミ・ファンメ投稿'
            disabled={!isValid}
            onClick={toggleIsOpenModal}
          />
        </div>
      </div>
    </section>
  )
}
