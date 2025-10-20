import React from 'react'

const Subscription = () => {
  return (
    <div>
            {/* Subscription Card */}
      <div className="bg-white rounded-lg border border-[#F88E08] p-6 relative">
        {/* Current Plan Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F88E08] text-white">
            Current Plan
          </span>
        </div>

        {/* Plan Content */}
        <div className="pt-8">
          <h2 className="text-xl font-semibold text-primaryColor mb-2">Standard Plan</h2>
          <div className="text-gray-900 text-lg font-medium mb-4">€24.99/month</div>
          
          {/* Plan Details */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center">
          <div className="flex items-center text-sm text-gray-600 space-x-6">
            <div className="flex items-center">
              <span className="font-medium">Start Date:</span>
              <span className="ml-1">5/22/2025</span>
            </div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="flex items-center">
              <span className="font-medium">End Date:</span>
              <span className="ml-1">5/22/2025</span>
            </div>
          </div>
<button className="bg-custom-primary text-white px-4 py-2 rounded-md hover:bg-custom-primary/90 transition">Upgrade Plan</button>
          </div>
        </div>
      </div>
 
    </div>
  )
}

export default Subscription