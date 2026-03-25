import BoostAds from "@/components/admin/BoostAds/BoostAds";
import BoostYourAdVisibility from "@/components/admin/BoostAds/BoostYourAdVisibility";
import CarDetailsPage from "@/components/admin/CarDetails/CarDetailsPage";
import Dashboard from "@/components/admin/Dashboard/Dashboard";
import Message from "@/components/admin/Message/Message";
import MyAdds from "@/components/admin/MyAdds/MyAdds";
import ViewAnalytics from "@/components/admin/CarDetails/ViewAnalytics";
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
import CreateAds from "@/components/admin/CreateAdsComponents/CreateAds";
import DetailsPage from "@/pages/detailsPage/DetailsPage";
import DealerPage from "@/pages/dealerPage/DealerPage";
import DealerProfile from "@/pages/dealerPage/DealerProfile";
import ContactPage from "@/pages/contactPage/ContactPage";
import TermAndCondition from "@/pages/termAndCondition/TermAndCondition";
import LegalNotice from "@/pages/legalNotice/LegalNotice";
import CookiePolicy from "@/pages/cookiePolicy/CookiePolicy";
import PersonalData from "@/pages/personalData/PersonalData";
import TermOfUse from "@/pages/tou/TermOfUse";
import ProductComparison from "@/pages/comparePage/ProductComparison";
import PartsDetails from "@/pages/detailsPage/PartsDetails";
import PrivateRoute from "@/providers/PrivateRoute";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentCancel from "@/pages/payment/PaymentCancel";

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
        path: "/details/:id",
        element: <DetailsPage />,
      },
      {
        path: "/parts-details/:id",
        element: <PartsDetails />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blogDetails/:id",
        element: <BlogDetailsPage />,
      },
      {
        path: "/dealers",
        element: <DealerPage />,
      },
      {
        path: "/dealer-profile/:id",
        element: <DealerProfile />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/term-and-conditions",
        element: <TermAndCondition />,
      },
      {
        path: "/legal-notice",
        element: <LegalNotice />,
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "/personal-data-protection-policy",
        element: <PersonalData />,
      },
      {
        path: "/term-of-use",
        element: <TermOfUse />,
      },
      {
        path: "/compare",
        element: <ProductComparison />,
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
      {
        path: "/payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/cancel",
        element: <PaymentCancel />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
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
        element: <ForgetPassword />,
      },
      {
        path: "/auth/verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "/auth/set-new-password",
        element: <NewPassword />,
      },
      {
        path: "/auth/reset-successful-password",
        element: <ResetSuccessful />,
      },
    ],
  },

  // Admin routes
  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/my-adds",
        element: <MyAdds />,
      },
      {
        path: "/dashboard/create-ads",
        element: <CreateAds />,
      },
      {
        path: "/dashboard/edit-ads/:id",
        element: <CreateAds />,
      },
      {
        path: "/dashboard/car-details/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "/dashboard/view-analytics/:id",
        element: <ViewAnalytics />,
      },
      {
        path: "/dashboard/boost-ads",
        element: <BoostAds />,
      },
      {
        path: "/dashboard/boost-your-ad-visibility/:id",
        element: <BoostYourAdVisibility />,
      },
      {
        path: "/dashboard/my-favorites",
        element: <MyFavorites />,
      },
      {
        path: "/dashboard/message",
        element: <Message />,
      },
      {
        path: "/dashboard/subscription",
        element: <Subscription />,
      },
      {
        path: "/dashboard/support-and-help",
        element: <SupportAndHelp />,
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
