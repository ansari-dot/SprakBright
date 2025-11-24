import Project from "../models/Project.js";
import Gallery from "../models/Gallery.js";
import Services from "../models/Services.js";
import Team from "../models/Team.js";
import Testimonials from "../models/Testimonial.js";
import Message from "../models/Contact.js";
import Contact from "../models/Contact.js";
export const dashboard = async(req, res) => {
    try {
        const projectCount = await Project.countDocuments();
        const galleryCount = await Gallery.countDocuments();
        const servicesCount = await Services.countDocuments();
        const teamCount = await Team.countDocuments();
        const testimonialCount = await Testimonials.countDocuments();
        const messageCount = await Contact.countDocuments();


        return res.status(200).json({
            success: true,
            counts: {
                projects: projectCount,
                gallery: galleryCount,
                services: servicesCount,
                team: teamCount,
                testimonials: testimonialCount,
                Inquiries: messageCount,
            },
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while loading dashboard data",
        });
    }
};