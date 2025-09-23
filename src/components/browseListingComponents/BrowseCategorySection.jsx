import React, { useState } from 'react';

const BrowseCategorySection = () => {
    const [activeTab, setActiveTab] = useState('cars');

    // Define categories data
    const categories = [
        {
            id: 'cars',
            label: 'Car',
            icon: '🚗',
            content: <p className='text-5xl'>Hello</p>
        },
        {
            id: 'trucks',
            label: 'Utility Trucks',
            icon: '🚚',
            content: 'Utility truck listings and content will be displayed here. Commercial vehicles and work trucks.'
        },
        {
            id: 'motorcycle',
            label: 'Motorcycle',
            icon: '🏍️',
            content: 'Motorcycle listings and content will be displayed here. Sports bikes, cruisers, and touring bikes.'
        },
        {
            id: 'scooter',
            label: 'Scooter',
            icon: '🛵',
            content: 'Scooter listings and content will be displayed here. Electric and gas scooters for city commuting.'
        },
        {
            id: 'parts',
            label: 'Parts',
            icon: '🔧',
            content: 'Auto parts and accessories will be displayed here. Engine parts, body parts, and accessories.'
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
            <div className="grid grid-cols-5 gap-4 mb-8 pb-2">
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
                        <span className="text-2xl">{category.icon}</span>
                        <span className={`text-sm font-medium text-center ${activeTab === category.id ? 'text-orange-700' : 'text-gray-700'
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