import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const VehiclePurchaseBanner = () => {
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
        <div className='bg-[#E9F2FF] min-h-[40vh] px-4 flex flex-col justify-center items-center text-center gap-4 text-black '>
            <p ref={titleRef} className="text-2xl md:text-5xl text-black font-bold">
                Vehicle Purchase Options
            </p>
            <p ref={subTextRef} className="text-xl">
                Explore different ways to buy a vehicle—cash, loans, leasing, or rental—and choose the option that suits your budget and lifestyle.
            </p>
        </div>
    );
};

export default VehiclePurchaseBanner;