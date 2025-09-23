import { ImageProvider } from '@/utils/ImageProvider';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AdsPlaceholder = () => {

    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 200 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
    }, [])

    return (
        <div
            ref={containerRef}
            className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
            {
                Array(3).fill().map((_, index) => (
                    <div
                        className="ad-box" key={index}>
                        <img className='w-full' src={ImageProvider.addPlaceholder} alt="" />
                    </div>
                ))
            }
        </div>
    );
};

export default AdsPlaceholder;