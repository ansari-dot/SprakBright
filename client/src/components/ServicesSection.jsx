import React, { useState, useEffect } from "react";
import { FaToilet, FaBuilding, FaTruck, FaTrashAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MobileServicesOnly from './MobileServicesOnly';
import {useNavigate} from "react-router-dom";
const services = [
  {
    id: 1,
    title: "Restroom Sanitization",
    text: "Ensure a clean, safe, and germ-free environment with our advanced restroom sanitization services. We disinfect all high-touch areas, remove odors, and maintain strict hygiene standards.",
    icon: <FaToilet className="text-4xl mb-4 text-[#0098da]" />,
    features: ["Complete disinfection", "Odor elimination", "High-touch area focus"]
  },
  {
    id: 2,
    title: "Office & Commercial Cleaning",
    text: "Create a healthier, more productive workspace with our comprehensive cleaning services. From daily maintenance to deep cleaning, we keep offices and commercial buildings spotless.",
    icon: <FaBuilding className="text-4xl mb-4 text-[#0098da]" />,
    features: ["Daily maintenance", "Deep cleaning", "Customized plans"]
  },
  {
    id: 3,
    title: "Move-In / Move-Out Cleaning",
    text: "Whether you're moving into a new space or leaving one behind, our detailed cleaning ensures the property is fresh, sanitized, and ready for the next occupant.",
    icon: <FaTruck className="text-4xl mb-4 text-[#0098da]" />,
    features: ["Thorough cleaning", "Property preparation", "Move-in ready results"]
  },
  {
    id: 4,
    title: "Trash Removal & Floor Care",
    text: "Our team handles efficient trash removal and professional floor care, giving your facility a polished, refreshed appearance every day.",
    icon: <FaTrashAlt className="text-4xl mb-4 text-[#0098da]" />,
    features: ["Waste management", "Floor maintenance", "Regular scheduling"]
  }
];

const ServicesSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show mobile services component on mobile, desktop slider on larger screens
  if (isMobile) {
    return <MobileServicesOnly />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          centerMode: false,
          infinite: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false,
          infinite: true,
          adaptiveHeight: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false,
          infinite: true,
          adaptiveHeight: true
        }
      }
    ]
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[#0098da] uppercase tracking-wider mb-2 sm:mb-3">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-4">
            Premium Cleaning Solutions
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#0098da] to-[#0683ba] mx-auto"></div>
        </div>

        {/* Services Slider */}
        <div className="w-full max-w-7xl mx-auto overflow-hidden">
          <Slider {...settings}>
            {services.map((service) => (
              <div key={service.id} className="px-0 sm:px-3 md:px-4">
                <div className="group bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 h-full mx-auto md:max-w-[400px] sm:max-w-none w-full min-h-[600px] sm:min-h-[500px]">
                  <div className="p-8 sm:p-7 md:p-8 text-center flex flex-col h-full sm:min-h-[500px]">
                    {/* Icon */}
                    <div className="w-20 h-20 sm:w-20 sm:h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <div className="text-5xl sm:text-4xl text-[#0098da] transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-2xl font-bold text-gray-800 mt-6 mb-4 sm:mb-3 px-2">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base sm:text-base text-gray-600 mb-6 sm:mb-6 flex-grow leading-relaxed px-2">
                      {service.text}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 text-left mb-8">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-base text-gray-600">
                          <svg className="w-5 h-5 text-[#0098da] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More Button */}
                    <button className="mt-auto w-full bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white px-6 py-4 sm:px-6 sm:py-3 rounded-lg sm:rounded-lg font-semibold sm:font-medium text-base sm:text-base hover:opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95" onClick={() => navigate('/services')}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12 sm:mt-14 md:mt-16">
          <button className="relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0098da] font-semibold text-sm sm:text-base rounded-full border-2 border-[#0098da] hover:bg-[#0098da] hover:text-white transition-all duration-300 group overflow-hidden shadow-md hover:shadow-lg" onClick={() => navigate('/services')}>
            <span className="relative z-10">View All Services</span>
            <div className="absolute inset-0 bg-[#0098da] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>

      {/* Custom Responsive Styles */}
      <style jsx>{`
        /* Ensure proper slider behavior on all devices */
        .slick-slider {
          width: 100%;
        }

        .slick-list {
          overflow: hidden;
          margin: 0 -8px;
        }

        .slick-track {
          display: flex !important;
          align-items: stretch;
        }

        .slick-slide {
          height: inherit !important;
          display: flex !important;
          justify-content: center;
        }

        .slick-slide > div {
          width: 100%;
          height: 100%;
        }

        /* Mobile specific fixes */
        @media (max-width: 767px) {
          .slick-list {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          .slick-slide > div {
            padding: 0;
          }

          .slick-slide {
            height: auto !important;
            width: 100% !important;
            float: left !important;
          }

          .slick-track {
            display: flex !important;
            width: 100% !important;
          }

          .slick-dots {
            bottom: -30px;
          }

          .slick-dots li button:before {
            font-size: 10px;
          }
        }

        /* Extra small mobile devices */
        @media (max-width: 640px) {
          .slick-slide {
            width: 100vw !important;
          }
        }

        /* Tablet specific */
        @media (min-width: 768px) and (max-width: 1023px) {
          .slick-list {
            margin: 0 -12px;
          }
        }

        /* Desktop specific */
        @media (min-width: 1024px) {
          .slick-list {
            margin: 0 -16px;
          }
        }

        /* Arrow styling for better visibility */
        .slick-prev,
        .slick-next {
          z-index: 10;
        }

        .slick-prev {
          left: -30px;
        }

        .slick-next {
          right: -30px;
        }

        @media (max-width: 1023px) {
          .slick-prev {
            left: -20px;
          }

          .slick-next {
            right: -20px;
          }
        }

        @media (max-width: 767px) {
          .slick-prev,
          .slick-next {
            display: none !important;
          }
        }

        /* Dots styling */
        .slick-dots li button:before {
          color: #0098da;
          opacity: 0.3;
        }

        .slick-dots li.slick-active button:before {
          color: #0098da;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
