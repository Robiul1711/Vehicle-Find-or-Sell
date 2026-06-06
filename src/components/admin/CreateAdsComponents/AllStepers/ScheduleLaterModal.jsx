import { RxCross1 } from "react-icons/rx";
import { useFormContext } from "react-hook-form";
import { RiTimer2Line } from "react-icons/ri";

const ScheduleLaterModal = ({ isModalOpen, setIsModalOpen, onConfirm }) => {
  const { register, handleSubmit } = useFormContext();
  if (!isModalOpen) return null;

  // Handles submitting the react-hook-form data and closing the modal
  const handleConfirmSubmit = (data) => {
    onConfirm(data);
    setIsModalOpen(false);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsModalOpen(false);
      }}
      className="fixed inset-0 z-[200000000] bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 p-4"
    >
      {/* Responsive optimizations applied below:
        - max-h-[calc(100vh-2rem)] + overflow-y-auto prevents modal content clipping on short mobile screens.
      */}
      <div className="relative w-full max-w-[550px] max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl p-5 sm:p-8 transition-all duration-300 transform scale-100 no-scrollbar">
        
        {/* Close Button - repositioned slightly for tighter screens */}
        <button
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300 cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <RxCross1 size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Icon Section */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f0f5ff] rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-sm">
            <RiTimer2Line className="text-[#002b55] text-3xl sm:text-4xl" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-2 sm:mb-3 tracking-tight">
            Schedule Ad Posting
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 text-base sm:text-lg">
            Choose when your ad should go live
          </p>

          {/* Form Inputs */}
          <div className="w-full space-y-6 sm:space-y-8 text-left">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-1">Date</label>
              <div className="relative group">
                <input
                  type="date"
                  {...register("scheduled_date")}
                  className="w-full border-2 border-gray-100 bg-gray-50/50 rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 focus:outline-none focus:ring-4 focus:ring-[#002b55]/5 focus:border-[#002b55]/30 focus:bg-white transition-all text-gray-800 font-medium"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-1">Time</label>
              <div className="relative group">
                <input
                  type="time"
                  {...register("scheduled_time")}
                  className="w-full border-2 border-gray-100 bg-gray-50/50 rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 focus:outline-none focus:ring-4 focus:ring-[#002b55]/5 focus:border-[#002b55]/30 focus:bg-white transition-all text-gray-800 font-medium"
                />
              </div>
            </div>

            {/* Action Buttons - Stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:flex-1 px-6 py-3.5 sm:py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(handleConfirmSubmit)}
                className="w-full sm:flex-1 px-6 py-3.5 sm:py-4 rounded-2xl bg-[#002b55] text-white font-bold hover:bg-[#001f3d] shadow-lg shadow-[#002b55]/20 transition-all active:scale-[0.98]"
              >
                Confirm & Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLaterModal;