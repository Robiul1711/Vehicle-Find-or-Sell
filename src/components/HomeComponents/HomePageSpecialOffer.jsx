import React, { useState, useEffect } from "react";

const HomePageSpecialOffer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the offer
    const hasSeenOffer = localStorage.getItem("hasSeenOffer");

    if (!hasSeenOffer) {
      setIsOpen(true); // show modal on first visit
      localStorage.setItem("hasSeenOffer", "true"); // mark as seen
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Our Site!
        </h2>
        <p className="text-gray-700 mb-6">
          Enjoy a special 20% off your first purchase! Use code{" "}
          <span className="font-semibold">WELCOME20</span>.
        </p>
        <button
          onClick={() => {
            alert("Offer Claimed!");
            setIsOpen(false);
          }}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Claim Offer
        </button>
      </div>
    </div>
  );
};

export default HomePageSpecialOffer;
