import VehicleDeliveryBanner from '@/components/additionalServicesComponent/vehicleDelivery/VehicleDeliveryBanner'
import VehicleDeliveryKeypoints from '@/components/additionalServicesComponent/vehicleDelivery/VehicleDeliveryKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const HomeDelivery = () => {
  return (
    <div className='mt-20'>
      <VehicleDeliveryBanner />
      <CommonPageWrapper>
        <VehicleDeliveryKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default HomeDelivery