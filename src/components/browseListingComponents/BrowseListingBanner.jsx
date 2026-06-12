import { ImageProvider } from '@/utils/ImageProvider';
import React, { useEffect, useRef } from 'react';

import { useApiQuery } from '@/hooks/useApiQuery';

const BrowseListingBanner = () => {
    const bannerContainerRef = useRef(null);
        const { data, isLoading } = useApiQuery({
    queryKey: ["listingsbanner"],
    url: "/cms/listings/",
  });

    return (
        <div ref={bannerContainerRef} className="relative w-full overflow-hidden">
            {/* Background Image */}
            <div className="w-full h-full relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] ">
                <img
                  
                    src={data?.data?.hero_background_image_url || ImageProvider.listingbanner}
                    alt="Newsletter background"
                    className="w-full h-full object-cover rounded-2xl " 
                />
                <div className="absolute rounded-3xl inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-50"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute rounded-3xl inset-0 flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 p-4 md:p-8">
                <div className="w-full max-w-4xl text-center space-y-5">
                    <p
                     
                        className="text-2xl text-white font-bold md:text-4xl lg:text-5xl"
                        dangerouslySetInnerHTML={{ __html: data?.data?.title }}>
                       
                    </p>
                    <p 
                
                    className="text-sm mt-2 md:mt-4 md:text-base lg:text-xl text-white/60"
                    dangerouslySetInnerHTML={{ __html: data?.data?.subtitle }}/>
                </div>
            </div>
        </div>
    );
};

export default BrowseListingBanner;
