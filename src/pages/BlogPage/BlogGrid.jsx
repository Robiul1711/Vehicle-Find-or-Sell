import { CustomAdmin, CustomCalendar } from "@/utils/IconProvider";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from "react-router-dom";


const BlogGrid = () => {
    const [currentPage, setCurrentPage] = useState(3); // default same as screenshot
    const blogsPerPage = 9;

    // simulate paginated data
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const blogs = Array.from({ length: 36 }, (_, i) => ({
        id: i + 1,
        title: i % 2 === 0 ? "Safety Tips and Driving Techniques for Every Journey" : "Why Regular Inspections and Fluid Checks Matter",
        author: "Admin",
        date: "2025-08-05",
        image: `https://picsum.photos/seed/${i}/600/400`,
        excerpt: "Dummy blog content here for demonstration.",
        link: `/blog/${i + 1}`
    })).slice(startIndex, endIndex);

    const totalPages = Math.ceil(36 / blogsPerPage);

    const blogGridRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
            blogGridRef.current,
            { opacity: 0, y: 200 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: blogGridRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    markers: false
                }
            });

    }, []);

    return (
        <div className="" ref={blogGridRef}>
            {/* Blog Grid */}
            <div  className="grid md:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="rounded-xl overflow-hidden  hover:shadow-lg transition ">
                        <img src={blog.image} alt={blog.title} className="w-full rounded-xl h-80 object-cover" />
                        <div className="p-4">
                            <div className="flex items-center gap-3  mb-2">
                                <span className="flex items-center gap-2"><CustomAdmin /> {blog.author}</span>
                                <span className="flex items-center gap-2"><CustomCalendar /> {blog.date}</span>
                            </div>
                            <h3 className="font-semibold text-xl mb-2">{blog.title}</h3>
                            <Link to={`/blogDetails/${blog.id}`} className=" hover:underline text-lg flex items-center gap-1">
                                Read More ↗
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
                <ul className="flex items-center gap-2">
                    <li>
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            «
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            ‹
                        </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <li key={num}>
                            <button
                                onClick={() => setCurrentPage(num)}
                                className={`px-3 py-1 border rounded ${num === currentPage ? "bg-custom-primary text-white" : ""
                                    }`}
                            >
                                {num}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            ›
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            »
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BlogGrid;
