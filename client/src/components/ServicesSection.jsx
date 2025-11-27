import React from "react";
import { FaToilet, FaBuilding, FaTruck, FaTrashAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Restroom Sanitization",
    text: "Ensure a clean, safe, and germ-free environment with our advanced restroom sanitization services. We disinfect all high-touch areas, remove odors, and maintain strict hygiene standards.",
    icon: <FaToilet />,
    features: ["Complete disinfection", "Odor elimination", "High-touch area focus"]
  },
  {
    id: 2,
    title: "Office & Commercial Cleaning",
    text: "Create a healthier, more productive workspace with our comprehensive cleaning services. From daily maintenance to deep cleaning, we keep offices and commercial buildings spotless.",
    icon: <FaBuilding />,
    features: ["Daily maintenance", "Deep cleaning", "Customized plans"]
  },
  {
    id: 3,
    title: "Move-In / Move-Out Cleaning",
    text: "Whether you're moving into a new space or leaving one behind, our detailed cleaning ensures the property is fresh, sanitized, and ready for the next occupant.",
    icon: <FaTruck />,
    features: ["Thorough cleaning", "Property preparation", "Move-in ready results"]
  },
  {
    id: 4,
    title: "Trash Removal & Floor Care",
    text: "Our team handles efficient trash removal and professional floor care, giving your facility a polished, refreshed appearance every day.",
    icon: <FaTrashAlt />,
    features: ["Waste management", "Floor maintenance", "Regular scheduling"]
  }
];

const ServicesSection = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } }
    ]
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-[#0098da] uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Premium Cleaning Solutions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0098da] to-[#0683ba] mx-auto"></div>
        </div>

        {/* Slider */}
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
          <Slider {...settings}>
            {services.map((service) => (
              <div key={service.id} className="px-2 sm:px-3 md:px-4">
                <div
                  className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  {/* Fixed Height */}
                  <div className="p-6 sm:p-7 md:p-8 text-center flex flex-col h-[520px]">

                    {/* Full Colored Circle with Icon */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#0098da] flex items-center justify-center shadow-md">
                      <div className="text-white text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">
                        {service.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-6 mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 mb-6 flex-grow leading-relaxed">
                      {service.text}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 text-left mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <svg className="w-5 h-5 text-[#0098da] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Learn More Button */}
                    <button
                      className="mt-auto w-full bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-105"
                      onClick={() => navigate("/services")}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            className="px-8 py-4 bg-white text-[#0098da] font-semibold rounded-full border-2 border-[#0098da] hover:bg-[#0098da] hover:text-white transition-all shadow-md"
            onClick={() => navigate("/services")}
          >
            View All Services
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
