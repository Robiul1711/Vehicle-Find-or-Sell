import React from "react";
import Title from "../common/Title";
import {
  AllUserIcon,
  EasyAdPostingIcon,
  SecureTrustedIcon,
  SmartPromotionsIcon,
} from "../common/SVGicons/MySvg";

const WhyChooseUsData = [
  {
    id: 1,
    icon: <EasyAdPostingIcon className={"size-12 sm:size-12 md:size-14 xl:size-auto"}/>,
    title: "Easy Ad Posting",
    desc: "List your vehicle with photos, videos & documents in minutes.",
  },
  {
    id: 2,
    icon: <AllUserIcon className={"size-12 sm:size-12 md:size-14 xl:size-auto"}/>,
    title: "For All Users",
    desc: "Designed for both private sellers and professional dealers.",
  },
  {
    id: 3,
    icon: <SmartPromotionsIcon className={"size-12 sm:size-12 md:size-14 xl:size-auto"}/>,
    title: "Smart Promotions",
    desc: "Boost your ad’s visibility with featured and top listings.",
  },
  {
    id: 4,
    icon: <SecureTrustedIcon className={"size-12 sm:size-12 md:size-14 xl:size-auto"}/>,
    title: "Secure & Trusted",
    desc: "Safe messaging, verified users, and full data protection.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding-x section-padding-y bg-custom-primary text-white">
      <div className="text-center">
        <Title level="title40">Why Choose Us?</Title>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
        {WhyChooseUsData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center gap-4 sm:gap-6 px-4"
          >
            <div className="w-16 h-16 md:w-20 md:h-20">{item.icon}</div>
            <Title level="title24">{item.title}</Title>
            <p className="text-sm md:text-base text-gray-100">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
