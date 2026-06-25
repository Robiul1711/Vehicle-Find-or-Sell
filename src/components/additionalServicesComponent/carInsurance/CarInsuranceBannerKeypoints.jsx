import { CustomCheck2, CustomConsequences, CustomCoverage, CustomDeductible, CustomExclusion, CustomImportant, CustomInsurance2, CustomLevel, CustomOnline, CustomPassenger, CustomProtection, CustomReimbursement, CustomReplacement, CustomRoadSide, CustomTraditional } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const PolicyDetails = [
    {
        id: 1,
        icon: <CustomDeductible />,
        title: "Deductible",
        desc: "Amount you pay first"
    },
    {
        id: 2,
        icon: <CustomExclusion />,
        title: "Exclusions",
        desc: "Cases not covered"
    },
    {
        id: 3,
        icon: <CustomRoadSide />,
        title: "Roadside Assistance",
        desc: "Towing & breakdown"
    },
    {
        id: 4,
        icon: <CustomPassenger />,
        title: "Passenger Coverage",
        desc: "Protection for riders"
    },
    {
        id: 5,
        icon: <CustomReimbursement />,
        title: "Reimbursement Value",
        desc: "How much you get back"
    },
    {
        id: 6,
        icon: <CustomReplacement />,
        title: "Replacement Car",
        desc: "Temporary vehicle"
    }
]

const InsuranceData = [
    {
        id: 1,
        title: "Define Your Needs",
        desc: "Consider vehicle value, usage, and budget"
    },
    {
        id: 2,
        title: "Compare Coverage Options",
        desc: "Review third-party, intermediate, and comprehensive plans"
    },
    {
        id: 3,
        title: "Examine Deductibles & Exclusions",
        desc: "Check what is not covered and how much you’ll pay in case of a claim"
    },
    {
        id: 4,
        title: "Check Included Services",
        desc: "Look for roadside assistance, replacement vehicles, and other extras"
    },
    {
        id: 5,
        title: "Compare Multiple Quotes",
        desc: "Evaluate several insurers before committing"
    }
]

const InsuranceEssentials = [
    {
        id: 1,
        icon: <CustomInsurance2 />,
        title: "Insurance",
        desc: "Mandatory"
    },
    {
        id: 2,
        icon: <CustomLevel />,
        title: "3 levels",
        desc: "Third-party, Intermediate, Comprehensive"
    },
    {
        id: 3,
        icon: <CustomPassenger />,
        title: "Players",
        desc: "Traditional, Banks, Online, Brokers"
    },
    {
        id: 4,
        icon: <CustomImportant />,
        title: "Important",
        desc: "Deductible, Exclusions, Eervices"
    }

]
const CarInsuranceBannerKeypoints = ({ data }) => {
    const sections = data?.sections || [];
    const essentials = sections.find((s) => s.section_id === "essentiels-assurance");
    const detailsContrat = sections.find((s) => s.section_id === "details-contrat");
    const choisirAssurance = sections.find((s) => s.section_id === "choisir-assurance");
    const prestataires = sections.find((s) => s.section_id === "prestataires");
    const niveauxCouverture = sections.find((s) => s.section_id === "niveaux-de-couverture");
    const pourquoiAssurance = sections.find((s) => s.section_id === "pourquoi-assurance");

    // Dynamic Policy Details Mapping
    const detailsContratMapped = (detailsContrat?.bullets || []).map((bullet, index) => {
        const original = PolicyDetails[index] || PolicyDetails[PolicyDetails.length - 1];
        return {
            ...original,
            title: bullet.split(" ").slice(0, 3).join(" "),
            desc: bullet
        };
    });
    const displayPolicyDetails = detailsContratMapped.length > 0 ? detailsContratMapped : PolicyDetails;

    // Dynamic Selecting the Right Insurance Mapping
    const choosingMapped = (choisirAssurance?.bullets || []).map((bullet, index) => {
        const original = InsuranceData[index] || InsuranceData[InsuranceData.length - 1];
        return {
            ...original,
            title: bullet.split(" ").slice(0, 3).join(" "),
            desc: bullet
        };
    });
    const displayInsuranceData = choosingMapped.length > 0 ? choosingMapped : InsuranceData;

    // Dynamic Insurance Essentials Mapping
    const essentialsMapped = (essentials?.bullets || []).map((bullet, index) => {
        const original = InsuranceEssentials[index] || InsuranceEssentials[InsuranceEssentials.length - 1];
        return {
            ...original,
            title: bullet.split(" ").slice(0, 3).join(" "),
            desc: bullet
        };
    });
    const displayInsuranceEssentials = essentialsMapped.length > 0 ? essentialsMapped : InsuranceEssentials;

    return (
        <div className='lg:space-y-20 mx-auto'>
            {/* Car Insurance: A Legal Requirement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: pourquoiAssurance?.title || "Car Insurance: A Legal Requirement" }}>
                    </p>
                    <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: pourquoiAssurance?.description || "In France, all motor vehicles must be insured with at least third-party liability (RC)." }}>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomProtection />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Third-Party Protection
                            </p>
                            <p dangerouslySetInnerHTML={{ __html: pourquoiAssurance?.bullets?.[0] || "Covers injuries and damage caused to other people, vehicles, or property." }}></p>
                        </div>
                        <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomConsequences />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Legal Consequences
                            </p>
                            <p dangerouslySetInnerHTML={{ __html: pourquoiAssurance?.bullets?.[1] || "Driving without insurance can lead to fines, license suspension, or vehicle seizure." }}></p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={pourquoiAssurance?.image_url || ImageProvider.carInsurance1} alt="" />
                </div>
            </div>

            {/* Levels of Coverage */}
            <div className=" mx-auto">
                <div className="space-y-4 lg:space-y-5">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: niveauxCouverture?.title || "Levels of Coverage" }}>
                    </p>
                    <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: niveauxCouverture?.description || "Choose the right protection for your needs" }}>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {niveauxCouverture?.extra_data?.cards ? (
                            niveauxCouverture.extra_data.cards.map((card, idx) => (
                                <div key={idx} className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                        <CustomCoverage />
                                    </div>

                                    <p className="lg:text-2xl font-medium">{card.name}</p>
                                    {card.items?.map((item, subIdx) => (
                                        <p key={subIdx} className="flex items-center gap-1">
                                            <CustomCheck2 /> {item}
                                        </p>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                        <CustomCoverage />
                                    </div>

                                    <p className="lg:text-2xl font-medium">
                                        Third-Party Insurance (Liability Only)
                                    </p>
                                    <p>Minimum required coverage for legal compliance.</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Minimum required coverage</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Covers only damage to others</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Best for old/low-value cars</p>
                                </div>

                                <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                        <CustomCoverage />
                                    </div>

                                    <p className="lg:text-2xl font-medium">
                                        Intermediate Insurance
                                    </p>
                                    <p>Balanced coverage with additional  protections.</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Includes liability + theft, fire, glass breakage</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Balanced coverage</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Good middle-ground option</p>
                                </div>

                                <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                        <CustomCoverage />
                                    </div>

                                    <p className="lg:text-2xl font-medium">
                                        Comprehensive Insurance
                                    </p>
                                    <p>Most complete coverage for maximum protection.</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Minimum required coverage</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Covers only damage to others</p>
                                    <p className="flex items-center gap-1"><CustomCheck2 />Best for old/low-value cars</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>

            {/* Who Provides Car Insurance? */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: prestataires?.title || "Who Provides Car Insurance?" }}>
                    </p>
                    <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: prestataires?.description || "Explore different types of insurers to find the best fit for your vehicle." }}>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <p className="lg:text-2xl font-medium">
                                Traditional companies
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                <p className="flex items-center gap-1"><CustomCheck2 />AXA</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />GMF</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />MAAF</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Allianz</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Maif</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Groupama</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Macif</p>
                            </div>

                        </div>
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">

                            <p className="lg:text-2xl font-medium">
                                Bank insurers
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <p className="flex items-center gap-1"><CustomCheck2 />Crédit Agricole</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />BNP Paribas.</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />CIC</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Crédit Mutuel</p>

                            </div>
                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <p className="lg:text-2xl font-medium">
                                Online insurers
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                <p className="flex items-center gap-1"><CustomCheck2 />Direct Assurance</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />L’Olivier Assurance</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Lovys</p>

                            </div>

                        </div>
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">

                            <p className="lg:text-2xl font-medium">
                                Brokers
                            </p>
                            <div className="">
                                <p className="flex items-center gap-1">compare multiple offers on your behalf to find the best deal</p>

                            </div>
                        </div>


                    </div>
                </div>
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={prestataires?.image_url || ImageProvider.carInsurance2} alt="" />
                </div>
            </div>

            {/* Choosing the Right Insurance Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Choosing the Right Insurance Type
                    </p>
                    <p className="lg:text-xl">
                        Compare online and traditional options based on your priorities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomOnline />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Online Insurance
                            </p>
                            <p className="text-base">
                                Fast quotes, app-based management, and competitive pricing.
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                <p className="flex items-center gap-1"><CustomCheck2 />Fast quotes</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Easy management via mobile app</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Competitive pricing</p>

                            </div>
                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomTraditional />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Traditional Insurance
                            </p>
                            <p className="text-base">
                                Personalized advice and local agency support for your coverage needs
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                <p className="flex items-center gap-1"><CustomCheck2 />Local agencies</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Personalized advice</p>
                                <p className="flex items-center gap-1"><CustomCheck2 />Dedicated insurance advisor</p>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={ImageProvider.carInsurance3} alt="" />
                </div>
            </div>

            {/* Important Policy Details */}
            <div className="lg:space-y-5">
                <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: detailsContrat?.title || "Important Policy Details" }}>
                </p>
                <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: detailsContrat?.description || "Ensure your insurance covers the essentials for full protection." }}>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                    <div className="">
                        <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={detailsContrat?.image_url || ImageProvider.carInsurance4} alt="" />
                    </div>
                    <div className="space-y-4 lg:space-y-10">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {
                                displayPolicyDetails?.map((item, idx) => (
                                    <div key={idx} className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                        <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                            {item?.icon}
                                        </div>

                                        <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item?.title }}></p>
                                        <p className="text-base" dangerouslySetInnerHTML={{ __html: item?.desc }}></p>

                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
            </div>

            {/* Selecting the Right Insurance */}
            <div className=" mx-auto">
                <div className="space-y-4 lg:space-y-5">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: choisirAssurance?.title || "Selecting the Right Insurance" }}>
                    </p>
                    <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: choisirAssurance?.description || "Follow these steps to find the best coverage for your vehicle." }}>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                        {
                            displayInsuranceData?.map((item, idx) => (
                                <div key={idx} className="bg-gray-100 rounded p-5  space-y-4">
                                    <div className="w-12 h-12 font-semibold bg-custom-primary text-white  rounded flex items-center justify-center mr-4">
                                        0{item?.id}
                                    </div>

                                    <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item?.title }}></p>
                                    <p dangerouslySetInnerHTML={{ __html: item?.desc }}></p>
                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>

            {/* Car Insurance Essentials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: essentials?.title || "Car Insurance Essentials" }}>
                    </p>
                    <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: essentials?.description || "Important points to remember when choosing coverage." }}>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        {
                            displayInsuranceEssentials?.map((item, idx) => (
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
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={essentials?.image_url || ImageProvider.carInsurance5} alt="" />
                </div>
            </div>

        </div>
    );
};

export default CarInsuranceBannerKeypoints;