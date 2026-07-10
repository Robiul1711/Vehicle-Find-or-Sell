import VehicleRegistrationBanner from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationBanner'
import VehicleRegistrationFAQ from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationFAQ'
import VehicleRegistrationKeypoints from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s8 from '@/assets/images/s8.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
import { useApiQuery } from '@/hooks/useApiQuery'
const RegistrationServices = () => {
      const { data, isLoading } = useApiQuery({
         queryKey: ["vehicle-registration"],
         url: "/cms/vehicle-registration/",
         secure: false,
       });
   return (
    <div >
      <ServiceBanner image={data?.data?.hero_background_image_url || s8} title="Vehicle Registration" subText="Simple, safe, and 100% online procedures. Get your vehicle registered quickly and efficiently."  isLoading={isLoading} />
      <CommonPageWrapper>

        <VehicleRegistrationFAQ />
        <VehicleRegistrationKeypoints  data={data?.data}/>

      </CommonPageWrapper>
    </div>
  )
}

export default RegistrationServices