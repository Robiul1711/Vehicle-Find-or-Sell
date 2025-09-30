import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import ContactBanner from '@/components/contact/ContactBanner';
import ContactForm from '@/components/contact/ContactForm';
import React from 'react';

const ContactPage = () => {
    return (
        <div >
            <ContactBanner />
            <CommonPageWrapper>
                <ContactForm />
            </CommonPageWrapper>
        </div>
    );
};

export default ContactPage;