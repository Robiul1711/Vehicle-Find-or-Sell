import React from 'react';
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper';
import ServiceBanner from '@/components/common/ServiceBanner';
import { useApiQuery } from '@/hooks/useApiQuery';

const PartnerGarageDirectory = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["partner-garage-directory"],
    url: "/cms/partner-garage-directory/",
    secure: false,
  });

  const pageData = data?.data;
  const sections = pageData?.sections || [];

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div>
      {/* Dynamic Banner */}
      <ServiceBanner 
        image={pageData?.hero_background_image_url} 
        title={pageData?.title} 
        subText={pageData?.subtitle} 
      />

      <CommonPageWrapper>
        <div className="space-y-16 py-10">
          {sections.map((section, index) => (
            <div 
              key={section.section_id || index} 
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Text Content */}
              <div className={`space-y-4 ${!section.image_url ? 'md:col-span-2' : ''}`}>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900" dangerouslySetInnerHTML={{ __html: section.title }}>
                </h2>
                
                {section.description && (
                  <p className="text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: section.description }}>
                  </p>
                )}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {section.bullets.map((bullet, idx) => (
                      <li key={idx} className="pl-2">
                        {bullet.trim()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Image Content (Only renders if image_url exists) */}
              {section.image_url && (
                <div className={`w-full ${index % 2 !== 0 ? 'md:order-first' : ''}`}>
                  <img 
                    src={section.image_url} 
                    alt={section.title} 
                    className="rounded-2xl shadow-md w-full object-cover max-h-[400px]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CommonPageWrapper>
    </div>
  );
};

export default PartnerGarageDirectory;