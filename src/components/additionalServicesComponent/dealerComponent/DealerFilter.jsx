import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const DealerFilter = () => {
    // State for all filter options
    const [filters, setFilters] = useState({
        location: {
            region: ""
        },
        categories: {
            cars: true,
            utilityTrucks: false,
            motorcycles: false,
            scooters: false,
            spareParts: false
        },
        services: {
            newVehicles: true,
            usedVehicles: false,
            registrationService: true,
            autoRepair: true,
            partsAccessories: false,
            delivery: false,
            financing: false
        },
        dealerType: {
            professionalSeller: true,
            personalSeller: false
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
    const handleServiceChange = (service) => {
        setFilters(prev => ({
            ...prev,
            services: {
                ...prev.services,
                [service]: !prev.services[service]
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
        setFilters({
            location: {
                region: ""
            },
            categories: {
                cars: false,
                utilityTrucks: false,
                motorcycles: false,
                scooters: false,
                spareParts: false
            },
            services: {
                newVehicles: false,
                usedVehicles: false,
                registrationService: false,
                autoRepair: false,
                partsAccessories: false,
                delivery: false,
                financing: false
            },
            dealerType: {
                professionalSeller: false,
                personalSeller: false
            }
        });
    };

    // Apply filters (API call would go here)
    const applyFilters = () => {
        console.log("Applying filters:", filters);
        // API call logic here
        // Example: await api.filterResults(filters);
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
                            <option value="dhaka">Dhaka</option>
                            <option value="chittagong">Chittagong</option>
                            <option value="sylhet">Sylhet</option>
                            <option value="rajshahi">Rajshahi</option>
                            <option value="khulna">Khulna</option>
                            <option value="barisal">Barisal</option>
                            <option value="rangpur">Rangpur</option>
                            <option value="mymensingh">Mymensingh</option>
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
                                checked={filters.categories.cars}
                                onChange={() => handleCategoryChange('cars')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Cars</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.utilityTrucks}
                                onChange={() => handleCategoryChange('utilityTrucks')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Utility Trucks</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.motorcycles}
                                onChange={() => handleCategoryChange('motorcycles')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Motorcycles</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.scooters}
                                onChange={() => handleCategoryChange('scooters')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Scooters</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.categories.spareParts}
                                onChange={() => handleCategoryChange('spareParts')}
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
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.services.newVehicles}
                                onChange={() => handleServiceChange('newVehicles')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">New Vehicles</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.services.usedVehicles}
                                onChange={() => handleServiceChange('usedVehicles')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Used Vehicles</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.services.registrationService}
                                onChange={() => handleServiceChange('registrationService')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Registration Service</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.services.autoRepair}
                                onChange={() => handleServiceChange('autoRepair')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Auto Repair</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.services.partsAccessories}
                                onChange={() => handleServiceChange('partsAccessories')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Parts & Accessories</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.services.delivery}
                                onChange={() => handleServiceChange('delivery')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Delivery</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.services.financing}
                                onChange={() => handleServiceChange('financing')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Financing</span>
                        </label>
                    </div>
                </div>

                {/* Dealer Type Section */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Dealer Type</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.dealerType.professionalSeller}
                                onChange={() => handleDealerTypeChange('professionalSeller')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Professional Seller</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.dealerType.personalSeller}
                                onChange={() => handleDealerTypeChange('personalSeller')}
                                className="w-4 h-4 text-custom-primary bg-gray-100 border-gray-300 rounded focus:ring-custom-primary focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">Personal Seller</span>
                        </label>
                    </div>
                </div>
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