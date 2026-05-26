import AdditionalServiceBanner from '@/components/additionalServicesComponent/AdditionalServiceBanner'
import AdditionalServiceGrid from '@/components/additionalServicesComponent/AdditionalServiceGrid'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'
import SEO from '@/components/common/SEO'

const AditionalServicesPages = () => {
  return (
    <div >
      <SEO 
        title="Additional Automotive Services"
        description="Access valuation, estimation, home delivery, vehicle maintenance history, car insurance, virtual showroom, and partner garage services on Ronpoin."
        keywords={["automotive services", "car delivery", "vehicle history check", "car valuation", "car insurance"]}
      />
      <ScrollRestoration />
      <AdditionalServiceBanner />
      <CommonPageWrapper>
        <AdditionalServiceGrid />
      </CommonPageWrapper>
    </div>
  )
}

export default AditionalServicesPages