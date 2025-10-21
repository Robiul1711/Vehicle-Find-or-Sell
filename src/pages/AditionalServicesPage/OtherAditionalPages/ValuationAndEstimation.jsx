import VehicleValuationBanner from '@/components/additionalServicesComponent/vehicleValuation/VehicleValuationBanner'
import VehicleValuationKeypoints from '@/components/additionalServicesComponent/vehicleValuation/VehicleValuationKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'
import s5 from '@/assets/images/s5.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
const ValuationAndEstimation = () => {
  return (
    <div >
      <ScrollRestoration />
      <ServiceBanner image={s5} title="Vehicle Valuation" subText="Learn how to assess your car’s true worth using key factors, market data, and expert tips." />
      <CommonPageWrapper>
        <VehicleValuationKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default ValuationAndEstimation