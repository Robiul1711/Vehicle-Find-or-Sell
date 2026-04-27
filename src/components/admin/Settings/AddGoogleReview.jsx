import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { FcGoogle } from "react-icons/fc";
import { FaInfoCircle, FaStar } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

const AddGoogleReview = () => {
  const { user } = useAuth();

  // ✅ your API data
  const googelReviewData = user?.profile?.google_integration;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <div className="max-w-5xl mx-auto space-y-10">
      {/* ================= FORM ================= */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-5 mb-10">
            <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-inner">
              <FcGoogle className="text-4xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Google Review Integration
              </h2>
              <p className="text-gray-500 text-sm">
                Showcase your business reputation by connecting your Google
                Place ID.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Google Place ID <span className="text-red-500">*</span>
              </label>

              <Input
                {...register("google_place_id", {
                  required: "Google Place ID is required",
                })}
                defaultValue={googelReviewData?.google_place_id}
                placeholder="e.g. ChIJW7NjJnLHVtcR7K6vTD5UkEw"
                className={`h-16 px-6 rounded-2xl ${errors.google_place_id ? "border-red-500" : ""
                  }`}
              />

              {errors.google_place_id && (
                <p className="text-red-500 text-sm">
                  {errors.google_place_id.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-blue-900 leading-none">
                Need help finding your ID?
              </h4>

              <div className="text-sm text-blue-800/70 space-y-1 leading-relaxed">
                <p>
                  1. Visit the official{" "}
                  <a
                    href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-bold hover:underline decoration-2 underline-offset-4"
                  >
                    Place ID Finder
                  </a>
                  .
                </p>

                <p>2. Search for your specific business name and location.</p>

                <p>
                  3. Copy the ID that appears on the map tooltip and paste it
                  above.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Configuration"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      {googelReviewData?.reviews_cache?.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Google Reviews
              </h3>
              <p className="text-gray-500 text-sm">
                ⭐ {googelReviewData?.rating} ({googelReviewData?.total_reviews}{" "}
                reviews)
              </p>
            </div>

            <a
              href={googelReviewData?.google_maps_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              View on Google
            </a>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {googelReviewData.reviews_cache.map((review, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition"
              >
                {/* User */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.author_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {review.relative_time_description}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-yellow-500 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGoogleReview;
