import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialCard = ({testimonials, isLoading}) => {
  // console.log(testimonials)

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'swiper-pagination-bullet !bg-white !w-3 !h-3',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-gray-800',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="testimonial-swiper"
      >
        {testimonials?.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="flex items-center">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
                {/* Content Side */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                  <blockquote className="text-base md:text-lg leading-relaxed">
                    {testimonial.content}
                  </blockquote>
                </div>

                {/* Image Side */}
                <div className="flex justify-center md:justify-end">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:h-96 lg:w-96 rounded-xl  md:rounded-2xl overflow-hidden border-2 ">
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination bottom-left */}
      <div className="custom-pagination absolute bottom-4  left-4 flex space-x-2"></div>
    </div>
  );
};

export default TestimonialCard;
