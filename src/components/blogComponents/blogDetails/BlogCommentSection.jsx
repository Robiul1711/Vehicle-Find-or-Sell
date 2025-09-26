import { ImageProvider } from '@/utils/ImageProvider';
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BlogCommentSection = () => {

    const commentRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            commentRef.current,
            { opacity: 0, y: 200 },
            {
                opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                scrollTrigger: {
                    trigger: commentRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    markers: false,
                },
            }
        )
    }, [])

    return (
        <div ref={commentRef}>
            <p className="lg:text-2xl font-bold mb-5">3 Comments</p>
            <div className="space-y-5 ">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="">
                            <div className="flex items-center gap-2">
                                <Avatar className={""}>
                                    <AvatarImage src={ImageProvider.avatar1} />
                                </Avatar>
                                <div className="">
                                    <p className=" font-medium text-xl">Autumn Phillips</p>
                                    <p className="text-sm">5 Aug, 2025</p>
                                </div>
                            </div>
                            <p className="text-sm lg:text-lg mt-2">
                                Another critical maintenance task is checking your tires frequently. Proper tire pressure is essential for safety, fuel economy, and comfort. Under-inflated tires cause poor handling and increase the risk of blowouts, while over-inflated tires can lead to uneven wear.
                            </p>
                        </div>

                    ))
                }
            </div>

        </div>
    );
};

export default BlogCommentSection;