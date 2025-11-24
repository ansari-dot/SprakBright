import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'John Smith',
    position: 'CEO & Founder',
    image: 'https://randomuser.me/api/portraits/men/32.webp',
    social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Operations Manager',
    image: 'https://randomuser.me/api/portraits/women/44.webp',
    social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 3,
    name: 'Michael Chen',
    position: 'Lead Technician',
    image: 'https://randomuser.me/api/portraits/men/29.webp',
    social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    position: 'Customer Success',
    image: 'https://randomuser.me/api/portraits/women/68.webp',
    social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
  }
];

const Team = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-[#0098da] font-medium text-lg mb-3">OUR TEAM</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Meet Our <span className="text-[#0098da]">Expert Team</span>
        </h2>
        <div className="w-20 h-1 bg-[#0098da] mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our team of dedicated professionals is committed to providing the highest quality cleaning services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map(member => (
          <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative overflow-hidden h-80">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
                width={320}
                height={320}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex space-x-4">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <a 
                      key={platform}
                      href={url}
                      className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-[#0098da] transition-colors duration-300"
                      aria-label={`${member.name}'s ${platform}`}
                    >
                      {platform === 'facebook' && <FaFacebook />}
                      {platform === 'twitter' && <FaTwitter />}
                      {platform === 'instagram' && <FaInstagram />}
                      {platform === 'linkedin' && <FaLinkedin />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-[#0098da] font-medium">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
