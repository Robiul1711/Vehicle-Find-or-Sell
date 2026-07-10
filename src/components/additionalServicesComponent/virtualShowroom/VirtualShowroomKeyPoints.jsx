import {
  CustomBuyers,
  CustomCheck,
  CustomFaster,
  CustomProfessional,
  CustomProtection,
  CustomRightUp,
  CustomStandout,
  CustomValue,
} from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";
import { TbArrowWaveRightUp } from "react-icons/tb";
import { Link } from "react-router-dom";

const InsuranceData = [
  {
    id: 1,
    icon: <CustomBuyers />,
    title: "Attract More Buyers",
    desc: "Professional presentation draws in serious buyers who are ready to purchase.",
  },
  {
    id: 2,
    icon: <CustomStandout />,
    title: "Stand Out",
    desc: "Differentiate your listing from standard ads with premium visual content.",
  },
  {
    id: 3,
    icon: <CustomFaster />,
    title: "Sell Faster",
    desc: "Complete virtual visits help buyers make quicker decisions, speeding up sales.",
  },
  {
    id: 4,
    icon: <CustomValue />,
    title: "Increase Value",
    desc: "Well-presented cars are less likely to be negotiated down, preserving value.",
  },
];

const VirtualShowroomKeyPoints = ({ data }) => {
  const sections = data?.sections || [];
  const hdPhotos = sections.find((s) => s.section_id === "hd-photos" || s.section_id === "photos-hd");
  const videos360 = sections.find((s) => s.section_id === "360-videos" || s.section_id === "videos-360");
  const virtualSpace = sections.find((s) => s.section_id === "virtual-space" || s.section_id === "espace-virtuel");
  const saleAdvantages = sections.find(
    (s) => s.section_id === "sale-advantages" || s.section_id === "avantages-de-la-vente"
  );
  const maximizeImpact = sections.find(
    (s) => s.section_id === "maximize-impact" || s.section_id === "maximiser-impact"
  );

  const insuranceDataMapped = (saleAdvantages?.bullets || []).map(
    (bullet, index) => {
      const original =
        InsuranceData[index] || InsuranceData[InsuranceData.length - 1];
      return {
        ...original,
        title: bullet.split(" ").slice(0, 3).join(" "), // Heuristic to get a title if none
        desc: bullet,
      };
    }
  );

  // If no mapped data, use original InsuranceData
  const displayInsuranceData =
    insuranceDataMapped.length > 0 ? insuranceDataMapped : InsuranceData;

  return (
    <div className="space-y-10 mx-auto">
      {/* HD Professional Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold"  dangerouslySetInnerHTML={{ __html: hdPhotos?.title }}>
        
          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: hdPhotos?.description }}>
        
          </p>
          <div className="space-y-3">
            {(
              hdPhotos?.bullets || [
                "High-resolution pictures taken from the best angles.",
                "Highlight key details like interior, equipment, and body condition.",
                "Gives a professional look to your listing.",
              ]
            ).map((bullet, idx) => (
              <p key={idx} className=" flex items-center gap-2">
                <CustomCheck /> {bullet}
              </p>
            ))}
            <p className=" flex items-center gap-2 lg:text-lg" dangerouslySetInnerHTML={{ __html: hdPhotos?.description}}>
         
            </p>
          </div>
        </div>
        <div className="">
          <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm' src={hdPhotos?.image_url || ImageProvider.showroom1} alt="" />
        </div>
      </div>

      {/* 360° Immersive Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
        <div className="">
          <img className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm' src={videos360?.image_url || ImageProvider.showroom2} alt="" />
        </div>
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: videos360?.title}}>
        
          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: videos360?.description}}>
        
          </p>
          <div className="space-y-3">
            {(
              videos360?.bullets || [
                "Buyers can rotate and zoom to inspect every part of the vehicle.",
                "Total transparency builds trust and aids decision-making.",
              ]
            ).map((bullet, idx) => (
              <p key={idx} className=" flex items-center gap-2">
                <CustomCheck /> {bullet}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Virtual Showroom */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: virtualSpace?.title}}>
        
          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: virtualSpace?.description}}>
        
          </p>
          <div className="space-y-3">
            {(
              virtualSpace?.bullets || [
                "Combines HD photos, 360° videos, and technical sheets.",
                "Offers an immersive, interactive online visit.",
                "Makes your listing look professional, like a major Dealerships.",
              ]
            ).map((bullet, idx) => (
              <p key={idx} className=" flex items-center gap-2">
                <CustomCheck /> {bullet}
              </p>
            ))}
          </div>
        </div>

        <div className="">
          <img
            className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm'
            src={virtualSpace?.image_url || ImageProvider.showroom3}
            alt=""
          />
        </div>
      </div>

      {/* Sale Advantages */}
      <div className=" mx-auto">
        <div className="space-y-4 lg:space-y-5">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: saleAdvantages?.title}}>
        
          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: saleAdvantages?.description}}>
        
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayInsuranceData?.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded p-5  space-y-4">
                <div className="w-12 h-12 font-semibold bg-custom-primary text-white  rounded flex items-center justify-center mr-4">
                  {item?.icon}
                </div>

                <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: item?.title}}>
                
                </p>
                <p dangerouslySetInnerHTML={{ __html: item?.desc}}></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maximize Your Listing Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: maximizeImpact?.title}}>
        
          </p>
          <p className="lg:text-xl" dangerouslySetInnerHTML={{ __html: maximizeImpact?.description}}>
        
          </p>
          <div className="space-y-3">
            {(
              maximizeImpact?.bullets || [
                "HD photos for maximum visual impact",
                "360° videos for complete transparency",
                "Virtual showroom experience",
                "Professional presentation that sells",
              ]
            ).map((bullet, idx) => (
              <p key={idx} className=" flex items-center gap-2">
                <CustomCheck /> {bullet}
              </p>
            ))}
          </div>
          <div className="space-y-3">
            {(
              maximizeImpact?.bullets || [
                "HD photos for maximum visual impact",
                "360° videos for complete transparency",
                "Virtual showroom experience",
                "Professional presentation that sells",
              ]
            ).map((bullet, idx) => (
              <p key={idx} className=" flex items-center gap-2">
                <CustomCheck /> {bullet}
              </p>
            ))}
          </div>
          {maximizeImpact?.description && (
            <p className="lg:text-xl">{maximizeImpact.description}</p>
          )}

          <Link to="/dashboard" className="bg-custom-primary inline-block flex hover:bg-custom-primary/80 transition-all duration-300 text-white py-4 font-semibold px-4 rounded flex items-center gap-2 ">
            Showcase Your Ad Now
          </Link>
        </div>

        <div className="">
          <img
            className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-fill rounded-xl shadow-sm'
            src={maximizeImpact?.image_url || ImageProvider.showroom4}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualShowroomKeyPoints;
