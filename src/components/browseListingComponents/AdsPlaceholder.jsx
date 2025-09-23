import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const AdsPlaceholder = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
            {
                Array(3).fill().map((_, index) => (
                    <div className="" key={index}>
                        <img className='w-full' src={ImageProvider.addPlaceholder} alt="" />
                    </div>
                ))
            }
        </div>
    );
};

export default AdsPlaceholder;