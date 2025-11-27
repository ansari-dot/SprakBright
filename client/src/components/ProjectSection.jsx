import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaSearchPlus } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";
import api,{resolveImageUrl} from '../services/api.js'
export default function ProjectSection() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
     // const data = await axios.get(`${url}/project/four/get`)
      const res =  await api.get('/project/four/get')
        console.log(res.data);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const nextSlide = () =>
    setActiveIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setActiveIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="animate-pulse h-12 w-64 bg-gray-200 rounded mx-auto mb-6"></div>
            <div className="h-1 w-20 bg-gray-200 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={fetchProjects}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* -------- Section Header -------- */}
        <div className="text-center mb-16">
          <span className="text-[#0098da] text-sm font-semibold tracking-wider uppercase mb-4 inline-block">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-poppins">
            Our Recent Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0098da] to-[#0683ba] mx-auto"></div>
        </div>

        {/* -------- Projects Grid -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative group overflow-hidden rounded-lg">
                <OptimizedImage
                  src={resolveImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-semibold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-200 text-sm mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {project.category}
                </p>

                <div className="flex space-x-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                  <button
                    className="bg-white text-[#0098da] p-2 rounded-full hover:bg-[#0098da] hover:text-white transition-colors"
                  >
                    <FaSearchPlus className="w-5 h-5" />
                  </button>

                  <button className="bg-white text-[#0098da] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#0098da] hover:text-white transition-colors">
                    View Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* -------- View All Button -------- */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-[#0098da] to-[#0683ba] hover:from-[#0683ba] hover:to-[#0098da] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            View All Projects
          </button>
        </div>

        {/* -------- Navigation Buttons -------- */}
        <div className="hidden md:flex justify-between items-center absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4 z-10 pointer-events-none">
          <button
            onClick={prevSlide}
            className="bg-white text-[#0098da] p-3 rounded-full shadow-lg hover:bg-[#0098da] hover:text-white transition-colors pointer-events-auto"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white text-[#0098da] p-3 rounded-full shadow-lg hover:bg-[#0098da] hover:text-white transition-colors pointer-events-auto"
          >
            <FiArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-r from-[#0098da]/10 to-[#0683ba]/10 pointer-events-none"></div>
      <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-gradient-to-r from-[#0683ba]/10 to-[#0098da]/10 pointer-events-none"></div>
    </section>
  );
}
