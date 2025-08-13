'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { DialogContent, DialogHeader, Dialog, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'

// CVAは本当に必要な部分（サイズバリアント）のみを管理
const modalSizeVariants = cva(
  // ベースクラス（レイアウトのみ）
  '',
  {
    variants: {
      size: {
        small: 'w-[95vw] max-w-md max-h-[70vh]',
        large: 'w-[90vw] max-w-[980px] max-h-[85vh]',
        full: 'w-[95vw] max-w-[1200px] max-h-[90vh]',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
)

type Props = {
  children?: React.ReactNode
  title?: string
  size?: VariantProps<typeof modalSizeVariants>['size']
  onClose?: () => void
}

export const Modal = ({ children, title, size, onClose }: Props) => {
  const router = useRouter()
  
  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      router.back()
    }
  }
  
  return (
    <Dialog defaultOpen={true} onOpenChange={handleClose}>
      <DialogContent 
        aria-describedby={undefined} 
        className={cn(modalSizeVariants({ size }))}
      >
        {title && (
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-center text-xl font-bold text-[#4a4a4a]">
              {title}
            </DialogTitle>
          </DialogHeader>
        )}
        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(85vh-8rem)]">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
