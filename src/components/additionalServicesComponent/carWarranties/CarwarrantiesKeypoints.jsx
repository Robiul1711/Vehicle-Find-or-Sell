import {
  CustomAdvantage,
  CustomCheck,
  CustomCheck2,
  CustomCheckGreen,
  CustomCompass,
  CustomContractual,
  CustomCross,
  CustomDealer,
  CustomDisadvantage,
  CustomLegal,
  CustomPrivate,
  CustomReputation,
  CustomTerm,
  CustomTransferability,
  CustomVerified,
  CustomWarning,
} from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";

const SummaryData = [
  {
    id: 1,
    icon: <CustomTerm />,
    title: "Read All Terms",
    desc: "Understand coverage limits, exclusions, and claim procedures",
  },
  {
    id: 2,
    icon: <CustomCompass />,
    title: "Compare Costs",
    desc: "Evaluate premium costs vs. potential repair savings",
  },
  {
    id: 3,
    icon: <CustomTransferability />,
    title: "Check Transferability",
    desc: "Verify if warranty transfers to new owners",
  },
  {
    id: 4,
    icon: <CustomReputation />,
    title: "Provider Reputation",
    desc: "Research provider reliability and claim settlement record",
  },
];

const InsuranceEssentials = [
  {
    id: 1,
    icon: <CustomLegal />,
    title: "Legal Warranty",
    desc: "Mandatory 2 year protection from professionals",
  },
  {
    id: 2,
    icon: <CustomContractual />,
    title: "Contractual Warranty",
    desc: "Extended manufacturer/dealer coverage",
  },
  {
    id: 3,
    icon: <CustomPrivate />,
    title: "External Providers ",
    desc: "Specialized breakdown insurance",
  },
  {
    id: 4,
    icon: <CustomVerified />,
    title: "Professional vs Private",
    desc: "Maximum vs limited protection",
  },
];

const CarwarrantiesKeypoints = ({ data }) => {
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
  const legalWarranty = sections.find(
    (s) =>
      s.section_id === "legal-warranty" || s.section_id === "garantie-legale",
  );
  const contractualWarranty = sections.find(
    (s) =>
      s.section_id === "contractual-warranty" ||
      s.section_id === "garantie-contractuelle",
  );
  const externalProviders = sections.find(
    (s) =>
      s.section_id === "external-providers" ||
      s.section_id === "prestataires-externes",
  );
  const dealerWarranties = sections.find(
    (s) =>
      s.section_id === "dealer-warranties" ||
      s.section_id === "garanties-concessionnaire",
  );
  const practicalTips = sections.find(
    (s) =>
      s.section_id === "practical-tips" ||
      s.section_id === "conseils-pratiques",
  );
  const summary = sections.find(
    (s) => s.section_id === "summary" || s.section_id === "résumé",
  );

  const displayPracticalTips = (practicalTips?.bullets || []).map(
    (bullet, index) => {
      const original = SummaryData[index];
      const parsed = parseBullet(bullet);
      return {
        icon: original?.icon || <CustomTerm />,
        title: parsed.title,
        desc: parsed.desc,
      };
    },
  );

  const displaySummaryData = (summary?.bullets || []).map((bullet, index) => {
    const original = InsuranceEssentials[index];
    const parsed = parseBullet(bullet);
    return {
      icon: original?.icon || <CustomLegal />,
      title: parsed.title,
      desc: parsed.desc,
    };
  });

  return (
    <div className="space-y-20 mx-auto">
      {/* Legal Warranty (Mandatory Protection) */}
      {legalWarranty && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          <div className="space-y-4">
            {legalWarranty.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: legalWarranty.title }}
              ></p>
            )}
            {legalWarranty.description && (
              <p
                className="lg:text-xl font-medium"
                dangerouslySetInnerHTML={{ __html: legalWarranty.description }}
              ></p>
            )}
            {legalWarranty.bullets && legalWarranty.bullets.length > 0 && (
              <ul className="list-disc pl-4 space-y-2">
                {legalWarranty.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: bullet }}
                  ></li>
                ))}
              </ul>
            )}
          </div>
          {legalWarranty.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={legalWarranty.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Contractual Warranty (Extra Seller/Manufacturer Coverage) */}
      {contractualWarranty && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {contractualWarranty.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={contractualWarranty.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4">
            {contractualWarranty.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: contractualWarranty.title }}
              ></p>
            )}
            {contractualWarranty.description && (
              <p
                className="lg:text-xl font-medium"
                dangerouslySetInnerHTML={{
                  __html: contractualWarranty.description,
                }}
              ></p>
            )}
            {contractualWarranty.bullets &&
              contractualWarranty.bullets.length > 0 && (
                <ul className="list-disc pl-4 space-y-2">
                  {contractualWarranty.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    ></li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      )}

      {/* External Warranty Providers */}
      {externalProviders && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          <div className="space-y-4 lg:space-y-10">
            {externalProviders.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: externalProviders.title }}
              ></p>
            )}
            {externalProviders.description && (
              <p
                className="lg:text-lg font-medium"
                dangerouslySetInnerHTML={{
                  __html: externalProviders.description,
                }}
              ></p>
            )}

            {externalProviders.bullets &&
              externalProviders.bullets.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {externalProviders.bullets.map((bullet, idx) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <div
                        key={idx}
                        className="bg-custom-primary rounded p-5 text-white space-y-4"
                      >
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
              )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {externalProviders.advantages &&
                externalProviders.advantages.length > 0 && (
                  <div className="bg-[#92cc14] rounded p-5 text-white space-y-4">
                    <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
                      <CustomAdvantage />
                    </div>
                    <p className="lg:text-2xl font-medium">Advantage</p>
                    <div className="text-sm space-y-2">
                      {externalProviders.advantages.map((adv, idx) => (
                        <p key={idx}>{adv}</p>
                      ))}
                    </div>
                  </div>
                )}
              {externalProviders.disadvantages &&
                externalProviders.disadvantages.length > 0 && (
                  <div className="bg-[#f5b330] rounded p-5 text-white space-y-4">
                    <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
                      <CustomDisadvantage />
                    </div>
                    <p className="lg:text-2xl font-medium">Disadvantage</p>
                    <div className="text-sm space-y-2">
                      {externalProviders.disadvantages.map((dis, idx) => (
                        <p key={idx}>{dis}</p>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
          {externalProviders.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={externalProviders.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Warranties from Dealers & Garages */}
      {dealerWarranties && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {dealerWarranties.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={dealerWarranties.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4">
            {dealerWarranties.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: dealerWarranties.title }}
              ></p>
            )}
            {dealerWarranties.description && (
              <p
                className="lg:text-xl font-medium"
                dangerouslySetInnerHTML={{
                  __html: dealerWarranties.description,
                }}
              ></p>
            )}
            {dealerWarranties.bullets &&
              dealerWarranties.bullets.length > 0 && (
                <ul className="list-disc pl-4 space-y-2">
                  {dealerWarranties.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    ></li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      )}

      {/* Practical Warranty Tips */}
      {practicalTips && (
        <div>
          <div className="mb-5">
            {practicalTips.title && (
              <p
                className="lg:text-3xl font-bold mb-5"
                dangerouslySetInnerHTML={{ __html: practicalTips.title }}
              ></p>
            )}
            {practicalTips.description && (
              <p
                className="lg:text-xl font-medium"
                dangerouslySetInnerHTML={{ __html: practicalTips.description }}
              ></p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 items-center justify-center">
            {displayPracticalTips.length > 0 && (
              <div className="space-y-4 lg:space-y-10">
                {displayPracticalTips.slice(0, 2).map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-custom-primary rounded p-5 text-white space-y-4"
                  >
                    {item.icon && (
                      <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
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
            )}
            {practicalTips.image_url && (
              <div className="">
                <img
                  className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                  src={practicalTips.image_url}
                  alt=""
                />
              </div>
            )}
            {displayPracticalTips.length > 2 && (
              <div className="space-y-4 lg:space-y-10">
                {displayPracticalTips.slice(2, 4).map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-custom-primary rounded p-5 text-white space-y-4"
                  >
                    {item.icon && (
                      <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
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
            )}
          </div>
        </div>
      )}

      {/* Summary of Warranty Options */}
      {summary && (
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
            {displaySummaryData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {displaySummaryData.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-custom-primary rounded p-5 text-white space-y-4"
                  >
                    {item.icon && (
                      <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
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
            )}
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

export default CarwarrantiesKeypoints;
