'use client'

import { useState } from 'react'
import { CounselingDataForm } from '../counseling-data-form'
import { SelectCounselingDataForm } from '../select-counseling-data-form'

export type userFlowType = 'select-counseling-data-type' | 'input-counseling-data'

type Props = {
  reserveDataId: string
}

export const EntryForm = (props: Props) => {
  const [userFlow, setUserFlow] = useState<userFlowType>('select-counseling-data-type')

  return userFlow === 'select-counseling-data-type' ? (
    <SelectCounselingDataForm selectType={(v) => setUserFlow(v)} />
  ) : (
    <CounselingDataForm reserveDataId={props.reserveDataId} />
  )
}
