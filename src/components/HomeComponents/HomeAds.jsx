import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // ✅ Add Pagination
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination"; // ✅ Add pagination CSS
import homeads from "../../assets/images/ads.png";

const HomeAds = () => {
  return (
    <div className="section-padding-x section-padding-y">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000 }}
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }} // ✅ Enable dots
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <SwiperSlide key={item}>
            <img
              src={homeads}
              alt="Advertisement"
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeAds;
