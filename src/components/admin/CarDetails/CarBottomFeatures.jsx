import { CheckMarkIcon } from "@/components/common/SVGicons/DashboardIcon";
import Title from "@/components/common/Title";
import React from "react";

const CarBottomFeatures = ({details}) => {
  const features = [
    {
      title: "Exterior Features",
      items: [
        "4-wheel steering",
        "4 wheel drive",
        "Tinted Windows",
        "Differential Lock",
      ],
    },
    {
      title: "Interior Features",
      items: [
        "Leather Seats",
        "Touchscreen Display",
        "AC / Climate Control",
        "Power Windows",
      ],
    },
    {
      title: "Security",
      items: ["2 airbags", "ABS + EBD", "3-point seat belts"],
    },
    {
      title: "Comfort & Convenience",
      items: [
        "Keyless Entry",
        "Bluetooth",
        "Virtual Cockpit",
        "Cruise Control",
      ],
    },
  ];

  return (
    <div className="mt-10 space-y-10">
      {/* === Features Section === */}
      <div>
        <Title level="title20">Features</Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
          {features.map((featureGroup, index) => (
            <div key={index}>
              <h3 className="font-semibold text-[#333] mb-3">{featureGroup.title}</h3>
              <ul className="space-y-2 text-gray-600">
                {featureGroup.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckMarkIcon className="text-blue-600 w-4 h-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* === Seller Address === */}
      <div className="">
        <Title level="title20" className="mb-3">
          Seller Address
        </Title>
        <div>
          <Title level="title14" className="text-gray-500">
            Address
          </Title>
         <Title level="title16">
  {details?.seller_address?.map((address) => (
    [address.street, address.city, address.zip_code, address.country]
      .filter(Boolean)
      .join(', ')
  )).join(' | ')}
</Title>
        </div>
      </div>

      {/* === Contact Info === */}
      <div className="">
        <Title level="title20" className=" mb-3 md:mb-6">
          Contact Information
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <div>
            <Title level="title14" className="text-gray-500">
              Name
            </Title>
            <Title level="title16">Patricia Sanders</Title>
          </div>
          <div>
            <Title level="title14" className="text-gray-500">
              Email
            </Title>
            <Title level="title16">dennis416@gmail.com</Title>
          </div>
          <div>
            <Title level="title14" className="text-gray-500">
              Contact Number
            </Title>
            <Title level="title16">(617) 623-2338</Title>
          </div>
          <div>
            <Title level="title14" className="text-gray-500">
              WhatsApp Number
            </Title>
            <Title level="title16">(618) 474-9169</Title>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarBottomFeatures;
