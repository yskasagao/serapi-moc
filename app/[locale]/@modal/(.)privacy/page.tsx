import { PrivacyDialog } from './_components/privacy-dialog'
import { PrivacyPolicy } from '@/components/privacy-policy'

export default function Page() {
  return (
    <PrivacyDialog>
      <PrivacyPolicy />
    </PrivacyDialog>
  )
}
