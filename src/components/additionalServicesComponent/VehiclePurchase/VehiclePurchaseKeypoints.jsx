import { CustomAdvantage, CustomDisadvantage } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const VehiclePurchaseKeypoints = () => {
    return (
        <div className='lg:space-y-20'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Cash Purchase
                    </p>
                    <p className="lg:text-xl">
                        Own your vehicle immediately without financing.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomAdvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Advantage
                            </p>
                            <ul className='list-disc pl-4 '>
                                <li>Immediate ownership of the vehicle</li>
                                <li>No monthly payments or interest</li>
                                <li>Easier negotiation with the seller</li>
                            </ul>
                        </div>
                        <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDisadvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Disadvantage
                            </p>
                            <ul className='list-disc pl-4 '>
                                <li>Large use of personal savings</li>
                                <li>Less flexibility for frequent vehicle changes</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className='w-full' src={ImageProvider.purchase1} alt="" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
                <div className="">
                    <img className='w-full' src={ImageProvider.purchase2} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        Auto Loan
                    </p>
                    <p className="lg:text-xl">
                        Finance your vehicle with monthly installments.
                    </p>
                    <div className="">
                        <p className="lg:text-2xl font-medium">
                            Features
                        </p>
                        <ul className='list-disc pl-4 '>
                            <li>Repayment: 12–84 months.</li>
                            <li>Fixed or variable rates.</li>
                            <li>Immediate ownership of the vehicle.</li>
                        </ul>
                    </div>

                    <div className="">
                        <p className="lg:text-2xl font-medium mb-3">
                            Organizations
                        </p>
                        <ul className='flex flex-wrap gap-5 '>
                            <li className='bg-gray-100 p-2 rounded-full'>Cetelem</li>
                            <li className='bg-gray-100 p-2 rounded-full'>Cofidis</li>
                            <li className='bg-gray-100 p-2 rounded-full'>Sofinco</li>
                            <li className='bg-gray-100 p-2 rounded-full'>BNP Paribas</li>
                            <li className='bg-gray-100 p-2 rounded-full'>Crédit Agricole</li>
                            <li className='bg-gray-100 p-2 rounded-full'>Société Générale</li>
                            <li className='bg-gray-100 p-2 rounded-full'>CIC</li>

                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomAdvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Advantage
                            </p>
                            <ul className='list-disc pl-4 '>
                                <li>Become the owner while paying in installments.</li>
                                <li>Flexible duration and payments tailored to budget.</li>
                            </ul>
                        </div>
                        <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDisadvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Disadvantage
                            </p>
                            <ul className='list-disc pl-4 '>
                                <li>Higher total cost due to interest.</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">

                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        LOA: Lease with Option to Buy
                    </p>
                    <p className="lg:text-xl">
                        Rent first, purchase later if desired.
                    </p>
                    <div className="">
                        <p className="lg:text-2xl font-medium">
                            Features
                        </p>
                        <ul className='list-disc pl-4 '>
                            <li>Fixed monthly payments.</li>
                            <li>Possible initial down payment.</li>
                            <li>Purchase option at contract end.</li>
                        </ul>
                    </div>

                    <div className="">
                        <p className="lg:text-2xl font-medium mb-3">
                            Organizations
                        </p>
                        <ul className='flex flex-wrap gap-5 '>
                            <li className='bg-gray-100 p-2 rounded-full'>
                                Crédit Agricole Auto
                            </li>
                            <li className='bg-gray-100 p-2 rounded-full'>
                                BNP Paribas Personal Finance
                            </li>
                            <li className='bg-gray-100 p-2 rounded-full'>
                                Renault DIAC
                            </li>
                            <li className='bg-gray-100 p-2 rounded-full'>
                                PSA Finance
                            </li>
                            <li className='bg-gray-100 p-2 rounded-full'>
                                Volkswagen Financial Services
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomAdvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Advantage
                            </p>
                            <ul className='list-disc pl-4 '>
                                <li>Access to new/recent cars with controlled budget.</li>
                                <li>Change vehicles regularly.</li>
                            </ul>
                        </div>
                        <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDisadvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Disadvantage
                            </p>
                            <ul className='list-disc pl-4 '>
                                <li>Ownership only if purchase option exercised.</li>
                                <li>Mileage limits and excess fees.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className='w-full' src={ImageProvider.purchase3} alt="" />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
                <div className="">
                    <img className='w-full' src={ImageProvider.purchase2} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-10">
                    <p className="lg:text-3xl font-bold">
                        LLD: Long-Term Rental
                    </p>
                    <p className="lg:text-xl">
                        Rent the car without an option to buy.
                    </p>
                    <div className="">
                        <p className="lg:text-2xl font-medium">
                            Features
                        </p>
                        <ul className='list-disc pl-4 '>
                            <li>Duration: 2–5 years.</li>
                            <li>Payments may include maintenance, insurance, assistance.</li>
                            <li>Vehicle returned at contract end.</li>
                        </ul>
                    </div>

                    <div className="">
                        <p className="lg:text-2xl font-medium mb-3">
                            Organizations
                        </p>
                        <ul className='flex flex-wrap gap-5 '>
                            <li className='bg-gray-100 p-2 rounded-full'>ALD Automotive</li>
                            <li className='bg-gray-100 p-2 rounded-full'>Arval (BNP Paribas Group)</li>
                            <li className='bg-gray-100 p-2 rounded-full'>LeasePlan</li>
                            <li className='bg-gray-100 p-2 rounded-full'>Peugeot</li>
                            <li className='bg-gray-100 p-2 rounded-full'>BMW</li>
                            <li className='bg-gray-100 p-2 rounded-full'>Mercedes</li>

                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomAdvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Advantage
                            </p>
                            <ul className='list-disc pl-4 '>
                                <li>Become the owner while paying in installments.</li>
                                <li>Flexible duration and payments tailored to budget.</li>
                            </ul>
                        </div>
                        <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                            <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                                <CustomDisadvantage />
                            </div>

                            <p className="lg:text-2xl font-medium">
                                Disadvantage
                            </p>
                            <ul className='list-disc pl-4 '>
                                <li>Higher total cost due to interest.</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VehiclePurchaseKeypoints;