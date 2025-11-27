import React from "react";
import { use } from "react";
import { 
  FaBriefcase, 
  FaDollarSign, 
  FaLock, 
  FaProjectDiagram 
} from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaBriefcase className="w-10 h-10" />,
      title: "SAVES YOUR TIME",
      description: "Commodo is enim sfr alis suspendissei tortor cum diam commodo facilisis are rutrum etcr duis nisl."
    },
    {
      id: 2,
      icon: <FaDollarSign className="w-10 h-10" />,
      title: "THE BEST QUALITY",
      description: "Commodo is enim sfr alis suspendissei tortor cum diam commodo facilisis are rutrum etcr duis nisl."
    },
    {
      id: 3,
      icon: <FaLock className="w-10 h-10" />,
      title: "SAFETY FIRST",
      description: "Commodo is enim sfr alis suspendissei tortor cum diam commodo facilisis are rutrum etcr duis nisl."
    },
    {
      id: 4,
      icon: <FaProjectDiagram className="w-10 h-10" />,
      title: "BEST REPORTING",
      description: "Commodo is enim sfr alis suspendissei tortor cum diam commodo facilisis are rutrum etcr duis nisl."
    }
  ];
   const navgiate =  useNavigate()

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <p className="text-sm text-center text-[#0098da] mb-2 uppercase tracking-wider font-poppins">
          WHY CHOOSE US
        </p>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 font-poppins">
          DIVERSE RANGE OF WORK
        </h2>

        {/* Features */}
        <div className="flex flex-col md:flex-row justify-center gap-16 text-center">
          {features.map(({ id, icon, title, description }) => (
            <div key={id} className="flex flex-col items-center max-w-xs mx-auto">
              {/* Icon */}
              <div className="border-2 border-[#0098da] rounded-full p-5 mb-4 text-[#0098da] flex items-center justify-center min-w-[64px] min-h-[64px]">
                {icon}
              </div>

              {/* Decorative Dots */}
              <div className="flex flex-col items-center mb-6">
                <div className="h-4 w-4 rounded-full bg-[#0098da] mb-2"></div>
                <div className="h-2 w-2 rounded-full bg-[#0098da]"></div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3 font-poppins">{title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed px-2">{description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <button className="bg-gradient-to-r from-[#0098da] to-[#0683ba] hover:from-[#0683ba] hover:to-[#0098da] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg font-poppins" onClick={()=>navgiate('/quote')}>
            GET A QUOTE
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
