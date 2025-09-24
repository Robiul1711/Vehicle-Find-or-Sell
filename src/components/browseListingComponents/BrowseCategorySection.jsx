import { CustomBike, CustomCar, CustomPart, CustomScoter, CustomTruck } from '@/utils/IconProvider';
import React, { useState } from 'react';
import CarListing from './CarListing';
import { bikeData, carData, partData, scooterData, truckData } from '@/utils/data';
import PartListing from './PartListing';

const BrowseCategorySection = () => {
    const [activeTab, setActiveTab] = useState('cars');

    // Define categories data
    const categories = [
        {
            id: 'cars',
            label: 'Car',
            icon: <CustomCar />,
            content: <CarListing items={carData} />
        },
        {
            id: 'trucks',
            label: 'Utility Trucks',
            icon: <CustomTruck />,
            content: <CarListing items={truckData} />
        },
        {
            id: 'motorcycle',
            label: 'Motorcycle',
            icon: <CustomBike />,
            content: <CarListing items={bikeData} />
        },
        {
            id: 'scooter',
            label: 'Scooter',
            icon: <CustomScoter />,
            content: <CarListing items={scooterData} />
        },
        {
            id: 'parts',
            label: 'Parts',
            icon: <CustomPart />,
            content: <PartListing items={partData} />
        }
    ];

    // Get active category content
    const getActiveContent = () => {
        const activeCategory = categories.find(cat => cat.id === activeTab);
        return activeCategory ? activeCategory.content : '';
    };

    return (
        <div className="
        ">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Browse Categories</h2>

            {/* Custom Tab Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 mb-8 pb-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`
                            flex flex-col items-center justify-center gap-3 p-6 
                            rounded-xl border-2 transition-all duration-200 
                            flex-shrink-0
                            ${activeTab === category.id
                                ? 'border-orange-400 bg-orange-50 shadow-md'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                            }
                        `}
                    >
                        <span className="text-2xl text-gray-500">{category.icon}</span>
                        <span className={` lg:text-2xl font-medium text-center ${activeTab === category.id ? 'text-orange-700' : 'text-gray-700'
                            }`}>
                            {category.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 min-h-[300px]">

                <div className="leading-relaxed">
                    {getActiveContent()}
                </div>


            </div>


        </div>
    );
};

export default BrowseCategorySection;