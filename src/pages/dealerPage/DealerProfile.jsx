import DealerListing from '@/components/additionalServicesComponent/dealerComponent/DealerListing';
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import React from 'react';
import DealerSection from './DealerSection';
import DealerProfileListing from './DealerProfileListing';

const DealerProfile = () => {
    return (
        <div >
            <CommonPageWrapper>
                <DealerSection />
                <DealerProfileListing />
            </CommonPageWrapper>
        </div>
    );
};

export default DealerProfile;