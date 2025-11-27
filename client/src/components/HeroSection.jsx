import React, { useState, useEffect } from "react";
import { FaChevronRight, FaPhone, FaArrowRight } from "react-icons/fa";
import h1 from "../assets/herosection/Banner1.webp";
import h2 from "../assets/herosection/Banner2.webp";
import h3 from "../assets/herosection/Banner3.webp";
import h4 from "../assets/herosection/Banner4.webp";
import OptimizedImage from "./OptimizedImage";
import MobileHeroSection from "./MobileHeroSection";
import { useNavigate } from "react-router-dom";
// Preload LCP image
const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};
preloadImage(h1);

const slides = [
  {
    id: 1,
    image: h4,
    welcome: "TRASH REMOVAL & FLOOR CARE",
    title: "Reliable Trash Removal & Professional Floor Care",
    description:
      "Keep your property spotless with our fast, efficient, and eco-friendly cleaning solutions. From daily trash removal to deep floor maintenance, Spark Bright Cleaning ensures a hygienic and polished environment every time.",
  },
  {
    id: 2,
    image: h3,
    welcome: "MOVE-IN / MOVE-OUT CLEANING",
    title: "Move-In & Move-Out Cleaning You Can Trust",
    description:
      "Ensure a spotless fresh start with our detailed relocation cleaning services. From sanitizing high-touch areas to deep cleaning floors, Spark Bright delivers a move-ready space that meets property standards and exceeds expectations.",
  },
  {
    id: 3,
    image: h1,
    welcome: "OFFICE & COMMERCIAL CLEANING",
    title: "Professional Office & Commercial Cleaning Services",
    description:
      "Create a healthier, more productive workplace with our trusted commercial cleaning solutions. From daily office maintenance to deep sanitization, Spark Bright delivers spotless, high-standard results for businesses of every size.",
  },
  {
    id: 4,
    image: h2,
    welcome: "RESTROOM SANITIZATION",
    title: "Reliable Restroom Sanitization & Hygiene Cleaning",
    description:
      "Ensure a safe and hygienic environment with our advanced restroom sanitization services. We eliminate germs, odors, and buildup using industry-grade disinfectants—keeping your facility fresh, clean, and fully compliant with health standards.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const length = slides.length;

  const navigate =  useNavigate();
  // SCREEN CHECK
  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearTimeout(timer);
  }, [current, length]);

  const nextSlide = () =>
    setCurrent(current === length - 1 ? 0 : current + 1);

  if (isMobile) return <MobileHeroSection />;

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{
        height: isMobile ? "500px" : isTablet ? "600px" : "800px",
        minHeight: isMobile ? "300px" : "400px",
      }}
    >
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
          aria-hidden={index !== current}
        >
          <OptimizedImage
            src={slide.image}
            alt=""
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"} // LCP FIX
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
      ))}

      {/* CONTENT */}
      <div className="relative z-30 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl px-4 sm:px-6 lg:px-0">
            <div className="mb-3 sm:mb-4">
              <span className="inline-block bg-white/90 text-[#0098da] font-semibold text-xs sm:text-sm px-4 py-1.5 sm:px-5 sm:py-2 rounded-full shadow-lg tracking-widest">
                {slides[current].welcome}
              </span>
            </div>

            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold sm:font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              {slides[current].title}
            </h1>

            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 font-medium max-w-xl leading-relaxed drop-shadow-md">
              {slides[current].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
  href="/quote"
  className="inline-flex items-center justify-center rounded-full bg-[#0683ba] px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold shadow-lg hover:bg-[#0098da] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 min-h-[44px]"
>
  Get a Quote{" "}
  <FaArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
</a>


              <a
                href="tel:+18443880988"
                className="inline-flex items-center justify-center rounded-full bg-transparent border-2 border-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold shadow hover:bg-white/10 transition-all duration-300 hover:shadow-lg min-h-[44px]"
              >
                <FaPhone className="mr-2 sm:mr-3 w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
                +1 (844) 388-0988
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/30 text-white p-3 sm:p-4 shadow-lg hover:bg-white/50 transition-all duration-300 scale-100 hover:scale-110 z-40 backdrop-blur-sm"
      >
        <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-4 left-0 right-0 z-40 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
