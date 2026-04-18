import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../../assets/images/logo1.png";
import { Link } from "react-router-dom";

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="flex flex-col w-full">
      {/* Branding for Mobile (Hidden on Desktop because it's on the left) */}
      <Link to="/" className="flex items-center justify-center  mb-8">
        <img src={logo} alt="Logo" className="w-40" />
      </Link>

      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {activeTab === "signin" ? "Welcome back" : "Create an account"}
        </h2>
        <p className="text-gray-500 mt-2">
          {activeTab === "signin" 
            ? "Enter your details to access your account" 
            : "Join our community and start your journey today"}
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-8"
      >
        {/* Tab Header - Minimal style */}
        <TabsList className="flex items-center gap-8 bg-transparent p-0 h-auto border-b rounded-none mb-6">
          <TabsTrigger 
            value="signin" 
            className="pb-2 text-base font-semibold rounded-sm border-b-2 border-transparent data-[state=active]:border-custom-primary data-[state=active]:text-custom-primary bg-transparent"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger 
            value="signup" 
            className="pb-2 rounded-sm text-base font-semibold border-b-2 border-transparent data-[state=active]:border-custom-primary data-[state=active]:text-custom-primary bg-transparent"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* Form Content */}
        <div className="relative">
          <TabsContent value="signin" className="m-0 outline-none animate-in fade-in zoom-in-95 duration-500">
            <LoginForm onRegisterClick={() => setActiveTab("signup")} />
          </TabsContent>

          <TabsContent value="signup" className="m-0 outline-none animate-in fade-in zoom-in-95 duration-500">
            <RegisterForm onSuccessSignup={() => setActiveTab("signin")} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
