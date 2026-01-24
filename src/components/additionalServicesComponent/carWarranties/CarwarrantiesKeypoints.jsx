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

const ProvidersData = [
  {
    id: 1,
    title: "Opteven",
    desc: "Mechanical breakdown warranties, assistance, and service contracts.",
  },
  {
    id: 2,
    title: "Cirano",
    desc: "Warranty extensions for private buyers & professionals.",
  },
  {
    id: 3,
    title: "Label",
    desc: "Coverage for breakdowns & roadside assistance.",
  },
  {
    id: 4,
    title: "Other Well-Known Providers",
    desc: "Mapfre, CarGarantie, Icare & Garantie M across Europe.",
  },
];

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
  const sections = data?.sections || [];
  const legalWarranty = sections.find((s) => s.section_id === "legal-warranty");
  const contractualWarranty = sections.find(
    (s) => s.section_id === "contractual-warranty"
  );
  const externalProviders = sections.find(
    (s) => s.section_id === "external-providers"
  );
  const dealerWarranties = sections.find(
    (s) => s.section_id === "dealer-warranties"
  );
  const practicalTips = sections.find((s) => s.section_id === "practical-tips");
  const summary = sections.find((s) => s.section_id === "summary");

  return (
    <div className="space-y-20 mx-auto">
      {/* Legal Warranty (Mandatory Protection) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold">
            {legalWarranty?.title || "Legal Warranty (Mandatory Protection)"}
          </p>
          <p className="lg:text-xl font-medium">
            {legalWarranty?.description ||
              "Covers hidden faults or non-conformities, valid for 2 years when buying from a professional."}
          </p>
          <ul className="list-disc pl-4">
            {(
              legalWarranty?.bullets || [
                "Protects against hidden defects present at time of sale",
                "Covers major mechanical and electrical faults",
                "Valid for 2 years from purchase date",
                "Applies only when buying from professional dealers",
              ]
            ).map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
          <p className="flex items-center gap-2">
            <CustomCheckGreen /> Mandatory protection with no additional cost
          </p>
          <p className="flex items-center gap-2">
            <CustomCross /> Works for national and cross-border delivery.
          </p>
        </div>
        <div className="">
          <img
            src={legalWarranty?.image_url || ImageProvider.warrenty1}
            className="w-full"
            alt=""
          />
        </div>
      </div>

      {/* Contractual Warranty (Extra Seller/Manufacturer Coverage) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
        <div className="">
          <img
            src={contractualWarranty?.image_url || ImageProvider.warrenty2}
            className="w-full"
            alt=""
          />
        </div>
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold">
            {contractualWarranty?.title ||
              "Contractual Warranty (Extra Seller/Manufacturer Coverage)"}
          </p>
          <p className="lg:text-xl font-medium">
            {contractualWarranty?.description ||
              "Additional coverage included or purchased at the time of sale, with variable duration and terms."}
          </p>
          <ul className="list-disc pl-4">
            {(
              contractualWarranty?.bullets || [
                "Extended manufacturer warranty (3-5 years typical)",
                "Dealer-provided service contracts",
                "Specific component coverage (engine, transmission)",
                "Roadside assistance and breakdown cover",
              ]
            ).map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
          <p className="flex items-center gap-2">
            <CustomCheckGreen />
            Broader coverage beyond legal requirements
          </p>
          <p className="flex items-center gap-2">
            <CustomCross /> Terms and exclusions vary significantly
          </p>
        </div>
      </div>

      {/* External Warranty Providers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
        <div className="space-y-4 lg:space-y-10">
          <p className="lg:text-3xl font-bold">
            {externalProviders?.title || "External Warranty Providers"}
          </p>
          <p className="lg:text-lg font-medium">
            {externalProviders?.description ||
              "Specialized companies offering mechanical breakdown coverage and roadside assistance beyond the manufacturer's warranty."}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ProvidersData?.map((item) => (
              <div
                key={item.id}
                className="bg-custom-primary  rounded p-5 text-white space-y-4"
              >
                <p className="lg:text-2xl font-medium">{item.title}</p>
                <p className="text-base ">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#92cc14]  rounded p-5 text-white space-y-4">
              <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                <CustomAdvantage />
              </div>

              <p className="lg:text-2xl font-medium">Advantage</p>
              <div className="text-sm space-y-2">
                {(
                  externalProviders?.advantages || [
                    "Covers breakdowns after manufacturer warranty ends, flexible plans, roadside assistance, replacement car, and wide garage access.",
                  ]
                ).map((adv, idx) => (
                  <p key={idx}>{adv}</p>
                ))}
              </div>
            </div>
            <div className="bg-[#f5b330]  rounded p-5 text-white space-y-4">
              <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                <CustomDisadvantage />
              </div>

              <p className="lg:text-2xl font-medium">Disadvantage</p>
              <div className="text-sm space-y-2">
                {(
                  externalProviders?.disadvantages || [
                    "Comes with extra costs, either monthly or one-time. Some limits apply, as normal wear or certain parts may not be covered.",
                  ]
                ).map((dis, idx) => (
                  <p key={idx}>{dis}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <img
            className="w-full"
            src={externalProviders?.image_url || ImageProvider.warrenty3}
            alt=""
          />
        </div>
      </div>

      {/* Warranties from Dealers & Garages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
        <div className="">
          <img
            src={dealerWarranties?.image_url || ImageProvider.warrenty4}
            className="w-full"
            alt=""
          />
        </div>
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold">
            {dealerWarranties?.title || "Warranties from Dealers & Garages"}
          </p>
          <p className="lg:text-xl font-medium">
            {dealerWarranties?.description ||
              "Professional sellers always include legal warranty and may add contractual or partner coverage."}
          </p>
          <ul className="list-disc pl-4">
            {(
              dealerWarranties?.bullets || [
                "Mandatory 2-year legal warranty",
                "Possible manufacturer warranty extension",
                "Dealer service packages and agreements",
                "Professional inspection and certification",
              ]
            ).map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
          <p className="flex items-center gap-2">
            <CustomCheckGreen />
            Maximum protection and professional support
          </p>
          <p className="flex items-center gap-2">
            <CustomCross /> Higher purchase price reflects warranty costs
          </p>
        </div>
      </div>

      {/* Private Seller Warranties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 ">
        <div className="space-y-4">
          <p className="lg:text-3xl font-bold">Private Seller Warranties</p>
          <p className="lg:text-xl font-medium">
            Limited protection, but transferable warranties or external coverage
            may still apply.
          </p>
          <ul className="list-disc pl-4">
            <li>Remaining manufacturer warranty (if transferable)</li>
            <li>Existing extended warranty agreements</li>
            <li>Third-party inspection services</li>
            <li>Post-purchase external warranty purchase</li>
          </ul>
          <p className="flex items-center gap-2">
            <CustomCheckGreen /> Lower purchase price allows warranty budget
          </p>
          <p className="flex items-center gap-2">
            <CustomCross /> No legal warranty protection included
          </p>
        </div>
        <div className="">
          <img src={ImageProvider.warrenty5} className="w-full" alt="" />
        </div>
      </div>

      {/* Practical Warranty Tips */}
      <div>
        <div className="mb-5">
          <p className="lg:text-3xl font-bold mb-5">
            {practicalTips?.title || "Practical Warranty Tips"}
          </p>
          <p className="lg:text-xl font-medium">
            {practicalTips?.description ||
              "Check terms, transfer options, exclusions, and compare providers before committing."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 items-center justify-center">
          <div className="space-y-4 lg:space-y-10">
            {(practicalTips?.bullets || SummaryData)
              .slice(0, 2)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-custom-primary  rounded p-5 text-white space-y-4"
                >
                  <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                    {typeof item === "string"
                      ? SummaryData[idx]?.icon
                      : item?.icon}
                  </div>

                  <p className="lg:text-2xl font-medium">
                    {typeof item === "string" ? item : item?.title}
                  </p>

                  <p className="text-base">
                    {typeof item === "string" ? "" : item?.desc}
                  </p>
                </div>
              ))}
          </div>
          <div className="">
            <img
              src={practicalTips?.image_url || ImageProvider.warrenty6}
              className="w-full"
              alt=""
            />
          </div>
          <div className="space-y-4 lg:space-y-10">
            {(practicalTips?.bullets || SummaryData)
              .slice(2, 4)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="bg-custom-primary  rounded p-5 text-white space-y-4"
                >
                  <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                    {typeof item === "string"
                      ? SummaryData[idx + 2]?.icon
                      : item?.icon}
                  </div>

                  <p className="lg:text-2xl font-medium">
                    {typeof item === "string" ? item : item?.title}
                  </p>

                  <p className="text-base">
                    {typeof item === "string" ? "" : item?.desc}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Summary of Warranty Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
        <div className="space-y-4 lg:space-y-10">
          <p className="lg:text-3xl font-bold">
            {summary?.title || "Summary of Warranty Options"}
          </p>
          <p className="lg:text-xl">
            {summary?.description ||
              "Legal, contractual, and external warranties ensure better protection for your car purchase."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {(summary?.bullets || InsuranceEssentials).map((item, idx) => (
              <div
                key={idx}
                className="bg-custom-primary  rounded p-5 text-white space-y-4"
              >
                <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                  {typeof item === "string"
                    ? InsuranceEssentials[idx]?.icon
                    : item?.icon}
                </div>

                <p className="lg:text-2xl font-medium">
                  {typeof item === "string" ? item : item?.title}
                </p>
                <p className="text-base">
                  {typeof item === "string" ? "" : item?.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <img
            className="w-full"
            src={summary?.image_url || ImageProvider.warrenty7}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CarwarrantiesKeypoints;
