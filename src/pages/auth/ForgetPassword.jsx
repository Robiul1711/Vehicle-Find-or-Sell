
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CustomEmail } from '@/utils/IconProvider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        navigate('/auth/verify-otp');
    }
    return (
        <div className="flex flex-col min-h-full">
            {/* Header Section */}
            <div className="text-center mb-6 py-10">
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">Forgot Your Password?</h1>
                <p className="text-sm lg:text-xl text-muted-foreground">
                    Enter your email to receive password reset instructions.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Label className="text-lg">Email</Label>
                        <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                            <CustomEmail />
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="yourname@gmail.com"
                                className="w-full border-none outline-none bg-transparent"
                            />

                        </div>
                    </div>
                    {errors.email && <span className="text-red-500">Email is required</span>}



                    <div className="flex items-center justify-end text-sm">

                        <Link to="/auth" className="text-theme-primary text-sm lg:text-base hover:underline">
                            Go back to Sign In
                        </Link>
                    </div>
                    <Button className="w-full !h-12 text-lg bg-custom-primary ">Send OTP</Button>
                </form>
            </div>


        </div>
    );
};

export default ForgetPassword;