import { Bookmark } from 'lucide-react'
import { useToggle } from 'react-use'
import { BookmarksModal } from './bookmarks-modal'
import { type ProfileSchema } from '@/app/[locale]/(protected)/my/_components/profile-view'
import { Button } from '@/components/ui/button'

type Props = {
  bookmarks: Pick<ProfileSchema, 'Bookmark'>['Bookmark']
}

export const BookmarkView = (props: Props) => {
  const [isOpenModal, toggleIsOpenModal] = useToggle(false)
  return (
    <>
      <BookmarksModal
        isOpen={isOpenModal}
        onClose={toggleIsOpenModal}
        bookmarks={props.bookmarks}
      />
      <Button
        variant='outline'
        className='border-custom h-auto w-full justify-start border py-4'
        onClick={toggleIsOpenModal}
      >
        <Bookmark className='mr-2 h-5 w-5 text-gray-600' />
        <div className='flex flex-col items-start'>
          <span className='font-medium'>コレクション</span>
          <span className='text-muted-foreground text-sm'>お気に入りのセラピスト</span>
        </div>
      </Button>
    </>
  )
}
