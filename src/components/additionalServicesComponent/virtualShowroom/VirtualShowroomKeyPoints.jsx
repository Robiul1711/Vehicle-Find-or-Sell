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
import React from "react";
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
  const parseBullet = (bullet) => {
    let title = "";
    let desc = bullet;

    if (bullet.includes(":")) {
      const parts = bullet.split(":");
      title = parts[0].trim();
      desc = parts.slice(1).join(":").trim();
    } else if (bullet.includes("(")) {
      const openParenIdx = bullet.indexOf("(");
      const closeParenIdx = bullet.indexOf(")");
      title = bullet.substring(0, openParenIdx).trim();
      if (closeParenIdx > openParenIdx) {
        desc = bullet.substring(openParenIdx + 1, closeParenIdx).trim();
      } else {
        desc = bullet.substring(openParenIdx + 1).trim();
      }
    } else {
      const separators = [
        " avec ",
        " proposant ",
        " qui ",
        " que ",
        " pour ",
        " afin de ",
        " et ",
        " retenue ",
      ];
      let foundSeparator = false;
      for (const sep of separators) {
        if (bullet.includes(sep)) {
          const parts = bullet.split(sep);
          title = parts[0].trim();
          desc = bullet;
          foundSeparator = true;
          break;
        }
      }
      if (!foundSeparator) {
        const words = bullet.split(" ");
        title = words.slice(0, Math.min(3, words.length)).join(" ");
        desc = bullet;
      }
    }

    if (title) {
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    return { title, desc };
  };

  const sections = data?.sections || [];
  const hdPhotos = sections.find(
    (s) => s.section_id === "hd-photos" || s.section_id === "photos-hd",
  );
  const videos360 = sections.find(
    (s) => s.section_id === "360-videos" || s.section_id === "videos-360",
  );
  const virtualSpace = sections.find(
    (s) =>
      s.section_id === "virtual-space" || s.section_id === "espace-virtuel",
  );
  const saleAdvantages = sections.find(
    (s) =>
      s.section_id === "sale-advantages" ||
      s.section_id === "avantages-de-la-vente",
  );
  const maximizeImpact = sections.find(
    (s) =>
      s.section_id === "maximize-impact" || s.section_id === "maximiser-impact",
  );

  const displaySaleAdvantages = (saleAdvantages?.bullets || []).map(
    (bullet, index) => {
      const original = InsuranceData[index];
      const parsed = parseBullet(bullet);
      return {
        icon: original?.icon || <CustomBuyers />,
        title: parsed.title,
        desc: parsed.desc,
      };
    },
  );

  return (
    <div className="space-y-10 mx-auto">
      {/* HD Professional Photos */}
      {hdPhotos && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center py-10 lg:py-20">
          <div className="space-y-4">
            {hdPhotos.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: hdPhotos.title }}
              ></p>
            )}
            {hdPhotos.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: hdPhotos.description }}
              ></p>
            )}
            {hdPhotos.bullets && hdPhotos.bullets.length > 0 && (
              <div className="space-y-3">
                {hdPhotos.bullets.map((bullet, idx) => {
                  const parsed = parseBullet(bullet);
                  return (
                    <p key={idx} className=" flex items-center gap-2">
                      <CustomCheck />{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: parsed.desc }}
                      ></span>
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          {hdPhotos.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={hdPhotos.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* 360° Immersive Videos */}
      {videos360 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center py-10 lg:py-20">
          {videos360.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={videos360.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4">
            {videos360.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: videos360.title }}
              ></p>
            )}
            {videos360.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: videos360.description }}
              ></p>
            )}
            {videos360.bullets && videos360.bullets.length > 0 && (
              <div className="space-y-3">
                {videos360.bullets.map((bullet, idx) => {
                  const parsed = parseBullet(bullet);
                  return (
                    <p key={idx} className=" flex items-center gap-2">
                      <CustomCheck />{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: parsed.desc }}
                      ></span>
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Virtual Showroom */}
      {virtualSpace && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center py-10 lg:py-20">
          <div className="space-y-4">
            {virtualSpace.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: virtualSpace.title }}
              ></p>
            )}
            {virtualSpace.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: virtualSpace.description }}
              ></p>
            )}
            {virtualSpace.bullets && virtualSpace.bullets.length > 0 && (
              <div className="space-y-3">
                {virtualSpace.bullets.map((bullet, idx) => {
                  const parsed = parseBullet(bullet);
                  return (
                    <p key={idx} className=" flex items-center gap-2">
                      <CustomCheck />{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: parsed.desc }}
                      ></span>
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          {virtualSpace.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={virtualSpace.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Sale Advantages */}
      {saleAdvantages && displaySaleAdvantages.length > 0 && (
        <div className=" mx-auto">
          <div className="space-y-4 lg:space-y-5">
            {saleAdvantages.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: saleAdvantages.title }}
              ></p>
            )}
            {saleAdvantages.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: saleAdvantages.description }}
              ></p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displaySaleAdvantages.map((item, index) => (
                <div key={index} className="bg-gray-100 rounded p-5  space-y-4">
                  {item.icon && (
                    <div className="w-12 h-12 font-semibold bg-custom-primary text-white  rounded flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                  )}
                  {item.title && (
                    <p
                      className="lg:text-2xl font-medium"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></p>
                  )}
                  <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Maximize Your Listing Impact */}
      {maximizeImpact && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center py-10 lg:py-20">
          <div className="space-y-4">
            {maximizeImpact.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: maximizeImpact.title }}
              ></p>
            )}
            {maximizeImpact.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: maximizeImpact.description }}
              ></p>
            )}
            {maximizeImpact.bullets && maximizeImpact.bullets.length > 0 && (
              <div className="space-y-3">
                {maximizeImpact.bullets.map((bullet, idx) => {
                  const parsed = parseBullet(bullet);
                  return (
                    <p key={idx} className=" flex items-center gap-2">
                      <CustomCheck />{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: parsed.desc }}
                      ></span>
                    </p>
                  );
                })}
              </div>
            )}
            <div className="pt-4">
              <Link
                to="/dashboard"
                className="bg-custom-primary inline-flex hover:bg-custom-primary/80 transition-all duration-300 text-white py-4 font-semibold px-4 rounded items-center gap-2 "
              >
                Showcase Your Ad Now
              </Link>
            </div>
          </div>
          {maximizeImpact.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={maximizeImpact.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VirtualShowroomKeyPoints;
