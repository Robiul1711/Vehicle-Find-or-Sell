import { CommonPageWrapper } from "@/components/common/CommonPageWrapper";
import Title from "@/components/common/Title";
import { useApiQuery } from "@/hooks/useApiQuery";
import React from "react";
import { ScrollRestoration } from "react-router-dom";
import SEO from "@/components/common/SEO";

const TermAndCondition = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["terms-and-conditions"],
    url: "/cms/terms-and-conditions/",
  });

  // Helper function to render description with line breaks
  const renderDescription = (description) => {
    if (!description) return null;

    // Split by newlines and render each line
    const lines = description.split("\n");
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && (
          <>
            <br />
            <br />
          </>
        )}
      </React.Fragment>
    ));
  };

  if (isLoading) {
    return (
      <div className="section-padding-x section-padding-y flex justify-center items-center min-h-screen">
        <SEO title="Terms & Conditions" />
         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary" />
      </div>
    );
  }

  const pageData = data?.data;

  return (
    <div>
      <SEO 
        title="Terms & Conditions"
        description="Read the Terms and Conditions of using the Ronpoin platform for buying and selling vehicles and parts."
      />
      <ScrollRestoration />
      <div className="section-padding-x py-6 md:py-10 max-w-7xl mx-auto flex flex-col gap-10 min-h-screen">
        {/* Header Section */}
        {pageData && (
          <div className="space-y-2">
            <Title level="title32">{pageData.title}</Title>
            {pageData.subtitle && (
              <p className="lg:text-lg">{pageData.subtitle}</p>
            )}
          </div>
        )}

        {/* Dynamic Sections */}
        {pageData?.sections?.map((section) => (
          <div key={section.section_id} className="space-y-2">
            <Title level="title32" className="font-semibold! text-black">{section.title}</Title>
           <p className="lg:text-lg font-medium! text-black">
              {renderDescription(section.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermAndCondition;
