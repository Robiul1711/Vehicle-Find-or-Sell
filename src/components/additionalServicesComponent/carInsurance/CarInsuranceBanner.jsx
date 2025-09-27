import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const CarInsuranceBanner = () => {
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
                Car Insurance
            </p>
            <p ref={subTextRef} className="text-xl">
                Understand the essentials of car insurance in France, from legal requirements to choosing the best plan for your needs
            </p>
        </div>
    );
};

export default CarInsuranceBanner;