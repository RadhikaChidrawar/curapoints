import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-20">
        <p className="text-3xl md:text-4xl lg:text-5xl text-black font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-black text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="Group Profiles" />
          <p>
            Our team of highly qualified and experienced doctors is here to provide the best care for you and your family. <br className="hidden sm:block" />
            Book an appointment today and take the first step toward better health.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300"
        >
          Book Appointment <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="Header Image"
        />
      </div>
    </div>
  );
};

export default Header;
