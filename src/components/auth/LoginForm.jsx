import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CustomEmail } from "@/utils/IconProvider";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useAuth } from "@/hooks/useAuth";
import SocialLogin from "./SocialLogin";

const LoginForm = ({ onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: localStorage.getItem("remember_email") || "",
      remember: !!localStorage.getItem("remember_email"),
    }
  });

  const { mutate, isPending } = useApiMutation({
    url: "/account/signin/",
    method: "POST",
    secure: false,
    successMessage: "Welcome back!",
    onSuccess: (data, variables) => {
      // Remember Me logic
      if (variables.remember) {
        localStorage.setItem("remember_email", variables.email);
      } else {
        localStorage.removeItem("remember_email");
      }

      saveAuth({
        access: data.tokens.access,
        user: data.user || data.userdata,
      });
      navigate("/dashboard");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="space-y-2">
          <Label className="text-lg">Email</Label>
          <div className="border flex items-center gap-2 p-3 rounded-md bg-white">
            <CustomEmail />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="yourname@gmail.com"
              className="w-full border-none outline-none bg-transparent"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label className="text-lg">Password</Label>
          <div className="border flex items-center gap-2 p-3 rounded-md bg-white">
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border-none outline-none bg-transparent"
            />
            {showPassword ? (
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              {...register("remember")}
              className="rounded accent-custom-primary" 
            />
            <span>Remember me</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-theme-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button disabled={isPending} className="w-full h-12 text-lg bg-custom-primary">
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-300" />
        <p className="text-sm text-gray-500">Or continue with</p>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Reusable Social Login Component */}
      <SocialLogin />

      {/* Register Section */}
      <p className="text-center text-sm">
        Don't have an account?
        <button
          type="button"
          onClick={() => onRegisterClick && onRegisterClick()}
          className="text-theme-primary font-semibold hover:underline ml-1"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
