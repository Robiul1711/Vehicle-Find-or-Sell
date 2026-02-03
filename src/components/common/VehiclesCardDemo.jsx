import React from "react";
import VehiclesCard from "./VehiclesCard";

const VehiclesCardDemo = ({
  cars = [],
  path,
  onAddFavorite,
  type = "vehicle",
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map((car, index) => (
        <VehiclesCard
          key={index}
          path={path}
          {...car}
          isFavorite={car.isFavorite}
          onViewDetails={() => console.log(`View details for ${car.title}`)}
          onFavorite={() => onAddFavorite && onAddFavorite(car.id, type)}
        />
      ))}
    </div>
  );
};

export default VehiclesCardDemo;
