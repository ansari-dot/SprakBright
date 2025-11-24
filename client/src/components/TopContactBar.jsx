import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const TopContactBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white text-sm relative z-50 transition-all duration-300 py-1`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 py-1.5 sm:py-0">
            <a 
              href="tel:+18443880988" 
              className="flex items-center hover:opacity-90 transition-opacity px-2 py-1.5 sm:py-1 rounded active:bg-white/10"
              aria-label="Call us at (844) 388-0988"
            >
              <FaPhone className="mr-1.5 text-xs sm:text-sm flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap">(844) 388-0988</span>
            </a>
            
            <span className="hidden sm:inline-block text-white/50">|</span>
            
            <a 
              href="mailto:info@sparkbrightcleaning.com" 
              className="flex items-center hover:opacity-90 transition-opacity px-2 py-1.5 sm:py-1 rounded active:bg-white/10"
              aria-label="Email us at info@sparkbrightcleaning.com"
            >
              <FaEnvelope className="mr-1.5 text-xs sm:text-sm flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap truncate max-w-[160px] sm:max-w-none">info@sparkbrightcleaning.com</span>
            </a>
            
            <span className="hidden md:inline-block text-white/50">|</span>
            
            <div className="hidden md:flex items-center px-2 py-1.5 sm:py-1">
              <FaMapMarkerAlt className="mr-1.5 text-xs sm:text-sm flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap">Reston, VA 20190</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 py-1 sm:py-0">
            <p className="hidden lg:block text-xs sm:text-sm text-white/80 mr-1">Follow Us:</p>
            <div className="flex gap-1 sm:gap-1.5">
              {[
                { icon: <FaFacebookF size={10} className="m-auto" />, label: 'Facebook', href: '#' },
                { icon: <FaTwitter size={10} className="m-auto" />, label: 'Twitter', href: '#' },
                { icon: <FaInstagram size={10} className="m-auto" />, label: 'Instagram', href: '#' },
                { icon: <FaLinkedinIn size={10} className="m-auto" />, label: 'LinkedIn', href: '#' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopContactBar;
