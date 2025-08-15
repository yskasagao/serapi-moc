'use client'

import { Star, Bookmark } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type ProfileSchema } from '@/app/[locale]/(protected)/my/_components/profile-view'
import { Modal } from '@/components/ui/modal'

type BookmarksModalProps = {
  isOpen: boolean
  onClose: () => void
  bookmarks: Pick<ProfileSchema, 'Bookmark'>['Bookmark']
}

export const BookmarksModal = ({ isOpen, onClose, bookmarks }: BookmarksModalProps) => {
  return (
    <>
      {isOpen && (
        <Modal 
          title={
            <div className="flex items-center">
              <Bookmark className='mr-2 h-5 w-5 text-brand-icon-static' />
              コレクション
            </div>
          }
          size="large"
          onClose={onClose}
        >
          <div className='hidden-scrollbar grid max-h-[500px] gap-4 overflow-y-auto py-4'>
            {bookmarks.map((bookmark, index) => {
              const totalStar = bookmark.Serapistar?.SerapisterParameter
                ? bookmark.Serapistar.SerapisterParameter.like +
                  bookmark.Serapistar.SerapisterParameter.looks +
                  bookmark.Serapistar.SerapisterParameter.physical +
                  bookmark.Serapistar.SerapisterParameter.repeat +
                  bookmark.Serapistar.SerapisterParameter.service
                : 0
              return (
                <Link
                  href={`/therapists/${bookmark.Serapistar?.slug}`}
                  key={index}
                  className='flex items-center justify-between rounded-lg border border-gray-200 p-3'
                >
                  <div className='flex items-center space-x-4'>
                    <Image
                      src={bookmark.Serapistar?.avatar ?? ''}
                      alt={bookmark.Serapistar?.nickname ?? ''}
                      width={48}
                      height={48}
                      className='rounded-full'
                    />
                    <div>
                      <h3 className='font-medium'>{bookmark.Serapistar?.nickname}</h3>
                      <p className='text-muted-foreground text-sm'>
                        {bookmark.Serapistar?.shop?.name}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <Star className='h-5 w-5 fill-brand-icon-static text-brand-icon-static' />
                    <span className='text-brand-icon-static'>+{totalStar}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Modal>
      )}
    </>
  )
}
