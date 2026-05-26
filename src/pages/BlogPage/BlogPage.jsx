import BlogBanner from "@/components/blogComponents/BlogBanner";
import LookingFor from "@/components/HomeComponents/LookingFor";
import React, { useEffect, useRef } from "react";
import BlogGrid from "./BlogGrid";
import { CommonPageWrapper } from "@/components/common/CommonPageWrapper";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { ScrollRestoration } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";
import SEO from "@/components/common/SEO";

const BlogPage = () => {
  const LookingRef = useRef(null);
  const { data, isLoading } = useApiQuery({
    queryKey: ["blog"],
    url: "/blog/",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      LookingRef.current,
      { opacity: 0, y: 200 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: LookingRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          markers: false,
        },
      },
    );
  }, []);
  return (
    <div>
      <SEO 
        title="Auto Insights & Blog"
        description="Get the latest advice, car maintenance tips, and vehicle purchase guides from our automotive experts on Ronpoin."
        keywords={["auto blog", "car advice", "vehicle tips", "maintenance guides", "automotive news"]}
      />
      <ScrollRestoration />
      <BlogBanner />
      <CommonPageWrapper>
        <BlogGrid data={data} isLoading={isLoading} />
      </CommonPageWrapper>
      <div ref={LookingRef}>
        <LookingFor />
      </div>
    </div>
  );
};

export default BlogPage;
