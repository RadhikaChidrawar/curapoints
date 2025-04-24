// import React from 'react'
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[360px] object-cover"
          src={assets.contact_image}
          alt="Contact"
        />

        {/* Office Information */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">Bavdhan, Pune</p>
          <p className="text-gray-500">
            <span className="font-medium">Tel:</span> (6798) 89728 <br />
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:CuraPoint11@gmail.com"
              className="text-black"
            >
              CuraPoint11@gmail.com
            </a>
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Careers at CuraPoint
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">
            EXPLORE JOBS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
