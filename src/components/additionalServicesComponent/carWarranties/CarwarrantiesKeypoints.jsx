import { CustomAdvantage, CustomCheck, CustomCheck2, CustomCheckGreen, CustomCross, CustomDealer, CustomDisadvantage, CustomPrivate, CustomWarning } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const ProvidersData = [
    {
        id: 1,
        title: "Opteven",
        desc: "Mechanical breakdown warranties, assistance, and service contracts."
    },
    {
        id: 2,
        title: "Cirano",
        desc: "Warranty extensions for private buyers & professionals."
    },
    {
        id: 3,
        title: "Label",
        desc: "Coverage for breakdowns & roadside assistance."
    },
    {
        id: 4,
        title: "Other Well-Known Providers",
        desc: "Mapfre, CarGarantie, Icare & Garantie M across Europe."
    },

]

const CarwarrantiesKeypoints = () => {
    return (
        <div className='space-y-20 mx-auto'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container">
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Legal Warranty (Mandatory Protection)
                    </p>
                    <p className="lg:text-xl font-medium">
                        Covers hidden faults or non-conformities, valid for 2 years when buying from a professional.
                    </p>
                    <ul className='list-disc pl-4'>
                        <li>
                            Protects against hidden defects present at time of sale
                        </li>
                        <li>
                            Covers major mechanical and electrical faults
                        </li>
                        <li>
                            Valid for 2 years from purchase date
                        </li>
                        <li>
                            Applies only when buying from professional dealers
                        </li>

                    </ul>
                    <p className='flex items-center gap-2'><CustomCheckGreen /> Mandatory protection with no additional cost</p>
                    <p className='flex items-center gap-2'><CustomCross /> Works for national and cross-border delivery.</p>

                </div>
                <div className="">
                    <img src={ImageProvider.warrenty1} alt="" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container">
                <div className="">
                    <img src={ImageProvider.warrenty2} alt="" />
                </div>
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Contractual Warranty (Extra Seller/Manufacturer Coverage)
                    </p>
                    <p className="lg:text-xl font-medium">
                        Additional coverage included or purchased at the time of sale, with variable duration and terms.
                    </p>
                    <ul className='list-disc pl-4'>
                        <li>
                            Extended manufacturer warranty (3-5 years typical)

                        </li>
                        <li>
                            Dealer-provided service contracts

                        </li>
                        <li>
                            Specific component coverage (engine, transmission)

                        </li>
                        <li>
                            Roadside assistance and breakdown cover
                        </li>

                    </ul>
                    <p className='flex items-center gap-2'><CustomCheckGreen />Broader coverage beyond legal requirements
                    </p>
                    <p className='flex items-center gap-2'><CustomCross /> Terms and exclusions vary significantly</p>

                </div>

            </div>

            {/* External Warranty Providers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">

                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        External Warranty Providers
                    </p>
                    <p className="lg:text-lg font-medium">
                        Specialized companies offering mechanical breakdown coverage and roadside assistance beyond the manufacturer's warranty.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        {
                            ProvidersData?.map(item => (
                                <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                    <p className="lg:text-2xl font-medium">
                                        {item.title}
                                    </p>
                                    <p className="text-base ">
                                        {item.desc}
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
                                Covers breakdowns after manufacturer warranty ends, flexible plans, roadside assistance, replacement car, and wide garage access.
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
                                Comes with extra costs, either monthly or one-time. Some limits apply, as normal wear or certain parts may not be covered.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className='w-full' src={ImageProvider.warrenty3} alt="" />
                </div>

            </div>
        </div>
    );
};

export default CarwarrantiesKeypoints;