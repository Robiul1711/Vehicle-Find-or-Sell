import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

const SocialLogin = () => {
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  
  const { register, watch, getValues, formState: { errors } } = useForm({
    defaultValues: {
      google_account_type: "",
      google_siren_number: ""
    }
  });

  const { mutate: googleLogin, isPending: isGooglePending } = useApiMutation({
    url: "/account/google-login/",
    method: "POST",
    successMessage: "Logged in successfully with Google!",
    onSuccess: (data) => {
      saveAuth({
        access: data.tokens?.access || data.access || data.token,
        user: data.user || data.userdata,
      });
      setIsGoogleModalOpen(false);
      navigate("/dashboard");
    },
  });

  const handleGoogleSuccess = (credentialResponse) => {
    const type = getValues("google_account_type");
    const siren = getValues("google_siren_number");

    const payload = {
      token: credentialResponse.credential,
      account_type: type,
      ...(type === "professional" && { siren_number: siren }),
    };

    googleLogin(payload);
  };

  const selectedType = watch("google_account_type");

  return (
    <>
      {/* Social Login Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsGoogleModalOpen(true)}
          className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-all active:scale-90"
        >
          <FcGoogle className="w-6 h-6" />
        </button>
      </div>

      {/* Google Choice Modal */}
      <Modal
        title={
          <div className="text-center pb-2 border-b">
            <h2 className="text-xl font-bold">Complete Your Profile</h2>
            <p className="text-sm text-gray-500 font-normal">
              Choose account type to continue with Google
            </p>
          </div>
        }
        open={isGoogleModalOpen}
        onCancel={() => setIsGoogleModalOpen(false)}
        footer={null}
        centered
        width={400}
      >
        <div className="py-6 space-y-6">
          {/* Warning Message */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
            <p className="text-xs text-amber-800 font-medium">
              <span className="font-bold">⚠️ Warning:</span> Once you select your account type, it cannot be changed later. Please choose carefully.
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Account Type</Label>
            <div className="grid grid-cols-1 gap-3">
              <label
                className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedType === "private"
                    ? "border-custom-primary bg-custom-primary/5"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <input
                  {...register("google_account_type", { required: true })}
                  type="radio"
                  value="private"
                  className="w-4 h-4 accent-custom-primary"
                />
                <div className="flex flex-col">
                  <span className="font-bold">Private Seller</span>
                  <span className="text-xs text-gray-500">
                    I want to sell my own items
                  </span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedType === "professional"
                    ? "border-custom-primary bg-custom-primary/5"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <input
                  {...register("google_account_type", { required: true })}
                  type="radio"
                  value="professional"
                  className="w-4 h-4 accent-custom-primary"
                />
                <div className="flex flex-col">
                  <span className="font-bold">Professional Seller</span>
                  <span className="text-xs text-gray-500">
                    I am a business or professional
                  </span>
                </div>
              </label>
            </div>
          </div>

          {selectedType === "professional" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <Label className="text-base font-semibold">SIREN Number</Label>
              <input
                {...register("google_siren_number", {
                  required: selectedType === "professional",
                })}
                placeholder="Enter 9-digit SIREN"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-custom-primary outline-none"
              />
            </div>
          )}

          <div className="flex justify-center pt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
              useOneTap
              theme="filled_blue"
              shape="pill"
              width="350px"
              text="continue_with"
              size="large"
              disabled={
                !selectedType ||
                (selectedType === "professional" &&
                  !watch("google_siren_number")) ||
                  isGooglePending
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SocialLogin;
