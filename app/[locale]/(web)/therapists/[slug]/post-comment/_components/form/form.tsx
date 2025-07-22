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
      <h1 className='font-bold'>口コミ・ファンメ投稿</h1>
      <div className='mt-4 bg-[#F5F5F5] p-4'>
        <Checkbox label='匿名にする' {...register('isAnonymous')} id='isAnonymous' />
        <p className='mt-2 text-xs'>※匿名にすると名前とアイコンを隠すことができます</p>
      </div>
      <div className='mb-8 mt-4 flex items-center'>
        <figure className='relative h-[48px] w-[48px] overflow-hidden rounded-full bg-[#F5F5F5]'>
          <Image src={userIcon ?? ''} alt={''} fill className='object-cover' />
        </figure>
        <p className='ml-4 text-sm'>{watch('isAnonymous') ? '匿名' : props.user.name}</p>
      </div>
      <div className='mt-4 bg-[#F5F5F5] p-4'>
        <Checkbox label='非公開にする' {...register('isPrivate')} id='isPrivate' />
        <p className='mt-2 text-xs'>
          ※非公開メッセージにすると公認のセラピスト本人しか読めないメッセージになります
        </p>
      </div>
      <div className='mt-4'>
        <textarea
          {...register('message')}
          rows={6}
          className='block w-full resize-none border border-black p-2.5 text-sm text-gray-900'
          placeholder='コメント入力'
        ></textarea>
        <p className='mt-2 text-right text-sm'>{watch('message').length}/1000</p>
      </div>
      <div className='mt-4'>
        <CommentButton
          label='口コミ・ファンメ投稿'
          disabled={!isValid}
          onClick={toggleIsOpenModal}
        />
      </div>
    </section>
  )
}
