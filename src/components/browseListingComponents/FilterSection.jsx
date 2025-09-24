import React, { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { CustomFilter } from "@/utils/IconProvider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FilterSection = () => {

    const [destination, setDestination] = useState("");
    const [priceRange, setPriceRange] = useState([0, 900]);
    const [duration, setDuration] = useState([0, 21]);
    const [startDate, setStartDate] = useState("12/12/2025");
    const [difficulty, setDifficulty] = useState([]);
    const [experience, setExperience] = useState([]);

    // dropdown states
    const [openSection, setOpenSection] = useState({
        destination: true,
        price: true,
        duration: true,
        startDate: true,
        difficulty: true,
        experience: true,
    });

    const toggleSection = (key) => {
        setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleDifficultyChange = (level) => {
        setDifficulty((prev) =>
            prev.includes(level)
                ? prev.filter((item) => item !== level)
                : [...prev, level]
        );
    };

    const handleExperienceChange = (type) => {
        setExperience((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type]
        );
    };

    return (
        <div className="  p-4  space-y-4 ">
            <div className="flex justify-between">
                <p className="font-semibold flex gap-2"><CustomFilter />Filters</p>
                <button className="">Clear All</button>
            </div>
            {/* Destination */}


            {/* Price Range */}
            <div>
                <button
                    type="button"
                    onClick={() => toggleSection("price")}
                    className="flex justify-between w-full font-semibold text-black mb-2"
                >
                    Price Range
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${openSection.price ? "rotate-180" : ""
                            }`}
                    />
                </button>
                {openSection.price && (
                    <div className="flex items-center gap-2">
                        <div className="">
                            <label htmlFor="">Min Price (€)</label>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                className=" border  rounded-lg px-2 py-3 text-sm"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="">Max Price (€)</label>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                className=" border rounded-lg px-2 py-3 text-sm"
                            />
                        </div>

                    </div>
                )}
            </div>

            {/* Duration */}
            <div>
                <button
                    type="button"
                    onClick={() => toggleSection("duration")}
                    className="flex justify-between w-full font-semibold text-black mb-2"
                >
                    Specifications
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${openSection.duration ? "rotate-180" : ""
                            }`}
                    />
                </button>
                {openSection.duration && (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-medium">Body Type</label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a body type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-medium">Brand</label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-medium">Model</label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a model" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-medium">Fuel Type</label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a fuel type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-medium">Transmission</label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a transmission type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="">
                            <label htmlFor="" className="font-medium">Mileage Range</label>
                            <div className="flex items-center gap-2">
                                <div className="">
                                    <label htmlFor="">Min Mileage (km) </label>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                        className=" border  rounded-lg px-2 py-3 text-sm"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Max Mileage (km)</label>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                        className=" border rounded-lg px-2 py-3 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="" className="font-medium">Year Range</label>
                            <div className="flex items-center gap-2">
                                <div className="">
                                    <label htmlFor="">Min Year </label>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                        className=" border  rounded-lg px-2 py-3 text-sm"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Max Year</label>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                        className=" border rounded-lg px-2 py-3 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="" className="font-medium">Horsepower (CV)</label>
                            <div className="flex items-center gap-2">
                                <div className="">
                                    <label htmlFor="">Min </label>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                        className=" border  rounded-lg px-2 py-3 text-sm"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Max</label>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                        className=" border rounded-lg px-2 py-3 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="" className="font-medium">Horsepower (DIN)</label>
                            <div className="flex items-center gap-2">
                                <div className="">
                                    <label htmlFor="">Min </label>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                        className=" border  rounded-lg px-2 py-3 text-sm"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="">Max</label>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                        className=" border rounded-lg px-2 py-3 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="">Deductible VAT</label>
                            <div className=" flex items-center gap-2 p-3 rounded-[10px]">

                                <input
                                    type="radio"
                                    value={"Professionals Seller"}
                                />
                                <span className='text-sm lg:text-xl'>Yes</span>
                                <input
                                    type="radio"
                                    value={"Private Sellers"}
                                />
                                <span className='text-sm lg:text-xl'>No</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-semibold lg:text-lg">Location</p>
                            <label htmlFor="" className="font-medium">Country</label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
            </div>

            {/* Others */}
            <div>
                <button
                    type="button"
                    onClick={() => toggleSection("startDate")}
                    className="flex justify-between w-full font-semibold text-black text-lg mb-2"
                >
                    Others
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${openSection.startDate ? "rotate-180" : ""
                            }`}
                    />
                </button>
                {openSection.startDate && (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-medium">Vehicle Condition</label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="font-medium">Seller Type</label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>


                )}
            </div>

            <button className="bg-custom-primary w-full text-white text-2xl p-4 rounded-lg">Apply Filter</button>
        </div>
    );
};

export default FilterSection;