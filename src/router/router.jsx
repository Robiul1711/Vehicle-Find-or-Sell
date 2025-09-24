import BoostAds from "@/components/admin/BoostAds/BoostAds";
import Dashboard from "@/components/admin/Dashboard/Dashboard";
import Message from "@/components/admin/Message/Message";
import MyAdds from "@/components/admin/MyAdds/MyAdds";
import MyFavorites from "@/components/admin/MyFavorites/MyFavorites";
import Settings from "@/components/admin/Settings/Settings";
import Subscription from "@/components/admin/Subscription/Subscription";
import SupportAndHelp from "@/components/admin/SupportAndHelp/SupportAndHelp";
import { SubscriptionIcon } from "@/components/common/SVGicons/DashboardIcon";
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import AuthPage from "@/pages/auth/AuthPage";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import NewPassword from "@/pages/auth/NewPassword";
import ResetSuccessful from "@/pages/auth/ResetSuccessful";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import Home from "@/pages/home/Home";
import BrouseListing from "@/pages/ListingsPges/BrouseListing";


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
      {
        path: "/listings",
        element: <BrouseListing />,
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
        element: <Dashboard />
      },
      {
        path: "/dashboard/my-adds",
        element: <MyAdds />
      },
      {
        path: "/dashboard/boost-ads",
        element: <BoostAds />
      },
      {
        path: "/dashboard/my-favorites",
        element: <MyFavorites />
      },
      {
        path: "/dashboard/message",
        element: <Message />
      },
      {
        path: "/dashboard/subscription",
        element: <Subscription />
      },
      {
        path: "/dashboard/support-and-help",
        element: <SupportAndHelp />
      },
      {
        path: "/dashboard/settings",
        element: <Settings />
      },
    ],
  },
]);

export default router;
