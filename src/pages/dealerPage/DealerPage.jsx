import DealerBanner from '@/components/additionalServicesComponent/dealerComponent/DealerBanner';
import DealerListing from '@/components/additionalServicesComponent/dealerComponent/DealerListing';
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import React from 'react';
import SEO from '@/components/common/SEO';

const DealerPage = () => {
    return (
        <div >
            <SEO 
              title="Professional Dealers" 
              description="Find and connect with top-rated professional vehicle dealers and sellers on Ronpoin."
              keywords={["dealers", "professional sellers", "car dealers", "motorcycle sellers", "Dealership"]}
            />
            <DealerBanner />
            <CommonPageWrapper>
                <DealerListing items={[]} />
            </CommonPageWrapper>
        </div>
    );
};

export default DealerPage;