import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import Title from '@/components/common/Title';
import React from 'react';

const TermAndCondition = () => {
    return (
        <div className='mt-20'>
            <div className='section-padding-x section-padding-y flex flex-col  gap-[45px] xmd:gap-[40px]'>
                <div className="space-y-2">
                    <Title level="title32">TERMS AND CONDITIONS OF SALE – labonneroute.fr</Title>
                    <p className="lg:text-lg">ALM MOTORS SAS – Website www.labonneroute.fr</p>
                </div>
                <div className="space-y-2">
                    <Title level="title32">Article 1 – Purpose</Title>
                    <p className="lg:text-lg">
                        These Terms and Conditions of Sale (“T&Cs”) define the terms under which ALM MOTORS SAS (SIRET: 933 816 340 00014, EU VAT: FR 83 933816340, registered office: 4 rue de la Butte – 93250 Villemomble, email: support@almmotors.fr, phone: +33 7 69 67 01 89) provides users (private individuals and professionals) with ad publishing and networking services through the website www.labonneroute.fr (“the Site”).
                    </p>
                </div>
                <div className="space-y-2">
                    <Title level="title32">Article 2 – Definitions</Title>
                    <p className="lg:text-lg">
                        - Ad: vehicle sale listing published on the Site. <br />
                        - Private Advertiser: any natural person, of legal age and not acting as a trader, using the Site to post an ad for private purposes. <br />
                        - Professional Advertiser: any natural or legal person regularly engaged in automotive activity, registered with the Trade and Companies Register or Chamber of Trades, with an appropriate APE code. <br />
                        - Contract: the contractual framework formed by the acceptance of these T&Cs, account creation, and posting of an ad (private or professional). <br />
                        - Pricing Plan: schedule of fees and subscriptions available on the Site.

                    </p>
                </div>
                <div className="space-y-2">
                    <Title level="title32">Article 3 – Conditions of Access to Services</Title>
                    <p className="lg:text-lg">
                        Posting an ad requires account creation. <br />
                        The Advertiser guarantees the accuracy of information provided (identity, contact details, vehicle description). <br />
                        The Advertiser is solely responsible for the content of their ads.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 4 – T&Cs for Private Individuals</Title>
                    <p className="lg:text-lg">
                        4.1 Posting an ad <br />
                        Private individuals may post ads individually, according to the applicable pricing plan.  <br />
                        The publication period and number of authorized modifications are specified at the time of order. <br />
                        The right of withdrawal does not apply once the ad is validated and published, pursuant to Article L221-28 of the French Consumer Code. <br /> <br />

                        4.2 Obligations of the Private Advertiser <br />
                        - Must own the vehicle offered or be duly authorized to sell it. <br />
                        - Must provide accurate and truthful information. <br />
                        - Must not post unrepaired accident-damaged vehicles or those subject to a driving ban. <br /> <br />

                        4.3 Liability <br />
                        ALM MOTORS acts solely as a technical intermediary and does not intervene in transactions. <br />
                        Sales contracts are concluded directly between private advertisers and buyers. <br />
                        ALM MOTORS’ liability is limited to the amount paid for the relevant service. <br /> <br />

                        4.4 Right of Withdrawal <br />
                        In accordance with Articles L221-18 et seq. of the French Consumer Code, Private Advertisers generally have a 14-day right of withdrawal. <br />
                        However, this right does not apply when the service is fully executed before expiry of the withdrawal period (e.g., ad published immediately). <br />
                        To exercise this right, the Client may send a clear and unambiguous email to support@almmotors.fr.

                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 5 – T&Cs for Professionals</Title>
                    <p className="lg:text-lg">
                        5.1 Subscriptions <br />
                        Professionals must subscribe to a Pro Pack under the applicable pricing plan.<br />
                        Specific conditions (number of ads, included options) are detailed in this pricing plan, available online.<br /><br />

                        5.2 Duration and Termination<br />
                        Subscriptions are entered into for a minimum fixed period of 6 months.<br />
                        They renew tacitly for subsequent 6-month periods.<br />
                        Termination requires 2 months’ notice prior to expiry, by registered mail or email with acknowledgment of receipt.<br />
                        Any started period remains payable in full.<br /><br />

                        5.3 Obligations of the Professional Advertiser<br />
                        - May only post vehicles they own or for which they are the legal representative.<br />
                        - Must provide accurate, up-to-date, and truthful information.<br />
                        - Must not post unrepaired accident-damaged or severely damaged vehicles.<br />
                        - Must comply with applicable laws (Highway Code, Commercial Code, tax and social obligations).<br /><br />

                        5.4 Liability<br />
                        ALM MOTORS is not a party to sales concluded between professionals and buyers.<br />
                        Its liability is limited to the price paid for the relevant service.<br />
                        ALM MOTORS may suspend or terminate an account in case of non-compliance with these T&Cs.<br /><br />

                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 6 – Pricing and Billing</Title>
                    <p className="lg:text-lg">
                        Prices are exclusive of tax for professionals (VAT at the current legal rate of 20% will be applied) and inclusive of tax for private individuals.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 7 – Additional Services and Options</Title>
                    <p className="lg:text-lg">
                        ALM MOTORS may offer complementary services (e.g., highlighting, boosted visibility, advanced statistics, API). <br />
                        These services are subject to special conditions and the applicable pricing plan.<br />
                        Any option ordered is due in full and non-refundable once activated.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 8 – Intellectual Property</Title>
                    <p className="lg:text-lg">
                        All Site content (logos, trademarks, texts, photos, videos, interface, database) is the exclusive property of ALM MOTORS SAS or its partners. <br />
                        Any reproduction, distribution, modification, or exploitation, even partial, is prohibited without prior written authorization.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 9 – Force Majeure</Title>
                    <p className="lg:text-lg">
                        ALM MOTORS cannot be held liable for non-performance caused by force majeure (natural disaster, Internet outage, cyberattack, strike, technical failure, etc.). <br />
                        Contract performance is suspended during the force majeure event.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 10 – Agreement on Evidence</Title>
                    <p className="lg:text-lg">
                        The parties agree that emails, electronic invoices, connection logs, and ALM MOTORS databases constitute valid evidence in the event of a dispute. <br />
                        The Advertiser expressly accepts the evidentiary value of such records.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 11 – Personal Data</Title>
                    <p className="lg:text-lg">
                        Data collected in connection with these T&Cs is processed in accordance with the labonneroute.fr Privacy Policy, available online.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title32">Article 12 – Disputes and Mediation</Title>
                    <p className="lg:text-lg">
                        These T&Cs are governed by French law. <br /><br />

                        - For private individuals: free mediation is available via:<br />
                        Le Médiateur FNA<br />
                        Immeuble Axe Nord<br />
                        9 & 11 avenue Michelet<br />
                        93583 Saint-Ouen Cedex<br />
                        Website: www.mediateur.fna.fr<br /><br />

                        - For professionals: exclusive jurisdiction lies with the Commercial Court of Bobigny.

                    </p>
                </div>

            </div>
        </div>
    );
};

export default TermAndCondition;