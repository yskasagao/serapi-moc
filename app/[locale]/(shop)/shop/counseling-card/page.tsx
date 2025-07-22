import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { EntryForm } from './_components/entry-form'
import companyPrisma from '@/lib/company-prisma'
import { defaultMetaData } from '@/lib/meta'
type Props = {
  searchParams?: Promise<Record<string, string | undefined>>
}
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  ...defaultMetaData,
  title: 'Serapister | カウンセリングデータ入力',
  robots: {
    index: false,
  },
}

const fetchReservationData = async (token: string) => {
  return companyPrisma.reservationData.findUnique({
    select: {
      id: true,
      counselingDataId: true,
    },
    where: {
      id: token,
    },
  })
}

export default async function Page(props: Props) {
  const params = await props.searchParams
  if (!params?.reservationDataId) {
    return notFound()
  }
  const ret = await fetchReservationData(params.reservationDataId)
  if (!ret || ret.counselingDataId) {
    return notFound()
  }
  return <EntryForm reserveDataId={params.reservationDataId} />
}
