import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const ServiceBanner = ({ image, title, subText, isLoading }) => {
  const titleRef = useRef(null);
  const subTextRef = useRef(null);

  useEffect(() => {
    if (!isLoading && titleRef.current && subTextRef.current) {
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
    }
  }, [isLoading]);

  return (
    <div className="relative w-full min-h-[50vh] flex flex-col justify-center items-center text-center text-white px-4 overflow-hidden">
      {/* Background Image / Skeleton Background */}
      {isLoading ? (
        <div className="absolute top-0 left-0 w-full h-full bg-neutral-800 animate-pulse" />
      ) : (
        <img
          src={image}
          alt={title || "Service Banner"}
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 w-full">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 w-full max-w-[800px] animate-pulse">
            {/* Title Skeleton */}
            <div className="h-8 md:h-12 w-3/4 max-w-[480px] bg-neutral-700/60 rounded-lg" />
            {/* Subtext Skeleton */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="h-4 md:h-6 w-11/12 max-w-[600px] bg-neutral-700/40 rounded-md" />
              <div className="h-4 md:h-6 w-2/3 max-w-[400px] bg-neutral-700/40 rounded-md" />
            </div>
          </div>
        ) : (
          <>
            <p ref={titleRef} className="text-2xl md:text-5xl font-bold" dangerouslySetInnerHTML={{__html: title}}>
              
            </p>
            <p ref={subTextRef} className="text-lg md:text-xl max-w-[800px]" dangerouslySetInnerHTML={{__html: subText}}>
              
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceBanner;

