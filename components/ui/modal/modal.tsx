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
        medium: 'w-[90vw] max-w-[640px] max-h-[85vh] sm:max-h-[90vh]',
        'medium-responsive': [
          // SP: 左右のみ余白、上下は画面いっぱい
          'inset-x-3 inset-y-0 w-auto h-screen max-w-none max-h-none',
          'translate-x-0 translate-y-0 p-0 gap-0 border-0 shadow-lg rounded-lg',
          // タブレット以上: 元々のmediumと同じ設定
          'sm:inset-auto sm:left-[50%] sm:top-[50%]',
          'sm:translate-x-[-50%] sm:translate-y-[-50%]',
          'sm:w-[90vw] sm:max-w-[640px] sm:h-auto sm:max-h-[85vh] sm:max-h-[90vh]',
          'sm:p-6 sm:gap-4 sm:border sm:shadow-lg sm:rounded-lg'
        ].join(' '),
        large: 'w-[90vw] max-w-[980px] max-h-[85vh]',
        full: 'w-[95vw] max-w-[1200px] max-h-[90vh]',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
)

// 内部コンテンツの高さバリアント
export const modalContentVariants = cva(
  'overflow-y-auto',
  {
    variants: {
      size: {
        small: 'px-6 pb-6 max-h-[calc(70vh-8rem)]',
        medium: 'px-6 pb-6 max-h-[calc(85vh-8rem)] sm:max-h-[calc(90vh-8rem)]',
        'medium-responsive': [
          // SP: フルスクリーンコンテンツ（適切な上下パディング）
          'px-4 pt-6 pb-6 h-full',
          // タブレット以上: 元々のmediumと完全に同じ設定（上部パディングを明示的に無効化）
          'sm:px-6 sm:pt-0 sm:pb-6 sm:h-auto sm:max-h-[calc(85vh-8rem)] sm:max-h-[calc(90vh-8rem)]'
        ].join(' '),
        large: 'px-6 pb-6 max-h-[calc(85vh-8rem)]',
        full: 'px-6 pb-6 max-h-[calc(90vh-8rem)]',
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
        <div className={cn(modalContentVariants({ size }))}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
