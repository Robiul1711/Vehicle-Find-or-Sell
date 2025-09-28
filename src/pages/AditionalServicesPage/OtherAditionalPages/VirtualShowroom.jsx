import VirtualShowroomBanner from '@/components/additionalServicesComponent/virtualShowroom/VirtualShowroomBanner'
import VirtualShowroomKeyPoints from '@/components/additionalServicesComponent/virtualShowroom/VirtualShowroomKeyPoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const VirtualShowroom = () => {
  return (
    <div className='mt-20'>
      <VirtualShowroomBanner />
      <CommonPageWrapper>
        <VirtualShowroomKeyPoints />
      </CommonPageWrapper>
    </div>
  )
}

export default VirtualShowroom