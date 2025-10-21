import VirtualShowroomBanner from '@/components/additionalServicesComponent/virtualShowroom/VirtualShowroomBanner'
import VirtualShowroomKeyPoints from '@/components/additionalServicesComponent/virtualShowroom/VirtualShowroomKeyPoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import ServiceBanner from '@/components/common/ServiceBanner'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'
import s7 from '@/assets/images/s7.jpg'
const VirtualShowroom = () => {
  return (
    <div >
      <ScrollRestoration />
      <ServiceBanner image={s7} title="Showcase Your Car Ads Professionally" subText="Make your vehicle listing stand out and attract serious buyers." />
      <CommonPageWrapper>
        <VirtualShowroomKeyPoints />
      </CommonPageWrapper>
    </div>
  )
}

export default VirtualShowroom