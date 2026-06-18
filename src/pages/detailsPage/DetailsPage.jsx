import EngineSpec from "@/components/admin/CarDetails/EngineSpec";
import FeaturesComponent from "@/components/admin/CarDetails/FeaturesComponent";
import CarOverView from "@/components/details/CarOverView";
import DetailsRowOne from "@/components/details/DetailsRowOne";
import Location from "@/components/details/Location";
import RealatedCars from "@/components/details/RealatedCars";
import VehiclePriceDealer from "@/components/details/VehiclePriceDealer";
import React from "react";
import { bikes, cars, Parts, Scoter, trucks } from "@/lib/cardata";
import PartOverview from "@/components/details/PartOverview";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "react-router-dom";
import SEO from "@/components/common/SEO";

const DetailsPage = () => {
  const { id, slug} = useParams();
  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["vehicle-details", id,slug],
    url: `store/vehicle/${id}/${slug}`,
    secure: true,
  });
  // console.log(data);
  const details = "car"; // car, truck, bike, scoter, parts
  const vehicle = data?.data;

  return (
    <div className="section-padding-x md:pb-20 pb-10">
      {vehicle ? (
        <SEO
          title={`${vehicle.brand_name} ${vehicle.model} ${vehicle.exact_date ? `(${vehicle.exact_date})` : ""}`}
          description={`Buy this ${vehicle.brand_name} ${vehicle.model} on Ronpoin. Transmission: ${vehicle.transmission || 'N/A'}, Fuel Type: ${vehicle.fuel_type || 'N/A'}, Mileage: ${vehicle.mileage || 'N/A'}.`}
          image={vehicle.first_image}
          keywords={[vehicle.brand_name, vehicle.model, vehicle.fuel_type, 'car details', 'buy car']}
        />
      ) : (
        <SEO title="Loading Vehicle Details..." />
      )}

      {/* Two-column layout: left = all content, right = sticky sidebar */}
      <div className="flex xmd:flex-row flex-col gap-5 mt-6 items-start">
        {/* LEFT COLUMN – all main content */}
        <div className="xmd:w-[60%] w-full flex flex-col gap-10">
          <DetailsRowOne details={details} data={data?.data} refetch={refetch} isLoading={isLoading} />
          <div>
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

        {/* RIGHT COLUMN – sticky sidebar */}
        <div className="xmd:w-[40%] w-full sticky  md:top-28 self-start">
          <VehiclePriceDealer data={data?.data} isLoading={isLoading} details={details} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
