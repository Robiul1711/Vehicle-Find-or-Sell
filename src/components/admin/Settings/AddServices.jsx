import React from 'react';
import { 
  Car, 
  Users, 
  FileText, 
  Wrench, 
  Droplets, 
  Settings, 
  Truck, 
  CreditCard 
} from 'lucide-react';
import { AutoRepairIcon, CarWashIcon, DeliveryIcon, FinancingIcon, NewVechleIcon, partsAccessoriesIcon, RegistrationServiceIcon, SecondHandVechleIcon } from '@/components/common/SVGicons/DashboardIcon';

const AddServices = () => {
  const services = [
    {
      id: 1,
      title: "New Vehicles",
      description: "Inventory of brand-new cars",
      icon: NewVechleIcon ,
      isActive: true
    },
    {
      id: 2,
      title: "Used Vehicles",
      description: "Selection of pre-owned cars",
      icon: SecondHandVechleIcon,
      isActive: true
    },
    {
      id: 3,
      title: "Registration Service",
      description: "Vehicle registration assistance",
      icon: RegistrationServiceIcon,
      isActive: false
    },
    {
      id: 4,
      title: "Auto Repair",
      description: "Maintenance and repairs",
      icon: AutoRepairIcon,
      isActive: true
    },
    {
      id: 5,
      title: "Car Wash",
      description: "Exterior vehicle cleaning",
      icon: CarWashIcon,
      isActive: true
    },
    {
      id: 6,
      title: "Parts & Accessories",
      description: "Automotive components sales",
      icon: partsAccessoriesIcon,
      isActive: false
    },
    {
      id: 7,
      title: "Delivery",
      description: "Fast Delivery",
      icon: DeliveryIcon,
      isActive: false
    },
    {
      id: 8,
      title: "Financing",
      description: "Easy Financing",
      icon: FinancingIcon,
      isActive: false
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <div
                key={service.id}
                className={`
                  relative rounded-2xl p-6 transition-all duration-200 cursor-pointer hover:scale-105
                  ${service.isActive 
                    ? 'bg-orange-50 border border-orange-100 shadow-sm' 
                    : 'bg-gray-200 border border-gray-300'
                  }
                `}
              >
                {/* Orange dot indicator for active services */}
                {service.isActive && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-orange-400 rounded-full"></div>
                )}
                
                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-4
                  ${service.isActive 
                    ? 'bg-white shadow-sm' 
                    : 'bg-gray-100'
                  }
                `}>
                  <IconComponent 
                    size={24} 
                    className={service.isActive ? 'text-gray-700' : 'text-gray-500'} 
                  />
                </div>
                
                {/* Content */}
                <div>
                  <h3 className={`
                    text-lg font-semibold mb-2
                    ${service.isActive ? 'text-gray-800' : 'text-gray-600'}
                  `}>
                    {service.title}
                  </h3>
                  <p className={`
                    text-sm
                    ${service.isActive ? 'text-gray-600' : 'text-gray-500'}
                  `}>
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Add Services Button */}
        <div className="flex justify-end">
          <button className="bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200">
            Add Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServices;