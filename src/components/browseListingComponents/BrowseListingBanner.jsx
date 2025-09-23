import { ImageProvider } from '@/utils/ImageProvider';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BrowseListingBanner = () => {
    const bannerContainerRef = useRef(null);
    const bannerImgRef = useRef(null);
    const headingRef = useRef(null);
    const subheadingRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // define timeline 
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: bannerContainerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
                markers: false,
            },
        });

        // Animate the background image 
        tl.fromTo(
            bannerImgRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out', immediateRender: false }
        );


        // Animate the heading after image 
        tl.fromTo(
            headingRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
            '-=1' // start 1 second before the previous animation ends
        )

        // Animate the subheading after heading 
        tl.fromTo(
            subheadingRef.current,
            {opacity: 0, y: 20},
            {opacity: 1, y:0, duration: 1, ease: 'power3.out'},
            '-=0.8' // start 0.8 seconds before the previous animation ends
        )

    }, []);

    return (
        <div ref={bannerContainerRef} className="relative w-full overflow-hidden">
            {/* Background Image */}
            <div className="w-full h-full relative">
                <img
                    ref={bannerImgRef}
                    src={ImageProvider.listingbanner}
                    alt="Newsletter background"
                    className="w-full h-full object-cover min-h-[300px] md:min-h-[400px]"
                />
                <div className="absolute rounded-3xl inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-50"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute rounded-3xl inset-0 flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 p-4 md:p-8">
                <div className="w-full max-w-4xl text-center space-y-5">
                    <p
                        ref={headingRef}
                        className="text-2xl text-white font-bold md:text-4xl lg:text-5xl">
                        Browse Listings
                    </p>
                    <p 
                    ref={subheadingRef}
                    className="text-sm mt-2 md:mt-4 md:text-base lg:text-xl text-white/60">
                        Explore cars, bikes, vans, and spare parts from verified sellers and trusted professionals.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrowseListingBanner;
