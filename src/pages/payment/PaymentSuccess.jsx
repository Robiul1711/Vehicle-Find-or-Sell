import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, LayoutDashboard, PenLine } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
    const hasDraftAd = !!localStorage.getItem("draftAd");

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center relative z-10"
            >
                <div className="relative">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-50 mb-6 group relative"
                    >
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        
                        {/* Decorative circles */}
                        <motion.div 
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-green-200 -z-10"
                        />
                    </motion.div>
                </div>

                <div>
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight"
                    >
                        Payment Success!
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-base text-gray-500 leading-relaxed max-w-xs mx-auto"
                    >
                        {hasDraftAd
                            ? "Your subscription is now active! You can continue posting the ad you were working on."
                            : "Thank you for your purchase. Your payment has been successfully processed."}
                    </motion.p>
                </div>

                <div className="mt-10 space-y-4 pt-10 border-t border-gray-100">
                    {hasDraftAd && (
                        <Link
                            to="/dashboard/create-ads"
                            className="group relative w-full flex justify-center gap-2 py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-md shadow-green-600/20"
                        >
                            <PenLine className="h-5 w-5 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                            Continue Posting Your Ad
                        </Link>
                    )}
                    <Link
                        to="/dashboard"
                        className={`group relative w-full flex justify-center gap-2 py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-custom-primary hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-md shadow-custom-primary/20`}
                    >
                     
                            <LayoutDashboard className="h-5 w-5 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                   
                        Go to Dashboard
                    </Link>

                    <Link
                        to="/"
                        className="group relative w-full flex justify-center gap-2 py-4 px-4 border-2 border-gray-200 text-sm font-bold rounded-2xl text-gray-600 bg-transparent hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-sm"
                    >
                            <Home className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                       
                        Browse Homepage
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;
