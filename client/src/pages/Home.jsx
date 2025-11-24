import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import Aboutus from '../components/Aboutus';
import StatsSection from '../components/StatsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ProjectSection from '../components/ProjectSection';
import Testimonial from '../components/Testimonial';
import BlogsSection from '../components/BlogsSection';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <div className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <HeroSection />
        </section>

        {/* Services Section */}
        <section className="relative py-20 bg-gray-50">
          <ServicesSection />
        </section>

        {/* About Us Section */}
        <section className="relative py-20 bg-white">
          <Aboutus />
        </section>

        {/* Stats Section */}
        <section className="relative py-20 bg-gray-50">
          <StatsSection />
        </section>

        {/* Why Choose Us Section */}
        <section className="relative py-20 bg-white">
          <WhyChooseUs />
        </section>

        {/* Project Section */}
        <section className="relative py-20 bg-gray-50">
          <ProjectSection />
        </section>

        {/* Testimonial Section */}
        <section className="relative py-20 bg-white">
          <Testimonial />
        </section>

        {/* Blogs Section */}
        <section className="relative py-20 bg-gray-50">
          <BlogsSection />
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
