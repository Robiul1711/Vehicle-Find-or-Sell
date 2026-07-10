import VirtualShowroomBanner from '@/components/additionalServicesComponent/virtualShowroom/VirtualShowroomBanner'
import VirtualShowroomKeyPoints from '@/components/additionalServicesComponent/virtualShowroom/VirtualShowroomKeyPoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import ServiceBanner from '@/components/common/ServiceBanner'
import React from 'react'
import { ScrollRestoration } from 'react-router-dom'
import s7 from '@/assets/images/s7.jpg'
import { useApiQuery } from '@/hooks/useApiQuery'
const VirtualShowroom = () => {
    const { data, isLoading } = useApiQuery({
        queryKey: ["virtual-showroom"],
        url: "/cms/virtual-showroom/",
        secure: false,
      });
      // console.log(data?.data);
  return (
    <div >
      <ScrollRestoration />
      <ServiceBanner image={data?.data?.hero_background_image_url || s7} title={data?.data?.title} subText={data?.data?.subtitle} isLoading={isLoading} />
      <CommonPageWrapper>
        <VirtualShowroomKeyPoints data={data?.data}/>
      </CommonPageWrapper>
    </div>
  )
}

export default VirtualShowroom