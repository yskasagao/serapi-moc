import type React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type BaseModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
  iconColor?: string
  maxWidth?: string
  props?: React.ComponentPropsWithoutRef<typeof DialogContent>
  ref?: React.Ref<HTMLDivElement>
}

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  icon: Icon,
  children,
  className = '',
  iconColor = 'text-brand-primary',
  maxWidth = 'sm:max-w-[640px]',
  props = {},
  ref,
}: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={ref}
        className={cn(
          'bg-background flex w-full flex-col border p-6 shadow-lg sm:rounded-lg',
          maxWidth,
          className,
        )}
        {...props}
      >
        <DialogHeader className='border-ui-border mb-4 flex-shrink-0 border-b pb-4'>
          <DialogTitle className='text-brand-secondary flex items-center text-base font-medium'>
            {Icon && <Icon className={`mr-2 h-5 w-5 ${iconColor}`} />}
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-1 flex-col overflow-hidden'>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
