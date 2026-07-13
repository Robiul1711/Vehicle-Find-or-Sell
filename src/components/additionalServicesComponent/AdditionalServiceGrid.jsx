import {
  CustomCar2,
  CustomDelivery,
  CustomGarage,
  CustomInsurance,
  CustomPurchase,
  CustomRegistration,
  CustomShowroom,
  CustomValuation,
  CustomWarranty,
} from "@/utils/IconProvider";
import React from "react";
import { Link } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";

const ServicesData = [
  {
    id: 1,
    title: "Vehicle Maintenance History",
    desc: "Take advantage of our specialized trade-in partners to quickly sell your car, with a clear valuation and secure payment.",
    icon: <CustomCar2 />,
    link: "/aditionalservices/vehicle-maintenance-history",
  },
  {
    id: 2,
    title: "Vehicle Purchase",
    desc: "Need a loan or leasing? Our financial partners support you with tailored solutions: car loan, lease-to-own (LOA), or long-term leasing (LLD).",
    icon: <CustomPurchase />,
    link: "/aditionalservices/vehicle-purchase",
  },
  {
    id: 3,
    title: "Car Insurance",
    desc: "Don’t have insurance yet? We connect you with our insurance partners to find the coverage best suited to your budget and needs.",
    icon: <CustomInsurance />,
    link: "/aditionalservices/car-insurance",
  },
  {
    id: 4,
    title: "Registration Services",
    desc: "Simplify your administrative procedures with our registration service: title transfer, duplicate, declaration of sale… everything handled quickly.",
    icon: <CustomRegistration />,
    link: "/aditionalservices/registration-services",
  },
  {
    id: 5,
    title: "Warranty & Extended Warranty",
    desc: "Secure your purchase with our mechanical breakdown warranty and extended coverage options for peace of mind.",
    icon: <CustomWarranty />,
    link: "/aditionalservices/warranty-and-extended-warranty",
  },
  {
    id: 6,
    title: "Valuation & Estimation",
    desc: "With our expert partner, benefit from an accurate valuation of your vehicle in just a few clicks.",
    icon: <CustomValuation />,
    link: "/aditionalservices/valuation-and-estimation",
  },
  {
    id: 7,
    title: "Home Delivery",
    desc: "Can’t make the trip? Take advantage of our delivery service and receive your new vehicle directly at home, safely.",
    icon: <CustomDelivery />,
    link: "/aditionalservices/home-delivery",
  },
  {
    id: 8,
    title: "Virtual Showroom",
    desc: "Discover our vehicles as if you were at the  with our interactive virtual showroom: 360° tours, detailed specs, HD photos, and immersive videos.",
    icon: <CustomShowroom />,
    link: "/aditionalservices/virtual-showroom",
  },
  {
    id: 9,
    title: "Partner Garage Directory",
    desc: "Access our network of partner garages for maintenance, repairs, parts installation, or preparing your vehicle for sale. Find trusted professionals near you.",
    icon: <CustomGarage />,
    link: "/aditionalservices/partner-garage-directory",
  },
];

const getLinkPath = (link) => {
  if (!link) return "#";
  try {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      const url = new URL(link);
      return url.pathname + url.search + url.hash;
    }
    return link;
  } catch (error) {
    console.error("Error parsing link:", error);
    return link;
  }
};

const getDefaultIcon = (link, id) => {
  const path = (link || "").toLowerCase();
  if (path.includes("vehicle-maintenance-history") || id === 1) return <CustomCar2 />;
  if (path.includes("vehicle-purchase") || id === 2) return <CustomPurchase />;
  if (path.includes("car-insurance") || id === 3) return <CustomInsurance />;
  if (path.includes("registration-services") || id === 4) return <CustomRegistration />;
  if (path.includes("warranty-and-extended-warranty") || id === 5) return <CustomWarranty />;
  if (path.includes("valuation-and-estimation") || id === 6) return <CustomValuation />;
  if (path.includes("home-delivery") || id === 7) return <CustomDelivery />;
  if (path.includes("virtual-showroom") || id === 8) return <CustomShowroom />;
  if (path.includes("partner-garage-directory") || id === 9) return <CustomGarage />;
  return null;
};

const renderIcon = (card) => {
  if (card.icon_url) {
    return (
      <img
        src={card.icon_url}
        alt={card.title}
        className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
      />
    );
  }
  return getDefaultIcon(card.link, card.id);
};

const AdditionalServiceGrid = () => {
  const { data: apiResponse, isLoading } = useApiQuery({
    queryKey: ["advice-cards"],
    url: "/cms/advice-cards/",
    secure: false,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            className="bg-[#F9FAFB] space-y-4 rounded-lg shadow-md p-6 lg:p-10 mb-4 animate-pulse"
          >
            <div className="flex items-center mb-4"></div>
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center mr-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cards = apiResponse?.data || [];
  const activeCards = cards.filter((card) => card.is_active);
  const sortedCards = [...activeCards].sort((a, b) => (a.order || 0) - (b.order || 0));

  const displayCards =
    sortedCards.length > 0
      ? sortedCards.map((card) => ({
          id: card.id,
          title: card.title,
          desc: card.description || card.desc,
          link: getLinkPath(card.link),
          icon: renderIcon(card),
        }))
      : ServicesData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
      {displayCards.map((service) => {
        const isExternal =
          service.link.startsWith("http://") || service.link.startsWith("https://");
        const LinkComponent = isExternal ? "a" : Link;
        const linkProps = isExternal
          ? { href: service.link, target: "_blank", rel: "noopener noreferrer" }
          : { to: service.link };

        return (
          <LinkComponent
            key={service.id}
            className="bg-[#F9FAFB] group space-y-4  hover:bg-custom-primary hover:text-white transform transition duration-300 rounded-lg shadow-md p-6 lg:p-10 mb-4"
            {...linkProps}
          >
            <div className="flex items-center mb-4"></div>
            <div className="w-12 h-12 bg-custom-secondary group-hover:bg-white text-white group-hover:text-custom-primary rounded flex items-center justify-center mr-4">
              {service.icon}
            </div>
            <h3 className="text-lg lg:text-2xl font-semibold">{service.title}</h3>
            <p>{service.desc}</p>
          </LinkComponent>
        );
      })}
    </div>
  );
};

export default AdditionalServiceGrid;
