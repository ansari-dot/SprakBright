
import React from "react";
import mainImage from "../assets/herosection/Banner1.webp";
import smallImage from "../assets/herosection/Banner2.webp";
import bc from "../assets/bc.webp";
import OptimizedImage from "../components/OptimizedImage";
import { useNavigate } from "react-router-dom";
const AboutUsSection = () => {
  const navigate =  useNavigate();
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image (CLS FIXED with width/height) */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={bc}
          alt="Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        
        {/* LEFT SIDE — CIRCLES */}
        <div className="relative flex-shrink-0 mx-auto lg:mx-0">

          {/* MAIN LARGE CIRCLE (CLS FIXED) */}
          <div className="rounded-full border-[10px] border-[#0098da]/20 w-80 h-80 md:w-96 md:h-96 overflow-hidden relative z-10">
            <OptimizedImage
              src={mainImage}
              alt="Cleaning Professional"
              width={800}
              height={800}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* SMALL CIRCLE (CLS FIXED) */}
          <div className="rounded-full border-4 border-[#0683ba] w-32 h-32 md:w-36 md:h-36 overflow-hidden absolute -bottom-4 -left-4 md:-left-8 z-20 shadow-xl">
            <OptimizedImage
              src={smallImage}
              alt="Cleaning Team"
              width={300}
              height={300}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Decorative circles (No CLS impact) */}
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-[#0098da]/10 -z-10"></div>
          <div className="absolute top-1/2 -right-8 w-32 h-32 rounded-full bg-[#0683ba]/10 -z-10"></div>
          <div className="absolute bottom-8 right-0 w-20 h-20 rounded-full bg-[#727376]/10 -z-10"></div>
        </div>

        {/* RIGHT SIDE — TEXT CONTENT */}
        <div className="max-w-2xl text-left lg:text-left">
          <span className="text-sm font-semibold text-[#0098da] uppercase tracking-wider mb-2 inline-block">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight font-poppins">
            About <span className="text-[#0098da]">Spark Bright</span>{" "}
            <span className="text-[#0683ba]">Cleaning </span>
          </h2>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Spark Bright Cleaning Services is dedicated to delivering
            high-quality, reliable, and affordable cleaning solutions for homes
            and businesses across the USA. Our team is professionally trained,
            fully equipped, and committed to creating clean, safe, and hygienic
            environments with every visit.
          </p>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            We focus on eco-friendly practices, detailed cleaning standards, and
            exceptional customer care. Whether it's restroom sanitization,
            office cleaning, trash removal, or move-in/move-out services, we
            ensure spotless results you can trust.
          </p>

          {/* FEATURES LIST */}
          <ul className="space-y-6 mb-10">

            {/* 1 */}
            <li className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-[#0098da]/10 flex items-center justify-center text-[#0098da] group-hover:bg-[#0098da] group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8..." />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-[#0683ba] font-semibold text-lg mb-1">Professional Team</h4>
                <p className="text-gray-600">Professionally trained cleaning specialists who pay attention to every detail.</p>
              </div>
            </li>

            {/* 2 */}
            <li className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-[#0098da]/10 flex items-center justify-center text-[#0098da] group-hover:bg-[#0098da] group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1..." />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-[#0683ba] font-semibold text-lg mb-1">Eco-Friendly Solutions</h4>
                <p className="text-gray-600">Eco-friendly, safe, and effective cleaning methods for your space.</p>
              </div>
            </li>

            {/* 3 */}
            <li className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-[#0098da]/10 flex items-center justify-center text-[#0098da] group-hover:bg-[#0098da] group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8..." />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-[#0683ba] font-semibold text-lg mb-1">Reliable Service</h4>
                <p className="text-gray-600">Reliable scheduling and consistent quality you can count on.</p>
              </div>
            </li>

            {/* 4 */}
            <li className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-[#0098da]/10 flex items-center justify-center text-[#0098da] group-hover:bg-[#0098da] group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8..." />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-[#0683ba] font-semibold text-lg mb-1">Customer First</h4>
                <p className="text-gray-600">Customer-first approach with guaranteed satisfaction.</p>
              </div>
            </li>
          </ul>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-gradient-to-r from-[#0098da] to-[#0683ba] hover:from-[#0683ba] hover:to-[#0098da] text-white px-8 py-3 rounded-full font-medium text-lg font-poppins transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={()=>navigate('/aboutus')}>
              Learn More
            </button>

            <div className="flex items-center space-x-3 text-gray-800 font-semibold">
              <div className="w-12 h-12 rounded-full bg-[#0098da]/10 flex items-center justify-center text-[#0098da]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2..." />
                </svg>
              </div>

              <div className="text-left">
                <p className="text-sm font-medium text-gray-500">Need Help? Call Us</p>
                <p className="text-xl font-bold text-[#0683ba]">                  +1 (844) 388-0988
</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;
