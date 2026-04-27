import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { FcGoogle } from "react-icons/fc";
import { FaInfoCircle } from "react-icons/fa";

const AddGoogleReview = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();



  // Mutation to save Google Place ID
  const { mutate, isPending } = useApiMutation({
    url: "/account/google-integration/",
    method: "POST",
    secure: true,
    invalidateKeys: ["googleReview"],
    successMessage: "Google Review settings updated successfully!",
  });

  const onSubmit = (data) => {
    mutate(data);
  };


  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-5 mb-10">
            <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-inner">
              <FcGoogle className="text-4xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Google Review Integration
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Showcase your business reputation by connecting your Google Place ID.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                Google Place ID
                <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Input
                  {...register("google_place_id", {
                    required: "Google Place ID is required",
                  })}
                  placeholder="e.g. ChIJW7NjJnLHVtcR7K6vTD5UkEw"
                  className={`h-16 px-6 rounded-2xl border-gray-200 bg-gray-50/30 focus:bg-white focus:ring-4 focus:ring-custom-primary/10 focus:border-custom-primary transition-all text-lg font-medium placeholder:text-gray-300 ${
                    errors.google_place_id ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : ""
                  }`}
                />
              </div>
              {errors.google_place_id && (
                <p className="text-red-500 text-sm font-medium ml-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.google_place_id.message}
                </p>
              )}
            </div>

            <div className="bg-blue-50/40 border border-blue-100/50 rounded-2xl p-6 flex gap-4 transition-colors hover:bg-blue-50/60">
              <div className="mt-1">
                <FaInfoCircle className="text-blue-500 text-xl" />
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-blue-900 leading-none">Need help finding your ID?</h4>
                <div className="text-sm text-blue-800/70 space-y-2 leading-relaxed">
                  <p>1. Visit the official <a href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline decoration-2 underline-offset-4">Place ID Finder</a>.</p>
                  <p>2. Search for your specific business name and location.</p>
                  <p>3. Copy the ID that appears on the map tooltip and paste it above.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-custom-primary hover:bg-[#011a36] text-white px-10 h-14 rounded-2xl font-bold text-lg shadow-xl shadow-custom-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Configuration"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGoogleReview;
