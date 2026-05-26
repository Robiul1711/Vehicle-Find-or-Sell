import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import ContactBanner from '@/components/contact/ContactBanner';
import ContactForm from '@/components/contact/ContactForm';
import React from 'react';
import SEO from '@/components/common/SEO';

const ContactPage = () => {
    return (
        <div >
            <SEO 
              title="Contact Us" 
              description="Have questions or need assistance? Get in touch with the Ronpoin support team today."
              keywords={["contact us", "ronpoin support", "customer service", "help center"]}
            />
            <ContactBanner />
            <CommonPageWrapper>
                <ContactForm />
            </CommonPageWrapper>
        </div>
    );
};

export default ContactPage;