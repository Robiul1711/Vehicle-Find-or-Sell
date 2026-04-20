import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useApiQuery } from "@/hooks/useApiQuery";

const DealerFilter = ({ onApplyFilters }) => {
        const { data:serviceList, isLoading } = useApiQuery({
          queryKey: ["service-list"],
          url: "/core/service-list/",
          secure: true,
        });
          const { data:citiesData } = useApiQuery({
    queryKey: ["cities-list"],
    url: "/delears/cities/",
    secure: true,
  });
    // console.log(citiesData?.cities)
    // State for all filter options
    const [filters, setFilters] = useState({
        location: {
            region: ""
        },
        categories: {
            car: false,
            truck: false,
            motorcycle: false,
            scooter: false,
            parts: false
        },
        services: {},
        dealerType: {
            professional: false,
            personal: false
        }
    });

    // Handle category checkbox changes
    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            categories: {
                ...prev.categories,
                [category]: !prev.categories[category]
            }
        }));
    };

    // Handle service checkbox changes
    const handleServiceChange = (serviceId) => {
        setFilters(prev => ({
            ...prev,
            services: {
                ...prev.services,
                [serviceId]: !prev.services[serviceId]
            }
        }));
    };

    // Handle dealer type checkbox changes
    const handleDealerTypeChange = (type) => {
        setFilters(prev => ({
            ...prev,
            dealerType: {
                ...prev.dealerType,
                [type]: !prev.dealerType[type]
            }
        }));
    };

    // Handle region selection
    const handleRegionChange = (e) => {
        setFilters(prev => ({
            ...prev,
            location: {
                ...prev.location,
                region: e.target.value
            }
        }));
    };

    // Clear all filters
    const clearAllFilters = () => {
        const resetFilters = {
            location: {
                region: ""
            },
            categories: {
                car: false,
                truck: false,
                motorcycle: false,
                scooter: false,
                parts: false
            },
            services: {},
            dealerType: {
                professional: false,
                personal: false
            }
        };
        setFilters(resetFilters);
        if (onApplyFilters) {
            onApplyFilters(resetFilters);
        }
    };

    // Apply filters (API call would go here)
    const applyFilters = () => {
        // console.log("Applying filters:", filters);
        if (onApplyFilters) {
            onApplyFilters(filters);
        }
    };

    return (
        <div className=" bg-white border-r border-gray-200 h-screen overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="font-semibold">Filters</span>
                    </div>
                    <button 
                        onClick={clearAllFilters}
                        className="text-sm text-custom-primary"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Location Section */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Region</label>
                        <select 
                            value={filters.location.region}
                            onChange={handleRegionChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-custom-primary"
                        >
                            <option value="">Select Region</option>
                            {citiesData?.cities?.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Categories Section */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.car}
                                onChange={() => handleCategoryChange('car')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Cars</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.truck}
                                onChange={() => handleCategoryChange('truck')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Utility Trucks</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.motorcycle}
                                onChange={() => handleCategoryChange('motorcycle')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Motorcycles</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.scooter}
                                onChange={() => handleCategoryChange('scooter')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Scooters</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.parts}
                                onChange={() => handleCategoryChange('parts')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Spare Parts</span>
                        </label>
                    </div>
                </div>

                {/* Services Section */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
                    <div className="space-y-2">
                        {
                            serviceList?.data?.map((service) => (
                                <label key={service?.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={!!filters.services[service?.id]}
                                onChange={() => handleServiceChange(service?.id)}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">{service?.name}</span>
                        </label>
                            ))
                        }
  
                    </div>
                </div>

                {/* Dealer Type Section */}
                {/* <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Dealer Type</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.dealerType.professional}
                                onChange={() => handleDealerTypeChange('professional')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Professional Seller</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.dealerType.personal}
                                onChange={() => handleDealerTypeChange('personal')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Personal Seller</span>
                        </label>
                    </div>
                </div> */}
            </div>

            {/* Apply Filter Button */}
            <div className="p-4 border-t border-gray-200 mt-auto">
                <button
                    onClick={applyFilters}
                    className="w-full bg-custom-primary text-white py-3 px-4 rounded-md font-medium hover:bg-custom-primary transition-colors focus:outline-none focus:ring-2 focus:ring-custom-primary focus:ring-offset-2"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

export default DealerFilter;