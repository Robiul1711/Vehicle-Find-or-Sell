import DealerBanner from '@/components/additionalServicesComponent/dealerComponent/DealerBanner';
import DealerListing from '@/components/additionalServicesComponent/dealerComponent/DealerListing';
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import React from 'react';

const DealerPage = () => {
    return (
        <div >
            <DealerBanner />
            <CommonPageWrapper>
                <DealerListing items={[]} />
            </CommonPageWrapper>
        </div>
    );
};

export default DealerPage;