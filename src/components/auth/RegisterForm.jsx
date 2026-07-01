import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CustomEmail } from "@/utils/IconProvider";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApiMutation } from "@/hooks/useApiMutation";
import SocialLogin from "./SocialLogin";

const RegisterForm = ({ onSuccessSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 1. Setup the Mutation
  const { mutate: registerUser, isPending } = useApiMutation({
    url: "/account/signup/",
    method: "POST",
    successMessage: "Account created successfully! Please log in.",
    onSuccess: (data) => {
      if (onSuccessSignup) {
        onSuccessSignup();
      }
    },
  });

  const onSubmit = (data) => {
    const payload = { ...data };
    if (payload.account_type === "private") {
      delete payload.siren_number;
    }
    registerUser(payload);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Account Type */}
        <div className="">
          <Label className="text-lg">Type</Label>
          <div className="flex items-center gap-2 p-3 rounded-[10px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register("account_type", { required: true })}
                type="radio"
                value="professional"
              />
              <span className="text-sm lg:text-xl">Professionals Seller</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer ml-4">
              <input
                {...register("account_type", { required: true })}
                type="radio"
                value="private"
              />
              <span className="text-sm lg:text-xl">Private Sellers</span>
            </label>
          </div>
          {errors.account_type && (
            <span className="text-red-500 text-sm">Account Type is required</span>
          )}
        </div>

        {/* Email */}
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
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>

        {/* Password */}
        <div className="space-y-4">
          <Label className="text-lg">Password</Label>
          <div className="border flex items-center gap-2 p-3 rounded-[10px]">
            <input
              {...register("password", { required: true, minLength: 6 })}
              type={showPassword ? "text" : "password"}
              placeholder="*********"
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
            <span className="text-red-500 text-sm">
              Password is required (min 6 chars)
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-4">
          <Label className="text-lg">Confirm Password</Label>
          <div className="border flex items-center gap-2 p-3 rounded-[10px]">
            <input
              {...register("confirm_password", {
                required: true,
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Your passwords do not match";
                  }
                },
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="*********"
              className="w-full border-none outline-none bg-transparent"
            />
            {showConfirmPassword ? (
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          {errors.confirm_password && (
            <span className="text-red-500 text-sm">
              {errors.confirm_password.message || "Confirm Password is required"}
            </span>
          )}
        </div>

        {/* SIREN Number */}
        {watch("account_type") === "professional" && (
          <div className="space-y-4">
            <Label className="text-lg">SIREN Number</Label>
            <div className="border flex items-center gap-2 p-3 rounded-[10px]">
              <input
                type="text"
                {...register("siren_number", { required: true })}
                placeholder=""
                className="w-full border-none outline-none bg-transparent"
              />
            </div>
            {errors.siren_number && (
              <span className="text-red-500 text-sm">SIREN Number is required</span>
            )}
          </div>
        )}

        {/* Terms & Conditions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 r py-2">
              <input
                type="checkbox"
                {...register("accept_terms", { required: true })}
                className="rounded accent-custom-primary"
              />
              <span className="text-sm">
                I agree to the <Link to="/term-and-conditions" className="text-custom-primary">Terms & Conditions</Link> and <Link to="/term-and-conditions" className="text-custom-primary">Privacy Policy</Link>.
              </span>
            </label>
          </div>
          {errors.accept_terms && (
            <span className="text-red-500 text-sm block">
              You must agree to the terms
            </span>
          )}
        </div>

        <Button
          disabled={isPending}
          className="w-full !h-12 text-lg bg-custom-primary disabled:opacity-50"
        >
          {isPending ? "Creating Account..." : "Create Account"}
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

      <p className="mt-10 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => onSuccessSignup && onSuccessSignup()}
          className="font-bold ml-1 hover:underline text-theme-primary"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
