import Title from "@/components/common/Title";
import { useApiQuery } from "@/hooks/useApiQuery";
import React from "react";
import { ScrollRestoration } from "react-router-dom";
import SEO from "@/components/common/SEO";

const LegalNotice = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["legal-notice"],
    url: "/cms/legal-notice/",
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
      <div className="section-padding-x section-padding-y flex justify-center items-center min-h-screen">
        <SEO title="Legal Notice" />
       <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary" />
      </div>
    );
  }

  const pageData = data?.data;

  return (
    <div>
      <SEO 
        title="Legal Notice"
        description="View the official legal notice, terms, and publisher details for the Ronpoin marketplace website."
      />
      <ScrollRestoration />
      <div className="section-padding-x py-6 md:py-10 max-w-7xl mx-auto flex flex-col gap-10 min-h-screen">
        {/* Main Title */}
        {pageData?.title && (
          <div className="space-y-2">
            <Title level="title32"><span dangerouslySetInnerHTML={{__html:pageData.title}}/></Title>
          </div>
        )}

        {/* Dynamic Sections */}
        {pageData?.sections?.map((section, index) => (
          <div key={section.section_id} className="space-y-2">
            <Title
              level={index === 0 ? "title24" : "title24"}
              className="font-semibold!"
            >
              <span dangerouslySetInnerHTML={{__html:section.title}}/>
            </Title>
             <p className="lg:text-lg font-medium! text-black !py-2">
              <span dangerouslySetInnerHTML={{__html:section.description}}/>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalNotice;
