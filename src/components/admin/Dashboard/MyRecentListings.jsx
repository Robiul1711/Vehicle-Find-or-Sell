import CommonButton from '@/components/common/CommonButton'
import Title from '@/components/common/Title'
import React from 'react'
import DasCarCard from './DasCarCard';
import { useApiQuery } from '@/hooks/useApiQuery';

const MyRecentListings = () => {
    const { data, isLoading } = useApiQuery({
    queryKey: ["my-ads"],
    url: "/ads/my-ads/",
    secure: true,
  });


  return (
    <div>
        <div className='flex items-center justify-between mb-6'>
            <Title level="title24"> My Recent Listings</Title>
            <CommonButton link={"/dashboard/my-adds"} variant="primary" >View All</CommonButton>
        </div>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {data?.slice(0, 3).map((car) => (
        <DasCarCard key={car.id} car={car} />
      ))}
    </div>
    </div>
  )
}

export default MyRecentListings