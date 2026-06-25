import { CustomCar, CustomCar2, CustomCar3, CustomCaution, CustomCheck, CustomCheck2, CustomDealer, CustomDeductible, CustomDoc, CustomFrance, CustomPrivate, CustomProcedure, CustomSettings, CustomWarning, CustomWebsite } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const SummaryData = [
    {
        id: 1,
        icon: <CustomFrance />,
        title: "French vehicle:",
        desc: "sale certificate, registration document, non-pledge certificate, technical inspection, ID and proof of address."
    },
    {
        id: 2,
        icon: <CustomCar3 />,
        title: "Imported vehicle: ",
        desc: "quitus fiscal, certificate of conformity (not needed if D2 and K completed), foreign documents, customs certificate 846A."
    },
    {
        id: 3,
        icon: <CustomPrivate />,
        title: "Professionals: ",
        desc: "declaration of purchase must be registered in the SIV."
    },
    {
        id: 4,
        icon: <CustomCaution />,
        title: "Buyer caution:",
        desc: "never buy a vehicle with a pre-crossed registration certificate, or from a professional who has not declared the purchase."
    },
    {
        id: 5,
        icon: <CustomProcedure />,
        title: "Procedures:",
        desc: "online via ANTS, SIV-approved professionals, or private authorized platforms."
    },
    {
        id: 6,

        title: "Note:",
        desc: "With our site, you will find all the information and links to register your vehicle quickly and safely, whether French or imported."
    },

]


const VehicleRegistrationKeypoints = ({ data }) => {
    const sections = data?.sections || [];
    const servicesAvailable = sections.find((s) => s.section_id === "services-disponibles");
    const privateVsProfessional = sections.find((s) => s.section_id === "particulier-vs-professionnel");
    const documentsRequis = sections.find((s) => s.section_id === "documents-requis");
    const practicalTips = sections.find((s) => s.section_id === "Conseils-pratiques");
    const registrationCosts = sections.find((s) => s.section_id === "Coûts-d’immatriculation");
    const buyerWarning = sections.find((s) => s.section_id === "Avertissement-à-l’acheteur");
    const summary = sections.find((s) => s.section_id === "résumé");

    const summaryDataMapped = (summary?.bullets || []).map((bullet, index) => {
        const original = SummaryData[index] || SummaryData[SummaryData.length - 1];
        return {
            ...original,
            title: bullet.split(" ").slice(0, 3).join(" "),
            desc: bullet
        };
    });
    const displaySummaryData = summaryDataMapped.length > 0 ? summaryDataMapped : SummaryData;

    return (
        <div className='lg:space-y-20 mx-auto'>
            {/* Services Available for Vehicle Registration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={servicesAvailable?.image_url || ImageProvider.registration1} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: servicesAvailable?.title || "Services Available for Vehicle Registration" }}>
                    </p>
                    <p className="lg:text-xl">
                        Since prefecture counters closed, all procedures are done online
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDoc />
                            </div>

                            <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: servicesAvailable?.bullets?.[0] || "ANTS (Official Government Platform)" }}>
                            </p>
                            <p className="text-base">
                                Official site: https://ants.gouv.fr
                            </p>
                            <p className="text-base">
                                Handles all vehicle registration procedures.
                            </p>

                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomSettings />
                            </div>

                            <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: servicesAvailable?.bullets?.[1] || "SIV Authorized Professionals" }}>
                            </p>
                            <p className="text-base">
                                Dealerships, garages, and offices approved by the Ministry of the Interior.
                            </p>
                            <p className="text-base">
                                Can process the registration on your behalf.
                            </p>
                            <p className="text-base">
                                Paid service (cost varies).
                            </p>

                        </div>
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomWebsite />
                            </div>

                            <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: servicesAvailable?.bullets?.[2] || "Private authorized websites" }}>
                            </p>
                            <p className="text-base">
                                Numerous online platforms approved by the SIV system.
                            </p>
                            <p className="text-base">
                                Fast processing but with additional fees.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Buying from a Private Seller vs. a Professional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={privateVsProfessional?.image_url || ImageProvider.registration2} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: privateVsProfessional?.title || "Buying from a Private Seller vs. a Professional" }}>
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomPrivate />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Buying from a private seller:
                            </p>
                            <div className="flex  gap-1">
                                <div className="">
                                    <CustomCheck2 />
                                </div>
                                <p className="text-base " dangerouslySetInnerHTML={{ __html: privateVsProfessional?.bullets?.[1] || "Seller must provide: crossed-out and signed registration certificate..." }}>
                                </p>
                            </div>


                        </div>


                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDealer />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Buying from a garage or dealer:
                            </p>
                            <div className="flex  gap-1">
                                <div className="">
                                    <CustomCheck2 />
                                </div>
                                <p className="text-base " dangerouslySetInnerHTML={{ __html: privateVsProfessional?.bullets?.[0] || "The professional must complete a declaration of purchase..." }}>
                                </p>
                            </div>
                        </div>


                    </div>

                    <div className="bg-custom-secondary  rounded p-5 text-white space-y-4">
                        <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                            <CustomWarning />
                        </div>

                        <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: buyerWarning?.title || "Buyer Warning" }}>
                        </p>
                        {(buyerWarning?.bullets || [
                            "Never buy a vehicle from a private seller if the registration certificate has already been crossed out...",
                            "Beware of garages that have not declared the purchase in the SIV system.",
                            "Always verify that the person you pay is the official owner or a registered professional."
                        ]).map((bullet, idx) => (
                            <div key={idx} className="flex  gap-1">
                                <div className="">
                                    <CustomCheck2 />
                                </div>
                                <p className="text-base " dangerouslySetInnerHTML={{ __html: bullet }}></p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Registration Costs & Practical Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">

                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: registrationCosts?.title || "Registration Costs" }}>
                    </p>
                    <p className="lg:text-xl">
                        The cost of a registration certificate depends on:
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        {(registrationCosts?.bullets || [
                            "Regional tax, based on fiscal horsepower (CV) and regional rates.",
                            "Type of vehicle and fuel (possible discounts for eco-friendly vehicles).",
                            "CO2 tax and powerful vehicle tax.",
                            "Fixed management and delivery fees."
                        ]).map((bullet, idx) => (
                            <div key={idx} className="flex  gap-1">
                                <div className="">
                                    <CustomCheck />
                                </div>
                                <p className="text-base " dangerouslySetInnerHTML={{ __html: bullet }}></p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: practicalTips?.title || "Practical Tips" }}>
                    </p>

                    <div className="grid grid-cols-1  gap-4">
                        {(practicalTips?.bullets || [
                            "For imported vehicles, anticipate the time to obtain the quitus fiscal and, if necessary, the COC.",
                            "If you are not comfortable with online procedures, use an SIV-approved professional.",
                            "Make sure the seller is legally authorized to sell the vehicle.",
                            "Keep all documents (invoices, certificates, quitus, technical inspection).",
                            "Always request a recent certificate of non-pledge."
                        ]).map((bullet, idx) => (
                            <div key={idx} className="flex  gap-1">
                                <div className="">
                                    <CustomCheck />
                                </div>
                                <p className="text-base " dangerouslySetInnerHTML={{ __html: bullet }}></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <p className="lg:text-3xl font-bold mb-5" dangerouslySetInnerHTML={{ __html: summary?.title || "In Summary" }}>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10  ">
                    {
                        displaySummaryData?.map((item, idx) => (
                            <div key={idx} className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                    {item?.icon}
                                </div>

                                <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item?.title }}>
                                </p>

                                <p className="text-base" dangerouslySetInnerHTML={{ __html: item?.desc }}>
                                </p>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default VehicleRegistrationKeypoints;