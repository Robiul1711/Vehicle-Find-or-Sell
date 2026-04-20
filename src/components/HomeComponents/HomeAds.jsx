import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // ✅ Add Pagination
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination"; // ✅ Add pagination CSS
import homeads from "../../assets/images/ads.png";
import { motion } from "framer-motion";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Link } from "react-router-dom";

const HomeAds = () => {
    const { data } = useApiQuery({
    queryKey: ["sliders"],
    url: "/cms/sliders/",
  });

  const AdsData = data?.data;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="section-padding-x section-padding-y"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        speed={1000}
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }} // ✅ Enable dots
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 1, spaceBetween: 40 },
          1024: { slidesPerView: 1, spaceBetween: 50 },
        }}
      >
    {AdsData?.map((slider) =>
  slider?.images?.map((item) => (
    <SwiperSlide key={item.id}>
      <Link to={item.link} target="_blank">

      <img
        src={item.image_url || homeads}
        alt={item.alt_text || "Advertisement"}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl"
      />
        
      </Link>
    </SwiperSlide>
  ))
)}
      </Swiper>
    </motion.div>
  );
};

export default HomeAds;
