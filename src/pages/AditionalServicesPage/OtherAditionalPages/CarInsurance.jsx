import CarInsuranceBanner from '@/components/additionalServicesComponent/carInsurance/CarInsuranceBanner'
import CarInsuranceBannerKeypoints from '@/components/additionalServicesComponent/carInsurance/CarInsuranceBannerKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const CarInsurance = () => {
  return (
    <div >
      <CarInsuranceBanner />
      <CommonPageWrapper>
        <CarInsuranceBannerKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default CarInsurance