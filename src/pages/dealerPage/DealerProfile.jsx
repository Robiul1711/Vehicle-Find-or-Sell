import DealerListing from '@/components/additionalServicesComponent/dealerComponent/DealerListing';
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import React from 'react';
import DealerSection from './DealerSection';

const DealerProfile = () => {
    return (
        <div className='mt-20'>
            <CommonPageWrapper>
                <DealerSection />
                <DealerListing />
            </CommonPageWrapper>
        </div>
    );
};

export default DealerProfile;