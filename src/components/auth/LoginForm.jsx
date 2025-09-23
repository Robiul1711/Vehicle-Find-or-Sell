import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CustomEmail } from '@/utils/IconProvider';
import { Eye, EyeClosed } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

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
                    <Label className="text-lg">Email</Label>
                    <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                        <CustomEmail />
                        <input
                            type="email"
                            placeholder="yourname@gmail.com"
                            className="w-full border-none outline-none bg-transparent"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="text-lg">Password</Label>
                    <div className="border flex items-center gap-2 p-3 rounded-[10px]">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="yourname@gmail.com"
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
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className='text-sm lg:text-xl'>Remember me</span>
                    </label>
                    <Link className="text-theme-primary text-sm lg:text-xl hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <Button className="w-full !h-12 text-lg bg-custom-primary ">Sign In</Button>
            </form>

            <p className="mt-10 text-center">Already have an account?
                <span className="font-bold"> Sign Up</span>
            </p>
        </div>
    );
};

export default LoginForm;