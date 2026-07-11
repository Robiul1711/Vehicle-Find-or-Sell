import {
  CustomCheck2,
  CustomConsequences,
  CustomCoverage,
  CustomDeductible,
  CustomExclusion,
  CustomImportant,
  CustomInsurance2,
  CustomLevel,
  CustomOnline,
  CustomPassenger,
  CustomProtection,
  CustomReimbursement,
  CustomReplacement,
  CustomRoadSide,
  CustomTraditional,
} from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";

const PolicyDetails = [
  {
    id: 1,
    icon: <CustomDeductible />,
    title: "Deductible",
    desc: "Amount you pay first",
  },
  {
    id: 2,
    icon: <CustomExclusion />,
    title: "Exclusions",
    desc: "Cases not covered",
  },
  {
    id: 3,
    icon: <CustomRoadSide />,
    title: "Roadside Assistance",
    desc: "Towing & breakdown",
  },
  {
    id: 4,
    icon: <CustomPassenger />,
    title: "Passenger Coverage",
    desc: "Protection for riders",
  },
  {
    id: 5,
    icon: <CustomReimbursement />,
    title: "Reimbursement Value",
    desc: "How much you get back",
  },
  {
    id: 6,
    icon: <CustomReplacement />,
    title: "Replacement Car",
    desc: "Temporary vehicle",
  },
];

const InsuranceData = [
  {
    id: 1,
    title: "Define Your Needs",
    desc: "Consider vehicle value, usage, and budget",
  },
  {
    id: 2,
    title: "Compare Coverage Options",
    desc: "Review third-party, intermediate, and comprehensive plans",
  },
  {
    id: 3,
    title: "Examine Deductibles & Exclusions",
    desc: "Check what is not covered and how much you’ll pay in case of a claim",
  },
  {
    id: 4,
    title: "Check Included Services",
    desc: "Look for roadside assistance, replacement vehicles, and other extras",
  },
  {
    id: 5,
    title: "Compare Multiple Quotes",
    desc: "Evaluate several insurers before committing",
  },
];

const InsuranceEssentials = [
  {
    id: 1,
    icon: <CustomInsurance2 />,
    title: "Insurance",
    desc: "Mandatory",
  },
  {
    id: 2,
    icon: <CustomLevel />,
    title: "3 levels",
    desc: "Third-party, Intermediate, Comprehensive",
  },
  {
    id: 3,
    icon: <CustomPassenger />,
    title: "Players",
    desc: "Traditional, Banks, Online, Brokers",
  },
  {
    id: 4,
    icon: <CustomImportant />,
    title: "Important",
    desc: "Deductible, Exclusions, Eervices",
  },
];
const CarInsuranceBannerKeypoints = ({ data }) => {
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
  const essentials = sections.find(
    (s) => s.section_id === "essentiels-assurance",
  );
  const detailsContrat = sections.find(
    (s) => s.section_id === "details-contrat",
  );
  const choisirAssurance = sections.find(
    (s) => s.section_id === "choisir-assurance",
  );
  const prestataires = sections.find((s) => s.section_id === "prestataires");
  const niveauxCouverture = sections.find(
    (s) => s.section_id === "niveaux-de-couverture",
  );
  const pourquoiAssurance = sections.find(
    (s) => s.section_id === "pourquoi-assurance",
  );

  // Dynamic Policy Details Mapping
  const displayPolicyDetails = (detailsContrat?.bullets || []).map(
    (bullet, index) => {
      const original = PolicyDetails[index];
      const parsed = parseBullet(bullet);
      return {
        icon: original?.icon || <CustomDeductible />,
        title: parsed.title,
        desc: parsed.desc,
      };
    },
  );

  // Dynamic Selecting the Right Insurance Mapping
  const displayInsuranceData = (choisirAssurance?.bullets || []).map(
    (bullet, index) => {
      const parsed = parseBullet(bullet);
      return {
        id: index + 1,
        title: parsed.title,
        desc: parsed.desc,
      };
    },
  );

  // Dynamic Insurance Essentials Mapping
  const displayInsuranceEssentials = (essentials?.bullets || []).map(
    (bullet, index) => {
      const original = InsuranceEssentials[index];
      const parsed = parseBullet(bullet);
      return {
        icon: original?.icon || <CustomInsurance2 />,
        title: parsed.title,
        desc: parsed.desc,
      };
    },
  );

  return (
    <div className="lg:space-y-20 mx-auto">
      {/* Car Insurance: A Legal Requirement */}
      {pourquoiAssurance && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center container">
          <div className="space-y-4 lg:space-y-10">
            {pourquoiAssurance.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: pourquoiAssurance.title }}
              ></p>
            )}
            {pourquoiAssurance.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: pourquoiAssurance.description,
                }}
              ></p>
            )}
            {pourquoiAssurance.bullets &&
              pourquoiAssurance.bullets.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pourquoiAssurance.bullets.map((bullet, idx) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <div
                        key={idx}
                        className={`rounded p-5 text-white space-y-4 ${idx % 2 === 0 ? "bg-[#92cc14]" : "bg-[#f5b330]"}`}
                      >
                        <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
                          {idx % 2 === 0 ? (
                            <CustomProtection />
                          ) : (
                            <CustomConsequences />
                          )}
                        </div>
                        {parsed.title && (
                          <p
                            className="lg:text-2xl font-medium"
                            dangerouslySetInnerHTML={{ __html: parsed.title }}
                          ></p>
                        )}
                        <p
                          dangerouslySetInnerHTML={{ __html: parsed.desc }}
                        ></p>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
          {pourquoiAssurance.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={pourquoiAssurance.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Levels of Coverage */}
      {niveauxCouverture && (
        <div className=" mx-auto">
          <div className="space-y-4 lg:space-y-5">
            {niveauxCouverture.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: niveauxCouverture.title }}
              ></p>
            )}
            {niveauxCouverture.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: niveauxCouverture.description,
                }}
              ></p>
            )}
            {niveauxCouverture.extra_data?.cards ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {niveauxCouverture.extra_data.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f5b330]  rounded p-5 text-white space-y-4"
                  >
                    <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                      <CustomCoverage />
                    </div>

                    <p className="lg:text-2xl font-medium">{card.name}</p>
                    {card.items?.map((item, subIdx) => (
                      <p key={subIdx} className="flex items-center gap-1">
                        <CustomCheck2 /> {item}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              niveauxCouverture.bullets && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {niveauxCouverture.bullets.map((bullet, idx) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <div
                        key={idx}
                        className="bg-[#f5b330] rounded p-5 text-white space-y-4"
                      >
                        <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
                          <CustomCoverage />
                        </div>
                        {parsed.title && (
                          <p
                            className="lg:text-2xl font-medium"
                            dangerouslySetInnerHTML={{ __html: parsed.title }}
                          ></p>
                        )}
                        <p
                          className="text-base"
                          dangerouslySetInnerHTML={{ __html: parsed.desc }}
                        ></p>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Who Provides Car Insurance? */}
      {prestataires && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          <div className="space-y-4 lg:space-y-10">
            {prestataires.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: prestataires.title }}
              ></p>
            )}
            {prestataires.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: prestataires.description }}
              ></p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prestataires.extra_data?.categories
                ? prestataires.extra_data.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="bg-custom-primary  rounded p-5 text-white space-y-4"
                    >
                      <p className="lg:text-2xl font-medium">{cat.title}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {cat.items?.map((item, itemIdx) => (
                          <p key={itemIdx} className="flex items-center gap-1">
                            <CustomCheck2 /> {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))
                : prestataires.bullets?.map((bullet, idx) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <div
                        key={idx}
                        className="bg-custom-primary  rounded p-5 text-white space-y-4"
                      >
                        {parsed.title && (
                          <p
                            className="lg:text-2xl font-medium"
                            dangerouslySetInnerHTML={{ __html: parsed.title }}
                          ></p>
                        )}
                        <p
                          className="text-base flex items-center gap-2"
                          dangerouslySetInnerHTML={{ __html: parsed.desc }}
                        ></p>
                      </div>
                    );
                  })}
            </div>
          </div>
          {prestataires.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={prestataires.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Important Policy Details */}
      {detailsContrat && displayPolicyDetails.length > 0 && (
        <div className="lg:space-y-5">
          {detailsContrat.title && (
            <p
              className="lg:text-3xl font-bold"
              dangerouslySetInnerHTML={{ __html: detailsContrat.title }}
            ></p>
          )}
          {detailsContrat.description && (
            <p
              className="lg:text-xl"
              dangerouslySetInnerHTML={{ __html: detailsContrat.description }}
            ></p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
            {detailsContrat.image_url && (
              <div className="">
                <img
                  className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                  src={detailsContrat.image_url}
                  alt=""
                />
              </div>
            )}
            <div className="space-y-4 lg:space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayPolicyDetails.map((item, idx) => (
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
        </div>
      )}

      {/* Selecting the Right Insurance */}
      {choisirAssurance && displayInsuranceData.length > 0 && (
        <div className=" mx-auto">
          <div className="space-y-4 lg:space-y-5">
            {choisirAssurance.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: choisirAssurance.title }}
              ></p>
            )}
            {choisirAssurance.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: choisirAssurance.description,
                }}
              ></p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {displayInsuranceData.map((item, idx) => (
                <div key={idx} className="bg-gray-100 rounded p-5  space-y-4">
                  <div className="w-12 h-12 font-semibold bg-custom-primary text-white  rounded flex items-center justify-center mr-4">
                    0{item.id}
                  </div>
                  <p
                    className="lg:text-2xl font-medium"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></p>
                  <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Car Insurance Essentials */}
      {essentials && displayInsuranceEssentials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          <div className="space-y-4 lg:space-y-10">
            {essentials.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: essentials.title }}
              ></p>
            )}
            {essentials.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: essentials.description }}
              ></p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {displayInsuranceEssentials.map((item, idx) => (
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
          {essentials.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={essentials.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarInsuranceBannerKeypoints;
