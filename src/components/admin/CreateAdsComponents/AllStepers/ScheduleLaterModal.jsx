import { RxCross1 } from "react-icons/rx";
import { useFormContext } from "react-hook-form";
import { RiTimer2Line } from "react-icons/ri";

const ScheduleLaterModal = ({ isModalOpen, setIsModalOpen, onConfirm }) => {
  const { register, handleSubmit } = useFormContext();
  if (!isModalOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsModalOpen(false);
      }}
      className="fixed inset-0 z-[200000000] bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 p-4"
    >
      <div className="relative w-full max-w-[550px] bg-white rounded-[32px] shadow-2xl p-6  transition-all duration-300 transform scale-100">
        {/* Close Button */}
        <button
          className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300 cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <RxCross1 size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Icon Section */}
          <div className="w-20 h-20 bg-[#f0f5ff] rounded-full flex items-center justify-center mb-8 shadow-sm">
            <RiTimer2Line className="text-[#002b55] text-4xl" />
          </div>

          <h2 className="text-3xl font-extrabold text-[#111111] mb-3 tracking-tight">
            Schedule Ad Posting
          </h2>
          <p className="text-gray-500 mb-10 text-lg">
            Choose when your ad should go live
          </p>

          {/* Form Inputs */}
          <div className="w-full space-y-8 text-left">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-1">Date</label>
              <div className="relative group">
                <input
                  type="date"
                  {...register("scheduled_date")}
                  className="w-full border-2 border-gray-100 bg-gray-50/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-[#002b55]/5 focus:border-[#002b55]/30 focus:bg-white transition-all text-gray-800 font-medium"
                />
                {/* <LuCalendarDays className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl pointer-events-none group-focus-within:text-[#002b55] transition-colors" /> */}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2.5 ml-1">Time</label>
              <div className="relative group">
                <input
                  type="time"
                  {...register("scheduled_time")}
                  className="w-full border-2 border-gray-100 bg-gray-50/50 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-[#002b55]/5 focus:border-[#002b55]/30 focus:bg-white transition-all text-gray-800 font-medium"
                />
                {/* <LuClock className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl pointer-events-none group-focus-within:text-[#002b55] transition-colors" /> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onConfirm)}
                className="flex-1 px-8 py-4 rounded-2xl bg-[#002b55] text-white font-bold hover:bg-[#001f3d] shadow-lg shadow-[#002b55]/20 transition-all active:scale-[0.98]"
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

