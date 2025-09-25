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
import AditionalServicesPages from "@/pages/AditionalServicesPage/AditionalServicesPages";
import CarInsurance from "@/pages/AditionalServicesPage/OtherAditionalPages/CarInsurance";
import HomeDelivery from "@/pages/AditionalServicesPage/OtherAditionalPages/HomeDelivery";
import PartnerGarageDirectory from "@/pages/AditionalServicesPage/OtherAditionalPages/PartnerGarageDirectory";
import RegistrationServices from "@/pages/AditionalServicesPage/OtherAditionalPages/RegistrationServices";
import ValuationAndEstimation from "@/pages/AditionalServicesPage/OtherAditionalPages/ValuationAndEstimation";
import VehicleMaintenanceHistory from "@/pages/AditionalServicesPage/OtherAditionalPages/VehicleMaintenanceHistory";
import VehiclePurchase from "@/pages/AditionalServicesPage/OtherAditionalPages/VehiclePurchase";
import VirtualShowroom from "@/pages/AditionalServicesPage/OtherAditionalPages/VirtualShowroom";
import WarrantyAndExtendedWarranty from "@/pages/AditionalServicesPage/OtherAditionalPages/WarrantyAndExtendedWarranty";
import AuthPage from "@/pages/auth/AuthPage";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import NewPassword from "@/pages/auth/NewPassword";
import ResetSuccessful from "@/pages/auth/ResetSuccessful";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import BlogDetailsPage from "@/pages/BlogDetailsPage/BlogDetailsPage";
import BlogPage from "@/pages/BlogPage/BlogPage";
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
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blogDetails/:id",
        element: <BlogDetailsPage />,
      },
      // All aditionals services page
      {
        path: "/services",
        element: <AditionalServicesPages />,
      },
      {
        path: "/aditionalservices/vehicle-maintenance-history",
        element: <VehicleMaintenanceHistory />,
      },
      {
        path: "/aditionalservices/vehicle-purchase",
        element: <VehiclePurchase />,
      },
      {
        path: "/aditionalservices/car-insurance",
        element: <CarInsurance />,
      },
      {
        path: "/aditionalservices/registration-services",
        element: <RegistrationServices />,
      },
      {
        path: "/aditionalservices/warranty-and-extended-warranty",
        element: <WarrantyAndExtendedWarranty />,
      },
      {
        path: "/aditionalservices/valuation-and-estimation",
        element: <ValuationAndEstimation />,
      },
      {
        path: "/aditionalservices/home-delivery",
        element: <HomeDelivery />,
      },
      {
        path: "/aditionalservices/virtual-showroom",
        element: <VirtualShowroom />,
      },
      {
        path: "/aditionalservices/partner-garage-directory",
        element: <PartnerGarageDirectory />,
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
