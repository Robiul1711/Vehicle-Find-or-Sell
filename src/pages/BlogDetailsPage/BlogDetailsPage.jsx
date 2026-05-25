import BlogDetailsBanner from "@/components/blogComponents/blogDetails/BlogDetailsBanner";
import { CommonPageWrapper } from "@/components/common/CommonPageWrapper";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogCommentSection from "@/components/blogComponents/blogDetails/BlogCommentSection";
import { ScrollRestoration } from "react-router-dom";
import BlogCommonForm from "@/components/blogComponents/blogDetails/BlogCommonForm";
import RelatedPostsSection from "@/components/blogComponents/blogDetails/RelatedPostsSection";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "react-router-dom";

const BlogDetailsPage = () => {
  const { id, slug } = useParams();
  const { data, isLoading } = useApiQuery({
    queryKey: ["blog", id, slug],
    url: `/blog/${id}/${slug}/`,
  });
  const descriptionRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 200 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          markers: false,
        },
      },
    );
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-primary"></div>
      </div>
    );
  }

  return (
    <div className="">
      <ScrollRestoration />
      <CommonPageWrapper className="!gap-10">
        <BlogDetailsBanner data={data} isLoading={isLoading} />
        {/* Details section  */}
        <div ref={descriptionRef} className="prose max-w-none lg:text-lg">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: data?.data?.content }}
          />
        </div>

        {/* Comment Section  */}
        {/* <BlogCommentSection /> */}

        {/* Comment Form  */}
        {/* <BlogCommonForm /> */}

        {/* Related Post section  */}
        <RelatedPostsSection data={data} />
      </CommonPageWrapper>
    </div>
  );
};

export default BlogDetailsPage;
