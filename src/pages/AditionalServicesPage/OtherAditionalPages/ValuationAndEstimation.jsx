import VehicleValuationBanner from '@/components/additionalServicesComponent/vehicleValuation/VehicleValuationBanner'
import VehicleValuationKeypoints from '@/components/additionalServicesComponent/vehicleValuation/VehicleValuationKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'

const ValuationAndEstimation = () => {
  return (
    <div className='mt-20'>
      <ScrollRestoration />
      <VehicleValuationBanner />
      <CommonPageWrapper>
        <VehicleValuationKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default ValuationAndEstimation