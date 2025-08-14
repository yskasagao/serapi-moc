'use client'

import { Modal } from '@/components/ui/modal'
import { DialogTitle } from '@/components/ui/dialog'

type Props = {
  children?: React.ReactNode
}

export const AuthDialog = ({ children }: Props) => {
  return (
    <Modal size="medium-responsive">
      {/* カスタムヘッダー */}
      <div className="flex items-center justify-center gap-4 mb-8 mt-4 md:mb-12">
        <div className="w-12 h-px bg-gray-300 md:w-20"></div>
        <DialogTitle className="text-center text-sm font-bold text-[#4a4a4a] whitespace-nowrap">
          ログイン・新規登録
        </DialogTitle>
        <div className="w-12 h-px bg-gray-300 md:w-20"></div>
      </div>
      {children}
    </Modal>
  )
}
