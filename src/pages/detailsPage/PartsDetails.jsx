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
  const { data, isLoading } = useApiQuery({
    queryKey: ["parts-details", id],
    url: `/store/parts/${id}`,
    secure: true,
  });
  //   console.log(data);

  return (
    <div className="section-padding-x pb-20 flex flex-col gap-10 ">
      <PartsDetailsRowOne data={data} />
      <div className=" max-w-[950px]">
        <PartOverview data={data} />

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">Description</h1>
          <p>{data?.description}</p>
          <h1 className="text-2xl font-semibold">Document</h1>
          <a
            href={data?.registration?.document}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-custom-primary bg-custom-primary/10 py-2 px-4 rounded-lg  hover:bg-custom-primary/20 transition"
          >
            <PdfIcon />
            Car-Brochure.pdf
          </a>
        </div>
        <Location data={data} />
      </div>
      <RealatedCars />
    </div>
  );
};

export default PartsDetails;
