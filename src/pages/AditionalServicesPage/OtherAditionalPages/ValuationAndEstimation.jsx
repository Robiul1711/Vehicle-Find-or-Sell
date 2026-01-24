import VehicleValuationBanner from '@/components/additionalServicesComponent/vehicleValuation/VehicleValuationBanner'
import VehicleValuationKeypoints from '@/components/additionalServicesComponent/vehicleValuation/VehicleValuationKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'
import s5 from '@/assets/images/s5.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
import { useApiQuery } from '@/hooks/useApiQuery'
const ValuationAndEstimation = () => {
    const { data, isLoading } = useApiQuery({
        queryKey: ["vehicle-valuation"],
        url: "/cms/vehicle-valuation/",
        secure: false,
      });
      console.log(data?.data);
  return (
    <div >
      <ScrollRestoration />
      <ServiceBanner image={data?.data?.hero_background_image_url || s5} title={data?.data?.title} subText={data?.data?.subtitle} />
      <CommonPageWrapper>
        <VehicleValuationKeypoints data={data?.data}/>
      </CommonPageWrapper>
    </div>
  )
}

export default ValuationAndEstimation