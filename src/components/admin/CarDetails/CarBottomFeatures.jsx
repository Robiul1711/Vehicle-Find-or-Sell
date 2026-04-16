import { CheckMarkIcon } from "@/components/common/SVGicons/DashboardIcon";
import Title from "@/components/common/Title";
import React from "react";

const CarBottomFeatures = ({ details }) => {
  // console.log(details);
  const featuresData = details?.features_grouped || {};
  const { city, country, street, zip_code } = details?.seller_address || {};
  const fullAddress = [street, city, zip_code, country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mt-10 space-y-10">
      {/* === Features Section === */}
      <div>
        {Object.entries(featuresData).length > 0 && (
          <Title level="title20">Features</Title>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
          {Object.entries(featuresData).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold text-[#333] mb-3 capitalize">
                {category}
              </h3>
              <ul className="space-y-2 text-gray-600">
                {items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckMarkIcon className="text-blue-600 w-4 h-4" />
                    <span className="capitalize">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* description */}
      {
        details?.description && (
          <div>
            <Title level="title20" className="!font-bold">Description</Title>
            <Title level="title16" className="text-gray-500 mt-2 sm:mt-4">
              {details?.description}
            </Title>
          </div>
        )
      }
      {/* Documents Section */}
      {details?.documents && details.documents.length > 0 && (
        <div>
           <Title level="title20" className="!font-bold">
            Documents
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            {details.documents.map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <Title level="title16" className="truncate">
                    {doc.name || `Document ${index + 1}`}
                  </Title>
                  <Title level="title14" className="text-gray-500 line-clamp-1">
                    {doc.document}
                  </Title>
                </div>
                <a
                  href={doc.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === Seller Address === */}
      <div className="">
          <Title level="title20" className="!font-bold mb-3">
          Seller Address
        </Title>
        <div>
          <Title level="title14" className="text-gray-500">
            Address
          </Title>
          <Title level="title16" className="capitalize">
            {fullAddress || "No address provided"}
          </Title>
        </div>
      </div>

      {/* === Contact Info === */}
      {(details?.contact?.name || details?.contact?.email || details?.contact?.phone || details?.contact?.whatsapp) && (
        <div className="">
          <Title level="title20" className=" mb-3 md:mb-6">
            Contact Information
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {details?.contact?.name && (
              <div>
                <Title level="title14" className="text-gray-500">
                  Name
                </Title>
                <Title level="title16">{details?.contact?.name}</Title>
              </div>
            )}
            {details?.contact?.email && (
              <div>
                <Title level="title14" className="text-gray-500">
                  Email
                </Title>
                <Title level="title16">{details?.contact?.email}</Title>
              </div>
            )}
            {details?.contact?.phone && (
              <div>
                <Title level="title14" className="text-gray-500">
                  Contact Number
                </Title>
                <Title level="title16">{details?.contact?.phone}</Title>
              </div>
            )}
            {details?.contact?.whatsapp && (
              <div>
                <Title level="title14" className="text-gray-500">
                  WhatsApp Number
                </Title>
                <Title level="title16">{details?.contact?.whatsapp}</Title>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarBottomFeatures;
