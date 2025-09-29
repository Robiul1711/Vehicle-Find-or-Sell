import { CustomArrow, CustomEmail, CustomEmail2, CustomLocation, CustomLocation2, CustomPhone } from '@/utils/IconProvider';
import { MoveUpRightIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='flex flex-col lg:flex-row gap-10'>
            <div className="lg:w-1/4 flex flex-col gap-5">
                <div className="border bg-gray-100 rounded-lg group hover:bg-custom-primary p-5 flex items-center gap-5 ">
                    <div className="w-14 group group-hover:text-white h-14 rounded-full border flex items-center justify-center">
                        <CustomEmail2 />
                    </div>
                    <div className="group group-hover:text-white">
                        <p className="text-sm">You can Email Me Here</p>
                        <p className="">Daniel_hamilton@aol.com</p>
                    </div>
                </div>
                <div className="border bg-gray-100 rounded-lg group hover:bg-custom-primary p-5 flex items-center gap-5 ">
                    <div className="w-14 group group-hover:text-white h-14 rounded-full border flex items-center justify-center">
                        <CustomPhone />
                    </div>
                    <div className="group group-hover:text-white">
                        <p className="text-sm">Give Me a Call on</p>
                        <p className="">(303) 420-4261</p>
                    </div>
                </div>

                <div className="border bg-gray-100 rounded-lg group hover:bg-custom-primary p-5 flex items-center gap-5 ">
                    <div className="w-14 group group-hover:text-white h-14 rounded-full border flex items-center justify-center">
                        <CustomLocation2 />
                    </div>
                    <div className="group group-hover:text-white">
                        <p className="text-sm">Location</p>
                        <p className="">184 Griffin Street, Gilbert, AZ 85233</p>
                    </div>
                </div>
            </div>
            <div className="lg:w-3/4">
                <div className="border bg-gray-100 rounded-lg p-5  gap-5 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="">
                                <label htmlFor="">First Name</label>
                                <div className="border bg-white w-full">
                                    <input type="text" {...register('firstName', { required: true })} placeholder='Enter your first name...' className='w-full outline-0 px-2 py-2' />
                                </div>
                                {errors.firstName && <span className="text-red-500">First Name is required</span>}
                            </div>

                            <div className="">
                                <label htmlFor="">Last Name</label>
                                <div className="border bg-white w-full">
                                    <input type="text" {...register('lastName', { required: true })} placeholder='Last Name' className='w-full outline-0 px-2 py-2' />
                                </div>
                                {errors.lastName && <span className="text-red-500">Last Name is required</span>}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="">
                                <label htmlFor="">Email</label>
                                <div className="border bg-white w-full">
                                    <input type="text" {...register('email', { required: true })} placeholder='Enter your email...' className='w-full outline-0 px-2 py-2' />
                                </div>
                                {errors.email && <span className="text-red-500">Email is required</span>}
                            </div>

                            <div className="">
                                <label htmlFor="">Phone Number</label>
                                <div className="border bg-white w-full">
                                    <input type="text" {...register('phone', { required: true })} placeholder='Enter your number...' className='w-full outline-0 px-2 py-2' />
                                </div>
                                {errors.phone && <span className="text-red-500">Phone Number is required</span>}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 gap-5">
                            <div className="">
                                <label htmlFor="">Subject</label>
                                <div className="border bg-white w-full">
                                    <input type="text" {...register('subject', { required: true })} placeholder='Your Message here...' className='w-full outline-0 px-2 py-2' />
                                </div>
                                {errors.subject && <span className="text-red-500">Subject is required</span>}
                            </div>

                            <div className="">
                                <label htmlFor="" className=''>Message</label>
                                <div className="border bg-white w-full">
                                    <textarea rows={5} type="text" {...register('message', { required: true })} placeholder='Your Message here...' className='w-full outline-0 px-2 py-2' />
                                </div>
                                {errors.subject && <span className="text-red-500">Subject is required</span>}
                            </div>
                        </div>



                        <div className="flex justify-end">
                            <button type='submit' className='bg-custom-primary flex items-center gap-2 text-white py-4 lg:text-xl px-4 rounded-lg'>Send Your Message <MoveUpRightIcon />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;