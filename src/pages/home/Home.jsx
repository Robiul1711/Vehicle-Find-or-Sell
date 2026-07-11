import Banner from '@/components/HomeComponents/Banner'
import FeaturedListings from '@/components/HomeComponents/FeaturedListings'
import Hero from '@/components/HomeComponents/Hero'
import HomeAds from '@/components/HomeComponents/HomeAds'
import HomePageSpecialOffer from '@/components/HomeComponents/HomePageSpecialOffer'
import LookingFor from '@/components/HomeComponents/LookingFor'
import UserReviews from '@/components/HomeComponents/UserReviews'
import WhyChooseUs from '@/components/HomeComponents/WhyChooseUs'
import React from 'react'
import SEO from '@/components/common/SEO'
import AutoInsightsAdvice from '@/components/HomeComponents/AutoInsightsAdvice'
import HomeFaq from '@/components/HomeComponents/HomeFaq'

const Home = () => {
  return (

    <div className=''>
      <SEO />
      <Banner/>
      <FeaturedListings/>
      <Hero/>
      <HomeAds/>
      <WhyChooseUs/>
      <UserReviews/>
      <AutoInsightsAdvice/>
      <HomeFaq />
      <LookingFor/>
    </div>
  )
}

export default Home