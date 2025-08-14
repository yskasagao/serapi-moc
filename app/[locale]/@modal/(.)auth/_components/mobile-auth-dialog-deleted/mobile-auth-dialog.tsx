'use client'

import { DialogContent, Dialog, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from '@/i18n/routing'

type Props = {
  children?: React.ReactNode
}

export const MobileAuthDialog = ({ children }: Props) => {
  const router = useRouter()
  
  const handleClose = () => {
    router.back()
  }
  
  return (
    <Dialog defaultOpen={true} onOpenChange={handleClose}>
      <DialogContent 
        aria-describedby={undefined}
        className="!fixed !inset-0 !w-screen !h-screen !max-w-none !translate-x-0 !translate-y-0 !p-0 !gap-0 !border-0 !shadow-none !rounded-none flex flex-col"
      >
        {/* SP専用ヘッダー */}
        <div className="flex items-center justify-center gap-2 mb-8 mt-4 px-3">
          <div className="w-12 h-px bg-gray-300"></div>
          <DialogTitle className="text-center text-sm font-bold text-[#4a4a4a] whitespace-nowrap">
            ログイン・新規登録
          </DialogTitle>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        
        {/* コンテンツエリア */}
        <div className="flex-1 px-3 pb-6 overflow-y-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
