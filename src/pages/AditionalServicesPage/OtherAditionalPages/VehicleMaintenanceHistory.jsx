import VehicleMaintenanceBanner from '@/components/additionalServicesComponent/VehicleMaintenance/VehicleMaintenanceBanner'
import VehicleMaintenanceKeypoints from '@/components/additionalServicesComponent/VehicleMaintenance/VehicleMaintenanceKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s1 from '@/assets/images/s1.png'
import ServiceBanner from '@/components/common/ServiceBanner'
import { useApiQuery } from '@/hooks/useApiQuery'
const VehicleMaintenanceHistory = () => {
const { data, isLoading } = useApiQuery({
  queryKey: ["vehicle-maintenance-history"],
  url: "/cms/vehicle-maintenance-history/",
  secure: false
});
  // console.log(data?.data)
  return (
    <div >
      <ServiceBanner image={data?.data?.hero_background_image_url} title={data?.data?.title} subText={data?.data?.subtitle} />
      <CommonPageWrapper>
        <VehicleMaintenanceKeypoints data={data?.data}   />
      </CommonPageWrapper>

    </div>
  )
}

export default VehicleMaintenanceHistory