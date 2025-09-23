import Dashboard from "@/components/admin/Dashboard";
import AdminLayout from "@/layout/AdminLayout";
import Layout from "@/layout/Layout";
import AuthPage from "@/pages/auth/AuthPage";
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
    element: <AuthPage />
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
