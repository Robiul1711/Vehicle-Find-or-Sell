import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, MessageCircle, Car, Wrench, Droplets, MoveUpRight } from 'lucide-react';
import { ImageProvider } from '@/utils/ImageProvider';
import profile from '@/assets/images/profile.png';
import { CustomAutoRepair, CustomCarWash, CustomNewVehicle, CustomRightUp, CustomUsedVehicle } from '@/utils/IconProvider';


const DealerSection = () => {
    const openingHours = [
        { day: 'Monday', hours: '9:00AM - 5:00PM' },
        { day: 'Tuesday', hours: '9:00AM - 5:00PM' },
        { day: 'Wednesday', hours: '9:00AM - 5:00PM' },
        { day: 'Thursday', hours: '9:00AM - 5:00PM' },
        { day: 'Friday', hours: '9:00AM - 5:00PM' },
        { day: 'Saturday', hours: 'Closed' },
        { day: 'Sunday', hours: 'Closed' }
    ];

    const services = [
        { name: 'Used Vehicle', icon: <CustomUsedVehicle /> },
        { name: 'New Vehicle', icon: <CustomNewVehicle /> },
        { name: 'Auto Repair', icon: <CustomAutoRepair /> },
        { name: 'Car Wash', icon: <CustomCarWash /> }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-10">


            <div className="bg-white relative lg:w-3/4 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header with geometric design */}
                <div className=" "
                >
                    {/* Geometric shapes */}
                    <div className="w-full h-full">
                        <img src={ImageProvider.profile} className='w-full' alt="" />
                    </div>
                </div>
                {/* Profile picture */}
                <div className=" -mt-10 lg:-mt-20 ">
                    <div className="w-20 h-20 lg:w-32 lg:h-32 ml-10 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                        <img
                            src={ImageProvider.profileImg}
                            alt="Katie Sims"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="p-6 pt-8">
                    {/* Dealer info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Katie Sims</h2>
                            <p className="text-gray-600 mb-4">Professional Seller</p>

                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span>2323 Dancing Dove Lane, Long Island City, NY 11101</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <span>(636) 296-7838</span>
                                </div>
                                <div className="text-xs space-y-1">
                                    <p><span className="font-semibold">SIREN Number:</span> 0123 456 789 00015</p>
                                    <p><span className="font-semibold">SIRET Number:</span> 123 456 789 00015</p>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-5 h-5 text-gray-700" />
                                <h3 className="font-semibold text-gray-900">Opening Hours</h3>
                            </div>
                            <div className="space-y-2">
                                {openingHours.map((schedule, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span className="text-gray-700">{schedule.day}</span>
                                        <span className={`font-medium ${schedule.hours === 'Closed'
                                            ? 'text-red-600'
                                            : 'text-gray-900'
                                            }`}>
                                            {schedule.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>


                    <div className="    ">


                        {/* Services */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {services.map((service, index) => {

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                                        >
                                            {service.icon}
                                            <span className="text-sm font-medium text-gray-700">
                                                {service.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/4">
                <div className="border shadow-lg rounded-xl p-5 flex flex-col gap-5">
                    <button className="flex w-full py-5 text-sm xlg:text-2xl items-center justify-center gap-2 bg-blue-100 text-custom-primary px-4 rounded-lg  font-medium border-2 border-custom-primary transition-colors ">Message Dealer <MoveUpRight />  </button>

                    <button className="flex w-full py-5 text-sm xlg:text-2xl items-center justify-center gap-2 bg-green-100 text-green-500 px-4 rounded-lg  font-medium border-2 border-custom-primary transition-colors ">Chat Via WhatsApp <MoveUpRight />  </button>
                </div>
            </div>
        </div>
    );
};

export default DealerSection;