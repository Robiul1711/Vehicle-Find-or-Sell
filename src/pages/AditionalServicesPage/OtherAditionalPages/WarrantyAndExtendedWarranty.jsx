import CarWarrantiesBanner from '@/components/additionalServicesComponent/carWarranties/CarWarrantiesBanner'
import CarwarrantiesKeypoints from '@/components/additionalServicesComponent/carWarranties/CarwarrantiesKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'

const WarrantyAndExtendedWarranty = () => {
  return (
    <div className='mt-20'>
      <ScrollRestoration />
      <CarWarrantiesBanner />
      <CommonPageWrapper>
        <CarwarrantiesKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default WarrantyAndExtendedWarranty