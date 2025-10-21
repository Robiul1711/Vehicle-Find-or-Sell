import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const VehicleMaintenanceBanner = ({image, title, subText}) => {
    const titleRef = useRef(null);
    const subTextRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })

        gsap.fromTo(
            subTextRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
    }, [])
    return (
        <div className='relative min-h-[50vh] px-4 flex flex-col justify-center text-white items-center text-center gap-4  ' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <p ref={titleRef} className="text-2xl md:text-5xl  font-bold">
                {title}
            </p>
            <p ref={subTextRef} className="text-xl text-white">
               {subText}
            </p>
        </div>
    );
};

export default VehicleMaintenanceBanner;