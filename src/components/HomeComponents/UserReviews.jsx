import React from "react";
import Title from "../common/Title";
import TestimonialCard from "./TestimonialCard";

const UserReviews = () => {
  return <div className="section-padding-x section-padding-y bg-[#000E1D] text-white">
      <Title level="title40">What Our Users Are Saying..!</Title>
      <Title level="title20">Real feedback from individuals and professionals who’ve bought, sold, and listed vehicles with us.</Title>
      <div className="mt-10">
<TestimonialCard />
      </div>
  </div>;
};

export default UserReviews;
