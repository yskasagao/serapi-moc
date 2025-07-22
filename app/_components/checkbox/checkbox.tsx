import React, { type ComponentPropsWithoutRef } from 'react'

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  label: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(({ label, ...props }, ref) => {
  return (
    <div className='flex w-full items-center gap-2'>
      <input
        className='disabled:border-steel-400 disabled:bg-steel-400 peer relative h-6 w-6 shrink-0 appearance-none rounded-sm border-2 border-[#000] bg-white focus:outline-none focus:ring-1 focus:ring-blue-100 focus:ring-offset-0'
        type='checkbox'
        {...props}
        ref={ref}
      />
      <svg
        className='pointer-events-none absolute hidden h-6 w-6 stroke-black outline-none peer-checked:block'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='20 6 9 17 4 12'></polyline>
      </svg>
      <label htmlFor={props.id}>{label}</label>
    </div>
  )
})
Checkbox.displayName = 'Checkbox'
