import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import axios from 'axios';
import api,{resolveImageUrl} from '../services/api.js'

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await api.get(`/team/get`);
        console.log('API Response:', response.data);
        
        if (response.data?.success && Array.isArray(response.data.members)) {
          // Transform the data to match the component's expected format
          const formattedData = response.data.members.map(member => ({
            name: member?.name?.toUpperCase() || 'TEAM MEMBER',
            role: member?.role?.toUpperCase() || 'TEAM ROLE',
            img: member?.image ? (member.image.startsWith('http') ? member.image : resolveImageUrl(member.image)) : 'https://via.placeholder.com/150',
            social: {
              facebook: member.socialLinks?.facebook || '#',
              twitter: member.socialLinks?.twitter || '#',
              instagram: member.socialLinks?.instagram || '#',
              linkedin: member.socialLinks?.linkedin || '#'
            }
          }));
          setTeamMembers(formattedData);
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-poppins">
              LOADING <span className="text-[#0098da]">OUR TEAM</span>
            </h2>
            <div className="w-20 h-1 bg-[#0098da] mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="relative mx-auto w-48 h-48 mb-8">
                  <div className="w-full h-full rounded-full bg-gray-200 animate-pulse"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[#0098da] text-white rounded hover:bg-[#0683ba] transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

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
                    src={resolveImageUrl(member.img)}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Social Icons */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <a href={member.social?.facebook || '#'} className="w-10 h-10 bg-[#0098da] rounded-full flex items-center justify-center text-white hover:bg-[#0683ba] transition-colors">
                    <FaFacebookF className="w-3 h-3" />
                  </a>
                  <a href={member.social?.twitter || '#'} className="w-10 h-10 bg-[#0098da] rounded-full flex items-center justify-center text-white hover:bg-[#0683ba] transition-colors">
                    <FaTwitter className="text-lg" />
                  </a>
                  <a href={member.social?.linkedin || '#'} className="w-10 h-10 bg-[#0098da] rounded-full flex items-center justify-center text-white hover:bg-[#0683ba] transition-colors">
                    <FaLinkedinIn className="text-lg" />
                  </a>
                  <a href={member.social?.instagram || '#'} className="w-10 h-10 bg-[#0098da] rounded-full flex items-center justify-center text-white hover:bg-[#0683ba] transition-colors">
                    <FaInstagram className="text-lg" />
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
