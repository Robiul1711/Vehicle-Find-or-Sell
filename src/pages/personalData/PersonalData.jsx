import Title from '@/components/common/Title';
import React from 'react';
import { ScrollRestoration } from 'react-router-dom';

const PersonalData = () => {
    return (
        <div >
            <ScrollRestoration />
            <div className='section-padding-x section-padding-y flex flex-col  gap-[45px] xmd:gap-[40px]'>
                <div className="space-y-2">
                    <Title level="title32">PERSONAL DATA PROTECTION POLICY – ALM MOTORS / labonneroute.fr</Title>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">1. Data Controller</Title>
                    <p className="lg:text-lg">
                        ALM MOTORS SAS, SIRET: 933 816 340 00014, EU VAT: FR 83 933816340, with its registered office at 4 rue de la Butte – 93250 Villemomble (France), is responsible for processing the personal data collected via the website www.labonneroute.fr.
                        📧 Contact: support@almmotors.fr – ☎️ +33 7 69 67 01 89
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">2. Data Collected</Title>
                    <p className="lg:text-lg">
                        We collect information in the following cases: <br />
                        - Creating and managing a user account<br />
                        - Posting, editing, and tracking an ad<br />
                        - Requesting a vehicle estimate or quotation<br />
                        - Subscribing to an alert or newsletter<br />
                        - Requests via customer support<br />
                        - Using our partner services (financing, insurance, vehicle buyback)<br /><br />

                        Types of data:<br />
                        - Identity: first name, last name, postal address, email, phone number<br />
                        - Connection/navigation: IP address, logs, cookies<br />
                        - Vehicle: registration, technical specifications, photos, videos<br />
                        - Billing: payment methods, invoices, transaction history<br />
                        - Commercial data: preferences, usage statistics, interactions<br /><br />

                        Minors’ data:<br />
                        Our services are intended for adults. Registration by minors requires prior consent from their legal representative.

                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">3. Purposes and Legal Bases</Title>
                    <p className="lg:text-lg">
                        Your data is used to: <br />
                        - Perform a contract (account management, posting ads, paid options) <br />
                        - Respond to requests and provide customer support <br />
                        - Comply with legal obligations (accounting, invoicing, fraud prevention) <br />
                        - Improve services and generate statistics (legitimate interest) <br />
                        - Send marketing communications (based on consent) <br />
                        - Personalize the user experience (cookies/trackers)

                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">4. Data Retention</Title>
                    <p className="lg:text-lg">
                        - Inactive accounts: deleted after 36 months of inactivity <br />
                        - Ads and contacts: kept for 25 months after interaction<br />
                        - Invoices and accounting documents: 10 years<br />
                        - Cookies: up to 13 months<br />
                        - GDPR-related requests: up to 6 years
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">5. Recipients</Title>
                    <p className="lg:text-lg">
                        Your data may be shared with: <br />
                        - ALM MOTORS internal teams<br />
                        - Our subcontractors (hosting, maintenance, payment, advertising, CRM)<br />
                        - Social networks when you use sharing buttons<br />
                        - Certain commercial partners, only with your consent<br />
                        We never sell your personal data.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">6. Transfers Outside the EU</Title>
                    <p className="lg:text-lg">
                        Data is generally hosted within the European Union. If a transfer outside the EU is necessary, it will be governed by standard contractual clauses or adequacy decisions of the European Commission, ensuring a sufficient level of protection.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">7. Your Rights</Title>
                    <p className="lg:text-lg">
                        In accordance with GDPR and the French Data Protection Act, you have the right to: <br />
                        - Access, rectify, and erase your data<br />
                        - Restrict or object to processing<br />
                        - Data portability<br />
                        - Define instructions regarding your data after death<br /><br />

                        ⏱ Response time: 1 month (extendable to 3 months if complex).<br />
                        📧 Exercise your rights: support@almmotors.fr<br />
                        📮 Or by mail: ALM MOTORS SAS – 4 rue de la Butte – 93250 Villemomble<br /><br />

                        In case of disagreement, you may lodge a complaint with the CNIL: www.cnil.fr.

                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">8. Marketing Communications</Title>
                    <p className="lg:text-lg">
                        Emails and SMS are only sent with your explicit consent. <br /><br />

                        For professional clients, ALM MOTORS may send communications related to similar services (legitimate interest). You may object at any time.<br /><br />

                        Unsubscribe: via the link in emails, by replying STOP to SMS, or directly from your account.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">9. Cookies and Trackers</Title>
                    <p className="lg:text-lg">
                        During your visit, cookies may be placed to: <br />
                        - Ensure the proper functioning of the site<br />
                        - Measure audience and improve usability<br />
                        - Personalize content and ads<br />
                        - Enable social network features<br /><br />

                        You can set your preferences via the cookie banner at your first visit and change them at any time in the “Cookies” section of the site.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">10. Automated Decisions</Title>
                    <p className="lg:text-lg">
                        No decision producing legal effects is made solely on the basis of automated processing. Any profiling (e.g., content personalization) is limited and can be refused at any time.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">11. Security</Title>
                    <p className="lg:text-lg">
                        ALM MOTORS takes all necessary precautions to protect your data: <br />
                        - Restricted access to authorized personnel only<br />
                        - Encryption and secured payment transactions<br />
                        - Hosting on secure servers in Europe<br />
                        - Staff awareness and training<br /><br />

                        In the event of a personal data breach, we will inform the CNIL and, if necessary, the affected individuals.

                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">12. Data Protection Officer (DPO)</Title>
                    <p className="lg:text-lg">
                        ALM MOTORS is not required to appoint a DPO. For any questions, please contact: <br />
                        📧 support@almmotors.fr <br />
                        📮 4 rue de la Butte – 93250 Villemomble
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">13. Updates</Title>
                    <p className="lg:text-lg">
                        This policy may change over time. The most recent version is always available at www.labonneroute.fr.
                        Last update: [insert date]
                    </p>
                </div>


            </div>
        </div>
    );
};

export default PersonalData;