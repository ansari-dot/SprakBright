
import React from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";
import logo from "../assets/logo1.webp";
import OptimizedImage from "./OptimizedImage";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-[#0098da] text-white pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Logo & About */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left h-full">
          <Link to="/" className="flex items-center group transition-all duration-300 mb-2">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-0 group-hover:opacity-80 blur-xl transition-all duration-500 scale-95 group-hover:scale-100"></div>

              <OptimizedImage
                src={logo}
                alt="Spark Bright Cleaning Services"
                className="h-32 w-auto sm:h-32 md:h-36 lg:h-40 relative z-10 rounded-sm border-2 border-transparent group-hover:border-white/20"
                width={320}
                height={140}
                loading="eager"
                style={{
                  filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))',
                  transform: 'scale(1.2)',
                  transition: 'all 0.3s ease-out',
                }}
              />
            </div>
          </Link>

          

          <p className="mb-4 max-w-xs text-gray-100 leading-relaxed mt-2">
            Professional cleaning services that transform your space into a spotless, healthy environment.
          </p>

          {/* Contact Info */}
          <div className="space-y-4 w-full">
            <div className="flex items-start space-x-4 sm:items-center">
              <div className="bg-[#0098da] p-2 rounded-full text-white flex-shrink-0">
                <FaMapMarkerAlt className="w-4 h-4" />
              </div>
              <p className="text-gray-100 text-sm leading-relaxed">1886 Metro Center Dr, Reston, VA 20190</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-[#0098da] p-2 rounded-full text-white flex-shrink-0">
                <FaPhone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-100">Call Us Anytime</div>
                <a href="tel:+1234567890" className="font-semibold text-white hover:text-[#0683ba] transition-colors">
                  +1 (844) 388-0988
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-[#0098da] p-2 rounded-full text-white flex-shrink-0">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-100">Email Us</div>
                <a href="mailto:info@sparkbrightcleaning.com" className="text-sm text-white hover:text-[#0683ba] transition-colors">
                  info@sparkbrightcleaning.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-[#0098da] p-2 rounded-full text-white flex-shrink-0">
                <FaClock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-100">Working Hours</div>
                <p className="text-sm text-gray-100">Mon - Sun: 8:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col justify-center text-center md:text-left h-full md:ml-4">
          <h3 className="text-white font-semibold mb-4 text-lg relative inline-block tracking-wide">
            Quick Links
            <span className="absolute w-12 h-1 bg-gradient-to-r from-[#0098da] to-[#0683ba] bottom-0 left-1/2 transform -translate-x-1/2 md:left-0 md:transform-none rounded-full -mb-1"></span>
          </h3>

          <ul className="space-y-2 mt-4">
            {[
              { name: "Home", link: "/" },
              { name: "About Us", link: "/aboutus" },
              { name: "Our Services", link: "/services" },
              { name: "Get Quote", link: "/quote" },
              { name: "Our Team", link: "/aboutus" },
              { name: "Blog", link: "/blog" },
              { name: "Contact Us", link: "/contactus" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="flex items-center text-gray-100 hover:text-black transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0098da] mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div className="flex flex-col justify-center text-center md:text-left h-full">
          <h3 className="text-white font-semibold mb-4 text-lg relative inline-block tracking-wide">
            Our Services
            <span className="absolute w-12 h-1 bg-gradient-to-r from-[#0098da] to-[#0683ba] bottom-0 left-1/2 transform -translate-x-1/2 md:left-0 md:transform-none rounded-full -mb-1"></span>
          </h3>

          <ul className="space-y-2 mt-4">
            {[
              "Move-In / Move-Out Cleaning",
              "Trash Removal & Floor Care",
              "Restroom Sanitization",
              "Office & Commercial Cleaning",
            ].map((service, index) => (
              <li key={index}>
                <a href="/services" className="flex items-center text-gray-100 hover:text-black transition-colors group">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-50 text-[#0098da] rounded-full mr-3 text-sm group-hover:bg-blue-100"></span>
                  <span>{service}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-[#ffff] font-semibold mb-6 text-lg relative inline-block tracking-wide">
            Newsletter
            <span className="absolute w-12 h-1 bg-gradient-to-r from-[#0098da] to-[#0683ba] bottom-0 left-1/2 transform -translate-x-1/2 md:left-0 md:transform-none rounded-full -mb-1"></span>
          </h3>

          <p className="text-[#ffff] mb-6">
            Subscribe to our newsletter to receive updates on special offers and cleaning tips.
          </p>

          <form className="w-full max-w-xs md:max-w-full mt-2 flex flex-col space-y-4">
            <div className="relative">
              <input
                type="email"
                aria-label="Email Address"
                placeholder="Your email address"
                className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:border-[#0098da] focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-700 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Social Icons */}
          <div className="mt-6">
            <div className="flex space-x-3">
              {[
                { icon: <FaFacebookF className="w-5 h-5" />, color: "#4267B2", label: "Facebook" },
                { icon: <FaTwitter className="w-5 h-5" />, color: "#1DA1F2", label: "Twitter" },
                { icon: <FaInstagram className="w-5 h-5" />, color: "#E1306C", label: "Instagram" },
                { icon: <FaLinkedinIn className="w-5 h-5" />, color: "#0A66C2", label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={`https://${social.label.toLowerCase()}.com/malekcleaningservices`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: social.color }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-3 border-t border-blue-400 text-center">
        <p className="text-white text-sm">
          &copy; {new Date().getFullYear()} Spark Bright Cleaning Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
