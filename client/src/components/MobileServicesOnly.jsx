import React, { useState, useEffect } from "react";
import { FaToilet, FaBuilding, FaTruck, FaTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
const services = [
  {
    id: 1,
    title: "Restroom Sanitization",
    text: "Ensure a clean, safe, and germ-free environment with our advanced restroom sanitization services. We disinfect all high-touch areas, remove odors, and maintain strict hygiene standards.",
    icon: <FaToilet className="text-5xl text-[#0098da]" />,
    features: ["Complete disinfection", "Odor elimination", "High-touch area focus"]
  },
  {
    id: 2,
    title: "Office & Commercial Cleaning",
    text: "Create a healthier, more productive workspace with our comprehensive cleaning services. From daily maintenance to deep cleaning, we keep offices and commercial buildings spotless.",
    icon: <FaBuilding className="text-5xl text-[#0098da]" />,
    features: ["Daily maintenance", "Deep cleaning", "Customized plans"]
  },
  {
    id: 3,
    title: "Move-In / Move-Out Cleaning",
    text: "Whether you're moving into a new space or leaving one behind, our detailed cleaning ensures the property is fresh, sanitized, and ready for the next occupant.",
    icon: <FaTruck className="text-5xl text-[#0098da]" />,
    features: ["Thorough cleaning", "Property preparation", "Move-in ready results"]
  },
  {
    id: 4,
    title: "Trash Removal & Floor Care",
    text: "Our team handles efficient trash removal and professional floor care, giving your facility a polished, refreshed appearance every day.",
    icon: <FaTrashAlt className="text-5xl text-[#0098da]" />,
    features: ["Waste management", "Floor maintenance", "Regular scheduling"]
  }
];

const MobileServicesOnly = () => {
  const [currentService, setCurrentService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 1 second
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToService = (index) => {
    setCurrentService(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
  };
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold text-[#0098da] uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 px-4">
            Premium Cleaning Solutions
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0098da] to-[#0683ba] mx-auto"></div>
        </div>

        {/* Mobile Full Screen Service Card */}
        <div 
          className="relative w-full min-h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Service Card Content */}
          <div className="p-8 text-center flex flex-col h-full">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <div className="text-5xl text-[#0098da]">
                {services[currentService].icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {services[currentService].title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
              {services[currentService].text}
            </p>

            {/* Features List */}
            <ul className="space-y-3 text-left mb-8">
              {services[currentService].features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-[#0098da] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Learn More Button */}
            <button className="w-full bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white px-6 py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95" onClick={() => navigate('/services')}>
              Learn More
            </button>
          </div>
        </div>

        {/* Mobile Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToService(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentService
                  ? 'bg-[#0098da] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <button className="relative px-8 py-4 bg-white text-[#0098da] font-semibold rounded-full border-2 border-[#0098da] hover:bg-[#0098da] hover:text-white transition-all duration-300 group overflow-hidden shadow-md hover:shadow-lg" onClick={() => navigate('/services')}>
            <span className="relative z-10">View All Services</span>
            <div className="absolute inset-0 bg-[#0098da] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MobileServicesOnly;
