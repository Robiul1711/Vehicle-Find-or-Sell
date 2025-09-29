import { CustomCheck, CustomCheck2, CustomPrivateSeller, CustomVerified } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const VehicleValuationKeypoints = () => {
    return (
        <div className='space-y-10 lg:space-y-20 mx-auto'>
            {/* Practical Warranty Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Practical Warranty Tips
                    </p>
                    <p className="lg:text-xl">
                        Check terms, transfer options, exclusions, and compare providers before committing.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Model and engine type: Popular versions may command higher prices.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Equipment and options: GPS, leather seats, sunroof, etc.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Vehicle history: Service records, invoices, previous owners.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Recent expenses: Clutch, suspension, timing belt, tires replaced.
                        </p>

                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Upcoming expenses: Imminent maintenance can reduce value.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> General condition: Bodywork, mechanics, interior quality.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Current market: Supply and demand impact price.
                        </p>
                    </div>

                </div>
                <div className="">
                    <img src={ImageProvider.valuation1} alt="" />
                </div>
            </div>

            {/* Private vs Professional Sellers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="">
                    <img className='w-full' src={ImageProvider.valuation2} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Private vs Professional Sellers
                    </p>
                    <p className="lg:text-xl">
                        Understand how seller type impacts car valuation.
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomVerified />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Professionals Sellers
                            </p>
                            <p className="text-base">
                                A professional sells a car including margin, warranty, preparation, and sometimes financing. This means the trade-in value will be lower, and the resale price higher
                            </p>


                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomPrivateSeller />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Private Sellers
                            </p>
                            <p className="text-base">
                                A private seller can offer a more attractive price but usually without warranty or preparation
                            </p>

                        </div>

                    </div>
                </div>

            </div>

            {/* Online Valuation Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Online Valuation Platforms
                    </p>
                    <p className="lg:text-xl">
                        Quick estimates, but handle with care.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Based on market averages and databases.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> May not include recent maintenance or repairs.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Don’t always reflect local demand or market specifics.
                        </p>
                    </div>

                </div>
                <div className="">
                    <img src={ImageProvider.valuation3} alt="" />
                </div>
            </div>

            {/*  How to Refine Your Car's Value */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
                <div className="">
                    <img className='w-full' src={ImageProvider.valuation4} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        How to Refine Your Car's Value
                    </p>
                    <p className="lg:text-xl">
                        Compare, highlight history, and adjust for condition.
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">

                            <p className="lg:text-2xl font-medium">
                                Private Sellers
                            </p>
                            <p className=" flex items-center gap-2">
                                <CustomCheck2 /> Compare similar market listings (model, year, mileage, equipment)
                            </p>
                            <p className=" flex items-center gap-2">
                                <CustomCheck2 /> Highlight vehicle history & recent repairs
                            </p>
                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">

                            <p className="lg:text-2xl font-medium">
                                Private Sellers
                            </p>
                            <p className=" flex items-center gap-2">
                                <CustomCheck2 /> Disclose upcoming maintenance to build trust
                            </p>
                            <p className=" flex items-center gap-2">
                                <CustomCheck2 /> Cross-check online estimates with actual condition
                            </p>
                        </div>



                    </div>
                </div>

            </div>


            {/* Maintenance and Valuation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">

                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Maintenance and Valuation
                    </p>
                    <p className="lg:text-xl">
                        How repairs and upcoming service affect price.
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">

                            <p className="lg:text-2xl font-medium">
                                A car with a recently replaced timing belt will be valued higher.
                            </p>

                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <p className="lg:text-2xl font-medium">
                                If the timing belt replacement is due soon, buyers may negotiate the price down.
                            </p>
                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <p className="lg:text-2xl font-medium">
                                Tires, brakes, clutch, and suspension also directly affect perceived value.
                            </p>
                        </div>




                    </div>
                </div>

                <div className="">
                    <img className='w-full' src={ImageProvider.valuation5} alt="" />
                </div>

            </div>


            {/* Vehicle Valuation Summary */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">

                <div className="">
                    <img className='w-full' src={ImageProvider.valuation6} alt="" />
                </div>

                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Vehicle Valuation Summary
                    </p>
                    <p className="lg:text-xl">
                        Key takeaways to accurately assess your car's worth.
                    </p>
                    <div className="grid grid-cols-1  gap-4">
                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">

                            <p className="lg:text-2xl font-medium">
                                Valuation tools give a baseline, but the real value must be adjusted for history, maintenance, and condition.
                            </p>

                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <p className="lg:text-2xl font-medium">
                                Well-maintained vehicles with invoices and recent repairs can sell above the average valuation.
                            </p>
                        </div>

                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <p className="lg:text-2xl font-medium">
                                Cars requiring major work will often sell below the average valuation.
                            </p>
                        </div>


                        <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                            <p className="lg:text-2xl font-medium">
                                Remember: a car’s value differs depending on whether it is sold to a professional or a private buyer.
                            </p>
                        </div>


                    </div>
                </div>



            </div>

        </div>
    );
};

export default VehicleValuationKeypoints;