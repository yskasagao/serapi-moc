import { BookmarkPlus, BookmarkCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { toggleBookmark } from './actions'
type Props = {
  isBookmarked: boolean
  targetSlug: string
}

export const BookmarkButton = (props: Props) => {
  return (
    <button
      className={`cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 ${
        props.isBookmarked ? 'text-amber-400' : 'text-gray-400'
      }`}
      onClick={async () => {
        const ret = await toggleBookmark(props.targetSlug)
        if (!ret.success && ret.error === 'Unauthorized') {
          toast.error('ログインが必要です')
        }
      }}
    >
      {props.isBookmarked ? (
        <BookmarkCheck className='h-8 w-8' />
      ) : (
        <BookmarkPlus className='h-8 w-8' />
      )}
    </button>
  )
}
