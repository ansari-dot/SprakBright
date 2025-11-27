import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { FiArrowRight, FiEye, FiLink, FiX, FiLoader } from "react-icons/fi";
import api,{resolveImageUrl} from '../services/api'
import OptimizedImage from "../components/OptimizedImage";
import ImageCompareSlider from "../components/ImageCompareSlider";

const Project = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState({
    projects: true,
    gallery: true
  });
  const [error, setError] = useState({
    projects: null,
    gallery: null
  });

  const fetchGallery = async () => {
    try {
      const response  =  await api.get('/gallery/get');
      setGallery(response.data)
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setError(prev => ({ ...prev, gallery: "Failed to load gallery" }));
      setGallery([]);
    } finally {
      setLoading(prev => ({ ...prev, gallery: false }));
    }
  };

  const fetchProjects = async () => {
    try {
        const response =  await api.get('/project/get');
            setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(prev => ({ ...prev, projects: "Failed to load projects" }));
      setProjects([]);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  }

  useEffect(() => {
    fetchGallery();
    fetchProjects();
  },[]);

  // Extract all unique categories from projects
  const allCategories = [
    "all",
    ...Array.from(
      new Set(
        projects.flatMap((project) => 
          Array.isArray(project.category) ? project.category : [project.category]
        ).filter(Boolean)
      )
    )
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return Array.isArray(project.category) 
      ? project.category.includes(activeFilter)
      : project.category === activeFilter;
  });

  // Loading state
  if (loading.projects || loading.gallery) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <FiLoader className="animate-spin text-4xl text-blue-500" />
        </div>
      </PageTransition>
    );
  }

  // Error state
  if (error.projects || error.gallery) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <div className="text-red-500 text-lg mb-4">
            {error.projects || error.gallery}
          </div>
          <button
            onClick={() => {
              if (error.projects) fetchProjects();
              if (error.gallery) fetchGallery();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </PageTransition>
    );
  }

  const handleProjectClick = (projectId,project) => {
    
    navigate(`/projects/${projectId}`, {state:project});
  };

  return (
    <PageTransition>
      <div className="bg-white relative overflow-hidden font-sans pt-48 md:pt-24">
        {/* Title */}
        <div className="bg-white py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Our Projects
            </h1>
            <div className="w-20 h-1 bg-[#0098da] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Explore our portfolio of successful cleaning projects across
              various industries
            </p>
          </div>
        </div>

 
<div className="flex flex-wrap justify-center gap-4 mb-12">
  {allCategories.map((category) => (
    <button
      key={category}
      onClick={() => setActiveFilter(category)}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
        activeFilter === category
          ? "bg-[#0098da] text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  ))}
</div>


        {/* Projects Grid */}
        <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="relative overflow-hidden h-64">
                <OptimizedImage
                                  src={resolveImageUrl(project.image)}
                  alt={project.title}
                  loading="lazy"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-200">{project.description}</p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project._id,project);
                        }}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
                        title="View Details">
                        <FiEye className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-[#0098da] hover:bg-[#15d7c6] rounded-full p-2 transition-colors"
                        title="Share">
                        <FiLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Category Label */}
                <span className="absolute top-4 right-4 bg-white text-[#0098da] px-3 py-1 rounded-full text-sm font-medium">
                  {project.category.charAt(0).toUpperCase() +
                    project.category.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Work Gallery */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Work Gallery
            </h2>
            <div className="w-16 h-1 bg-[#0098da] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              A visual showcase of our professional cleaning services
            </p>
          </div>

{/* Gallery Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {gallery.map((gal) => (
    <div
      key={gal._id}
      className="group relative overflow-hidden rounded-lg h-64 cursor-pointer"
    >
      {gal.clean && gal.dirty && gal.dirty.length > 0 ? (
        <ImageCompareSlider
          cleanImageSrc={resolveImageUrl(gal.clean)}
          dirtyImageSrc={resolveImageUrl(gal.dirty[0])} // Assuming the first dirty image for comparison
          imageName={`Gallery Item ${gal._id}`}
        />
      ) : (
        <div
          className="relative w-full h-full"
          onClick={() => setSelectedImage(resolveImageUrl(gal.clean || gal.dirty[0]))}
        >
          <OptimizedImage
            src={resolveImageUrl(gal.clean || gal.dirty[0])}
            alt={`Gallery image for ${gal._id}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full transform transition-transform group-hover:scale-110">
              <FiEye className="text-white text-2xl" />
            </div>
          </div>
          
        </div>
      )}
    </div>
  ))}
</div>




          {/* Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}>
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}>
                <FiX />
              </button>
              <div
                className="max-w-4xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}>
                <img
                  src={selectedImage}
                  alt="Full size"
                  className="w-full h-full object-contain max-h-[90vh]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Project;
