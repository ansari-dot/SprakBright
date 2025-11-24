import React, { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import api, { resolveImageUrl } from "../services/api";
import OptimizedImage from "../components/OptimizedImage";
const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const fetchServices = async () => {
    try {
      const response = await api.get("/service/get");
      console.log(response.data);
      setServicesData(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <PageTransition>
      <div className="bg-white relative overflow-hidden font-sans pt-48 md:pt-24">
        {/* Header */}
        <div className="bg-white py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Our Professional Services
            </h1>
            <div className="w-20 h-1 bg-[#0098da] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Comprehensive cleaning solutions tailored to your needs, ensuring
              a spotless and healthy environment
            </p>
          </div>
        </div>

        {/* Services Sections */}
        {servicesData.map((service, idx) => {
          const isLeft = service.imagePosition === "left";
          return (
            <section
              key={idx}
              className={`w-full flex flex-col md:flex-row items-center justify-between pt-32 pb-20 md:py-28 relative container mx-auto px-4 ${
                !isLeft ? "bg-gradient-to-br from-white to-gray-50" : "bg-white"
              }`}>
              {/* Image */}
              <div
                className={`relative flex-shrink-0 ${
                  !isLeft ? "md:order-2" : ""
                } mb-8 md:mb-0`}>
                <div
                  className={`absolute -top-14 ${
                    isLeft ? "-left-14" : "-right-14"
                  } w-[520px] h-[520px] border-8 border-[#15d7c6] rounded-full`}></div>
                <div
                  className={`absolute -top-32 ${
                    isLeft ? "-left-32" : "-right-32"
                  } w-64 h-64 border-8 border-[#2a61b8] rounded-full`}></div>
                <div className="relative w-[26rem] h-[26rem] rounded-full border-8 border-[#0098da] overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <OptimizedImage
                    src={resolveImageUrl(service.image)}
                    alt={service.title}
                    className="w-full h-full object-cover scale-125 transform origin-center"
                    loading="lazy"
                    width={416} // Approx 26rem
                    height={416}
                  />
                </div>
              </div>

              {/* Text */}
              <div
                className={`max-w-xl text-left px-8 md:px-16 lg:px-24 ${
                  !isLeft ? "md:order-1" : ""
                }`}>
                <h2 className="text-4xl font-bold mb-6 text-[#264b8a] mt-6">
                  {service.title}
                </h2>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <p className="text-[#15d7c6] text-lg font-semibold mb-6">
                  {service.highlight}
                </p>
                <ul className="text-gray-600 text-base space-y-6 max-w-md">
                  {service.jobs.map((job, jdx) => (
                    <li
                      key={jdx}
                      className="flex items-center border-b border-gray-200 pb-6 last:border-0 group hover:bg-gray-50 px-4 py-4 rounded-lg transition-colors duration-200">
                      <FaCheckSquare
                        className="text-[#0098da] mr-5 shrink-0 group-hover:scale-110 transition-transform duration-200"
                        size={24}
                      />
                      <span className="text-gray-700 group-hover:text-[#0098da] transition-colors duration-200">
                        {job}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </PageTransition>
  );
};

export default Services;
