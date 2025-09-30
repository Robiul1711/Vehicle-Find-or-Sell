import VehicleRegistrationBanner from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationBanner'
import VehicleRegistrationFAQ from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationFAQ'
import VehicleRegistrationKeypoints from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const RegistrationServices = () => {
  return (
    <div >
      <VehicleRegistrationBanner />
      <CommonPageWrapper>

        <VehicleRegistrationFAQ />
        <VehicleRegistrationKeypoints />

      </CommonPageWrapper>
    </div>
  )
}

export default RegistrationServices