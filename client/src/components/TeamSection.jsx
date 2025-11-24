import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "JOHN DOE",
      role: "CLEANING EXPERT",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "SARAH SMITH",
      role: "SENIOR CLEANER",
      img: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      name: "MICHAEL BROWN",
      role: "QUALITY MANAGER",
      img: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 font-poppins">
            MEET OUR <span className="text-[#0098da]">EXPERT CLEANERS</span>
          </h2>
          <div className="w-20 h-1 bg-[#0098da] mx-auto mb-8"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="group text-center">
              {/* Circular Image */}
              <div className="relative mx-auto w-48 h-48 mb-8">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#e6f5fd] group-hover:border-[#0098da] transition-all duration-300">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Social Icons */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <a href="#" className="w-10 h-10 bg-[#0098da] rounded-full flex items-center justify-center text-white hover:bg-[#0683ba] transition-colors">
                    <FaFacebookF className="w-3 h-3" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#0098da] rounded-full flex items-center justify-center text-white hover:bg-[#0683ba] transition-colors">
                    <FaTwitter className="w-3 h-3" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#0098da] rounded-full flex items-center justify-center text-white hover:bg-[#0683ba] transition-colors">
                    <FaLinkedinIn className="w-3 h-3" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#0098da] rounded-full flex items-center justify-center text-white hover:bg-[#0683ba] transition-colors">
                    <FaInstagram className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              {/* Member Info */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-[#0098da] font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;