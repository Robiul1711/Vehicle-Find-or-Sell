import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100 transform transition-all hover:shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-50 mb-6">
                        <XCircle className="h-12 w-12 text-red-500 animate-pulse" />
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Payment Cancelled
                    </h2>
                    
                    <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                        Your transaction was not completed. No funds have been deducted from your account. You can retry the payment or return to the dashboard.
                    </p>
                </div>

                <div className="mt-8 space-y-3">
                    <Link
                        to="/dashboard/subscription"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-custom-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-primary transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <RefreshCw className="h-4 w-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                        </span>
                        Retry Payment
                    </Link>

                    <Link
                        to="/dashboard"
                        className="group relative w-full flex justify-center py-3 px-4 border-2 border-gray-200 text-sm font-semibold rounded-xl text-gray-600 bg-transparent hover:bg-gray-50 hover:border-gray-300 focus:outline-none transition-all duration-300"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </span>
                        Back to Dashboard
                    </Link>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                        Need help? <Link to="/contact" className="text-custom-primary font-medium hover:underline">Contact our support team</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
