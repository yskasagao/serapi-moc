'use client'
import { Heart, Pencil } from 'lucide-react'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa6'
import { useToggle } from 'react-use'
import { EditProfileModal } from '../edit-profile-modal'
import { type ProfileSchema } from './schema'
import { BookmarkView } from '@/app/[locale]/(protected)/my/_components/bookmark-view'
import { CommentView } from '@/app/[locale]/(protected)/my/_components/comment-view'
import { Card, CardContent } from '@/components/ui/card'
type Props = {
  user: ProfileSchema
  isOpenModal: boolean
}

export const ProfileView = (props: Props) => {
  const [isOpen, toggleIsOpen] = useToggle(props.isOpenModal)
  return (
    <>
      <EditProfileModal user={props.user} isOpen={isOpen} onClose={toggleIsOpen} />
      <Card className='border-custom relative mb-8'>
        <CardContent className='pt-6'>
          <button
            onClick={toggleIsOpen}
            className='text-muted-foreground hover:text-foreground absolute right-2 top-2 p-2'
          >
            <Pencil className='h-5 w-5 text-gray-600' />
          </button>
          <div className='flex flex-col items-center space-y-4'>
            <div className='relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#F5F5F5]'>
              {props.user.image ? (
                <Image
                  src={props.user.image || ''}
                  alt='プロフィール画像'
                  width={120}
                  height={120}
                  className='rounded-full'
                />
              ) : (
                <FaImage size='32' />
              )}
            </div>
            <div className='bg-accent flex min-w-[120px] items-center justify-center space-x-2 rounded-full px-4 py-2'>
              <Heart className='h-5 w-5 text-[#ff7e8a]' />
              <span className='text-base font-medium'>{0}</span>
            </div>
            <h2 className='text-xl font-bold text-[#ff7e8a]'>{props.user.name}</h2>
            <p className='text-muted-foreground text-center text-sm'>{props.user.message}</p>
          </div>
        </CardContent>
      </Card>
      <div className='space-y-4'>
        {/*<Button*/}
        {/*  variant='outline'*/}
        {/*  className='w-full justify-start h-auto py-4 border border-custom'*/}
        {/*  // onClick={() => setShowExperiences(true)}*/}
        {/*>*/}
        {/*  <FileText className='h-5 w-5 mr-2 text-gray-600' />*/}
        {/*  <div className='flex flex-col items-start'>*/}
        {/*    <span className='font-medium'>体験日記</span>*/}
        {/*    <span className='text-sm text-muted-foreground'>あなたも体験日記を投稿してみよう</span>*/}
        {/*  </div>*/}
        {/*</Button>*/}

        <CommentView comments={props.user.Comment} />
        <BookmarkView bookmarks={props.user.Bookmark} />

        {/*<Link href='/counseling-cards' className='block'>*/}
        {/*  <Button*/}
        {/*    variant='outline'*/}
        {/*    className='w-full justify-start h-auto py-4 border border-custom'*/}
        {/*  >*/}
        {/*    <CreditCard className='h-5 w-5 mr-2 text-gray-600' />*/}
        {/*    <div className='flex flex-col items-start'>*/}
        {/*      <span className='font-medium'>カウンセリングカード</span>*/}
        {/*      <span className='text-sm text-muted-foreground'>カウンセリング履歴</span>*/}
        {/*    </div>*/}
        {/*  </Button>*/}
        {/*</Link>*/}
      </div>
    </>
  )
}
