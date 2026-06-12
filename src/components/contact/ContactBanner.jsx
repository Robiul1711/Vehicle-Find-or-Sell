import { useApiQuery } from '@/hooks/useApiQuery';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const ContactBanner = () => {
        const { data, isLoading } = useApiQuery({
    queryKey: ["contact"],
    url: "/cms/contact/",
  });

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
               <div style={{ backgroundImage: `url(${data?.data?.hero_background_image_url})`,backgroundSize: "cover",
        backgroundPosition: "center",backgroundRepeat: "no-repeat", }} className='bg-[#E9F2FF] min-h-[40vh] flex flex-col justify-center items-center text-center gap-4 text-black relative section-padding-x'>
            <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
            <p ref={titleRef} className="text-2xl md:text-5xl font-bold text-white relative z-10" dangerouslySetInnerHTML={{__html:data?.data?.title}}></p>
            <p ref={subTextRef} className="text-xl text-white relative z-10" dangerouslySetInnerHTML={{__html:data?.data?.subtitle}}></p>
        </div>
    );
};

export default ContactBanner;