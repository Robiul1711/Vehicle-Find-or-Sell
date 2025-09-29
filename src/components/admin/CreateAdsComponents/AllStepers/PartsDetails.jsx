import { useFormContext } from 'react-hook-form';

export default function PartsDetails() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Parts Details</h2>
      
      {/* Basic Information Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Part Name */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Part Name
            </label>
            <input
              {...register('partName')}
              type="text"
              placeholder="Front Rotating Red Set"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Vehicle Type
            </label>
            <select
              {...register('vehicleType')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="truck">Truck</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          {/* Brand / Manufacturer */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Brand / Manufacturer
            </label>
            <select
              {...register('brand')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">e.g. Bosch, Brembo, Mobil</option>
              <option value="bosch">Bosch</option>
              <option value="brembo">Brembo</option>
              <option value="mobil">Mobil</option>
            </select>
          </div>

          {/* Part Number / SKU */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Part Number / SKU
            </label>
            <input
              {...register('partNumber')}
              type="text"
              placeholder="e.g. P-24-0045 or unique identifying code"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* System & Compatibility Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">System & Compatibility</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main System */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Main System
            </label>
            <select
              {...register('mainSystem')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Main System (e.g. Braking System)</option>
              <option value="braking">Braking System</option>
              <option value="engine">Engine System</option>
              <option value="suspension">Suspension System</option>
            </select>
          </div>

          {/* Sub-System / Sub-Part */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Sub-System / Sub-Part
            </label>
            <select
              {...register('subSystem')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Sub-System (e.g. Piston Components)</option>
              <option value="piston">Piston Components</option>
              <option value="rotor">Rotor Components</option>
            </select>
          </div>

          {/* Compatible Make */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Compatible Make
            </label>
            <input
              {...register('compatibleMake')}
              type="text"
              placeholder="e.g. Toyota, Honda, Suzuki (use comma to separate)"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Compatible Model(s) */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Compatible Model(s)
            </label>
            <input
              {...register('compatibleModels')}
              type="text"
              placeholder="e.g. Corolla, Civic, Swift (use comma to separate)"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Compatible Year(s) */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Compatible Year(s)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register('compatibleYearFrom')}
                type="text"
                placeholder="e.g. 2018-2022"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                {...register('compatibleYearTo')}
                type="text"
                placeholder="e.g. 2018-2022"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">Technical Specifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Material */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Material
            </label>
            <select
              {...register('material')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">e.g. Ceramic, Steel, Alloy, Synthetic Rubber</option>
              <option value="ceramic">Ceramic</option>
              <option value="steel">Steel</option>
              <option value="alloy">Alloy</option>
              <option value="rubber">Synthetic Rubber</option>
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Color
            </label>
            <select
              {...register('color')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">e.g. Matte Black, Silver</option>
              <option value="black">Matte Black</option>
              <option value="silver">Silver</option>
              <option value="red">Red</option>
            </select>
          </div>

          {/* Dimensions */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-600 mb-1.5">
              Dimensions
            </label>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Length</label>
                <input
                  {...register('length')}
                  type="text"
                  placeholder="e.g. 15"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Width</label>
                <input
                  {...register('width')}
                  type="text"
                  placeholder="e.g. 10"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Height</label>
                <input
                  {...register('height')}
                  type="text"
                  placeholder="e.g. 5"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Unit</label>
                <select
                  {...register('dimensionUnit')}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none  focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Weight
            </label>
            <input
              {...register('weight')}
              type="text"
              placeholder="e.g. 1.5 kg"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Position on Vehicle */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Position on Vehicle
            </label>
            <input
              {...register('position')}
              type="text"
              placeholder="e.g. Front Axle, Rear Right, Engine Bay"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Pricing & Inventory Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">Pricing & Inventory</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original Price */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Original Price
            </label>
            <input
              {...register('originalPrice')}
              type="text"
              placeholder="Enter the cost price, e.g. 2600"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Discount Price */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Discount Price
            </label>
            <select
              {...register('discountPrice')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none  focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Enter the retail price, e.g. 3800</option>
            </select>
          </div>

          {/* Quantity in Stock */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Quantity in Stock
            </label>
            <input
              {...register('quantity')}
              type="text"
              placeholder="e.g. 50"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Warranty */}
          <div>
            <label className="block text-xs text-gray-600 mb-1.5">
              Warranty
            </label>
            <select
              {...register('warranty')}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none  focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">e.g. 1 Year or 20,000 km</option>
              <option value="1year">1 Year</option>
              <option value="2year">2 Years</option>
              <option value="20000km">20,000 km</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs text-gray-600 mb-1.5">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          placeholder="Type something about your vehicle"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        />
      </div>
    </div>
  );
}