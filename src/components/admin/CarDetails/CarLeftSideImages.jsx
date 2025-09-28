import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper core styles
import "swiper/css/navigation";
import car1 from "@/assets/images/car1.png";
import car2 from "@/assets/images/car2.png";
import Title from "@/components/common/Title";
import { PdfIcon } from "@/components/common/SVGicons/DashboardIcon";
import { useLocation } from "react-router-dom";

const carImages = [car1, car2, car1, car2, car1, car2, car1, car2, car1, car2, car1];

const CarLeftSideImages = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location =useLocation();

  return (
    <div className="w-full flex flex-col justify-between h-full ">
        <div>
      {/* Main Image */}
      <div className="rounded-xl overflow-hidden">
        <img
          src={carImages[selectedIndex]}
          alt="Car"
          className="w-full h-[450px] object-cover rounded-xl"
        />
      </div>

      {/* Thumbnails Swiper */}
      <div className="mt-5">
        <Swiper
          spaceBetween={12}
          slidesPerView={5} // number of thumbnails to show
          className="pb-2"
        >
          {carImages.map((img, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
              <img
                src={img}
                onClick={() => setSelectedIndex(idx)}
                className={`w-28 h-30 rounded-lg cursor-pointer object-cover border-2 transition ${
                  selectedIndex === idx ? "border-blue-500" : "border-gray-200"
                }`}
                alt={`Car Thumbnail ${idx + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

        </div>

        {
            location.pathname.startsWith("/dashboard/car-details/") && <div>
            <Title level="title20" className="mb-4">Document</Title>
           <button className="flex items-center gap-2 text-custom-primary bg-custom-primary/10 py-2 px-4 rounded-lg"><PdfIcon />Car-Brochure.pdf</button>
        </div>
        }
       
    </div>
  );
};

export default CarLeftSideImages;
