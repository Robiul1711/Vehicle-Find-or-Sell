import AdsPlaceholder from '@/components/browseListingComponents/AdsPlaceholder'
import BrowseCategorySection from '@/components/browseListingComponents/BrowseCategorySection'
import BrowseListingBanner from '@/components/browseListingComponents/BrowseListingBanner'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import SEO from '@/components/common/SEO'

const BrouseListing = () => {
  return (
    <div>
      <SEO 
        title="Browse Listings" 
        description="Explore a wide range of verified vehicles, cars, motorcycles, scooters, and spare parts available for sale on Ronpoin."
        keywords={["browse vehicles", "car listings", "used cars for sale", "motorcycles for sale", "spare parts"]}
      />
      <CommonPageWrapper>
        <AdsPlaceholder />
        <BrowseListingBanner />
        <BrowseCategorySection />
      </CommonPageWrapper>
    </div>
  )
}

export default BrouseListing