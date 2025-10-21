import VehicleMaintenanceBanner from '@/components/additionalServicesComponent/VehicleMaintenance/VehicleMaintenanceBanner'
import VehicleMaintenanceKeypoints from '@/components/additionalServicesComponent/VehicleMaintenance/VehicleMaintenanceKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s1 from '@/assets/images/s1.png'
import ServiceBanner from '@/components/common/ServiceBanner'
const VehicleMaintenanceHistory = () => {
  return (
    <div >
      <ServiceBanner image={s1} title="Vehicle Maintenance History" subText="Verify your car’s service and repair records for a safer purchase or sale." />
      <CommonPageWrapper>
        <VehicleMaintenanceKeypoints />
      </CommonPageWrapper>

    </div>
  )
}

export default VehicleMaintenanceHistory