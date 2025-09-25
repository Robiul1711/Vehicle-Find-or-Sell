import { CustomAdmin, CustomArrow, CustomCalendar } from '@/utils/IconProvider';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const BlogDetailsBanner = ({ title = "Top 10 Tips for Maintaining Your Car in Perfect Condition" }) => {
    return (
        <div>
            <div className="space-y-4">
                <p className='flex items-center gap-2'>Blog <CustomArrow /> Blog Details</p>
                <h1 className='text-3xl font-semibold'>{title}</h1>
                <div className="">
                    <img src={ImageProvider.blogDetails} className='w-full lg:h-[70vh]' alt="" />
                </div>
                <div className="flex items-center gap-3  mb-2">
                    <span className="flex items-center gap-2"><CustomAdmin /> Admin</span>
                    <span className="flex items-center gap-2"><CustomCalendar /> 26Aug, 2023</span>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsBanner;