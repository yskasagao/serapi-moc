'use client'

import { DialogContent, DialogHeader, Dialog, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from '@/i18n/routing'

type Props = {
  children?: React.ReactNode
}

export const PrivacyDialog = (props: Props) => {
  const router = useRouter()
  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={() => {
        router.back()
      }}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <div className='max-h-[400px] overflow-y-auto'>{props.children}</div>
      </DialogContent>
    </Dialog>
  )
}
