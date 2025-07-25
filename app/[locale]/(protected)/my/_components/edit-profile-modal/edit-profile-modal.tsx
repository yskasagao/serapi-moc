'use client'

import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import { type ProfileSchema } from '../profile-view/schema'
import { edit } from './actions'
import { Toaster } from '@/app/_components/toaster'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { presetUserIconMap } from '@/lib/constants'

type Props = {
  user: ProfileSchema
  isOpen: boolean
  onClose: () => void
}
export const EditProfileModal = (props: Props) => {
  const { update } = useSession()
  const [previewImage, setPreviewImage] = useState(props.user.image ?? '')
  const [messageLength, setMessageLength] = useState(props.user.message?.length ?? 0)
  const [presetIcon, setPresetIcon] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <Toaster />
      <DialogContent className='w-full border-gray-400 sm:max-w-[640px]'>
        <DialogHeader className='border-b pb-4'>
          <DialogTitle className='text-base font-medium text-gray-700'>
            プロフィール編集
          </DialogTitle>
        </DialogHeader>
        <form
          action={async (formData: FormData) => {
            startTransition(async () => {
              const result = await edit(formData)
              if (result.success) {
                toast.success(result.message)
                await update()
                props.onClose()
              } else {
                toast.error('保存できませんでした。')
              }
            })
          }}
          className='space-y-6'
        >
          {/* Avatar Section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <div className='relative h-32 w-32 overflow-hidden rounded-full'>
                <Image src={previewImage} alt='Profile' fill className='object-cover' />
              </div>
              <label
                htmlFor='avatar-upload'
                className='absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100'
              >
                <input type='hidden' name='presetIcon' className='hidden' value={presetIcon} />
                <Camera className='h-6 w-6 text-gray-600' />
                <input
                  id='avatar-upload'
                  name='icon'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => {
                    const files = e.currentTarget.files
                    if (files?.length) {
                      const file = files[0]
                      if (file !== undefined) {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                          setPreviewImage(e.target?.result as string)
                        }
                        reader.readAsDataURL(file)
                      }
                    }
                  }}
                />
              </label>
            </div>
            <div className='grid grid-cols-4 gap-3'>
              {[...presetUserIconMap.values()].map((v, index) => {
                return (
                  <button
                    key={index}
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      setPreviewImage(v)
                      setPresetIcon(v)
                    }}
                    className={`relative h-12 w-12 overflow-hidden rounded-full border-2 transition-colors ${
                      v === presetIcon ? 'border-[#ff7e8a]' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={v}
                      alt={`Avatar option ${index + 1}`}
                      width={48}
                      height={48}
                      className='object-cover'
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div className='space-y-2'>
            <Input
              name='name'
              placeholder='ニックネーム'
              defaultValue={props.user.name ?? ''}
              className='w-full'
            />
          </div>
          <div className='space-y-2'>
            <div className='relative'>
              <Textarea
                name='message'
                placeholder='自己紹介文'
                defaultValue={props.user.message ?? ''}
                onChange={(e) => {
                  setMessageLength(e.currentTarget.value.length)
                }}
                className='min-h-[120px] resize-none pr-16'
              />
              <span className='text-muted-foreground absolute bottom-2 right-2 text-sm'>
                {messageLength}/160
              </span>
            </div>
          </div>
          <Button
            type='submit'
            className='w-full bg-black text-white hover:bg-gray-800'
            disabled={isPending}
          >
            {isPending ? '更新中' : '更新'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
