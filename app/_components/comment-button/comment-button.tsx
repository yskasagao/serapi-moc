'use client'
import { type ComponentPropsWithoutRef } from 'react'
import IconMail from '@assets/icon-mail.svg'

type Props = ComponentPropsWithoutRef<'button'> & {
  label: string
}

export const CommentButton = (props: Props) => {
  const { label, className, ...rest } = props
  return (
    <button
      {...rest}
      className={`flex h-12 w-full items-center justify-center bg-[#FE2C55] font-bold text-white ${
        rest.disabled && 'opacity-60'
      } ${className}`}
    >
      <IconMail width={30} height={30} className='mr-4' />
      {label}
    </button>
  )
}
