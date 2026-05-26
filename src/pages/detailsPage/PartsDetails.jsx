import Location from "@/components/details/Location";
import RealatedCars from "@/components/details/RealatedCars";
import React from "react";
import PartOverview from "@/components/details/PartOverview";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "react-router-dom";
import { PdfIcon } from "@/components/common/SVGicons/DashboardIcon";
import PartsDetailsRowOne from "@/components/details/PartsDetailsRowOne";
import SEO from "@/components/common/SEO";

const PartsDetails = () => {
  const { id,slug } = useParams();
  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["parts-details", id,slug],
    url: `/store/parts/${id}/${slug}`,
    secure: true,
  });
  
  const part = data?.data;

  return (
    <div className="section-padding-x pb-20 flex flex-col gap-10 ">
      {part ? (
        <SEO 
          title={`${part.part_name} - ${part.brand}`}
          description={`Buy high-quality ${part.part_name} compatible with ${part.compatible_make} ${part.compatible_model}. Material: ${part.material || 'N/A'}, Weight: ${part.weight || 'N/A'}.`}
          image={part.first_image}
          keywords={[part.part_name, part.brand, 'vehicle parts', 'spare parts', part.compatible_make]}
        />
      ) : (
        <SEO title="Loading Part Details..." />
      )}
      <PartsDetailsRowOne data={data?.data} refetch={refetch} details="parts" />
      <div className=" max-w-[950px]">
        <PartOverview data={data?.data} />

        <Location data={data?.data} />
      </div>
      {/* <RealatedCars items={data?.related_parts} title="Related Parts" path="/parts-details"/> */}
    </div>
  );
};

export default PartsDetails;
