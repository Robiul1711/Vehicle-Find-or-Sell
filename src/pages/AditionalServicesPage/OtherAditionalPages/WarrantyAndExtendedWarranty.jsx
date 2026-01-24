import CarWarrantiesBanner from '@/components/additionalServicesComponent/carWarranties/CarWarrantiesBanner'
import CarwarrantiesKeypoints from '@/components/additionalServicesComponent/carWarranties/CarwarrantiesKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'
import s4 from '@/assets/images/s4.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
import { useApiQuery } from '@/hooks/useApiQuery'
const WarrantyAndExtendedWarranty = () => {
    const { data, isLoading } = useApiQuery({
    queryKey: ["car-warranties"],
    url: "/cms/car-warranties/",
    secure: false,
  });
  console.log(data?.data);
  return (
    <div >
      <ScrollRestoration />
      <ServiceBanner image={data?.data?.hero_background_image_url} title={data?.data?.title} subText={data?.data?.subtitle} />
      <CommonPageWrapper>
        <CarwarrantiesKeypoints data={data?.data} />
      </CommonPageWrapper>
    </div>
  )
}

export default WarrantyAndExtendedWarranty