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

    const cars = [
  {
    id: 1,
    title: "BMW X3 M Sport",
    subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    Kilometer: "47 Kilometer",
    fuel: "Diesel",
    transmission: "Automatic",
    condition: "New",
    price: "€33,800",
  },
  {
    id: 2,
    title: "Audi A6 Premium",
    subtitle: "2.0 TDI Ultra SE Executive 4dr",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    miles: "65 Kilometer",
    fuel: "Petrol",
    transmission: "Manual",
    condition: "Used",
    price: "€29,400",
  },
];
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