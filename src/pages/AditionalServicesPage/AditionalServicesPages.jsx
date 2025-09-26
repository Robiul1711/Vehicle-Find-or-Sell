import AdditionalServiceBanner from '@/components/additionalServicesComponent/AdditionalServiceBanner'
import AdditionalServiceGrid from '@/components/additionalServicesComponent/AdditionalServiceGrid'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const AditionalServicesPages = () => {
  return (
    <div className='mt-20'>
      <AdditionalServiceBanner />
      <CommonPageWrapper>
        <AdditionalServiceGrid />
      </CommonPageWrapper>
    </div>
  )
}

export default AditionalServicesPages