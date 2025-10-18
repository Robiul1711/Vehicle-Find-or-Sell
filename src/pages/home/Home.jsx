import AutoInsightsAdvice from '@/components/HomeComponents/AutoInsightsAdvice'
import Banner from '@/components/HomeComponents/Banner'
import FeaturedListings from '@/components/HomeComponents/FeaturedListings'
import Hero from '@/components/HomeComponents/Hero'
import HomeAds from '@/components/HomeComponents/HomeAds'
import LookingFor from '@/components/HomeComponents/LookingFor'
import UserReviews from '@/components/HomeComponents/UserReviews'
import WhyChooseUs from '@/components/HomeComponents/WhyChooseUs'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
      <Banner/>
      <Hero/>
      <HomeAds/>
      <WhyChooseUs/>
      <FeaturedListings/>
      <UserReviews/>
      <AutoInsightsAdvice/>
      <LookingFor/>
    </div>
  )
}

export default Home