import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import ContactBanner from '@/components/contact/ContactBanner';
import ContactForm from '@/components/contact/ContactForm';
import React from 'react';

const ContactPage = () => {
    return (
        <div className='mt-20'>
            <ContactBanner />
            <CommonPageWrapper>
                <ContactForm />
            </CommonPageWrapper>
        </div>
    );
};

export default ContactPage;