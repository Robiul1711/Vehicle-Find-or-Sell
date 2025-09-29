import EngineSpec from "@/components/admin/CarDetails/EngineSpec";
import FeaturesComponent from "@/components/admin/CarDetails/FeaturesComponent";
import CarOverView from "@/components/details/CarOverView";
import DetailsRowOne from "@/components/details/DetailsRowOne";
import Location from "@/components/details/Location";
import RealatedCars from "@/components/details/RealatedCars";
import React from "react";
import { bikes, cars, Parts, Scoter, trucks } from "@/lib/cardata";
import PartOverview from "@/components/details/PartOverview";
const DetailsPage = () => {
  const details = "car"; // car, truck, bike, scoter, parts
  return (
    <div className="  section-padding-x section-padding-y flex flex-col gap-10 ">
      <DetailsRowOne details={details} />
      <div className=" max-w-[950px]">
        {details === "parts" ? <PartOverview /> : <CarOverView details={details} />}
        {details !== "parts" && <FeaturesComponent />}
        {details !== "parts" && <EngineSpec />}
        <Location />
      </div>
      <RealatedCars
        items={
          details === "car"
            ? cars
            : details === "truck"
            ? trucks
            : details === "bike"
            ? bikes
            : details === "scooter"
            ? Scoter
            : Parts
        }
        title="Related Cars"
      />
    </div>
  );
};

export default DetailsPage;
