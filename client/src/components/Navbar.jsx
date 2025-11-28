
import { useState, useEffect } from 'react';
import logo from '../assets/logo.webp';
import TopContactBar from './TopContactBar';
import OptimizedImage from './OptimizedImage';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <TopContactBar />
      <nav
        className={`w-full h-[80px] px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-md'
            : 'bg-white/80 backdrop-blur-sm shadow-sm'
        }`}
      >
        {/* Logo */}
        <Link to="/home" className="flex items-center -ml-16 min-w-[260px] min-h-[100px]">
          <OptimizedImage
            src={logo}
            alt="Spark Bright Cleaning Services"
            className="h-24 w-auto object-contain sm:h-20 md:h-24 lg:h-28 transform scale-150 transition-transform duration-300"
            width={260}
            height={100}
            loading="lazy"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
              minWidth: '260px',
              minHeight: '100px',
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="md:flex hidden items-center gap-10 flex-1 justify-center">
          {['Home', 'About Us', 'Services', 'Projects', 'Blog', 'Contact Us'].map((item, idx) => (
            <li key={idx}>
              <Link
                className="hover:text-[#0098da] transition-colors duration-300"
                to={`/${item.toLowerCase().replace(' ', '')}`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Get Quote + Mobile Hamburger */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Desktop Get Quote */}
          <button
            type="button"
            className="bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white md:inline hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full shadow-md"
            onClick={() => navigate('/quote')}
       >
            Get Quote
          </button>

          {/* Mobile Hamburger */}
          <button
            aria-label="menu-btn"
            type="button"
            className="inline-block md:hidden active:scale-90 transition"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="#000"
            >
              <path d="M3 7H27V9H3V7ZM3 14H27V16H3V14ZM3 21H27V23H3V21Z" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`fixed top-[70px] left-0 w-full bg-white/95 p-6 md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col space-y-4 text-lg">
            {['Home', 'About Us', 'Services', 'Projects', 'Blog', 'Contact Us'].map((item, idx) => (
              <li key={idx}>
                <Link
                  className="text-sm block py-2"
                  to={`/${item.toLowerCase().replace(' ', '')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white mt-6 text-sm hover:opacity-90 active:scale-95 transition-all w-full h-11 rounded-full shadow-md"
            onClick={()=>navigate('/quote')}
          >
            Get Quote
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
