import React, { useState } from 'react';
import { MessageCircle, MoveUpRight, Plus, X } from 'lucide-react';
import { ImageProvider } from '@/utils/ImageProvider';
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';

const ProductComparison = () => {
    // Dummy product data
    const availableProducts = [
        {
            id: 1,
            name: "BMW X3 M Sport",
            image: ImageProvider.compare1,
            basicDetails: {
                brand: "BMW",
                model: "BMW X5",
                bodyType: "Sedan",
                price: "$ 25,00,000",
                mileage: "25,000",
                fuelType: "Diesel",
                engineSize: "3.0 L Diesel",
                transmission: "Automatic",
                color: "Black",
                doors: "4",
                yearOfManufacture: "15/03/2021",
                condition: "Used",
                co2Emissions: "e.g. 120 g/km",
                airCriteria: "e.g. Euro 6 / CRI Air 2",
                warrantyDuration: "e.g. 24 months / 2 years",
                previousOwners: "5"
            },
            features: {
                exterior: ["4-wheel steering", "4 wheel drive", "Tinted Windows", "Automatic differential lock", "Coupling"],
                interior: ["Leather Seats", "Touchscreen Display", "Air Conditioning / Climate Control", "Power Windows", "Steering Wheel Controls"],
                security: ["2 airbags", "3 rear 3-point seat belts", "3rd brake light", "4 airbags", "6 airbags"],
                comfort: ["Keyless entry system", "Bluetooth", "Wheel cockpit", "Cruise Control", "Keyless Entry / Push Start"]
            },
            engineSpecs: {
                fuelTankCapacity: "65 L",
                maxTowingWeightBraked: "800 kg",
                maxTowingWeightUnbraked: "1000 kg",
                maximumKilowatt: "1650 kg",
                turningCircle: "8.5 m"
            }
        },
        {
            id: 2,
            name: "Mercedes-Benz Sprinter 314 CDI",
            image: ImageProvider.compare2,
            basicDetails: {
                brand: "Toyota",
                model: "Hilux Utility Truck",
                bodyType: "Utility Truck",
                price: "528,500",
                mileage: "15,000 km",
                fuelType: "Diesel",
                engineSize: "2.4L",
                transmission: "6-Speed Manual",
                color: "Silver",
                loadCapacity: "1 TON",
                yearOfManufacture: "15/03/2021",
                condition: "Used",
                co2Emissions: "e.g. 120 g/km",
                airCriteria: "e.g. Euro 6 / CRI Air 2",
                warrantyDuration: "e.g. 24 months / 2 years",
                previousOwners: "5"
            },
            features: {
                exterior: ["Fog Lights", "4 wheel drive", "Alloy Wheels / Steel Rims", "Side Step & Roof Rails", "Cargo Bed with Tie-Down Hooks"],
                interior: ["Fabric or Leather Seats", "Adjustable Steering Wheel", "Engine Immobilizer", "Ample Storage Compartments", "Steering Wheel Controls"],
                security: ["Central Locking System", "Anti-lock Braking System (ABS)", "Engine Immobilizer", "Rear Parking Sensors / Camera", "Airbags (Driver & Passenger)"],
                comfort: ["Power Steering", "Bluetooth", "Power Windows", "Cruise Control", "Keyless Entry / Push Start"]
            },
            engineSpecs: {
                drivetrain: "4x2 or 4x4",
                torque: "1,600 - 2,800 rpm",
                fuelSystem: "Common Rail Direct Injection (CRDI)",
                horsepower: "140 hp @ 3,600 rpm",
                coolingSystem: "Water-cooled"
            }
        },
        {
            id: 3,
            name: "Audi A4 Premium",
            image: ImageProvider.compare3,
            basicDetails: {
                brand: "Audi",
                model: "A4 Premium",
                bodyType: "Sedan",
                price: "$ 18,50,000",
                mileage: "45,000",
                fuelType: "Petrol",
                engineSize: "2.0 L Turbo",
                transmission: "Automatic",
                color: "White",
                doors: "4",
                yearOfManufacture: "10/08/2020",
                condition: "Used",
                co2Emissions: "e.g. 140 g/km",
                airCriteria: "e.g. Euro 6 / CRI Air 2",
                warrantyDuration: "e.g. 36 months / 3 years",
                previousOwners: "2"
            },
            features: {
                exterior: ["LED Headlights", "Sunroof", "Alloy Wheels", "Rain Sensing Wipers", "Power Tailgate"],
                interior: ["Premium Leather", "Heated Seats", "Digital Cockpit", "Bang & Olufsen Sound", "Ambient Lighting"],
                security: ["8 airbags", "ESP", "ABS", "Hill Start Assist", "Parking Sensors"],
                comfort: ["Dual Zone AC", "Wireless Charging", "Apple CarPlay", "Navigation", "Voice Control"]
            },
            engineSpecs: {
                fuelTankCapacity: "58 L",
                maxTowingWeightBraked: "1800 kg",
                maxTowingWeightUnbraked: "750 kg",
                maximumKilowatt: "190 hp",
                turningCircle: "11.6 m"
            }
        }
    ];

    const [selectedProducts, setSelectedProducts] = useState([
        availableProducts[0],
        availableProducts[1]
    ]);
    const [showProductSelector, setShowProductSelector] = useState(false);

    const addProduct = (product) => {
        if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
            setSelectedProducts([...selectedProducts, product]);
        }
        setShowProductSelector(false);
    };

    const removeProduct = (productId) => {
        setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    };

    const ProductCard = ({ product, isCompact = false }) => {

        console.log(product);

        return (
            <div className="bg-white rounded-lg shadow-sm">
                {/* Product Image */}
                <div className="h-80 bg-cover bg-center relative rounded-t-lg overflow-hidden">

                    <img src={product.image} className='object-cover w-full h-full' alt="" />
                </div>

                {/* Product Title */}
                <div className="p-6 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                </div>

                {/* Basic Details */}
                <div className="px-6 pb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">Basic Details</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Brand</span>
                                <span className="text-gray-900 font-medium">{product.basicDetails.brand}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Body Type</span>
                                <span className="text-gray-900">{product.basicDetails.bodyType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Mileage (km)</span>
                                <span className="text-gray-900">{product.basicDetails.mileage}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Engine Size/Type</span>
                                <span className="text-gray-900">{product.basicDetails.engineSize}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Color</span>
                                <span className="text-gray-900">{product.basicDetails.color}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Year of Manufacture</span>
                                <span className="text-gray-900">{product.basicDetails.yearOfManufacture}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">CO₂ Emissions (g/km)</span>
                                <span className="text-gray-900">{product.basicDetails.co2Emissions}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Warranty Duration</span>
                                <span className="text-gray-900">{product.basicDetails.warrantyDuration}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Model</span>
                                <span className="text-gray-900">{product.basicDetails.model}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{product.basicDetails.price.includes('$') ? 'Price' : 'Price'}</span>
                                <span className="text-gray-900 font-medium">{product.basicDetails.price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Fuel Type</span>
                                <span className="text-gray-900">{product.basicDetails.fuelType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Transmission</span>
                                <span className="text-gray-900">{product.basicDetails.transmission}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{product.basicDetails.doors ? 'Door' : 'Load Capacity'}</span>
                                <span className="text-gray-900">{product.basicDetails.doors || product.basicDetails.loadCapacity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Condition</span>
                                <span className="text-gray-900">{product.basicDetails.condition}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Air Criteria / Emission Standard</span>
                                <span className="text-gray-900">{product.basicDetails.airCriteria}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Number of Previous Owners</span>
                                <span className="text-gray-900">{product.basicDetails.previousOwners}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="px-6 pb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">Features</h3>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Exterior Features</h4>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    {product.features.exterior.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Security</h4>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    {product.features.security.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Interior Features</h4>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    {product.features.interior.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Comfort & Convenience</h4>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    {product.features.comfort.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Engine & Transmission Specs */}
                <div className="px-6 pb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">Engine & Transmission Specs</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <div className="space-y-2">
                            {Object.entries(product.engineSpecs).slice(0, Math.ceil(Object.keys(product.engineSpecs).length / 2)).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <span className="text-gray-900">{value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            {Object.entries(product.engineSpecs).slice(Math.ceil(Object.keys(product.engineSpecs).length / 2)).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <span className="text-gray-900">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 flex gap-3">

                    <button className="flex w-full py-5 items-center justify-center gap-2 bg-blue-100 text-custom-primary px-4 rounded-lg  font-medium border-2 border-custom-primary transition-colors ">Message Dealer <MoveUpRight />  </button>

                    <button className="flex w-full py-5 items-center justify-center gap-2 bg-green-100 text-green-500 px-4 rounded-lg  font-medium border-2 border-custom-primary transition-colors ">Chat Via WhatsApp <MoveUpRight />  </button>

                </div>
            </div>
        )
    }
        ;

    return (
        <div className="">
            <div className='section-padding-y section-padding-x flex flex-col gap-5 lg:gap-10'>
                {/* Header */}
                <div className="mb-8 ">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Comparison</h1>
                    <p className="text-gray-600">Find and select products to see the differences and similarities between them</p>
                </div>

                {/* Product Selection Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
                    {selectedProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm border">
                            <div className="p-4 bg-gray-100 rounded-t-lg flex items-center justify-between">
                                <span className="text-gray-700 font-medium text-sm">{product.name}</span>
                                <button
                                    onClick={() => removeProduct(product.id)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {selectedProducts.length < 3 && (
                        <div className="bg-custom-primary rounded-lg shadow-sm border cursor-pointer hover:bg-blue-800">
                            <div
                                className="p-4 flex items-center justify-center text-white rounded-lg"
                                onClick={() => setShowProductSelector(true)}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                <span className="font-medium text-sm">Add a vehicle</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Product Selector Modal */}
                {showProductSelector && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                            <h3 className="text-lg font-semibold mb-4">Select a Product</h3>
                            <div className="space-y-3">
                                {availableProducts
                                    .filter(product => !selectedProducts.find(p => p.id === product.id))
                                    .map((product) => (
                                        <button
                                            key={product.id}
                                            onClick={() => addProduct(product)}
                                            className="w-full text-left p-3 border rounded hover:bg-gray-50"
                                        >
                                            {product.name}
                                        </button>
                                    ))
                                }
                            </div>
                            <button
                                onClick={() => setShowProductSelector(false)}
                                className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Comparison Content */}
                <div className={`grid gap-8 ${selectedProducts.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : selectedProducts.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}`}>
                    {selectedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductComparison;