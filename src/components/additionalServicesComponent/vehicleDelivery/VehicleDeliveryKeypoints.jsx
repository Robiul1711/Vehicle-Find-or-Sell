import { CustomAdvantage, CustomCheck, CustomDisadvantage } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const VehicleDeliveryKeypoints = () => {
    return (
        <div className='lg:space-y-20 mx-auto'>

            {/* Delivery Services by Professionals */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Delivery Services by Professionals
                    </p>
                    <p className="lg:text-xl">
                        Get your car delivered directly by the selling garage or dealership.
                    </p>

                    <div className="space-y-5">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Delivery to your home or workplace.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Vehicle cleaned and checked before handover.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Personalized assistance at key handover.
                        </p>

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
                                Direct follow-up from the seller who knows the vehicle.
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
                                Usually limited to certain areas.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className='w-full' src={ImageProvider.delivery1} alt="" />
                </div>
            </div>

            {/* Driver Delivery (Jockey System) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Driver Delivery (Jockey System)
                    </p>
                    <p className="lg:text-xl">
                        A professional driver delivers the car directly to your address.
                    </p>

                    <div className="space-y-5">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Fast and flexible solution.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Works for national and cross-border delivery.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Must check insurance coverage for the driver.
                        </p>

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
                                Often cheaper than truck transport.
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
                                Adds mileage and wear on the vehicle
                            </p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className='w-full' src={ImageProvider.delivery1} alt="" />
                </div>
            </div>
        </div>
    );
};

export default VehicleDeliveryKeypoints;