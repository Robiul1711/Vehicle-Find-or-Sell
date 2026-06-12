import { Link, useParams } from "react-router-dom";
import { Star, StarHalf, MessageCircle, ExternalLink, RefreshCw } from "lucide-react"; // Added RefreshCw
import { FcGoogle } from "react-icons/fc";
import dummyProfile from '@/assets/images/dummy.png'
import { useApiQuery } from "@/hooks/useApiQuery";
import { Button } from "antd";

const GoogleReviewShow = () => {
  const { id } = useParams();

  // Destructured isError and refetch from the hook
  const { data: reviewData, isLoading, isError, refetch } = useApiQuery({
    queryKey: ["googleReview", id],
    url: `/account/google-reviews/${id}/`,
  });

  const reviews = reviewData?.data?.reviews || [];
  const stats = reviewData?.data || {};

  const renderStars = (rating) => {
    const numericRating = parseFloat(rating) || 0;
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          if (starValue <= numericRating) {
            return <Star key={i} className="size-3.5 fill-[#FFB800] text-[#FFB800]" />;
          } else if (starValue - 0.5 <= numericRating) {
            return <StarHalf key={i} className="size-3.5 fill-[#FFB800] text-[#FFB800]" />;
          } else {
            return <Star key={i} className="size-3.5 text-gray-200 fill-gray-100" />;
          }
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="size-10 bg-gray-100 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-100 rounded w-24" />
            <div className="h-3 bg-gray-50 rounded w-32" />
          </div>
        </div>
        {[1, 2].map((i) => (
          <div key={i} className="p-4 border border-gray-50 rounded-2xl space-y-3">
            <div className="flex gap-3">
              <div className="size-8 bg-gray-100 rounded-full" />
              <div className="h-4 bg-gray-100 rounded w-20 mt-2" />
            </div>
            <div className="h-3 bg-gray-50 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-3xl border border-red-100 p-8 text-center shadow-sm">
        <div className="bg-red-50 size-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="text-red-500" />
        </div>
        <h4 className="font-bold text-gray-900 mb-2 font-urbanist">Couldn't load reviews</h4>
        <button 
          onClick={() => refetch()}
          className="flex items-center gap-2 mx-auto text-sm font-bold text-custom-primary hover:underline transition-all"
        >
          <RefreshCw className="size-3.5" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-black/5 border border-gray-100 overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-b from-gray-50/80 to-white border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
              <FcGoogle className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 tracking-tight font-urbanist">Google Reputation</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {stats.total_reviews || 0} verified reviews
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-gray-900 leading-none mb-1 font-urbanist">
              {stats.rating || '0.0'}
            </div>
            <div className="flex justify-end">
              {renderStars(stats.rating)}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar">
        {reviews.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <MessageCircle className="mx-auto size-12 mb-4 opacity-10" />
            <p className="text-sm font-medium">No reviews found yet</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div key={`${review.time}-${index}`} className="group animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${(index % 5) * 100}ms` }}>
              <div className="flex items-start gap-4">
                <img 
                  src={review?.profile_photo_url || dummyProfile} 
                  alt={review?.author_name} 
                  className="size-11 rounded-full bg-gray-100 border-2 border-white shadow-sm ring-1 ring-gray-100 object-cover"
                  onError={(e) => { e.target.src = dummyProfile }} // Fallback if URL is broken
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-[13px] text-gray-900 truncate flex items-center gap-1.5 font-urbanist">
                      {review.author_name}
                      {review.author_url && (
                        <a href={review.author_url} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-blue-500 transition-colors">
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </h4>
                    <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {review.relative_time_description}
                    </span>
                  </div>
                  <div className="mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors font-medium">
                    {review.text}
                  </p>
                </div>
              </div>
              {index !== reviews.length - 1 && (
                <div className="mt-6 border-b border-gray-50" />
              )}
            </div>
          ))
        )}

        {/* Simplified End of Records - removed intersection observer logic since this isn't an infinite query */}
{
  reviewData?.data?.google_maps_url && (
    <div className="py-4 flex justify-center items-center gap-3 text-gray-200">
    
        <Link to={`${reviewData?.data?.google_maps_url}`} target="_blank">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            >
         
            View All Reviews
          </Button>
        </Link>
        
        </div>
         ) }
      </div>

      {/* Footer Branding */}
      <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
          Synced with Google Maps
        </p>
        <p className="text-[9px] text-gray-400 font-medium">
          Last updated: {stats.last_fetched ? new Date(stats.last_fetched).toLocaleDateString() : 'Just now'}
        </p>
      </div>
    </div>
  );
};

export default GoogleReviewShow;