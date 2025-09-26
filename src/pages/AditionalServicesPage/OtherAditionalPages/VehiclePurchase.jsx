import VehiclePurchaseBanner from '@/components/additionalServicesComponent/VehiclePurchase/VehiclePurchaseBanner'
import VehiclePurchaseKeypoints from '@/components/additionalServicesComponent/VehiclePurchase/VehiclePurchaseKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const VehiclePurchase = () => {
  return (
    <div className='mt-20'>
      <VehiclePurchaseBanner />
      <CommonPageWrapper>
        <VehiclePurchaseKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default VehiclePurchase