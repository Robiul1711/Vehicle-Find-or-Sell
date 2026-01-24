import VehicleDeliveryBanner from '@/components/additionalServicesComponent/vehicleDelivery/VehicleDeliveryBanner'
import VehicleDeliveryKeypoints from '@/components/additionalServicesComponent/vehicleDelivery/VehicleDeliveryKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s6 from '@/assets/images/s6.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
import { useApiQuery } from '@/hooks/useApiQuery'
const HomeDelivery = () => {
    const { data, isLoading } = useApiQuery({
        queryKey: ["vehicle-delivery-options"],
        url: "/cms/vehicle-delivery-options/",
        secure: false,
      });
      console.log(data?.data);
  return (
    <div >
      <ServiceBanner image={ data?.data?.hero_background_image_url || s6} title={data?.data?.title} subText={data?.data?.subtitle} />
      <CommonPageWrapper>
        <VehicleDeliveryKeypoints data={data?.data}/>
      </CommonPageWrapper>
    </div>
  )
}

export default HomeDelivery