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
import SEO from "@/components/common/SEO";

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
        <SEO title="Loading Blog Details..." />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-primary"></div>
      </div>
    );
  }

  const post = data?.data;

  return (
    <div className="">
      {post && (
        <SEO 
          title={post.title}
          description={post.content}
          image={post.image}
          type="article"
          author={post.user}
          publishedTime={post.created_at}
          keywords={[post.title, 'blog post', 'auto advice', 'ronpoin']}
        />
      )}
      <ScrollRestoration />
      <CommonPageWrapper className="!gap-10">
        <BlogDetailsBanner data={data} isLoading={isLoading} />
        {/* Details section  */}
        <div ref={descriptionRef} className="prose max-w-none lg:text-lg">
          <style>{`
            .blog-content {
              color: #374151;
              line-height: 1.8;
            }
            .blog-content p {
        
            }
            .blog-content h2 {
              font-size: 1.6rem;
              font-weight: 800;
              color: #111827;
        
              padding-bottom: 0.5rem;
              border-b: 2px solid #F3F4F6;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .blog-content h3 {
              font-size: 1.35rem;
              font-weight: 700;
              color: #1f2937;
           
            }
            .blog-content strong {
              color: #111827;
              font-weight: 700;
            }
            .blog-content blockquote {
              font-style: italic;
              font-size: 1.1rem;
              border-left: 4px solid #E2E8F0;
              padding-left: 1.25rem;
              margin: 1.75rem 0;
              color: #4B5563;
              background-color: #F8FAFC;
              padding-top: 0.75rem;
              padding-bottom: 0.75rem;
              border-radius: 0 0.5rem 0.5rem 0;
            }
            .blog-content ul {
              list-style-type: disc;
   
            }
            .blog-content ul li {
            ;
            }
            .blog-content hr {
              border: 0;
              border-top: 2px solid #E2E8F0;
              margin: 2.5rem 0;
            }
            .blog-content figure.table {
              margin: 2rem 0;
              width: 100%;
              overflow-x: auto;
              border: 1px solid #E2E8F0;
              border-radius: 0.75rem;
              box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            }
            .blog-content table {
              width: 100%;
              border-collapse: collapse;
              text-align: left;
              font-size: 0.95rem;
            }
            .blog-content th {
              background-color: #F8FAFC;
              color: #475569;
              font-weight: 700;
              padding: 0.75rem 1rem;
              border-b: 1px solid #E2E8F0;
              font-size: 0.85rem;
            }
            .blog-content td {
              padding: 0.85rem 1rem;
              border-b: 1px solid #F1F5F9;
              color: #475569;
            }
            .blog-content tr:last-child td {
              border-b: none;
            }
            .blog-content tr:nth-child(even) {
              background-color: #F8FAFC;
            }
            .blog-content a {
              color: #3b82f6;
              text-decoration: underline;
              font-weight: 600;
              transition: color 0.15s;
            }
            .blog-content a:hover {
              color: #1d4ed8;
            }
          `}</style>
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
