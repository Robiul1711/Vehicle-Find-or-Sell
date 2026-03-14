import React, { useState, useEffect } from 'react';
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
import { useApiQuery } from '@/hooks/useApiQuery';
import { useApiMutation } from '@/hooks/useApiMutation';

const AddServices = () => {
    const { data, isLoading } = useApiQuery({
      queryKey: ["service-list"],
      url: "/core/service-list/",
      secure: true,
    });
  const { mutate, isPending } = useApiMutation({
    url: "/delears/services/",
    method: "POST",
    secure: true,
    invalidateKeys: ["service-list"],
  });

  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const activeIds = data.data
        .filter((s) => s.is_active)
        .map((s) => s.id);
      setSelectedIds(activeIds);
    }
  }, [data]);

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddServices = () => {
    mutate({ services: selectedIds });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-2xl ">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {data?.data?.map((service) => {            
            const isSelected = selectedIds.includes(service?.id);
            
            return (
              <div
                key={service?.id}
                onClick={() => handleToggle(service?.id)}
                className={`
                  relative rounded-2xl p-6 transition-all duration-200 cursor-pointer hover:scale-105
                  ${isSelected
                    ?'bg-gray-200 border border-gray-300' : 'bg-orange-50 border border-orange-100 shadow-sm' 
                  }
                `}
              >
                {/* Orange dot indicator for active services */}
                {isSelected ? (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gray-400 rounded-full"></div>
                ) : (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-orange-400 rounded-full"></div>
                )}
                
                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-4
                  ${isSelected 
                    ? 'bg-white shadow-sm' : 'bg-gray-100' 
                  }
                `}>
                 <img src={service.icon} alt="" />
                </div>
                
                {/* Content */}
                <div>
                  <h3 className={`
                    text-lg font-semibold mb-2
                    ${isSelected ? "text-gray-600" : 'text-gray-800'}
                  `}>
                    {service.name}
                  </h3>
                  <p className={`
                    text-sm
                    ${isSelected ?'text-gray-500' : 'text-gray-600'}
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
          <button 
            onClick={handleAddServices}
            disabled={isPending}
            className="bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200 disabled:opacity-50"
          >
            {isPending ? "Adding..." : "Add Services"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServices;