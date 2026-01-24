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
  const hdPhotos = sections.find((s) => s.section_id === "hd-photos");
  const videos360 = sections.find((s) => s.section_id === "360-videos");
  const virtualSpace = sections.find((s) => s.section_id === "virtual-space");
  const saleAdvantages = sections.find(
    (s) => s.section_id === "sale-advantages"
  );
  const maximizeImpact = sections.find(
    (s) => s.section_id === "maximize-impact"
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
          <p className="lg:text-3xl font-bold">
            {hdPhotos?.title || "HD Professional Photos"}
          </p>
          <p className="lg:text-xl">
            {hdPhotos?.description ||
              "Capture every detail with high-resolution images"}
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
            <p className=" flex items-center gap-2 lg:text-xl">
              {virtualSpace?.description ||
                "Ads with HD photos get up to 3x more contacts than standard listings."}
            </p>
          </div>
        </div>
        <div className="">
          <img src={hdPhotos?.image_url || ImageProvider.showroom1} alt="" />
        </div>
      </div>

      {/* 360° Immersive Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
        <div className="">
          <img src={videos360?.image_url || ImageProvider.showroom2} alt="" />
        </div>
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold">
            {videos360?.title || "360° Immersive Videos"}
          </p>
          <p className="lg:text-xl">
            {videos360?.description ||
              "Explore every angle of the car virtually."}
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
          <p className="lg:text-3xl font-bold">
            {virtualSpace?.title || "Virtual Showroom"}
          </p>
          <p className="lg:text-xl">
            Present your car in a premium online space.
          </p>
          <div className="space-y-3">
            {(
              virtualSpace?.bullets || [
                "Combines HD photos, 360° videos, and technical sheets.",
                "Offers an immersive, interactive online visit.",
                "Makes your listing look professional, like a major dealership.",
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
            src={virtualSpace?.image_url || ImageProvider.showroom3}
            alt=""
          />
        </div>
      </div>

      {/* Sale Advantages */}
      <div className=" mx-auto">
        <div className="space-y-4 lg:space-y-5">
          <p className="lg:text-3xl font-bold">
            {saleAdvantages?.title || "Sale Advantages"}
          </p>
          <p className="lg:text-xl">
            {saleAdvantages?.description ||
              "Boost your chances to sell faster and smarter."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayInsuranceData?.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded p-5  space-y-4">
                <div className="w-12 h-12 font-semibold bg-custom-primary text-white  rounded flex items-center justify-center mr-4">
                  {item?.icon}
                </div>

                <p className="lg:text-2xl font-medium">{item?.title}</p>
                <p>{item?.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maximize Your Listing Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10  py-10 lg:py-20">
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold">
            {maximizeImpact?.title || "Maximize Your Listing Impact"}
          </p>
          <p className="lg:text-xl">
            {maximizeImpact?.description ||
              "Turn your car ad into a professional showroom experience."}
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
          {maximizeImpact?.description && (
            <p className="lg:text-xl">{maximizeImpact.description}</p>
          )}

          <button className="bg-custom-primary text-white py-4 font-semibold px-4 rounded flex items-center gap-2 ">
            Showcase Your Ad Now <CustomRightUp />
          </button>
        </div>

        <div className="">
          <img
            src={maximizeImpact?.image_url || ImageProvider.showroom4}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualShowroomKeyPoints;
