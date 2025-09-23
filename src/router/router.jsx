import Dashboard from "@/components/admin/Dashboard";
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import AuthPage from "@/pages/auth/AuthPage";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import NewPassword from "@/pages/auth/NewPassword";
import ResetSuccessful from "@/pages/auth/ResetSuccessful";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import Home from "@/pages/home/Home";


import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

    ],
  },

  // auth related pages 
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgetPassword />
      },
      {
        path: "/auth/verify-otp",
        element: <VerifyOTP />
      },
      {
        path: "/auth/set-new-password",
        element: <NewPassword />
      },
      {
        path: "/auth/reset-successful-password",
        element: <ResetSuccessful />
      },

    ]
  },

  // Admin routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />, // ✅ Fixed typo
      },
    ],
  },
]);

export default router;
