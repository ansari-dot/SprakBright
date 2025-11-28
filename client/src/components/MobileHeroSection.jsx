
import React, { useState, useEffect } from "react";
import { FaPhone, FaArrowRight } from "react-icons/fa";
import h1 from '../assets/herosection/Banner1.webp';
import h2 from '../assets/herosection/Banner2.webp';
import h3 from '../assets/herosection/Banner3.webp';
import h4 from '../assets/herosection/Banner4.webp';
import OptimizedImage from "./OptimizedImage";

// PRELOAD FIRST SLIDE (BOOSTS LCP)
const preloadImage = src => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
};

const slides = [
  {
    id: 1,
    image: h1,
    welcome: "TRASH REMOVAL & FLOOR CARE",
    title: "Reliable Trash Removal & Professional Floor Care",
    description:
      "Keep your property spotless with our fast, efficient, and eco-friendly cleaning solutions.",
  },
  {
    id: 2,
    image: h2,
    welcome: "MOVE-IN / MOVE-OUT CLEANING",
    title: "Move-In & Move-Out Cleaning You Can Trust",
    description:
      "Ensure a spotless fresh start with our detailed relocation cleaning services.",
  },
  {
    id: 3,
    image: h3,
    welcome: "OFFICE & COMMERCIAL CLEANING",
    title: "Professional Office & Commercial Cleaning Services",
    description:
      "Create a healthier, more productive workplace with trusted commercial cleaning solutions.",
  },
  {
    id: 4,
    image: h4,
    welcome: "RESTROOM SANITIZATION",
    title: "Reliable Restroom Sanitization & Hygiene Cleaning",
    description:
      "Ensure a safe environment with advanced restroom sanitization services.",
  },
];

const MobileHeroSection = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // PRELOAD FIRST SLIDE
  useEffect(() => {
    preloadImage(slides[0].image);
  }, []);

  // Auto slide
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, length]);

  if (!Array.isArray(slides) || length === 0) return null;

  return (
    <section
      className="relative w-full min-h-[100vh] overflow-hidden select-none md:hidden pt-32"
      style={{ contain: "layout paint size" }} // Prevents reflow
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <OptimizedImage
            src={slide.image}
            alt="Hero Banner"
            width={1080}   // helps browser layout BEFORE image loads
            height={1920}  // removes CLS completely
            className="w-full h-full object-cover"
            fetchpriority={index === 0 ? "high" : "auto"} // boosts LCP
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-30 h-full flex items-start pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Welcome Tag */}
            <span className="inline-block bg-white/90 text-[#0098da] font-semibold text-sm px-5 py-2 rounded-full shadow-lg tracking-widest">
              {slides[current].welcome}
            </span>

            {/* Title */}
            <h1 className="text-white text-3xl font-extrabold mt-4 mb-6 leading-tight drop-shadow-lg">
              {slides[current].title}
            </h1>

            {/* Description */}
            <p className="text-white/90 text-lg mb-8 font-medium leading-relaxed drop-shadow-md">
              {slides[current].description}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0683ba] px-8 py-3 text-base text-white font-semibold shadow-lg hover:bg-[#0098da] transition-all duration-300 hover:shadow-xl"
              >
                Get a Quote <FaArrowRight className="ml-3" />
              </a>

              <a
                href="tel:+18443880988"
                className="inline-flex items-center justify-center rounded-full bg-transparent border-2 border-white px-8 py-3 text-white font-semibold shadow hover:bg-white/10 transition-all duration-300"
              >
                <FaPhone className="mr-3" /> +1 (844) 388-0988
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? "bg-white w-5" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default MobileHeroSection;
