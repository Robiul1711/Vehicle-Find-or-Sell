import { ImageProvider } from "@/utils/ImageProvider";
import React, { useEffect, useRef } from "react";

import { useApiQuery } from "@/hooks/useApiQuery";

const BrowseListingBanner = () => {
  const bannerContainerRef = useRef(null);
  const { data, isLoading } = useApiQuery({
    queryKey: ["listingsbanner"],
    url: "/cms/listings/",
  });
console.log(data)
  return (
    <div ref={bannerContainerRef} className="relative w-full overflow-hidden">

 
        <img
          src={
            data?.data?.hero_background_image_url || ImageProvider.listingbanner
          }
          alt="Newsletter background"
                className="w-full h-[200px] sm:h-[300px] md:h-[400px]  lg:h-[450px] xl:h-[550px] object-fit rounded-lg md:rounded-2xl"

        />
  

      {/* Content Overlay */}
      {/* <div className="absolute rounded-3xl inset-0 flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 p-4 md:p-8">
        <div className="w-full max-w-4xl text-center space-y-5">
          <p
            className="text-2xl text-white font-bold md:text-4xl lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: data?.data?.title }}
          ></p>
          <p
            className="text-sm mt-2 md:mt-4 md:text-base lg:text-xl text-white/60"
            dangerouslySetInnerHTML={{ __html: data?.data?.subtitle }}
          />
        </div>
      </div> */}
    </div>
  );
};

export default BrowseListingBanner;
