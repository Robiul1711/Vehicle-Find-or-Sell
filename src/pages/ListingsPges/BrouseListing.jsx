import AdsPlaceholder from '@/components/browseListingComponents/AdsPlaceholder'
import BrowseCategorySection from '@/components/browseListingComponents/BrowseCategorySection'
import BrowseListingBanner from '@/components/browseListingComponents/BrowseListingBanner'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const BrouseListing = () => {
  return (
    <div>
      <CommonPageWrapper>
        <AdsPlaceholder />
        <BrowseListingBanner />
        <BrowseCategorySection />
      </CommonPageWrapper>
    </div>
  )
}

export default BrouseListing