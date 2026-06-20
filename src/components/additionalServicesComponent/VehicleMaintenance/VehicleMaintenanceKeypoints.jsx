import React from "react";
import { Link } from "react-router-dom";
import Title from "@/components/common/Title";
import { CustomCheck } from "@/utils/IconProvider";

const VehicleMaintenanceKeypoints = ({ data }) => {
  // console.log(data)
  const sections = data?.sections || [];

  return (
    <div className="space-y-10">
      {sections.map((section, index) => {
        // Determine if image should be on the left or right for visual variety
        const isEven = index % 2 === 0;

        return (
          <div
            key={section.section_id}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center lg:py-10 ${
              section.layout_type === "text_only" ? "max-w-4xl mx-auto block" : ""
            }`}
          >
            {/* Image Rendering Logic */}
            {section.layout_type === "image_with_text" && isEven && (
              <div className="order-last md:order-first">
                <img 
                   src={section.image_url} 
                   alt={section.title} 
                   className="rounded-2xl shadow-lg w-full object-cover"
                />
              </div>
            )}

            {/* Content Rendering Logic */}
            <div className={`space-y-4 ${section.layout_type === "text_only" ? "text-center" : ""}`}>
              <h2 className="lg:text-4xl font-bold text-gray-900" dangerouslySetInnerHTML={{__html: section.title}}>
                
              </h2>
              
              {section.description && (
                <p className="lg:text-xl text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: section.description}}>
                  
                </p>
              )}

              {section.bullets && (
                <div className={`space-y-3 ${section.layout_type === "text_only" ? "inline-block text-left" : ""}`}>
                  {section.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1">
                        <CustomCheck />
                      </div>
                      <p className="lg:text-lg text-gray-600">{bullet}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image Rendering for Odd Items (Right Side) */}
            {section.layout_type === "image_with_text" && !isEven && (
              <div>
                <img 
                  src={section.image_url} 
                  alt={section.title} 
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
              </div>
            )}
          </div>
        );
      })}

      {/* External Links Section (Constant) */}
      <div className="container pb-20">
        <Title level="title32" className="mb-4">
          Check Your Vehicle's History
        </Title>
        <p className="text-xl text-gray-600 mb-8">
          Verify your car’s complete history instantly via trusted platforms.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Autoviza", url: "https://autoviza.fr/" },
            { name: "Carfax", url: "https://www.carfax.eu/" },
            { name: "CarVertical", url: "https://www.carvertical.com/" },
            { name: "Auto Origin", url: "https://autorigin.com/" },
            { name: "Histovec", url: "https://histovec.interieur.gouv.fr/histovec/accueil" },
            { name: "Almmotors", url: "https://almmotors.fr/" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.url}
              target="_blank"
              className="bg-custom-primary text-white text-center font-semibold rounded-xl px-4 py-4 transition-all duration-300 hover:bg-[#004aad] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleMaintenanceKeypoints;