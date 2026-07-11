import CompareTable from "@/components/additionalServicesComponent/VehiclePurchase/CompareTable";
import FinancingSimulator from "@/components/additionalServicesComponent/VehiclePurchase/FinancingSimulator";
import VehiclePurchaseBanner from "@/components/additionalServicesComponent/VehiclePurchase/VehiclePurchaseBanner";
import VehiclePurchaseKeypoints from "@/components/additionalServicesComponent/VehiclePurchase/VehiclePurchaseKeypoints";
import { CommonPageWrapper } from "@/components/common/CommonPageWrapper";
import {
  CustomAutoLoan,
  CustomCash,
  CustomCheck,
  CustomCompare,
  CustomLOA,
} from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import React from "react";
import s2 from "@/assets/images/s2.jpg";
import ServiceBanner from "@/components/common/ServiceBanner";
import { useApiQuery } from "@/hooks/useApiQuery";
const VehiclePurchase = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["vehicle-purchase"],
    url: "/cms/vehicle-purchase-options/",
    secure: false,
  });

  const sections = data?.data?.sections || [];
  const expertTips = sections.find(
    (s) => s.section_id === "expert-tips" || s.section_id === "conseils-d-expert"
  );
  const warrantySummary = sections.find(
    (s) => s.section_id === "warranty-summary" || s.section_id === "resume-garantie"
  );

  return (
    <div>
      <ServiceBanner
        image={data?.data?.hero_background_image_url || s2}
        title={data?.data?.title}
        subText={data?.data?.subtitle}
        isLoading={isLoading}
      />
      <CommonPageWrapper>
        <VehiclePurchaseKeypoints data={data?.data} />
        <CompareTable data={data?.data} />
        <FinancingSimulator data={data?.data} />
        <div className="space-y-10 lg:space-y-20">
          {expertTips && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center py-10 lg:py-20">
              <div>
                <img
                  src={expertTips.image_url || ImageProvider.purchase4}
                  alt=""
                  className="w-full h-auto object-fill rounded-xl shadow-sm"
                />
              </div>

              <div className="space-y-4">
                <div
                  className="lg:text-3xl font-bold"
                  dangerouslySetInnerHTML={{ __html: expertTips.title || "" }}
                />
                {expertTips.description && (
                  <div
                    className="lg:text-xl"
                    dangerouslySetInnerHTML={{ __html: expertTips.description }}
                  />
                )}
                {expertTips.bullets && expertTips.bullets.length > 0 && (
                  <div className="space-y-3">
                    {expertTips.bullets.map((bullet, index) => (
                      <p key={index} className="flex items-center gap-2">
                        <CustomCheck /> {bullet}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {warrantySummary && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
              <div className="space-y-4 lg:space-y-10">
                <div
                  className="lg:text-3xl font-bold"
                  dangerouslySetInnerHTML={{ __html: warrantySummary.title || "" }}
                />
                <div
                  className="lg:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: warrantySummary.description || ""
                  }}
                />
                {warrantySummary.bullets && warrantySummary.bullets.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {warrantySummary.bullets.map((bullet, idx) => {
                      const hasColon = bullet.includes(":");
                      const titleText = hasColon ? bullet.split(":")[0] : "";
                      const descText = hasColon ? bullet.split(":").slice(1).join(":") : bullet;
                      const icons = [
                        <CustomCash />,
                        <CustomAutoLoan />,
                        <CustomLOA />,
                        <CustomCompare />
                      ];
                      return (
                        <div key={idx} className="bg-custom-primary rounded p-5 text-white space-y-4">
                          <div className="w-12 h-12 bg-white text-white rounded flex items-center justify-center mr-4">
                            {icons[idx] || <CustomCash />}
                          </div>
                          {titleText && (
                            <p className="lg:text-2xl font-medium" dangerouslySetInnerHTML={{ __html: titleText }}></p>
                          )}
                          <p dangerouslySetInnerHTML={{ __html: descText }}></p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div>
                <img
                  className="w-full h-auto object-fill rounded-xl shadow-sm"
                  src={warrantySummary.image_url || ImageProvider.purchase5}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
      </CommonPageWrapper>
    </div>
  );
};

export default VehiclePurchase;
