import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const ServiceBanner = ({ image, title, subText }) => {
  const titleRef = useRef(null);
  const subTextRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      subTextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <div className="relative w-full min-h-[50vh] flex flex-col justify-center items-center text-center text-white px-4 overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <p ref={titleRef} className="text-2xl md:text-5xl font-bold">
          {title}
        </p>
        <p ref={subTextRef} className="text-lg md:text-xl max-w-[800px]">
          {subText}
        </p>
      </div>
    </div>
  );
};

export default ServiceBanner;
