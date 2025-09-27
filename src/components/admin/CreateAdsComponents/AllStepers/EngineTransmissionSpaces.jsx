import React from 'react';
import { useFormContext } from 'react-hook-form';

const EngineTransmissionSpaces = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="md:p-6 ">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Engine & Transmission Spaces
      </h1>
      
      <div className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Tank Capacity (Liters)
            </label>
            <input
              {...register('fuelTankCapacity')}
              type="text"
              placeholder="Type Fuel Tank Capacity"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-custom-primary focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Ker weight (kg)
            </label>
            <input
              {...register('minimumKerWeight')}
              type="text"
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-custom-primary focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max. Towing Weight - Braked (kg)
            </label>
            <input
              {...register('maxTowingWeightBraked')}
              type="text"
              placeholder="Type Towing Weight - Braked"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-custom-primary focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max. Towing Weight - Unbroked (kg)
            </label>
            <input
              {...register('maxTowingWeightUnbraked')}
              type="text"
              placeholder="Type Towing Weight - Unbraked"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-custom-primary focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Turning Circle (m)
            </label>
            <input
              {...register('turningCircle')}
              type="text"
              placeholder="Type Turning Circle"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-custom-primary focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>
          
          <div></div> {/* Empty div to maintain grid structure */}
        </div>
      </div>
    </div>
  );
};

export default EngineTransmissionSpaces;