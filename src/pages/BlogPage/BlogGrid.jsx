import { CustomCalendar } from "@/utils/IconProvider";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";


const BlogGrid = ({ data, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const blogGridRef = useRef(null);

  useEffect(() => {
    if (!isLoading && blogGridRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        blogGridRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: blogGridRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-primary"></div>
      </div>
    );
  }

  // Identify the array from the response.
  const blogList = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.results)
      ? data.data.results
      : Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data)
          ? data
          : [];

  const totalPages = Math.ceil(blogList.length / blogsPerPage);

  // Apply local pagination
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = blogList.slice(startIndex, startIndex + blogsPerPage);

  return (
    <div id="blog-grid" className="" ref={blogGridRef}>
      {/* Blog Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <Link to={`/blogdetails/${blog.id}/${blog.slug}`} key={blog.id} className="rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col h-full border border-gray-100"
            >
              {/* {console.log(blog)} */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <CustomCalendar />{" "}
                    {blog.created_at}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-4 line-clamp-2 hover:text-custom-primary transition-colors cursor-pointer" dangerouslySetInnerHTML={{ __html: blog.title }} >
                 
                </h3>
                <div className="mt-auto">
                  <Link
                    to={`/blogdetails/${blog.id}/${blog.slug}`}
                    className="text-custom-primary font-semibold flex items-center gap-2 group transition-all"
                  >
                    Read More
                    <span className="group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </Link>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-gray-500">
            No blogs found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <ul className="flex items-center gap-2">
            <li>
              <button
                onClick={() => {
                  setCurrentPage(1);
                  document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                «
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(p - 1, 1));
                  document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                ‹
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <li key={num}>
                <button
                  onClick={() => {
                    setCurrentPage(num);
                    document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-all ${
                    num === currentPage
                      ? "bg-custom-primary text-white border-custom-primary shadow-md"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(p + 1, totalPages));
                  document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                ›
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentPage(totalPages);
                  document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                »
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
