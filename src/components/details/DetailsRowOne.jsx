import React from "react";
import CarLeftSideImages from "../admin/CarDetails/CarLeftSideImages";
import Title from "../common/Title";
import { ManualIcon, MilesIcons, PetrolIcon, WarrentiesIcon } from "../common/SVGicons/CarSvg";
import { MdFavoriteBorder } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegShareFromSquare } from "react-icons/fa6";
import VehiclePriceDealer from "./VehiclePriceDealer";

const DetailsRowOne = ({details}) => {
  const carInfo = [
    {
      id: 1,
      icon: MilesIcons,
      value: "250 miles",
    },

    {
      id: 2,
      icon: ManualIcon,
      value: "Manual",
    },
    {
      id: 3,
      icon: PetrolIcon,
      value: "Petrol",
    },
    {
      id: 4,
      icon:WarrentiesIcon,
      value: "Warranty",
    },
  ];
  return (
    <div className=" flex  w-full xmd:flex-row flex-col gap-5 mt-14">
      <div className="xmd:w-[70%] w-full flex flex-col gap-5">
        <div className=" flex flex-col gap-4">
          <Title level="title40" className=" !font-bold">
            Toyota Corolla 2020
          </Title>

          <div className=" flex w-full gap-6 justify-between">
            <div className=" flex flex-wrap gap-3">
                {
                    carInfo.map((info)=>(
                        <div key={info.id} className=" flex items-center bg-[rgba(248,142,8,0.10)] gap-2 border px-3 py-1 rounded-lg">
                            <info.icon />   
                            <span className=" text-[#F88E08]">{info.value}</span>
                        </div>
                    ))
                }

            </div>

            <div className=" flex gap-3 flex-wrap items-center">
                <button className=" flex items-center gap-2 border px-3 py-1 rounded-lg"><MdFavoriteBorder size={20} /></button>
                <button className=" flex items-center gap-2 border px-3 py-1 rounded-lg"><IoGitCompareOutline size={20} /> </button>
                <button className=" flex items-center gap-2 border px-3 py-1 rounded-lg"><FaRegShareFromSquare size={20} /> </button>

            </div>

          </div>

        </div>
        <CarLeftSideImages details={details} />
      </div>

      <div className=" xmd:w-[30%] w-full">
        <VehiclePriceDealer/>

      </div>
    </div>
  );
};

export default DetailsRowOne;
