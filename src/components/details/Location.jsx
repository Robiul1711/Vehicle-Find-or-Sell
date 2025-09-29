import React from "react";
import Title from "../common/Title";

const Location = () => {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <Title level="title40" className="!font-bold">
        Location
      </Title>

      <Title level="title16" className="!font-normal">
        4267 Cherry Tree Drive, Jacksonville, FL 32216
      </Title>

      {/* Google Map iframe */}
      <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.9373136010314!2d-81.60678212448744!3d30.286265708845873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b4b16d6ad7b9%3A0xb6d1ddf7d87073cf!2s4267%20Cherry%20Tree%20Dr%2C%20Jacksonville%2C%20FL%2032216%2C%20USA!5e0!3m2!1sen!2sus!4v1695999999999!5m2!1sen!2sus"
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
