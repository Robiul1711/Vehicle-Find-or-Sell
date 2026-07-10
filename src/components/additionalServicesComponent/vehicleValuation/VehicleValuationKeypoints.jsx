import {
  CustomCheck,
  CustomCheck2,
  CustomPrivateSeller,
  CustomVerified,
} from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";

const VehicleValuationKeypoints = ({ data }) => {
  const sections = data?.sections || [];
  const valuationTips = sections.find((s) => s.section_id === "valuation-tips" || s.section_id === "conseils-estimation");
  const privateVsProfessional = sections.find(
    (s) => s.section_id === "private-vs-professional" || s.section_id === "Plateformes d’estimation en ligne"
  );
  const onlinePlatforms = sections.find(
    (s) => s.section_id === "online-platforms" || s.section_id === "Entretien et estimation"
  );
  const maintenanceAndValue = sections.find(
    (s) => s.section_id === "maintenance-and-value" || s.section_id === "entretien-et-valeur"
  );
  const valuationSummary = sections.find(
    (s) => s.section_id === "valuation-summary" || s.section_id === "resume-estimation"
  );

  return (
    <div className="space-y-10 lg:space-y-20 mx-auto">
      {/* Practical Valuation Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  lg:py-10 ">
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: valuationTips?.title || "Practical Valuation Tips" }}>

          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: valuationTips?.description || "Check terms, transfer options, exclusions, and compare providers before committing." }}>

          </p>
          <div className="space-y-3">
            {(
              valuationTips?.bullets || [
                "Model and engine type: Popular versions may command higher prices.",
                "Equipment and options: GPS, leather seats, sunroof, etc.",
                "Vehicle history: Service records, invoices, previous owners.",
                "Recent expenses: Clutch, suspension, timing belt, tires replaced.",
                "Upcoming expenses: Imminent maintenance can reduce value.",
                "General condition: Bodywork, mechanics, interior quality.",
                "Current market: Supply and demand impact price.",
              ]
            ).map((bullet, index) => (
              <p key={index} className=" flex items-center gap-2">
                <CustomCheck /> {bullet}
              </p>
            ))}
          </div>
        </div>
        <div className="">
          <img
            className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm"
            src={valuationTips?.image_url || ImageProvider.valuation1}
            alt=""
          />
        </div>
      </div>

      {/* Private vs Professional Sellers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
        <div className="">
          <img
            className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm"
            src={privateVsProfessional?.image_url || ImageProvider.valuation2}
            alt=""
          />
        </div>
        <div className="space-y-4 lg:space-y-10">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: privateVsProfessional?.title || "Private vs Professional Sellers" }}>

          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: privateVsProfessional?.description || "Understand how seller type impacts car valuation." }}>

          </p>
       
          <div className="grid grid-cols-1  gap-4">
            <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
              <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                <CustomVerified />
              </div>

              <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: privateVsProfessional?.bullets?.[0] || "Professionals Sellers" }}>

              </p>
              <p className="text-base" dangerouslySetInnerHTML={{ __html: privateVsProfessional?.bullets?.[0] || "A professional sells a car including margin, warranty, preparation, and sometimes financing. This means the trade-in value will be lower, and the resale price higher" }}>

              </p>
            </div>

            <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
              <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                <CustomPrivateSeller />
              </div>

              <p className="lg:text-2xl font-medium">Private Sellers</p>
              <p className="text-base" dangerouslySetInnerHTML={{ __html: privateVsProfessional?.bullets?.[1] || "A private seller can offer a more attractive price but usually without warranty or preparation" }} >
           
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Online Valuation Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: onlinePlatforms?.title || "Online Valuation Platforms" }}>
        
          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: onlinePlatforms?.description || "Quick estimates, but handle with care." }}>
     
          </p>
          <div className="space-y-3">
            {(
              onlinePlatforms?.bullets || [
                "Based on market averages and databases.",
                "May not include recent maintenance or repairs.",
                "Don’t always reflect local demand or market specifics.",
              ]
            ).map((bullet, index) => (
              <p key={index} className=" flex items-center gap-2">
                <CustomCheck /> {bullet}
              </p>
            ))}
          </div>
        </div>
        <div className="">
          <img
            className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm"
            src={onlinePlatforms?.image_url || ImageProvider.valuation3}
            alt=""
          />
        </div>
      </div>

      {/*  How to Refine Your Car's Value */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
        <div className="">
          <img className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm" src={ImageProvider.valuation4} alt="" />
        </div>
        <div className="space-y-4 lg:space-y-10">
          <p className="lg:text-3xl font-bold">
            How to Refine Your Car's Value
          </p>
          <p className="lg:text-xl">
            Compare, highlight history, and adjust for condition.
          </p>
          <div className="grid grid-cols-1  gap-4">
            <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
              <p className="lg:text-2xl font-medium">Private Sellers</p>
              <p className=" flex items-center gap-2">
                <CustomCheck2 /> Compare similar market listings (model, year,
                mileage, equipment)
              </p>
              <p className=" flex items-center gap-2">
                <CustomCheck2 /> Highlight vehicle history & recent repairs
              </p>
            </div>

            <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
              <p className="lg:text-2xl font-medium">Private Sellers</p>
              <p className=" flex items-center gap-2">
                <CustomCheck2 /> Disclose upcoming maintenance to build trust
              </p>
              <p className=" flex items-center gap-1">
                <CustomCheck2 /> Cross-check online estimates with actual
                condition
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance and Valuation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
        <div className="space-y-4 lg:space-y-10">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: maintenanceAndValue?.title || "Maintenance and Valuation" }}>
       
          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: maintenanceAndValue?.description || "How repairs and upcoming service affect price." }}>
    
          </p>
          <div className="grid grid-cols-1  gap-4">
            {(
              maintenanceAndValue?.bullets || [
                "A car with a recently replaced timing belt will be valued higher.",
                "If the timing belt replacement is due soon, buyers may negotiate the price down.",
                "Tires, brakes, clutch, and suspension also directly affect perceived value.",
              ]
            ).map((bullet, index) => (
              <div
                key={index}
                className="bg-custom-primary  rounded p-5 text-white space-y-4"
              >
                <p className="lg:text-2xl font-medium">{bullet}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <img
            className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm"
            src={maintenanceAndValue?.image_url || ImageProvider.valuation5}
            alt=""
          />
        </div>
      </div>

      {/* Vehicle Valuation Summary */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
        <div className="">
          <img
            className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm"
            src={
              valuationSummary?.image_url ||
              valuationSummary?.image_url ||
              ImageProvider.valuation6
            }
            alt=""
          />
        </div>

        <div className="space-y-4 lg:space-y-10">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: valuationSummary?.title || "Vehicle Valuation Summary" }}>

          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: valuationSummary?.description || "Key takeaways to accurately assess your car's worth." }}>
          </p>
          <div className="grid grid-cols-1  gap-4">
            {(
              valuationSummary?.bullets || [
                "Valuation tools give a baseline, but the real value must be adjusted for history, maintenance, and condition.",
                "Well-maintained vehicles with invoices and recent repairs can sell above the average valuation.",
                "Cars requiring major work will often sell below the average valuation.",
                "Remember: a car’s value differs depending on whether it is sold to a professional or a private buyer.",
              ]
            ).map((bullet, index) => (
              <div
                key={index}
                className="bg-custom-primary  rounded p-5 text-white space-y-4"
              >
                <p className="lg:text-2xl font-medium">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleValuationKeypoints;
