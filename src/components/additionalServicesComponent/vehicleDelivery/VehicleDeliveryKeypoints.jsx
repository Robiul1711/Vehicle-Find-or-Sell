import { CustomAdvantage, CustomCheck, CustomCheck2, CustomCost, CustomDelivery2, CustomDisadvantage, CustomHandover, CustomIns, CustomJockey, CustomLocationInt, CustomLogistics, CustomPremium, CustomProfessional, CustomTransporter, CustomVerified } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const ProvidersData = [
    {
        id: 1,
        title: "Individual Transport (Enclosed or Flatbed Truck)",
        desc1: "Vehicle travels alone",
        desc2: "Faster and more secure",
        desc3: "Higher cost depending on distance and model"
    },
    {
        id: 2,
        title: "Multi-car Transport (Carrier Truck)",
        desc1: "Vehicle travels with others (6–8 cars)",
        desc2: "Cost-effective for long distances",
        desc3: "Longer delivery time (truck must be filled)"
    },
]

const SummaryData = [
    {
        id: 1,
        icon: <CustomCost />,
        title: "Cost",
        desc: "Depends on distance, urgency, and type of delivery"
    },
    {
        id: 2,
        icon: <CustomIns />,
        title: "Insurance",
        desc: "Verify that the transporter or driver has coverage for damage during transport."
    },
    {
        id: 3,
        icon: <CustomDelivery2 />,
        title: "Delivery time",
        desc: "grouped transport = longer delays, individual transport = faster."
    },
    {
        id: 4,
        icon: <CustomHandover />,
        title: "Vehicle handover",
        desc: "Ensure inspection is done at departure and arrival (delivery report)."
    },
]

const PossibleData = [
    {
        id: 1,
        icon: <CustomLogistics />,
        title: "Shared logistics to reduce costs",
        desc: "Group shipments with other customers for cost savings"
    },
    {
        id: 2,
        icon: <CustomLocationInt />,
        title: "International delivery",
        desc: "Ship + truck + customs handling for cross-border delivery"
    },
    {
        id: 3,
        icon: <CustomPremium />,
        title: "Premium services",
        desc: "GPS tracking, cleaning, personalized handover"
    }
]

const InSummaryData = [
    {
        id: 1,
        icon: <CustomProfessional />,
        title: "By the selling professional",
        desc: "Convenient, but local"
    },
    {
        id: 2,
        icon: <CustomTransporter />,
        title: "By Transporter (multi-car or individual)",
        desc: "Safe, reliable"
    },
    {
        id: 3,
        icon: <CustomJockey />,
        title: "By driver (jockey)",
        desc: "Fast, but adds mileage"
    },
    {
        id: 4,
        icon: <CustomPremium />,
        title: "Premium options",
        desc: "Tracking, full service"
    }

]

const VehicleDeliveryKeypoints = ({ data }) => {
    const sections = data?.sections || [];
    const possibleSolutions = sections.find((s) => s.section_id === "autres-solutions");
    const transportSpecialised = sections.find((s) => s.section_id === "transport-specialise");
    const deliveryByPro = sections.find((s) => s.section_id === "livraison-par-professionnels");
    const summary = sections.find((s) => s.section_id === "résumé");
    const keyFactors = sections.find((s) => s.section_id === "facteurs-cles");
    const driverDelivery = sections.find((s) => s.section_id === "livraison-par-chauffeur");

    // Dynamic ProvidersData (Specialized Transport) mapping
    const providersDataMapped = (transportSpecialised?.extra_data?.cards || []).map((card, index) => {
        return {
            id: index + 1,
            title: card.name,
            desc1: card.items?.[0] || "",
            desc2: card.items?.[1] || "",
            desc3: card.items?.[2] || ""
        };
    });
    const displayProvidersData = providersDataMapped.length > 0 ? providersDataMapped : ProvidersData;

    // Dynamic SummaryData (Key Factors) mapping
    const summaryDataMapped = (keyFactors?.bullets || []).map((bullet, index) => {
        const original = SummaryData[index] || SummaryData[SummaryData.length - 1];
        return {
            ...original,
            title: bullet.split(" ").slice(0, 3).join(" "),
            desc: bullet
        };
    });
    const displaySummaryData = summaryDataMapped.length > 0 ? summaryDataMapped : SummaryData;

    // Dynamic PossibleData mapping
    const possibleDataMapped = (possibleSolutions?.bullets || []).map((bullet, index) => {
        const original = PossibleData[index] || PossibleData[PossibleData.length - 1];
        return {
            ...original,
            title: bullet.split(" ").slice(0, 3).join(" "),
            desc: bullet
        };
    });
    const displayPossibleData = possibleDataMapped.length > 0 ? possibleDataMapped : PossibleData;

    // Dynamic InSummaryData mapping
    const inSummaryDataMapped = (summary?.bullets || []).map((bullet, index) => {
        const original = InSummaryData[index] || InSummaryData[InSummaryData.length - 1];
        return {
            ...original,
            title: bullet.split(" ").slice(0, 3).join(" "),
            desc: bullet
        };
    });
    const displayInSummaryData = inSummaryDataMapped.length > 0 ? inSummaryDataMapped : InSummaryData;

    return (
        <div className='lg:space-y-20 mx-auto'>

            {/* Delivery Services by Professionals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: deliveryByPro?.title || "Delivery Services by Professionals" }}>
                    </p>
                    <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: deliveryByPro?.description || "Get your car delivered directly by the selling garage or dealership." }}>
                    </p>

                    <div className="space-y-5">
                        {(deliveryByPro?.advantages || [
                            "Delivery to your home or workplace.",
                            "Vehicle cleaned and checked before handover.",
                            "Personalized assistance at key handover."
                        ]).map((adv, idx) => (
                            <p key={idx} className=" flex items-center gap-2">
                                <CustomCheck /> {adv}
                            </p>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomAdvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Advantage
                            </p>
                            <p className="text-sm lg:text-base">
                                {deliveryByPro?.advantages?.[0] || "Direct follow-up from the seller who knows the vehicle."}
                            </p>
                        </div>
                        <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDisadvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Disadvantage
                            </p>
                            <p className="text-sm lg:text-base">
                                {deliveryByPro?.disadvantages?.[0] || "Usually limited to certain areas."}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={deliveryByPro?.image_url || ImageProvider.delivery1} alt="" />
                </div>
            </div>

            {/* Specialized Transport Companies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={transportSpecialised?.image_url || ImageProvider.delivery2} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: transportSpecialised?.title || "Specialized Transport Companies" }}>
                    </p>
                    <p className="lg:text-lg font-medium">
                        Professional carriers that handle long-distance or specialized delivery.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {
                            displayProvidersData?.map((item, idx) => (
                                <div key={idx} className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                    <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item.title }}>
                                    </p>
                                    <p className="text-base flex items-center gap-2" dangerouslySetInnerHTML={{ __html: item.desc1 }}>
                                    </p>
                                    <p className="text-base flex items-center gap-2" dangerouslySetInnerHTML={{ __html: item.desc2 }}>
                                    </p>
                                    <p className="text-base flex items-center gap-2" dangerouslySetInnerHTML={{ __html: item.desc3 }}>
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomAdvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Advantage
                            </p>
                            <p className="text-sm">
                                Secure, professional handling
                            </p>

                        </div>
                        <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDisadvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Disadvantage
                            </p>
                            <p className="text-sm">
                                Higher price than dealer delivery
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Driver Delivery (Jockey System) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: driverDelivery?.title || "Driver Delivery (Jockey System)" }}>
                    </p>
                    <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: driverDelivery?.description || "A professional driver delivers the car directly to your address." }}>
                    </p>

                    <div className="space-y-5">
                        {(driverDelivery?.advantages || [
                            "Fast and flexible solution.",
                            "Works for national and cross-border delivery.",
                            "Must check insurance coverage for the driver."
                        ]).map((adv, idx) => (
                            <p key={idx} className=" flex items-center gap-2">
                                <CustomCheck /> {adv}
                            </p>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomAdvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Advantage
                            </p>
                            <p className="text-sm lg:text-base">
                                {driverDelivery?.advantages?.[0] || "Often cheaper than truck transport."}
                            </p>
                        </div>
                        <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDisadvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Disadvantage
                            </p>
                            <p className="text-sm lg:text-base">
                                {driverDelivery?.disadvantages?.[0] || "Adds mileage and wear on the vehicle"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={driverDelivery?.image_url || ImageProvider.delivery1} alt="" />
                </div>
            </div>

            {/* Key Factors to Consider */}
            <div>
                <div className="mb-5">
                    <p className="lg:text-3xl font-bold mb-5" dangerouslySetInnerHTML={{ __html: keyFactors?.title || "Key Factors to Consider" }}>
                    </p>
                    <p className="lg:text-xl font-medium">
                        Important checks before selecting your delivery option.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 items-center justify-center">
                    <div className="space-y-4 lg:space-y-10">
                        {
                            displaySummaryData?.slice(0, 2).map((item, idx) => (
                                <div key={idx} className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                        {item?.icon}
                                    </div>

                                    <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item.title }}>
                                    </p>

                                    <p className="text-base" dangerouslySetInnerHTML={{ __html: item.desc }}>
                                    </p>

                                </div>
                            ))
                        }
                    </div>
                    <div className="">
                        <img src={keyFactors?.image_url || ImageProvider.delivery3} className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' alt="" />
                    </div>
                    <div className="space-y-4 lg:space-y-10">
                        {
                            displaySummaryData?.slice(2, 4).map((item, idx) => (
                                <div key={idx} className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                        {item?.icon}
                                    </div>

                                    <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item.title }}>
                                    </p>

                                    <p className="text-base" dangerouslySetInnerHTML={{ __html: item.desc }}>
                                    </p>

                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>

            {/* Other Possible Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={possibleSolutions?.image_url || ImageProvider.delivery4} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: possibleSolutions?.title || "Other Possible Solutions" }}>
                    </p>
                    <p className="lg:text-xl">
                        Alternative or premium delivery options.
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        {
                            displayPossibleData?.map((item, idx) => (
                                <div key={idx} className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                        {item?.icon}
                                    </div>

                                    <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item.title }}>
                                    </p>

                                    <p className="text-base" dangerouslySetInnerHTML={{ __html: item.desc }}>
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

            {/* In Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: summary?.title || "In Summary" }}>
                    </p>
                    <p className="lg:text-xl">
                        Key vehicle delivery choices at a glance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                        {
                            displayInSummaryData?.map((item, idx) => (
                                <div key={idx} className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                        {item?.icon}
                                    </div>

                                    <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item.title }}>
                                    </p>

                                    <p className="text-base" dangerouslySetInnerHTML={{ __html: item.desc }}>
                                    </p>

                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="">
                    <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-xl shadow-sm' src={summary?.image_url || ImageProvider.delivery5} alt="" />
                </div>
            </div>

        </div>
    );
};

export default VehicleDeliveryKeypoints;