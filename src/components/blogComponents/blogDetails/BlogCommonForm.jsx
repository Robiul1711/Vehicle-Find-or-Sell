import Title from '@/components/common/Title';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

const BlogCommonForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }

    const formRef = useRef(null);
    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 200 },
            {
                opacity: 1, y: 0, duration: 2, ease: 'power3.out',
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    markers: false,
                }
            }
        )
    }, [])


    return (
        <div>
            <Title level="title32" className="mb-4 !font-bold">Leave a Comment</Title>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="">
                        <div className="border rounded ">
                            <input type="text" {...register("name", { required: true })} className='w-full p-2 bg-transparent' placeholder='Enter your name...' />
                        </div>
                        {errors.name && <span className="text-red-500">Name is required</span>}
                    </div>
                    <div className="">
                        <div className="border rounded ">
                            <input type="text" {...register("email", { required: true })} className='w-full p-2 bg-transparent' placeholder='Enter your email...' />
                        </div>
                        {errors.email && <span className="text-red-500">Email is required</span>}
                    </div>
                </div>
                <div className="">
                    <div className="border rounded ">
                        <textarea type="text" rows={5} {...register("comment", { required: true })} className='w-full p-2 bg-transparent outline-none' placeholder='Type your comment...' />
                    </div>
                    {errors.comment && <span className="text-red-500">Comment is required</span>}
                </div>
                <button className='bg-custom-primary rounded-lg px-4 py-2 text-white'>Submit Comment</button>
            </form>
        </div>
    );
};

export default BlogCommonForm;