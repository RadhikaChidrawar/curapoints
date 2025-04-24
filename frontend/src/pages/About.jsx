// import React from 'react'
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>Welcome To CuraPoint , Your Trusted Partner in Care!</p>
          <p>
            CuraPoint is dedicated to providing the best healthcare solutions,
            tailored to meet the needs of every individual. Our team of experts
            ensures that every service is delivered with care and precision.
          </p>
          <b className="text-gary-800">Our Vision</b>
          <p>
            To revolutionize the healthcare industry with innovative solutions
            and ensure that quality healthcare is accessible to all.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          Why <span className="text-gray-700 font-semibold">Choose Us</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-6">
        <div className="border px-8 md:px-12 py-8 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="text-lg text-gray-800">Efficiency:</b>
          <p>
            At CuraPoint, we ensure quick and efficient healthcare services that
            save time while maintaining the highest quality standards.
          </p>
        </div>

        <div className="border px-8 md:px-12 py-8 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="text-lg text-gray-800">Convenience:</b>
          <p>
            Our user-friendly platforms and accessible services are designed to
            make healthcare as hassle-free as possible for you.
          </p>
        </div>

        <div className="border px-8 md:px-12 py-8 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b className="text-lg text-gray-800">Personalization:</b>
          <p>
            We understand that every individual has unique needs, and our
            solutions are tailored to deliver personalized care for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
