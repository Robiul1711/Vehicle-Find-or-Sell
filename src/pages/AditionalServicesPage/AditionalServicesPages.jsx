import AdditionalServiceBanner from '@/components/additionalServicesComponent/AdditionalServiceBanner'
import AdditionalServiceGrid from '@/components/additionalServicesComponent/AdditionalServiceGrid'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'

const AditionalServicesPages = () => {
  return (
    <div >
      <ScrollRestoration />
      <AdditionalServiceBanner />
      <CommonPageWrapper>
        <AdditionalServiceGrid />
      </CommonPageWrapper>
    </div>
  )
}

export default AditionalServicesPages