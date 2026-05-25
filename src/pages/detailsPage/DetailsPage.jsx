import EngineSpec from "@/components/admin/CarDetails/EngineSpec";
import FeaturesComponent from "@/components/admin/CarDetails/FeaturesComponent";
import CarOverView from "@/components/details/CarOverView";
import DetailsRowOne from "@/components/details/DetailsRowOne";
import Location from "@/components/details/Location";
import RealatedCars from "@/components/details/RealatedCars";
import React from "react";
import { bikes, cars, Parts, Scoter, trucks } from "@/lib/cardata";
import PartOverview from "@/components/details/PartOverview";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "react-router-dom";
const DetailsPage = () => {
  const { id, slug} = useParams();
  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["vehicle-details", id,slug],
    url: `store/vehicle/${id}/${slug}`,
    secure: true,
  });
  // console.log(data);
  const details = "car"; // car, truck, bike, scoter, parts
  return (
    <div className="section-padding-x pb-20 flex flex-col gap-10 ">
      <DetailsRowOne details={details} data={data?.data} refetch={refetch} isLoading={isLoading} />
      <div className=" max-w-[950px]">
        {details === "parts" ? (
          <PartOverview />
        ) : (
          <CarOverView details={details} data={data?.data} />
        )}
        {details !== "parts" && <FeaturesComponent data={data?.data} />}
        {details !== "parts" && <EngineSpec data={data?.data} />}
        <Location data={data?.data} />
      </div>
    
    </div>
  );
};

export default DetailsPage;
