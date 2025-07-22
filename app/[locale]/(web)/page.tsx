import { Banner } from '@/app/_components/banner'
import { CompanyList } from '@/components/company-list'
import { FashionBackground } from '@/components/fashion-background'
import { fetchCompanies } from '@/lib/server-only/company/fetch-companies'
import { type SerapistPaginator } from '@/app/api/serapist/schema'
import { API_ORIGIN } from '@/lib/constants'
import { SerapistSection } from './_components/serapist-section'
import { Toaster } from '@/app/_components/toaster'
import { AgeGate } from '@/components/age-gate'
export const dynamic = 'force-dynamic'

const fetchActive = async (): Promise<SerapistPaginator> => {
  const params = new FormData()
  const ret = await fetch(`${API_ORIGIN}/api/serapist/fetch-active-all`, {
    method: 'POST',
    body: params,
    cache: 'no-cache',
  })
  return (await ret.json()) as SerapistPaginator
}
export default async function Page() {
  const paginator = await fetchActive()
  const companies = await fetchCompanies()
  return (
    <>
      <AgeGate />
      <FashionBackground />
      <main className='z-1 container relative mx-auto mt-16 max-w-[980px] px-4 py-8'>
        <Toaster />
        <Banner />
        <SerapistSection serapistList={paginator.data} />
        <CompanyList companies={companies} />
      </main>
    </>
  )
}
