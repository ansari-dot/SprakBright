import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";
import api, { resolveImageUrl } from '../services/api.js';


const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonial/get');
      console.log('Fetched testimonials:', res.data);
      // Ensure all image paths are properly resolved
      const testimonialsWithResolvedImages = res.data.map(testimonial => ({
        ...testimonial,
        image: resolveImageUrl(testimonial.image)
      }));
      setTestimonials(testimonialsWithResolvedImages);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Auto-advance testimonial every 5 seconds
  useEffect(() => {
    if (!isPaused && testimonials.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials]);

  const prevTestimonial = () => {
    setIndex((oldIndex) =>
      oldIndex === 0 ? testimonials.length - 1 : oldIndex - 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // resume auto-slide after 10s
  };

  const nextTestimonial = () => {
    setIndex((oldIndex) =>
      oldIndex === testimonials.length - 1 ? 0 : oldIndex + 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // resume auto-slide after 10s
  };

  // If no testimonials, show nothing
  if (testimonials.length === 0) return null;

  const { image, name, message, role } = testimonials[index] || {};

  return (
    <section className="relative bg-white py-20 px-6 md:px-0 max-w-7xl mx-auto text-center">
      {/* Heading */}
      <h2 className="font-bold text-2xl md:text-3xl mb-12 font-poppins">
        Our expert team serves <br />
        <span className="text-[#0098da]">you the best cleaning service</span>
      </h2>

      {/* Single testimonial card */}
      <div
        className="relative flex flex-col items-center transition-all duration-500"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Profile image */}
        <div className="w-40 h-40 rounded-full border-4 border-[#e6f5fd] overflow-hidden mb-6 mx-auto">
          <OptimizedImage
            src={image}
            alt={name || "Testimonial author"}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              console.error('Error loading testimonial image:', image);
              e.target.src = '/path/to/default-avatar.png'; // Add a default avatar image
            }}
          />
        </div> 

        {/* Testimonial text */}
        <p className="text-gray-700 max-w-xl mx-auto mb-6 italic text-lg font-poppins">
          "{message || "No testimonial message available"}"
        </p>

        {/* Name */}
        <p className="font-bold text-gray-800 uppercase tracking-wide font-poppins">
          {name || "Anonymous"}
        </p>

        {/* Role */}
        <p className="text-[#0098da] text-sm tracking-wide mb-6 font-medium">
          {role || "Client"}
        </p>

        {/* Navigation buttons */}
        <div className="flex space-x-6 justify-center items-center">
          <button
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
            className="p-2 rounded-full bg-[#0098da] text-white hover:bg-[#0683ba] transition-colors"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextTestimonial}
            aria-label="Next testimonial"
            className="p-2 rounded-full bg-[#0098da] text-white hover:bg-[#0683ba] transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

