import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialCard = () => {
  const testimonials = [
    {
      id: 1,
      name: "Chris Glasser",
      role: "Car Seller",
      testimonial: "I listed my used car and got multiple inquiries within a day. The platform was easy to use, and the messaging system kept everything organized. Highly recommended for quick and hassle-free selling!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Car Buyer",
      testimonial: "Found my dream car within hours of browsing. The detailed listings and direct communication with sellers made the entire process smooth and transparent. Will definitely use again!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b3c5?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Dealership Owner",
      testimonial: "As a dealer, this platform has expanded our reach significantly. The professional tools and analytics help us manage our inventory effectively. Great return on investment!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "First-time Seller",
      testimonial: "I was nervous about selling my car online, but this platform made it incredibly easy. The safety features and user verification gave me confidence throughout the process.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

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
        {testimonials.map((testimonial) => (
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
                    {testimonial.testimonial}
                  </blockquote>
                </div>

                {/* Image Side */}
                <div className="flex justify-center md:justify-end">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 ">
                    <img
                      src={testimonial.image}
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
