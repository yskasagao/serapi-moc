import { LockKeyholeOpen } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { type SerapistarDetail } from '../serapister-view/type'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  comment: SerapistarDetail['comments'][0]
}

export const CommentCard = (props: Props) => {
  const local = useLocale()
  const t = useTranslations('comment-card')
  if (props.comment.isPublic) {
    const icon = props.comment.isAnonymous
      ? props.comment.dummyUserIcon
      : props.comment.User
        ? props.comment.User.image
        : props.comment.dummyUserIcon
    const name = props.comment.isAnonymous ? '匿名' : (props.comment.User?.name ?? '')
    const text = local === 'ch' ? props.comment.textZhHans : props.comment.text
    return (
      <Card className='border-l-4 border-l-[#18a2ff]'>
        <CardContent className='p-4'>
          <p className='mb-2 text-gray-800'>{text}</p>
          <div className='flex items-center justify-end gap-2'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src={icon ?? ''} alt='User avatar' />
              <AvatarFallback>匿</AvatarFallback>
            </Avatar>
            <span className='text-sm text-gray-500'>{name}</span>
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className='border-l-4 border-l-[#ff4b5c]'>
      <CardContent className='p-4'>
        <div className='relative flex flex-col items-center justify-center rounded bg-gray-50 p-4'>
          <div className='absolute inset-0 bg-gray-100 blur-sm'></div>
          <div className='relative z-10 flex flex-col items-center'>
            <LockKeyholeOpen className='mb-2 h-6 w-6 text-[#ff4b5c]' />
            <p className='text-center text-sm font-bold text-[#ff4b5c]'>{t('lock')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
