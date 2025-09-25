
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const AdditionalServiceBanner = () => {
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
        <div className='bg-[#E9F2FF] min-h-[40vh] flex flex-col justify-center items-center gap-4 text-black '>
            <p ref={titleRef} className="text-2xl md:text-5xl text-black font-bold">Our Additional Services</p>
            <p ref={subTextRef} className="text-xl">
                Beyond connecting buyers and sellers, we offer a range of partner services to make your automotive project easier and more secure.
            </p>
        </div>
    );
};

export default AdditionalServiceBanner;