import React from 'react';
import VehiclesCard from './VehiclesCard';


const VehiclesCardDemo = ({ cars = [],path }) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map((car, index) => (
        <VehiclesCard
          key={index}
          path={path}
          {...car}
          onViewDetails={() => console.log(`View details for ${car.title}`)}
          onFavorite={() => console.log(`Added ${car.title} to favorites`)}
        />
      ))}
    </div>
  );
};

export default VehiclesCardDemo;
