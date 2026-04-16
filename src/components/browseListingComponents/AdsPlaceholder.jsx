import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import homeads from "../../assets/images/ads.png";
import { useApiQuery } from "@/hooks/useApiQuery";

const AdsPlaceholder = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["sliders"],
    url: "/cms/sliders/",
  });

  const AdsData = data?.data;

  // 1. Loading State Placeholder
  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full pb-10"> {/* Added padding bottom for pagination dots */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        speed={1000}
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {AdsData?.map((slider) =>
          slider?.images?.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={item.image_url || homeads}
                alt={item.alt_text || "Advertisement"}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl"
              />
            </SwiperSlide>
          )),
        )}
      </Swiper>
    </div>
  );
};

export default AdsPlaceholder;