import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BoostYourAdVisibility = () => {
  const [selectedBoosts, setSelectedBoosts] = useState([]);

  const boostOptions = [
    {
      id: 'top-list',
      title: 'Top of the list bump',
      price: '€0.99',
      description: 'Push your ad to the top of the listings immediately.',
      badge: true
    },
    {
      id: 'featured',
      title: 'Featured ad',
      price: '€4.99/ad',
      description: 'Your ad will automatically be bumped to the top every day for a month.',
      badge: true
    },
    {
      id: 'virtual-tour',
      title: '360 Degree video/ virtual tour',
      price: '€4.99',
      description: 'Add a special badge to show your ad is urgent.',
      badge: false
    }
  ];

  const toggleBoost = (boostId) => {
    setSelectedBoosts(prev => {
      if (prev.includes(boostId)) {
        return prev.filter(id => id !== boostId);
      } else {
        return [...prev, boostId];
      }
    });
  };

  const calculateTotal = () => {
    return selectedBoosts.reduce((total, boostId) => {
      const boost = boostOptions.find(b => b.id === boostId);
      if (boost) {
        const price = parseFloat(boost.price.replace('€', '').replace('/ad', ''));
        return total + price;
      }
      return total;
    }, 0).toFixed(2);
  };

  return (
  
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Boost Your Ad Visibility
        </h1>
        <p className="text-gray-600 mb-8">
          Increase your chances of selling faster by choosing from our premium options.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {boostOptions.map((boost) => (
            <div
              key={boost.id}
              onClick={() => toggleBoost(boost.id)}
              className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedBoosts.includes(boost.id)
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-gray-200 bg-[#7E7E81]/10 hover:border-gray-300'
              }`}
            >
     

              {/* Selection indicator */}
              {selectedBoosts.includes(boost.id) && (
                <div className="absolute top-4 right-4">
                 <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {boost.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-3">
                  {boost.price}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {boost.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section with buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
          <Link to="/dashboard/boost-ads" className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          
          <div className="flex items-center gap-4">
            {selectedBoosts.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Total:</p>
                <p className="text-xl font-bold text-gray-900">€{calculateTotal()}</p>
              </div>
            )}
            <button 
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedBoosts.length > 0
                  ? 'bg-custom-primary  text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={selectedBoosts.length === 0}
            >
              Continue & Pay for Selected Boosts
            </button>
          </div>
        </div>

        {/* Selection summary */}
        {selectedBoosts.length > 0 && (
          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Selected boosts:</h4>
            <ul className="text-sm text-gray-700">
              {selectedBoosts.map(boostId => {
                const boost = boostOptions.find(b => b.id === boostId);
                return (
                  <li key={boostId} className="flex justify-between">
                    <span>{boost.title}</span>
                    <span>{boost.price}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    
  );
};

export default BoostYourAdVisibility;