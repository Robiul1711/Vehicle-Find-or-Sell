import CarWarrantiesBanner from '@/components/additionalServicesComponent/carWarranties/CarWarrantiesBanner'
import CarwarrantiesKeypoints from '@/components/additionalServicesComponent/carWarranties/CarwarrantiesKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'
import s4 from '@/assets/images/s4.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
const WarrantyAndExtendedWarranty = () => {
  return (
    <div >
      <ScrollRestoration />
      <ServiceBanner image={s4} title="Car Warranties" subText="Learn about legal, contractual, and external warranties to protect your car and your budget." />
      <CommonPageWrapper>
        <CarwarrantiesKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default WarrantyAndExtendedWarranty