import { CustomBuyers, CustomCheck, CustomFaster, CustomProfessional, CustomProtection, CustomRightUp, CustomStandout, CustomValue } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';
import { TbArrowWaveRightUp } from 'react-icons/tb';

const InsuranceData = [
    {
        id: 1,
        icon: <CustomBuyers />,
        title: "Attract More Buyers",
        desc: "Professional presentation draws in serious buyers who are ready to purchase."
    },
    {
        id: 2,
        icon: <CustomStandout />,
        title: "Stand Out",
        desc: "Differentiate your listing from standard ads with premium visual content."
    },
    {
        id: 3,
        icon: <CustomFaster />,
        title: "Sell Faster",
        desc: "Complete virtual visits help buyers make quicker decisions, speeding up sales."
    },
    {
        id: 4,
        icon: <CustomValue />,
        title: "Increase Value",
        desc: "Well-presented cars are less likely to be negotiated down, preserving value."
    }
]

const VirtualShowroomKeyPoints = () => {
    return (
        <div className='space-y-10 mx-auto'>
            {/* HD Professional Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">

                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        HD Professional Photos
                    </p>
                    <p className="lg:text-xl">
                        Capture every detail with high-resolution images
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> High-resolution pictures taken from the best angles.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Highlight key details like interior, equipment, and body condition.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Gives a professional look to your listing.
                        </p>
                        <p className=" flex items-center gap-2 lg:text-xl">
                            Ads with HD photos get up to 3x more contacts than standard listings.
                        </p>
                    </div>

                </div>
                <div className="">
                    <img src={ImageProvider.showroom1} alt="" />
                </div>
            </div>

            {/* 360° Immersive Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
                <div className="">
                    <img src={ImageProvider.showroom2} alt="" />
                </div>
                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        360° Immersive Videos
                    </p>
                    <p className="lg:text-xl">
                        Explore every angle of the car virtually.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Buyers can rotate and zoom to inspect every part of the vehicle.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Total transparency builds trust and aids decision-making.
                        </p>

                    </div>

                </div>

            </div>


            {/* Virtual Showroom */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">

                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Virtual Showroom
                    </p>
                    <p className="lg:text-xl">
                        Present your car in a premium online space.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Combines HD photos, 360° videos, and technical sheets.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Offers an immersive, interactive online visit.
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Makes your listing look professional, like a major dealership.
                        </p>

                    </div>

                </div>

                <div className="">
                    <img src={ImageProvider.showroom3} alt="" />
                </div>

            </div>

            {/* Sale Advantages */}
            <div className=" mx-auto">
                <div className="space-y-4 lg:space-y-5">
                    <p className="lg:text-3xl font-bold">
                        Sale Advantages
                    </p>
                    <p className="lg:text-xl">
                        Boost your chances to sell faster and smarter.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        {
                            InsuranceData?.map(item => (
                                <div className="bg-gray-100 rounded p-5  space-y-4">
                                    <div className="w-12 h-12 font-semibold bg-custom-primary text-white  rounded flex items-center justify-center mr-4">
                                        {item?.icon}
                                    </div>

                                    <p className="lg:text-2xl font-medium">
                                        {item?.title}
                                    </p>
                                    <p>
                                        {item?.desc}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

            {/* Maximize Your Listing Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">

                <div className="space-y-4">
                    <p className="lg:text-3xl font-bold">
                        Maximize Your Listing Impact
                    </p>
                    <p className="lg:text-xl">
                        Turn your car ad into a professional showroom experience.
                    </p>
                    <div className="space-y-3">
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> HD photos for maximum visual impact
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> 360° videos for complete transparency
                        </p>
                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Virtual showroom experience
                        </p>

                        <p className=" flex items-center gap-2">
                            <CustomCheck /> Professional presentation that sells
                        </p>

                    </div>
                    <p className="lg:text-xl">
                        Thanks to HD photos, 360° videos, and virtual showrooms, your listings gain strong visual impact, reassure buyers, and maximize selling potential.
                    </p>

                    <button className='bg-custom-primary text-white py-4 font-semibold px-4 rounded flex items-center gap-2 '>Showcase Your Ad Now <CustomRightUp /></button>

                </div>

                <div className="">
                    <img src={ImageProvider.showroom4} alt="" />
                </div>

            </div>
        </div>
    );
};

export default VirtualShowroomKeyPoints;