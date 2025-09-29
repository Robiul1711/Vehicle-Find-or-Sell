import Title from '@/components/common/Title';
import React from 'react';
import { ScrollRestoration } from 'react-router-dom';

const CookiePolicy = () => {
    return (
        <div className='mt-20'>
            <ScrollRestoration />
            <div className='section-padding-x section-padding-y flex flex-col  gap-[45px] xmd:gap-[40px]'>
                <div className="space-y-2">
                    <Title level="title32">COOKIE POLICY – ALM MOTORS / labonneroute.fr</Title>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">1. Purpose</Title>
                    <p className="lg:text-lg">
                        Access to and use of the Site are subject to these General Conditions of Use as well as all applicable regulations on the day of the visit to the Site. <br /><br />

                        ALM MOTORS SAS, registered with the Trade and Companies Register under number 933 816 340,<br />
                        with its registered office at 4 rue de la Butte – 93250 Villemomble, operates the website www.labonneroute.fr.<br />
                        To ensure its proper functioning, improve its services, and provide tailored content, the website uses cookies and similar technologies.<br /><br />


                        Groupe La Centrale reserves the right to modify these Legal Notices and General Conditions of Use at any time and without notice.<br /><br />

                        The Internet user must regularly consult these Legal Notices and General Conditions of Use accessible on our Site, in order to be aware of any possible modifications.<br /><br />

                        The Internet user acknowledges having verified that the computer configuration used does not contain any viruses and that it is in perfect working order.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">2. Definition</Title>
                    <p className="lg:text-lg">
                        A cookie is a small file placed on your device (computer, smartphone, tablet) when you browse. <br />
                        It stores temporary information to facilitate the use of the site, measure its audience, and, if you agree, personalize content and advertising.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">3. Types of cookies used</Title>
                    <p className="lg:text-lg">
                        - Strictly necessary cookies: Ensure the proper functioning of the site (login, ad management, security). <br />
                        - Functional cookies: Store your preferences (language, display, search filters). <br />
                        - Audience measurement cookies: Used to analyze traffic and improve our services (visit statistics, navigation). <br />
                        - Advertising cookies: Allow targeted advertising. <br />
                        - Social media cookies: Facilitate content sharing (WhatsApp, Messenger, Facebook, etc.). <br />
                        - External service cookies: e.g., protection via reCAPTCHA, YouTube/Vimeo video integration.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">4. Purposes</Title>
                    <p className="lg:text-lg">
                        Cookies are used to: <br />
                        - Guarantee access to essential services (account, messaging, posting ads),<br />
                        - Analyze traffic and optimize usability,<br />
                        - Personalize the user experience,<br />
                        - Display ads tailored to your interests,<br />
                        - Enable sharing on social networks.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">5. Retention period</Title>
                    <p className="lg:text-lg">
                        - Technical cookies: session duration. <br />
                        - Measurement and advertising cookies: up to 13 months.<br />
                        - Consent (accept/refuse): up to 6 months. After this period, we will ask for your choice again.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">6. Summary table (example)</Title>
                    <p className="lg:text-lg">
                        Category | Cookie / tag name | Provider | Purpose | Legal basis | Retention <br />
                        --- | --- | --- | --- | --- | ---<br />
                        Strictly necessary | PHPSESSID | ALM MOTORS | Session & security | Legitimate interest | Session<br />
                        Functional | locale | ALM MOTORS | User preferences | Legitimate interest | 6 months<br />
                        Audience measurement | _ga, _gid | Google Analytics (*) | Traffic statistics | Consent | 13 months<br />
                        Advertising | _fbp, _fbc | Meta (Facebook/Instagram) | Retargeting ads | Consent | 3 months<br />
                        Social media | __share_* | Facebook, etc. | Social sharing buttons | Consent | 13 months<br />
                        External services | rc::a | Google reCAPTCHA | Form security | Consent | 6 months<br /><br />

                        (*) If a CNIL-exempt tool such as self-hosted Matomo is used, please specify that it is exempt from consent.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">7. Consent</Title>
                    <p className="lg:text-lg">
                        On your first visit, a banner allows you to: <br />
                        - Accept all,<br />
                        - Refuse all,<br />
                        - Customize your choices.<br /><br />

                        Refusal is as simple as acceptance. You can change your preferences at any time via the "Cookie management" link available at the bottom of each page.<br />
                        We keep proof of your choice for up to 6 months.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">8. Browser settings</Title>
                    <p className="lg:text-lg">
                        You can also configure your browsers: <br />
                        - Chrome<br />
                        - Firefox<br />
                        - Safari<br />
                        - Edge<br />
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">9. Minors</Title>
                    <p className="lg:text-lg">
                        No personalized advertising is offered to users under 15, in accordance with French regulations. <br />
                        Parents or legal guardians may exercise minors’ rights at any time by writing to support@almmotors.fr.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">10. Partners and data transfers</Title>
                    <p className="lg:text-lg">
                        Some of our partners (Google, Meta, YouTube, etc.) may transfer data outside the European Union. <br />
                        These transfers are governed by standard contractual clauses of the European Commission or adequacy decisions to ensure sufficient protection.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">11. Respect for browser signals</Title>
                    <p className="lg:text-lg">
                        When your browser sends a “Do Not Track” or equivalent signal, our consent management tool will attempt to take it into account, within technical limits.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">12. Contact</Title>
                    <p className="lg:text-lg">
                        For any questions or requests regarding cookies, you can contact us at: <br />
                        📧 support@almmotors.fr<br />
                        📍 ALM MOTORS SAS – 4 rue de la Butte – 93250 Villemomble

                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">13. Updates</Title>
                    <p className="lg:text-lg">
                        This policy may change to reflect legal or technical developments. <br />
                        Last update: [insert date]
                    </p>
                </div>



            </div>
        </div>
    );
};

export default CookiePolicy;