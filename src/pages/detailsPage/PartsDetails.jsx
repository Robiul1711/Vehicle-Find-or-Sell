import Location from "@/components/details/Location";
import RealatedCars from "@/components/details/RealatedCars";
import React from "react";
import PartOverview from "@/components/details/PartOverview";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "react-router-dom";
import { PdfIcon } from "@/components/common/SVGicons/DashboardIcon";
import PartsDetailsRowOne from "@/components/details/PartsDetailsRowOne";
const PartsDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["parts-details", id],
    url: `/store/parts/${id}`,
    secure: true,
  });
  //   console.log(data);

  return (
    <div className="section-padding-x pb-20 flex flex-col gap-10 ">
      <PartsDetailsRowOne data={data} refetch={refetch} details="parts" />
      <div className=" max-w-[950px]">
        <PartOverview data={data} />

        <Location data={data} />
      </div>
      {/* <RealatedCars items={data?.related_parts} title="Related Parts" path="/parts-details"/> */}
    </div>
  );
};

export default PartsDetails;
