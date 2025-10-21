import VehicleRegistrationBanner from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationBanner'
import VehicleRegistrationFAQ from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationFAQ'
import VehicleRegistrationKeypoints from '@/components/additionalServicesComponent/vehicleRegistration/VehicleRegistrationKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s8 from '@/assets/images/s8.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
const RegistrationServices = () => {
  return (
    <div >
      <ServiceBanner image={s8} title="Vehicle Registration" subText="Simple, safe, and 100% online procedures. Get your vehicle registered quickly and efficiently." />
      <CommonPageWrapper>

        <VehicleRegistrationFAQ />
        <VehicleRegistrationKeypoints />

      </CommonPageWrapper>
    </div>
  )
}

export default RegistrationServices