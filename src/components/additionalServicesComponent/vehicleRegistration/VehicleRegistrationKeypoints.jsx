import {
  CustomCar,
  CustomCar2,
  CustomCar3,
  CustomCaution,
  CustomCheck,
  CustomCheck2,
  CustomDealer,
  CustomDeductible,
  CustomDoc,
  CustomFrance,
  CustomPrivate,
  CustomProcedure,
  CustomSettings,
  CustomWarning,
  CustomWebsite,
} from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";

const SummaryData = [
  {
    id: 1,
    icon: <CustomFrance />,
    title: "French vehicle:",
    desc: "sale certificate, registration document, non-pledge certificate, technical inspection, ID and proof of address.",
  },
  {
    id: 2,
    icon: <CustomCar3 />,
    title: "Imported vehicle: ",
    desc: "quitus fiscal, certificate of conformity (not needed if D2 and K completed), foreign documents, customs certificate 846A.",
  },
  {
    id: 3,
    icon: <CustomPrivate />,
    title: "Professionals: ",
    desc: "declaration of purchase must be registered in the SIV.",
  },
  {
    id: 4,
    icon: <CustomCaution />,
    title: "Buyer caution:",
    desc: "never buy a vehicle with a pre-crossed registration certificate, or from a professional who has not declared the purchase.",
  },
  {
    id: 5,
    icon: <CustomProcedure />,
    title: "Procedures:",
    desc: "online via ANTS, SIV-approved professionals, or private authorized platforms.",
  },
  {
    id: 6,
    title: "Note:",
    desc: "With our site, you will find all the information and links to register your vehicle quickly and safely, whether French or imported.",
  },
];

const VehicleRegistrationKeypoints = ({ data }) => {
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
  const servicesAvailable = sections.find(
    (s) => s.section_id === "services-disponibles",
  );
  const privateVsProfessional = sections.find(
    (s) => s.section_id === "particulier-vs-professionnel",
  );
  const documentsRequis = sections.find(
    (s) => s.section_id === "documents-requis",
  );
  const practicalTips = sections.find(
    (s) => s.section_id === "Conseils-pratiques",
  );
  const registrationCosts = sections.find(
    (s) => s.section_id === "Coûts-d’immatriculation",
  );
  const buyerWarning = sections.find(
    (s) => s.section_id === "Avertissement-à-l’acheteur",
  );
  const summary = sections.find((s) => s.section_id === "résumé");

  const displaySummaryData = (summary?.bullets || []).map((bullet, index) => {
    const original = SummaryData[index];
    const parsed = parseBullet(bullet);
    return {
      icon: original?.icon || <CustomFrance />,
      title: parsed.title,
      desc: parsed.desc,
    };
  });

  return (
    <div className="lg:space-y-20 mx-auto">
      {/* Services Available for Vehicle Registration */}
      {servicesAvailable && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {servicesAvailable.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={servicesAvailable.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4 lg:space-y-10">
            {servicesAvailable.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: servicesAvailable.title }}
              ></p>
            )}
            {servicesAvailable.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: servicesAvailable.description,
                }}
              ></p>
            )}
            {servicesAvailable.bullets &&
              servicesAvailable.bullets.length > 0 && (
                <div className="grid grid-cols-1 gap-4">
                  {servicesAvailable.bullets.map((bullet, idx) => {
                    const parsed = parseBullet(bullet);
                    const icons = [
                      <CustomDoc />,
                      <CustomSettings />,
                      <CustomWebsite />,
                    ];
                    return (
                      <div
                        key={idx}
                        className="bg-custom-primary rounded p-5 text-white space-y-4"
                      >
                        <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
                          {icons[idx] || <CustomDoc />}
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
              )}
          </div>
        </div>
      )}

      {/* Buying from a Private Seller vs. a Professional */}
      {privateVsProfessional && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {privateVsProfessional.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={privateVsProfessional.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4 lg:space-y-10">
            {privateVsProfessional.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{
                  __html: privateVsProfessional.title,
                }}
              ></p>
            )}
            {privateVsProfessional.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: privateVsProfessional.description,
                }}
              ></p>
            )}
            {privateVsProfessional.bullets &&
              privateVsProfessional.bullets.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {privateVsProfessional.bullets.map((bullet, idx) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <div
                        key={idx}
                        className="bg-custom-primary rounded p-5 text-white space-y-4"
                      >
                        <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
                          {idx % 2 === 0 ? <CustomPrivate /> : <CustomDealer />}
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
              )}

            {buyerWarning && (
              <div className="bg-custom-secondary rounded p-5 text-white space-y-4 mt-6">
                <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
                  <CustomWarning />
                </div>
                {buyerWarning.title && (
                  <p
                    className="lg:text-2xl font-medium"
                    dangerouslySetInnerHTML={{ __html: buyerWarning.title }}
                  ></p>
                )}
                {buyerWarning.bullets?.map((bullet, idx) => (
                  <div key={idx} className="flex gap-1">
                    <div>
                      <CustomCheck2 />
                    </div>
                    <p
                      className="text-base"
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    ></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Documents Requis */}
      {documentsRequis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {documentsRequis.image_url && (
            <div className="md:order-last">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={documentsRequis.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4 lg:space-y-10">
            {documentsRequis.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: documentsRequis.title }}
              ></p>
            )}
            {documentsRequis.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: documentsRequis.description,
                }}
              ></p>
            )}
            {documentsRequis.bullets && (
              <div className="grid grid-cols-1 gap-4">
                {documentsRequis.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-center bg-gray-100 rounded-xl p-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-custom-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p
                      className="text-base text-gray-800 font-medium"
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    ></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Registration Costs & Practical Tips */}
      {(registrationCosts || practicalTips) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {registrationCosts && (
            <div className="space-y-4 lg:space-y-10">
              {registrationCosts.title && (
                <p
                  className="lg:text-3xl font-bold"
                  dangerouslySetInnerHTML={{ __html: registrationCosts.title }}
                ></p>
              )}
              {registrationCosts.description && (
                <p
                  className="lg:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: registrationCosts.description,
                  }}
                ></p>
              )}
              {registrationCosts.bullets && (
                <div className="grid grid-cols-1 gap-4">
                  {registrationCosts.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-1">
                      <div>
                        <CustomCheck />
                      </div>
                      <p
                        className="text-base"
                        dangerouslySetInnerHTML={{ __html: bullet }}
                      ></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {practicalTips && (
            <div className="space-y-4 lg:space-y-10">
              {practicalTips.title && (
                <p
                  className="lg:text-3xl font-bold"
                  dangerouslySetInnerHTML={{ __html: practicalTips.title }}
                ></p>
              )}
              {practicalTips.description && (
                <p
                  className="lg:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: practicalTips.description,
                  }}
                ></p>
              )}
              {practicalTips.bullets && (
                <div className="grid grid-cols-1 gap-4">
                  {practicalTips.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-1">
                      <div>
                        <CustomCheck />
                      </div>
                      <p
                        className="text-base"
                        dangerouslySetInnerHTML={{ __html: bullet }}
                      ></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {summary && displaySummaryData.length > 0 && (
        <div>
          {summary.title && (
            <p
              className="lg:text-3xl font-bold mb-5"
              dangerouslySetInnerHTML={{ __html: summary.title }}
            ></p>
          )}
          {summary.description && (
            <p
              className="lg:text-xl mb-5"
              dangerouslySetInnerHTML={{ __html: summary.description }}
            ></p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
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
        </div>
      )}
    </div>
  );
};

export default VehicleRegistrationKeypoints;
