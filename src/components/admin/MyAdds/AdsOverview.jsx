import React, { useState } from 'react';
import { Search, ChevronDown, Plus } from 'lucide-react';

export default function AdsOverview() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  return (
   

        <div className="w-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Ads Overview</h1>
              <p className="text-gray-600">Manage all your ads in one place. Edit, pause, or create new ads easily.</p>
            </div>
            <button className="bg-custom-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={16} />
              Post New Ad
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="flex gap-4 items-center w-full">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by Car Name, Model, Year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg bg-white"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-custom-primary text-white px-4 rounded-r-lg transition-colors">
                <Search size={18} />
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10  cursor-pointer"
              >
                <option>All Categories</option>
                <option>Cars</option>
                <option>Motorcycles</option>
                <option>Trucks</option>
                <option>SUVs</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10  cursor-pointer"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Draft</option>
                <option>Expired</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>


  

  );
}