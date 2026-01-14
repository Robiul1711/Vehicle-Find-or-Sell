import React from "react";
import Title from "../common/Title";

const Location = ({ data }) => {
  const { city, country, street, zip_code } = data?.seller_address || {};
  const fullAddress = `${street || ""}, ${city || ""}, ${country || ""} ${
    zip_code || ""
  }`;

  return (
    <div className="flex flex-col gap-6 mt-10">
      <Title level="title40" className="!font-bold">
        Location
      </Title>

      <Title level="title16" className="!font-normal capitalize">
        {fullAddress}
      </Title>

      {/* Google Map iframe */}
      <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-md">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            fullAddress
          )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
