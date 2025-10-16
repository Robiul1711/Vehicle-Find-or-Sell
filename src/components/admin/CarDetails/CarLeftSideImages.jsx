import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper core styles
import "swiper/css/navigation";
import car1 from "@/assets/images/car1.png";
import car2 from "@/assets/images/car2.png";
import Title from "@/components/common/Title";
import { PdfIcon } from "@/components/common/SVGicons/DashboardIcon";
import { useLocation } from "react-router-dom";
import truck from "@/assets/images/truck.png";
import bike from "@/assets/images/bike.png";
import scooter from "@/assets/images/scooter.png";
import part from "@/assets/images/part.png";
import { Image } from "antd";

const carImages = [
  car1,
  car2,
  car1,
  car2,
  car1,
  car2,
  car1,
  car2,
  car1,
  car2,
  car1,
];
const truckImage = [
  truck,
  truck,
  truck,
  truck,
  truck,
  truck,
  truck,
  truck,
  truck,
];
const bikeImages = [bike, bike, bike, bike, bike, bike, bike, bike, bike];
const scooterImages = [
  scooter,
  scooter,
  scooter,
  scooter,
  scooter,
  scooter,
  scooter,
  scooter,
  scooter,
];
const partImages = [part, part, part, part, part, part, part, part, part];

const getImagesByDetails = (details) => {
  switch (details) {
    case "car":
      return carImages;
    case "truck":
      return truckImage;
    case "bike":
      return bikeImages;
    case "scooter":
      return scooterImages;
    case "parts":
      return partImages;
    default:
      return carImages;
  }
};

const CarLeftSideImages = ({ images = [], details }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();

  return (
    <div className="w-full flex flex-col justify-between h-full ">
      <div>
        {/* Main Image */}
        <div className="rounded-xl overflow-hidden">
          {/* <img
          src={getImagesByDetails(details)[selectedIndex]}
          alt="Car"
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
        /> */}
          <Image
            width={1000}
            height={550}
            src={getImagesByDetails(details)[selectedIndex]}
            alt="Car"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Thumbnails Swiper */}
        <div className="mt-5">
          <Swiper
            spaceBetween={12}
            slidesPerView={5} // number of thumbnails to show
            className="pb-2"
          >
            {getImagesByDetails(details).map((img, idx) => (
              <SwiperSlide key={idx} className="!w-auto">
                <img
                  src={img}
                  onClick={() => setSelectedIndex(idx)}
                  className={`md:w-28 w-24 md:h-30 h-20 rounded-lg cursor-pointer object-cover border-2 transition ${
                    selectedIndex === idx
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  alt={`Car Thumbnail ${idx + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {location.pathname.startsWith("/dashboard/car-details/") && (
        <div>
          <Title level="title20" className="mb-4">
            Document
          </Title>
          <button className="flex items-center gap-2 text-custom-primary bg-custom-primary/10 py-2 px-4 rounded-lg">
            <PdfIcon />
            Car-Brochure.pdf
          </button>
        </div>
      )}
    </div>
  );
};

export default CarLeftSideImages;
