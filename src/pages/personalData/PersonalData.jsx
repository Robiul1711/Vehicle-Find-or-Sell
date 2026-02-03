import Title from "@/components/common/Title";
import { useApiQuery } from "@/hooks/useApiQuery";
import React from "react";
import { ScrollRestoration } from "react-router-dom";

const PersonalData = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["personal-data"],
    url: "/cms/personal-data-protection-policy/",
  });

  // Helper function to render description with line breaks
  const renderDescription = (description) => {
    if (!description) return null;

    // Split by newlines and render each line
    const lines = description.split("\n");
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (isLoading) {
    return (
      <div className="section-padding-x section-padding-y flex justify-center items-center min-h-[400px]">
        <p className="lg:text-lg">Loading...</p>
      </div>
    );
  }

  const pageData = data?.data;

  return (
    <div>
      <ScrollRestoration />
      <div className="section-padding-x section-padding-y max-w-7xl mx-auto flex flex-col gap-[45px] xmd:gap-[40px]">
        {/* Main Title */}
        {pageData?.title && (
          <div className="space-y-2">
            <Title level="title32">{pageData.title}</Title>
          </div>
        )}

        {/* Dynamic Sections */}
        {pageData?.sections?.map((section) => (
          <div key={section.section_id} className="space-y-2">
            <Title level="title24" className="font-semibold">
              {section.title}
            </Title>
            <p className="lg:text-lg">
              {renderDescription(section.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalData;
