import { IMG_URL } from "@/config/constant";
import { CustomAdmin, CustomArrow, CustomCalendar } from "@/utils/IconProvider";
import { ImageProvider } from "@/utils/ImageProvider";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const BlogDetailsBanner = ({ data, isLoading }) => {
  const bannerImgRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      bannerImgRef.current,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        immediateRender: false,
      },
    );
  }, []);

  return (
    <div>
      <div className="space-y-4">
        <p className="flex items-center gap-2">
          Blog <CustomArrow /> Blog Details
        </p>
        <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
        <div ref={bannerImgRef} className="">
          <img
            src={
              data?.data?.image
                ? data.data.image.startsWith("http")
                  ? data.data.image
                  : IMG_URL + data.data.image
                : ImageProvider.blogDetails
            }
            className="w-full lg:h-[70vh] object-cover rounded-xl"
            alt={data?.data?.title || "Blog detail"}
          />
        </div>
        <div className="flex items-center gap-3  mb-2">
          <span className="flex items-center gap-2">
            <CustomAdmin /> {data?.data?.user}
          </span>
          <span className="flex items-center gap-2">
            <CustomCalendar /> {data?.data?.created_at}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsBanner;
