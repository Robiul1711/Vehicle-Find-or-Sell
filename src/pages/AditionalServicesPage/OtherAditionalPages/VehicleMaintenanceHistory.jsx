import VehicleMaintenanceBanner from '@/components/additionalServicesComponent/VehicleMaintenance/VehicleMaintenanceBanner'
import VehicleMaintenanceKeypoints from '@/components/additionalServicesComponent/VehicleMaintenance/VehicleMaintenanceKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const VehicleMaintenanceHistory = () => {
  return (
    <div >
      <VehicleMaintenanceBanner />
      <CommonPageWrapper>
        <VehicleMaintenanceKeypoints />
      </CommonPageWrapper>

    </div>
  )
}

export default VehicleMaintenanceHistory