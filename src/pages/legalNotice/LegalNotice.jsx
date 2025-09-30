import Title from '@/components/common/Title';
import React from 'react';
import { ScrollRestoration } from 'react-router-dom';

const LegalNotice = () => {
    return (
        <div >
            <ScrollRestoration />
            <div className='section-padding-x section-padding-y flex flex-col  gap-[45px] xmd:gap-[40px]'>
                <div className="space-y-2">
                    <Title level="title32">LEGAL NOTICE – labonneroute.fr</Title>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">LEGAL NOTICE – labonneroute.fr</Title>
                    <p className="lg:text-lg">
                        ALM MOTORS, SAS <br />
                        Registered office: 4, rue de la Butte – 93250 Villemomble – France<br />
                        SIRET: 933 816 340 00014<br />
                        EU VAT: FR 83 933816340<br />
                        Website: https://www.labonneroute.fr (and associated subdomains)<br />
                        Contact: support@almmotors.fr<br />
                        Phone: +33 7 69 67 01 89
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">Publication Director</Title>
                    <p className="lg:text-lg">
                        Matthieu MADRANGES
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">Hosting Provider</Title>
                    <p className="lg:text-lg">
                        Hostinger Operations, UAB <br />
                        Švitrigailos str. 34, Vilnius 03230, Lithuania <br />
                        Phone: +370 645 03378<br />
                        E-mail: domains@hostinger.com
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">Intellectual Property</Title>
                    <p className="lg:text-lg">
                        All elements of the Site (texts, visuals, logos, interfaces, databases, code, etc.) are protected by the French Intellectual Property Code. Any unauthorized reproduction or reuse is prohibited.
                    </p>
                </div>

                <div className="space-y-2">
                    <Title level="title24" className="font-semibold">Last update</Title>
                    <p className="lg:text-lg">
                        September 4, 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LegalNotice;