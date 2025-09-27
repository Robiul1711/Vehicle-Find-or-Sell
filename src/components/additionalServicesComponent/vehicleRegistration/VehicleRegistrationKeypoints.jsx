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


const VehicleRegistrationKeypoints = () => {
    return (
        <div className='lg:space-y-20 mx-auto'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="">
                    <img className='w-full' src={ImageProvider.registration1} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Services Available for Vehicle Registration
                    </p>
                    <p className="lg:text-xl">
                        Since prefecture counters closed, all procedures are done online
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDoc />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                ANTS (Official Government Platform)
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

                            <p className="lg:text-2xl font-medium">
                                SIV Authorized Professionals
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

                            <p className="lg:text-2xl font-medium">
                                Private authorized websites
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
                <div className="">
                    <img className='w-full' src={ImageProvider.registration2} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Buying from a Private Seller vs. a Professional
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
                                <p className="text-base ">
                                    Seller must provide: crossed-out and signed registration certificate, certificate of sale, valid technical inspection, and certificate of non-pledge.
                                </p>
                            </div>

                            <div className="flex  gap-1">
                                <div className="">
                                    <CustomCheck2 />
                                </div>
                                <p className="text-base ">
                                    Inspect the vehicle thoroughly before purchase
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
                                <p className="text-base ">
                                    The professional must complete a declaration of purchase (Cerfa 13751), recorded in the SIV.
                                </p>
                            </div>

                            <div className="flex  gap-1">
                                <div className="">
                                    <CustomCheck2 />
                                </div>
                                <p className="text-base ">
                                    Must prove authorization to sell the vehicle.
                                </p>
                            </div>

                            <div className="flex  gap-1">
                                <div className="">
                                    <CustomCheck2 />
                                </div>
                                <p className="text-base ">
                                    Often handles registration procedures for the buyer.
                                </p>
                            </div>



                        </div>


                    </div>

                    <div className="bg-custom-secondary  rounded p-5 text-white space-y-4">
                        <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                            <CustomWarning />
                        </div>

                        <p className="lg:text-2xl font-medium">
                            Buyer Warning
                        </p>
                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck2 />
                            </div>
                            <p className="text-base ">
                                Never buy a vehicle from a private seller if the registration certificate has already been crossed out in another buyer’s name (risk of fraud, unpaid checks, legal issues).
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck2 />
                            </div>
                            <p className="text-base ">
                                Beware of garages that have not declared the purchase in the SIV system.
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck2 />
                            </div>
                            <p className="text-base ">
                                Always verify that the person you pay is
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck2 />
                            </div>
                            <p className="text-base ">
                                The official owner listed on the registration certificate, or
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck2 />
                            </div>
                            <p className="text-base ">
                                A professional with a properly registered declaration of purchase.
                            </p>
                        </div>



                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">

                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Registration Costs
                    </p>
                    <p className="lg:text-xl">
                        The cost of a registration certificate depends on:
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                Regional tax, based on fiscal horsepower (CV) and regional rates.
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                Type of vehicle and fuel (possible discounts for eco-friendly vehicles).
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                CO2 tax and powerful vehicle tax.
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                Fixed management and delivery fees.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Practical Tips
                    </p>

                    <div className="grid grid-cols-1  gap-4">
                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                For imported vehicles, anticipate the time to obtain the quitus fiscal and, if necessary, the COC.
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                If you are not comfortable with online procedures, use an SIV-approved professional.
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                Make sure the seller is legally authorized to sell the vehicle.
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                Keep all documents (invoices, certificates, quitus, technical inspection).
                            </p>
                        </div>

                        <div className="flex  gap-1">
                            <div className="">
                                <CustomCheck />
                            </div>
                            <p className="text-base ">
                                Always request a recent certificate of non-pledge.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div >
                <p className="lg:text-3xl font-bold mb-5">
                    In Summary
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10  ">
                    {
                        SummaryData?.map(item => (
                            <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                    {item?.icon}
                                </div>

                                <p className="lg:text-2xl font-medium">
                                    {item?.title}
                                </p>

                                <p className="text-base">
                                    {item?.desc}
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