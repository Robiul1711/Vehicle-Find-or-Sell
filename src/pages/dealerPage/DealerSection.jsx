import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  MessageCircle,
  Car,
  Wrench,
  Droplets,
  MoveUpRight,
  Check,
  SquareCheckBig,
  MessageCircleCode,
  MessageCircleIcon,
} from "lucide-react";
import { ImageProvider } from "@/utils/ImageProvider";
import profile from "@/assets/images/profile.png";
import {
  CustomAutoRepair,
  CustomCarWash,
  CustomNewVehicle,
  CustomRightUp,
  CustomUsedVehicle,
} from "@/utils/IconProvider";
import { Link, useParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";

import { useApiMutation } from "@/hooks/useApiMutation";
import { useAuth } from "@/hooks/useAuth";
import ImageAvatar from "@/assets/images/dummy.png";
import { DeliveryIcon } from "@/components/common/SVGicons/DashboardIcon";
import GoogleReviewShow from "./GoogleReviewShow";
import { BsWhatsapp } from "react-icons/bs";
import SEO from "@/components/common/SEO";

const DealerSection = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data, isLoading } = useApiQuery({
    queryKey: ["dealerDetail", id],
    url: `/delears/detail/${id}/`,
    secure: true,
  });
  // console.log(data);
  // console.log(data?.profile?.services);
  const profileData = data?.profile;

  const { mutate, isPending } = useApiMutation({
    url: "/message/conversations/get-or-create/",
    method: "POST",
    secure: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SEO title="Loading Dealer Profile..." />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-primary"></div>
      </div>
    );
  }

  const openingHours = profileData?.opening_hours || [];
  // console.log(openingHours);
  const serviceIcons = {
    "Used Vehicle": <CustomUsedVehicle />,
    "New Vehicle": <CustomNewVehicle />,
    "Auto Repair": <CustomAutoRepair />,
    "Car Wash": <CustomCarWash />,
    "Other Services": <Check/>,
    "Delivery": <DeliveryIcon />,
  };

  const services = profileData?.services || [];

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {profileData && (
        <SEO 
          title={`${profileData.full_name} (${profileData.account_type || 'Professional Seller'})`}
          description={`Connect with ${profileData.full_name} located in ${profileData.city || ''}, ${profileData.country || ''}. Specializing in professional seller services on Ronpoin.`}
          image={profileData.profile_image}
          type="profile"
          keywords={[profileData.full_name, 'dealer profile', 'ronpoin seller', 'professional seller']}
        />
      )}
      <div className="bg-white relative lg:w-3/4 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header with geometric design */}
        <div className=" ">
          {/* Cover image or fallback */}
          <div className="w-full h-48 lg:h-64 bg-gray-100 overflow-hidden">
            {/* {console.log(profileData)} */}
            <img
              src={
                profileData?.cover_image
                  ? profileData.cover_image
                  : ImageProvider.profile
              }
              className="w-full h-full object-cover"
              alt="Cover"
            />
          </div>
        </div>
        {/* Profile picture */}
        <div className=" -mt-10 lg:-mt-20 ">
          <div className="w-20 h-20 lg:w-32 lg:h-32 ml-10 rounded-full border-4 border-white overflow-hidden bg-gray-200">
            <img
              src={
                profileData?.profile_image
                  ? profileData.profile_image
                  : ImageAvatar
              }
              alt={profileData?.full_name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-6 pt-8">
          {/* Dealer info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Name: {profileData?.full_name || "N/A"} 
              </h2>
              <p className="text-gray-600 mb-4 font-semibold">
              Account Type:  {profileData?.account_type || "Professional Seller"}
              </p>

              <div className="space-y-3 text-sm text-gray-700">
                {(profileData?.street || profileData?.city || profileData?.zip_code || profileData?.country) && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <span>
                      {profileData?.street}, {profileData?.city},{" "}
                      {profileData?.zip_code}, {profileData?.country}
                    </span>
                  </div>
                )}
                {profileData?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{profileData?.phone}</span>
                  </div>
                )}
                <div className="text-xs space-y-1 pt-2">
                  <p>
                    <span className="font-semibold">SIREN Number:</span>{" "}
                    {profileData?.siren_number || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">SIRET Number:</span>{" "}
                    {profileData?.siret_number || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Opening Hours</h3>
              </div>
              <div className="space-y-2">
                {openingHours.length > 0 ? (
                  openingHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-gray-700 capitalize">
                        {schedule.day_of_week}
                      </span>
                      <span
                        className={`font-medium ${
                          !schedule.is_open ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {schedule.is_open
                          ? `${schedule.opening_time || "N/A"} - ${schedule.closing_time || "N/A"}`
                          : "Closed"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No opening hours specified
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="md:mt-8 mt-3 border-t md:pt-6 pt-3">
            {/* Services */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 transition hover:scale-[1.01] hover:shadow-sm"
                    >
                      {serviceIcons[service.name] || (
                        <SquareCheckBig className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {service.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No services listed
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/4 flex flex-col gap-5">
        {/* {console.log(profileData?.user_id)} */}
        <div className="border shadow-lg rounded-xl p-3 flex sm:flex-row lg:flex-col xl:flex-row gap-3">
          <Link
            onClick={() =>
              mutate({
                user_id: profileData?.user_id,
              })
            }
            to="/dashboard/message"
            className="flex w-full py-2    text-sm   items-center justify-center gap-2 bg-blue-100 text-custom-primary px-4 rounded-lg  font-medium border-2 border-custom-primary transition-colors "
          >
            Message Dealer <MessageCircleIcon className="w-5 h-5" />{" "}
          </Link>

          <button
            onClick={() =>
              window.open(
                `https://wa.me/${profileData?.phone}?text=Hello!%20I'm%20interested%20in%20your%20vehicle.`,
                "_blank",
              )
            }
            className="flex w-full py-2    text-sm  items-center justify-center gap-2 bg-green-100 text-green-500 px-4 rounded-lg font-medium border-2 border-custom-primary transition-colors"
          >
            Chat Via WhatsApp <BsWhatsapp />
          </button>
        </div>
        <div>
          <GoogleReviewShow/>
        </div>
      </div>
    </div>
  );
};

export default DealerSection;
