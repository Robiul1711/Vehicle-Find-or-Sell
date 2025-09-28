import DealerBanner from '@/components/additionalServicesComponent/dealerComponent/DealerBanner';
import DealerListing from '@/components/additionalServicesComponent/dealerComponent/DealerListing';
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import React from 'react';

const DealerPage = () => {
    return (
        <div className='mt-20'>
            <DealerBanner />
            <CommonPageWrapper>
                <DealerListing items={[]} />
            </CommonPageWrapper>
        </div>
    );
};

export default DealerPage;