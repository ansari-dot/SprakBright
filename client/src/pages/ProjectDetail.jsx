
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects, setSelectedProject } from '../features/projects/projectSlice';
import { FiArrowLeft, FiMapPin, FiCalendar, FiLayers, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import api, { resolveImageUrl } from '../services/api';

const defaultProject = {
  title: 'Project Details',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  details: {
    client: 'N/A',
    location: 'N/A',
    duration: 'N/A',
    size: 'N/A',
    description: 'Project details are not available.',
    gallery: [],
    services: [],
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.projects);
  const selectedProject = useSelector((state) =>state.projects.selectedProject);
  console.log("Projects from Redux:", projects);
  console.log("Selected Project from Redux:", selectedProject);
  const [isLoading, setIsLoading] = useState(true);

  // Load all projects if not loaded
  useEffect(() => {
    const loadAllProjects = async () => {
      if (projects.length > 0) return;

      try {
        const res = await api.get('/project/get');
        const data = res.data;
        dispatch(setProjects(data));
      } catch (err) {
        console.error("Error loading project list:", err);
      }
    };

    loadAllProjects();
  }, [projects.length, dispatch]);

  // Load selected project
  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true);

      let found = projects.find((p) => p._id === id);

      if (found) {
      console.log("Found project in Redux store:", found);
        dispatch(setSelectedProject(found));
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get(`/project/get/${id}`);
        const data = res.data;
      console.log("Fetched project from API:", data);
        dispatch(setSelectedProject(data));
      } catch (err) {
        console.error("Error fetching project:", err);
      }

      setIsLoading(false);
    };

    loadProject();
  }, [id, projects, dispatch]);

  const safeProject = selectedProject ? { ...defaultProject, ...selectedProject } : defaultProject;
  console.log("Safe Project:", safeProject);
  const { details } = safeProject;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#0098da] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
      <motion.div
        className="min-h-screen bg-gray-50"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#0098da] hover:text-[#15d7c6] transition-colors duration-300"
          >
            <FiArrowLeft className="mr-2" /> Back to Projects
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={resolveImageUrl(safeProject.image)}
            alt={safeProject.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-12 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{safeProject.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <FiMapPin className="mr-1" /> {details?.location || 'N/A'}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <FiCalendar className="mr-1" /> {details?.duration || 'N/A'}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <FiLayers className="mr-1" /> {details?.size || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Overview */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
            <p className="text-gray-600 mb-8 text-lg">{safeProject.description || details.description}</p>

            {/* Gallery */}
            {details?.gallery?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {details.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={resolveImageUrl(img)}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center mb-12">
                <p className="text-gray-500">No gallery images available.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Services */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Services Provided</h3>
              <ul className="space-y-3">
                {(details?.services || []).map((service, idx) => (
                  <li key={idx} className="flex items-start">
                    <FiCheckCircle className="text-[#15d7c6] mt-1 mr-2" />
                    <span className="text-gray-600">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extra Info */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Project Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium">{details?.client}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{details?.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{details?.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-medium">{details?.size}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

export default ProjectDetail;
