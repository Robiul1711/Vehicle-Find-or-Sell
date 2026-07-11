import {
  CustomAdvantage,
  CustomCheck,
  CustomCheck2,
  CustomCost,
  CustomDelivery2,
  CustomDisadvantage,
  CustomHandover,
  CustomIns,
  CustomJockey,
  CustomLocationInt,
  CustomLogistics,
  CustomPremium,
  CustomProfessional,
  CustomTransporter,
  CustomVerified,
} from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";

const SummaryData = [
  {
    id: 1,
    icon: <CustomCost />,
    title: "Cost",
    desc: "Depends on distance, urgency, and type of delivery",
  },
  {
    id: 2,
    icon: <CustomIns />,
    title: "Insurance",
    desc: "Verify that the transporter or driver has coverage for damage during transport.",
  },
  {
    id: 3,
    icon: <CustomDelivery2 />,
    title: "Delivery time",
    desc: "grouped transport = longer delays, individual transport = faster.",
  },
  {
    id: 4,
    icon: <CustomHandover />,
    title: "Vehicle handover",
    desc: "Ensure inspection is done at departure and arrival (delivery report).",
  },
];

const PossibleData = [
  {
    id: 1,
    icon: <CustomLogistics />,
    title: "Shared logistics to reduce costs",
    desc: "Group shipments with other customers for cost savings",
  },
  {
    id: 2,
    icon: <CustomLocationInt />,
    title: "International delivery",
    desc: "Ship + truck + customs handling for cross-border delivery",
  },
  {
    id: 3,
    icon: <CustomPremium />,
    title: "Premium services",
    desc: "GPS tracking, cleaning, personalized handover",
  },
];

const InSummaryData = [
  {
    id: 1,
    icon: <CustomProfessional />,
    title: "By the selling professional",
    desc: "Convenient, but local",
  },
  {
    id: 2,
    icon: <CustomTransporter />,
    title: "By Transporter (multi-car or individual)",
    desc: "Safe, reliable",
  },
  {
    id: 3,
    icon: <CustomJockey />,
    title: "By driver (jockey)",
    desc: "Fast, but adds mileage",
  },
  {
    id: 4,
    icon: <CustomPremium />,
    title: "Premium options",
    desc: "Tracking, full service",
  },
];

const VehicleDeliveryKeypoints = ({ data }) => {
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
  const possibleSolutions = sections.find(
    (s) => s.section_id === "autres-solutions",
  );
  const transportSpecialised = sections.find(
    (s) => s.section_id === "transport-specialise",
  );
  const deliveryByPro = sections.find(
    (s) => s.section_id === "livraison-par-professionnels",
  );
  const summary = sections.find((s) => s.section_id === "résumé");
  const keyFactors = sections.find((s) => s.section_id === "facteurs-cles");
  const driverDelivery = sections.find(
    (s) => s.section_id === "livraison-par-chauffeur",
  );

  // Dynamic ProvidersData (Specialized Transport) mapping
  const providersDataMapped = (
    transportSpecialised?.extra_data?.cards || []
  ).map((card, index) => {
    return {
      id: index + 1,
      title: card.name,
      desc1: card.items?.[0] || "",
      desc2: card.items?.[1] || "",
      desc3: card.items?.[2] || "",
    };
  });

  // Dynamic SummaryData (Key Factors) mapping
  const summaryDataMapped = (keyFactors?.bullets || []).map((bullet, index) => {
    const original = SummaryData[index];
    const parsed = parseBullet(bullet);
    return {
      icon: original?.icon || <CustomCost />,
      title: parsed.title,
      desc: parsed.desc,
    };
  });

  // Dynamic PossibleData mapping
  const possibleDataMapped = (possibleSolutions?.bullets || []).map(
    (bullet, index) => {
      const original = PossibleData[index];
      const parsed = parseBullet(bullet);
      return {
        icon: original?.icon || <CustomLogistics />,
        title: parsed.title,
        desc: parsed.desc,
      };
    },
  );

  // Dynamic InSummaryData mapping
  const inSummaryDataMapped = (summary?.bullets || []).map((bullet, index) => {
    const original = InSummaryData[index];
    const parsed = parseBullet(bullet);
    return {
      icon: original?.icon || <CustomProfessional />,
      title: parsed.title,
      desc: parsed.desc,
    };
  });

  return (
    <div className="lg:space-y-20 mx-auto">
      {/* Delivery Services by Professionals */}
      {deliveryByPro && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center container">
          <div className="space-y-4 lg:space-y-10">
            {deliveryByPro.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: deliveryByPro.title }}
              ></p>
            )}
            {deliveryByPro.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: deliveryByPro.description }}
              ></p>
            )}

            {deliveryByPro.advantages &&
              deliveryByPro.advantages.length > 0 && (
                <div className="space-y-5">
                  {deliveryByPro.advantages.map((adv, idx) => (
                    <p key={idx} className=" flex items-center gap-2">
                      <CustomCheck /> {adv}
                    </p>
                  ))}
                </div>
              )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliveryByPro.advantages &&
                deliveryByPro.advantages.length > 0 && (
                  <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      <CustomAdvantage />
                    </div>
                    <p className="lg:text-2xl font-medium">Advantage</p>
                    <p className="text-sm lg:text-base">
                      {deliveryByPro.advantages[0]}
                    </p>
                  </div>
                )}
              {deliveryByPro.disadvantages &&
                deliveryByPro.disadvantages.length > 0 && (
                  <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      <CustomDisadvantage />
                    </div>
                    <p className="lg:text-2xl font-medium">Disadvantage</p>
                    <p className="text-sm lg:text-base">
                      {deliveryByPro.disadvantages[0]}
                    </p>
                  </div>
                )}
            </div>
          </div>
          {deliveryByPro.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={deliveryByPro.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Specialized Transport Companies */}
      {transportSpecialised && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {transportSpecialised.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={transportSpecialised.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4 lg:space-y-10">
            {transportSpecialised.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: transportSpecialised.title }}
              ></p>
            )}
            {transportSpecialised.description && (
              <p
                className="lg:text-lg font-medium"
                dangerouslySetInnerHTML={{
                  __html: transportSpecialised.description,
                }}
              ></p>
            )}

            {providersDataMapped.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {providersDataMapped.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-custom-primary  rounded p-5 text-white space-y-4"
                  >
                    <p
                      className="lg:text-2xl font-medium"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></p>
                    {item.desc1 && (
                      <p
                        className="text-base flex items-center gap-2"
                        dangerouslySetInnerHTML={{ __html: item.desc1 }}
                      ></p>
                    )}
                    {item.desc2 && (
                      <p
                        className="text-base flex items-center gap-2"
                        dangerouslySetInnerHTML={{ __html: item.desc2 }}
                      ></p>
                    )}
                    {item.desc3 && (
                      <p
                        className="text-base flex items-center gap-2"
                        dangerouslySetInnerHTML={{ __html: item.desc3 }}
                      ></p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transportSpecialised.advantages &&
                transportSpecialised.advantages.length > 0 && (
                  <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      <CustomAdvantage />
                    </div>
                    <p className="lg:text-2xl font-medium">Advantage</p>
                    <p className="text-sm">
                      {transportSpecialised.advantages[0]}
                    </p>
                  </div>
                )}
              {transportSpecialised.disadvantages &&
                transportSpecialised.disadvantages.length > 0 && (
                  <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      <CustomDisadvantage />
                    </div>
                    <p className="lg:text-2xl font-medium">Disadvantage</p>
                    <p className="text-sm">
                      {transportSpecialised.disadvantages[0]}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Driver Delivery (Jockey System) */}
      {driverDelivery && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center container">
          <div className="space-y-4 lg:space-y-10">
            {driverDelivery.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: driverDelivery.title }}
              ></p>
            )}
            {driverDelivery.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: driverDelivery.description }}
              ></p>
            )}

            {driverDelivery.advantages &&
              driverDelivery.advantages.length > 0 && (
                <div className="space-y-5">
                  {driverDelivery.advantages.map((adv, idx) => (
                    <p key={idx} className=" flex items-center gap-2">
                      <CustomCheck /> {adv}
                    </p>
                  ))}
                </div>
              )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {driverDelivery.advantages &&
                driverDelivery.advantages.length > 0 && (
                  <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      <CustomAdvantage />
                    </div>
                    <p className="lg:text-2xl font-medium">Advantage</p>
                    <p className="text-sm lg:text-base">
                      {driverDelivery.advantages[0]}
                    </p>
                  </div>
                )}
              {driverDelivery.disadvantages &&
                driverDelivery.disadvantages.length > 0 && (
                  <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      <CustomDisadvantage />
                    </div>
                    <p className="lg:text-2xl font-medium">Disadvantage</p>
                    <p className="text-sm lg:text-base">
                      {driverDelivery.disadvantages[0]}
                    </p>
                  </div>
                )}
            </div>
          </div>
          {driverDelivery.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={driverDelivery.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Key Factors to Consider */}
      {keyFactors && summaryDataMapped.length > 0 && (
        <div>
          <div className="mb-5">
            {keyFactors.title && (
              <p
                className="lg:text-3xl font-bold mb-5"
                dangerouslySetInnerHTML={{ __html: keyFactors.title }}
              ></p>
            )}
            {keyFactors.description && (
              <p
                className="lg:text-xl font-medium"
                dangerouslySetInnerHTML={{ __html: keyFactors.description }}
              ></p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 items-center justify-center">
            <div className="space-y-4 lg:space-y-10">
              {summaryDataMapped.slice(0, 2).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-custom-primary  rounded p-5 text-white space-y-4"
                >
                  {item.icon && (
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                  )}
                  <p
                    className="lg:text-2xl font-medium"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></p>
                  <p
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  ></p>
                </div>
              ))}
            </div>
            {keyFactors.image_url && (
              <div className="">
                <img
                  src={keyFactors.image_url}
                  className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                  alt=""
                />
              </div>
            )}
            <div className="space-y-4 lg:space-y-10">
              {summaryDataMapped.slice(2, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-custom-primary  rounded p-5 text-white space-y-4"
                >
                  {item.icon && (
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                  )}
                  <p
                    className="lg:text-2xl font-medium"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></p>
                  <p
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  ></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Possible Solutions */}
      {possibleSolutions && possibleDataMapped.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {possibleSolutions.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={possibleSolutions.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4 lg:space-y-10">
            {possibleSolutions.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: possibleSolutions.title }}
              ></p>
            )}
            {possibleSolutions.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: possibleSolutions.description,
                }}
              ></p>
            )}
            <div className="grid grid-cols-1  gap-4">
              {possibleDataMapped.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-custom-primary  rounded p-5 text-white space-y-4"
                >
                  {item.icon && (
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                  )}
                  <p
                    className="lg:text-2xl font-medium"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></p>
                  <p
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  ></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* In Summary */}
      {summary && inSummaryDataMapped.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          <div className="space-y-4 lg:space-y-10">
            {summary.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: summary.title }}
              ></p>
            )}
            {summary.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: summary.description }}
              ></p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {inSummaryDataMapped.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-custom-primary  rounded p-5 text-white space-y-4"
                >
                  {item.icon && (
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                  )}
                  <p
                    className="lg:text-2xl font-medium"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></p>
                  <p
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  ></p>
                </div>
              ))}
            </div>
          </div>
          {summary.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={summary.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleDeliveryKeypoints;
