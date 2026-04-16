import React from "react";
import Title from "../common/Title";
import VehiclesCardDemo from "../common/VehiclesCardDemo";
import { Link } from "react-router-dom";
import { CarArrowIcon } from "../common/SVGicons/CarSvg";

const RealatedCars = ({ items, title,path}) => {
    // console.log(path)
  return (
    <div className=" flex flex-col gap-6">
      <div className=" w-full flex items-center justify-between gap-3">
        <Title level="title40" className=" !font-bold">
       {title}
      </Title> 

      <Link to="/listings" className=" text-[#405FF2] font-medium text-lg mt-2 flex items-center gap-2">
     
        <p>View All</p>

           <span><CarArrowIcon/></span>
      </Link>

      </div>

      <VehiclesCardDemo cars={items} path={path}/>
    </div>
  );
};

export default RealatedCars;
