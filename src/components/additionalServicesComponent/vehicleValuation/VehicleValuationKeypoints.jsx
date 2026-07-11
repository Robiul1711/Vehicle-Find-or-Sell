import {
  CustomCheck,
  CustomCheck2,
  CustomPrivateSeller,
  CustomVerified,
} from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";

const VehicleValuationKeypoints = ({ data }) => {
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
  const valuationTips = sections.find(
    (s) =>
      s.section_id === "valuation-tips" ||
      s.section_id === "conseils-estimation",
  );
  const privateVsProfessional = sections.find(
    (s) =>
      s.section_id === "private-vs-professional" ||
      s.section_id === "Plateformes d’estimation en ligne",
  );
  const onlinePlatforms = sections.find(
    (s) =>
      s.section_id === "online-platforms" ||
      s.section_id === "Entretien et estimation",
  );
  const maintenanceAndValue = sections.find(
    (s) =>
      s.section_id === "maintenance-and-value" ||
      s.section_id === "entretien-et-valeur",
  );
  const valuationSummary = sections.find(
    (s) =>
      s.section_id === "valuation-summary" ||
      s.section_id === "resume-estimation",
  );

  return (
    <div className="space-y-10 lg:space-y-20 ">
      {/* Practical Valuation Tips */}
      {valuationTips && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center lg:py-10">
          <div className="space-y-4">
            {valuationTips.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: valuationTips.title }}
              ></p>
            )}
            {valuationTips.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{ __html: valuationTips.description }}
              ></p>
            )}
            {valuationTips.bullets && valuationTips.bullets.length > 0 && (
              <div className="space-y-3">
                {valuationTips.bullets.map((bullet, index) => {
                  const parsed = parseBullet(bullet);
                  return (
                    <p key={index} className=" flex items-center gap-2">
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
          {valuationTips.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={valuationTips.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Private vs Professional Sellers */}
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
                <div className="grid grid-cols-1  gap-4">
                  {privateVsProfessional.bullets.map((bullet, idx) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <div
                        key={idx}
                        className="bg-custom-primary  rounded p-5 text-white space-y-4"
                      >
                        <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                          {idx % 2 === 0 ? (
                            <CustomVerified />
                          ) : (
                            <CustomPrivateSeller />
                          )}
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

      {/* Online Valuation Platforms */}
      {onlinePlatforms && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center py-10 lg:py-20">
          <div className="space-y-4">
            {onlinePlatforms.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: onlinePlatforms.title }}
              ></p>
            )}
            {onlinePlatforms.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: onlinePlatforms.description,
                }}
              ></p>
            )}
            {onlinePlatforms.bullets && onlinePlatforms.bullets.length > 0 && (
              <div className="space-y-3">
                {onlinePlatforms.bullets.map((bullet, index) => {
                  const parsed = parseBullet(bullet);
                  return (
                    <p key={index} className=" flex items-center gap-2">
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
          {onlinePlatforms.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={onlinePlatforms.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Maintenance and Valuation */}
      {maintenanceAndValue && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          <div className="space-y-4 lg:space-y-10">
            {maintenanceAndValue.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: maintenanceAndValue.title }}
              ></p>
            )}
            {maintenanceAndValue.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: maintenanceAndValue.description,
                }}
              ></p>
            )}
            {maintenanceAndValue.bullets &&
              maintenanceAndValue.bullets.length > 0 && (
                <div className="grid grid-cols-1  gap-4">
                  {maintenanceAndValue.bullets.map((bullet, index) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <div
                        key={index}
                        className="bg-custom-primary  rounded p-5 text-white space-y-4"
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
          </div>
          {maintenanceAndValue.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={maintenanceAndValue.image_url}
                alt=""
              />
            </div>
          )}
        </div>
      )}

      {/* Vehicle Valuation Summary */}
      {valuationSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
          {valuationSummary.image_url && (
            <div className="">
              <img
                className="w-full h-[250px] sm:h-[400px] lg:h-[480px] object-fill "
                src={valuationSummary.image_url}
                alt=""
              />
            </div>
          )}
          <div className="space-y-4 lg:space-y-10">
            {valuationSummary.title && (
              <p
                className="lg:text-3xl font-bold"
                dangerouslySetInnerHTML={{ __html: valuationSummary.title }}
              ></p>
            )}
            {valuationSummary.description && (
              <p
                className="lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: valuationSummary.description,
                }}
              ></p>
            )}
            {valuationSummary.bullets &&
              valuationSummary.bullets.length > 0 && (
                <div className="grid grid-cols-1  gap-4">
                  {valuationSummary.bullets.map((bullet, index) => {
                    const parsed = parseBullet(bullet);
                    return (
                      <div
                        key={index}
                        className="bg-custom-primary  rounded p-5 text-white space-y-4"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleValuationKeypoints;
