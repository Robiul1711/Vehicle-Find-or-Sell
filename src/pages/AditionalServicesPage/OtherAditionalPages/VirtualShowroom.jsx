import VirtualShowroomBanner from '@/components/additionalServicesComponent/virtualShowroom/VirtualShowroomBanner'
import VirtualShowroomKeyPoints from '@/components/additionalServicesComponent/virtualShowroom/VirtualShowroomKeyPoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'

const VirtualShowroom = () => {
  return (
    <div className='mt-20'>
      <ScrollRestoration />
      <VirtualShowroomBanner />
      <CommonPageWrapper>
        <VirtualShowroomKeyPoints />
      </CommonPageWrapper>
    </div>
  )
}

export default VirtualShowroom