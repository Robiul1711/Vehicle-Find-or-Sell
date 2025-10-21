import VehicleDeliveryBanner from '@/components/additionalServicesComponent/vehicleDelivery/VehicleDeliveryBanner'
import VehicleDeliveryKeypoints from '@/components/additionalServicesComponent/vehicleDelivery/VehicleDeliveryKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s6 from '@/assets/images/s6.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
const HomeDelivery = () => {
  return (
    <div >
      <ServiceBanner image={s6} title="Vehicle Delivery Options" subText="Explore secure and convenient ways to get your car delivered — from dealer handover to professional transport and premium services." />
      <CommonPageWrapper>
        <VehicleDeliveryKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default HomeDelivery