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

const AdditionalServiceGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
      {ServicesData.map((service) => (
        <Link
          to={service.link}
          key={service.id}
          className="bg-[#F9FAFB] group space-y-4  hover:bg-custom-primary hover:text-white transform transition duration-300 rounded-lg shadow-md p-6 lg:p-10 mb-4"
        >
          <div className="flex items-center mb-4"></div>
          <div className="w-12 h-12 bg-custom-secondary group-hover:bg-white text-white group-hover:text-custom-primary rounded flex items-center justify-center mr-4">
            {service.icon}
          </div>
          <h3 className="text-lg lg:text-2xl font-semibold">{service.title}</h3>
          <p>{service?.desc}</p>
        </Link>
      ))}
    </div>
  );
};

export default AdditionalServiceGrid;
