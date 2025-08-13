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
      className={`flex h-12 w-full items-center justify-center rounded-md bg-brand-ui font-bold text-white transition-colors duration-200 hover:bg-brand-ui-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-ui focus-visible:ring-offset-2 ${
        rest.disabled && 'opacity-60'
      } ${className}`}
    >
      <IconMail width={30} height={30} className='mr-4' />
      {label}
    </button>
  )
}
