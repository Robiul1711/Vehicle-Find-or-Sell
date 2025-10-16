import React from 'react'
import { MessageCircle, ExternalLink } from 'lucide-react'
import { OfferIcon } from '../common/SVGicons/CarSvg'
import ImageAvatar from "@/assets/images/avatar1.png"
import { Link } from 'react-router-dom'

const VehiclePriceDealer = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-10 ">
      {/* Price Section */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Our Price</div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm text-gray-400 line-through">$180,000</span>
          <span className="text-2xl font-bold text-gray-900">$165,000</span>
        </div>
        <div className="text-sm text-orange-500 font-medium">
          Instant Saving $15,000
        </div>
      </div>

      {/* Make Offer Button */}
      <button className="w-full bg-[#F88E08]  text-white font-medium py-3 px-4 rounded-lg mb-6 flex items-center justify-center gap-2 transition-colors">
        <span className="text-lg"><OfferIcon /></span>
        Make An Offer Price
      </button>

      {/* Dealer Info Section */}
      <div className="mb-6">
        <div className="flex flex-col items-start gap-3 mb-4">
          <img 
            src={ImageAvatar}
            alt="Katie Sims" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">Katie Sims</div>
            <div className="text-sm text-gray-500">Professional Seller</div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="space-y-3 mb-4">
          <Link to="/dashboard/message" className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <MessageCircle size={18} />
            Message Dealer
          </Link>
          
          <button className="w-full border border-green-300 hover:border-green-400 bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <MessageCircle size={18} />
            Chat Via WhatsApp
          </button>
        </div>

        {/* View All Stock Link */}
        <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-1 w-full">
          View All stock at this dealer
          <ExternalLink size={14} />
        </button>
      </div>

      {/* Vehicle History Button */}
      <button className="w-full bg-[#012853] hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors">
        Get Vehicle History
      </button>
    </div>
  )
}

export default VehiclePriceDealer