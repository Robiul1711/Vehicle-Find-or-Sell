import CarInsuranceBanner from '@/components/additionalServicesComponent/carInsurance/CarInsuranceBanner'
import CarInsuranceBannerKeypoints from '@/components/additionalServicesComponent/carInsurance/CarInsuranceBannerKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s3 from '@/assets/images/s3.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
const CarInsurance = () => {
  return (
    <div >
      <ServiceBanner image={s3} title="Car Insurance" subText="Understand the essentials of car insurance in France, from legal requirements to choosing the best plan for your needs" />
      <CommonPageWrapper>
        <CarInsuranceBannerKeypoints />
      </CommonPageWrapper>
    </div>
  )
}

export default CarInsurance