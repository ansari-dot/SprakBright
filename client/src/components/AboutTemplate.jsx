import React from "react";
import {
  FaCheckCircle,
  FaHome,
  FaBroom,
  FaWater,
} from "react-icons/fa";
import Team from "../components/TeamSection";

const services = [
  {
    icon: <FaHome className="text-white w-10 h-10" />,
    title: "Restroom Sanitization",
    description:
      "Professional sanitization services that ensure a clean, safe, and germ-free environment with strict hygiene standards.",
  },
  {
    icon: <FaBroom className="text-white w-10 h-10" />,
    title: "Office Cleaning",
    description:
      "Comprehensive cleaning solutions for businesses, creating healthier and more productive workspaces.",
  },
  {
    icon: <FaWater className="text-white w-10 h-10" />,
    title: "Move-In/Move-Out",
    description:
      "Thorough cleaning services to ensure properties are fresh, sanitized, and ready for new occupants.",
  },
];

const AboutPage = () => {
  return (
    <div className="font-sans bg-white px-4 sm:px-6 md:px-12 lg:px-24 pt-48 md:pt-40 pb-16 md:pb-24 max-w-7xl mx-auto" style={{ '--brand-color': '#0098da' }}>

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">

        {/* Left Text */}
        <div className="lg:w-1/2">
          <p className="text-[#0098da] font-medium text-lg mb-3 tracking-wide">ABOUT US</p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            About <span className="text-[#0098da]">Spark Bright</span> Cleaning Services
          </h1>

          <p className="text-gray-600 mb-5 leading-relaxed text-base md:text-lg max-w-2xl">
            Spark Bright Cleaning Services is dedicated to delivering high-quality, reliable, and affordable cleaning solutions for homes and businesses across the USA. Our team is professionally trained, fully equipped, and committed to creating clean, safe, and hygienic environments with every visit.
          </p>

          <p className="text-gray-600 mb-8 leading-relaxed text-base md:text-lg max-w-2xl">
            We focus on eco-friendly practices, detailed cleaning standards, and exceptional customer care. Whether it's restroom sanitization, office cleaning, trash removal, or move-in/move-out services, we ensure spotless results you can trust.
          </p>

          {/* Features */}
          <div className="space-y-6 mt-10">
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-[#0098da] w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  Professional Team
                </h3>
                <p className="text-gray-600 text-base">
                  Professionally trained cleaning specialists who pay attention to every detail.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-[#0098da] w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  Eco-Friendly Solutions
                </h3>
                <p className="text-gray-600 text-base">
                  Eco-friendly, safe, and effective cleaning methods for your space.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Professional cleaning team"
              className="w-full h-auto max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Decorative elements */}
          <div className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 bg-[#0098da] opacity-10 rounded-full"></div>
          <div className="hidden lg:block absolute -top-6 -left-6 w-24 h-24 bg-[#0098da] opacity-10 rounded-full"></div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="mt-24 max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <p className="text-[#0098da] font-medium text-lg mb-3">OUR SERVICES</p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Comprehensive Cleaning <span className="text-[#0098da]">Solutions</span>
          </h2>

          <div className="w-20 h-1 bg-[#0098da] mx-auto mb-6"></div>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We offer a wide range of professional cleaning services designed to keep your space spotless.
          </p>
        </div>

        {/* Services cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
          {services.map(({ icon, title, description }, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center bg-[#0098da] rounded-full w-20 h-20 mb-6 mx-auto">
                {icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>

              <p className="text-gray-600 mb-5 leading-relaxed">{description}</p>

              <a
                href="#"
                className="inline-flex items-center text-[#0098da] font-medium hover:opacity-80 transition-opacity"
              >
                <span className="mr-2">Learn More</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <span className="w-3 h-3 rounded-full bg-[#0098da]" />
          <span className="w-3 h-3 rounded-full bg-[#0098da] opacity-40" />
          <span className="w-3 h-3 rounded-full bg-[#0098da] opacity-40" />
        </div>
      </div>
      
      {/* Team Section */}
      <Team />
    </div>
  );
};

export default AboutPage;
