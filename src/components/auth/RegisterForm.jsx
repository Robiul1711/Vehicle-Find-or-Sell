import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CustomEmail } from '@/utils/IconProvider';
import { Eye, EyeClosed } from 'lucide-react';
import { Link } from 'react-router-dom';


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                <div className="space-y-4">
                    <Label className="text-lg">Type</Label>
                    <div className=" flex items-center gap-2 p-3 rounded-[10px]">

                        <input
                            {...register("type", { required: true })}
                            type="radio"
                            value={"Professionals Seller"}
                        />
                        <span className='text-sm lg:text-xl'>Professionals Seller</span>
                        <input
                            {...register("type", { required: true })}
                            type="radio"
                            value={"Private Sellers"}
                        />
                        <span className='text-sm lg:text-xl'>Private Sellers</span>
                    </div>
                    {errors.type && <span className="text-red-500">Type is required</span>}
                </div>


                <div className="space-y-4">
                    <Label className="text-lg">Email</Label>
                    <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                        <CustomEmail />
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="yourname@gmail.com"
                            className="w-full border-none outline-none bg-transparent"
                        />
                    </div>
                    {errors.email && <span className="text-red-500">Email is required</span>}
                </div>

                <div className="space-y-4">
                    <Label className="text-lg">Password</Label>
                    <div className="border flex items-center gap-2 p-3 rounded-[10px]">

                        <input
                            {...register("password", { required: true })}
                            type={showPassword ? "text" : "password"}
                            placeholder="*********"
                            className="w-full border-none outline-none bg-transparent"
                        />
                        {
                            showPassword ? (
                                <EyeClosed className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                            ) : (
                                <Eye className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                            )

                        }
                    </div>
                    {errors.password && <span className="text-red-500">Password is required</span>}
                </div>

                <div className="space-y-4">
                    <Label className="text-lg">Confirm Password</Label>
                    <div className="border flex items-center gap-2 p-3 rounded-[10px]">

                        <input
                            {...register("confirmPassword", { required: true })}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="*********"
                            className="w-full border-none outline-none bg-transparent"
                        />
                        {
                            showConfirmPassword ? (
                                <EyeClosed className="cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            ) : (
                                <Eye className="cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            )

                        }
                    </div>
                    {errors.confirmPassword && <span className="text-red-500">Confirm Password is required</span>}
                </div>


                <div className="space-y-4">
                    <Label className="text-lg">SIREN Number</Label>
                    <div className="border flex items-center gap-2 p-3 rounded-[10px]">

                        <input
                            type="text"
                            {...register("siren", { required: true })}
                            placeholder=""
                            className="w-full border-none outline-none bg-transparent"
                        />
                    </div>
                    {errors.siren && <span className="text-red-500">SIREN Number is required</span>}
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className='text-sm lg:text-xl'>I agree to the Terms & Conditions and Privacy Policy.</span>
                    </label>

                </div>
                <Button className="w-full !h-12 text-lg bg-custom-primary ">Create Account</Button>
            </form>

            <p className="mt-10 text-center">Already have an account?
                <span className="font-bold"> Sign In</span>
            </p>
        </div>
    );
};

export default RegisterForm;