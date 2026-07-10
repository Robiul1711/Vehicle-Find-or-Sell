import CarInsuranceBanner from '@/components/additionalServicesComponent/carInsurance/CarInsuranceBanner'
import CarInsuranceBannerKeypoints from '@/components/additionalServicesComponent/carInsurance/CarInsuranceBannerKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s3 from '@/assets/images/s3.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
import { useApiQuery } from '@/hooks/useApiQuery'
const CarInsurance = () => {
    const { data, isLoading } = useApiQuery({
      queryKey: ["car-insurance"],
      url: "/cms/car-insurance/",
      secure: false,
    });
    // console.log(data?.data);
  return (
    <div >
      <ServiceBanner image={data?.data?.hero_background_image_url || s3} title={data?.data?.title} subText={data?.data?.subtitle} isLoading={isLoading} />
      <CommonPageWrapper>
        <CarInsuranceBannerKeypoints data={data?.data}/>
      </CommonPageWrapper>
    </div>
  )
}

export default CarInsurance