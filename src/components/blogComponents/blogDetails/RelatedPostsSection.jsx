import Title from '@/components/common/Title';
import { useApiQuery } from '@/hooks/useApiQuery';
import { CustomAdmin, CustomCalendar } from '@/utils/IconProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const RelatedPostsSection = ({data}) => {
    // console.log(data?.data?.related_blogs)
    //   const { data:relatedBlogs, isLoading } = useApiQuery({
    //     queryKey: ["relatedBlogs"],
    //     url: `/blog/related-blogs/`,
    //   });
    //   console.log(relatedBlogs)
    const blogs = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        title: i % 2 === 0 ? "Safety Tips and Driving Techniques for Every Journey" : "Why Regular Inspections and Fluid Checks Matter",
        author: "Admin",
        date: "2025-08-05",
        image: `https://picsum.photos/seed/${i}/600/400`,
        excerpt: "Dummy blog content here for demonstration.",
        link: `/blog/${i + 1}`
    }))


    const blogGridRef = useRef(null);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
            blogGridRef.current,
            { opacity: 0, y: 200, scale: 0.8 },
            {
                opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
                scrollTrigger: {
                    trigger: blogGridRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    markers: false
                }
            }
        )
    }, [])

    return (
        <div ref={blogGridRef}>
            <Title level="title32" className="mb-4 !font-bold">Related Posts</Title>
            <div className="">
                {/* Blog Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {data?.data?.related_blogs?.map((blog) => (
                        <div key={blog.id} className="rounded-xl overflow-hidden  hover:shadow-lg transition ">
                            <img src={blog.image} alt={blog.title} className="w-full rounded-xl aspect-[16/9] object-fill" />
                            <div className="p-4">
                                <div className="flex items-center gap-3  mb-2">
                                    <span className="flex items-center gap-2"><CustomAdmin /> {blog.author}</span>
                                    <span className="flex items-center gap-2"><CustomCalendar /> {blog.date}</span>
                                </div>
                                <h3 className="font-semibold text-xl mb-2" dangerouslySetInnerHTML={{ __html: blog.title }} ></h3>
                                <Link to={`/blogDetails/${blog.id}/${blog.slug}`} className=" hover:underline text-lg flex items-center gap-1">
                                    Read More ↗
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedPostsSection;