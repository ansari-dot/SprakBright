import Testimonial from "../models/Testimonial.js";

class TestimonialController {
    // Get all testimonials
    async getAll(req, res) {
        try {
            const testimonials = await Testimonial.find();
            res.json(testimonials);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Create testimonial
    async create(req, res) {
        try {
            const { name, message, role } = req.body;

            const testimonialData = {
                name,
                message,
                role
            };

            // Only add image if file was uploaded
            if (req.file) {
                testimonialData.image = `/api/uploads/testimonials/${req.file.filename}`;
            }

            const newTestimonial = new Testimonial(testimonialData);
            await newTestimonial.save();
            res.status(201).json(newTestimonial);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Update testimonial
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, message, role } = req.body;

            const testimonial = await Testimonial.findById(id);
            if (!testimonial) {
                return res.status(404).json({ message: "Testimonial not found" });
            }

            // Update image if provided
            if (req.file) {
                // Delete old image
                const fs = await
                import ('fs');
                const path = await
                import ('path');
                // Handle both old format (/uploads/testimonials/) and new format (/api/uploads/testimonials/)
                const imagePath = testimonial.image.replace('/api', '');
                const oldImagePath = path.join(process.cwd(), 'uploads/testimonials', path.basename(imagePath));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                testimonial.image = `/api/uploads/testimonials/${req.file.filename}`;
            }

            // Update other fields
            testimonial.name = name || testimonial.name;
            testimonial.message = message || testimonial.message;
            testimonial.role = role || testimonial.role;

            await testimonial.save();
            res.json(testimonial);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Delete testimonial
    async delete(req, res) {
        try {
            const { id } = req.params;

            const testimonial = await Testimonial.findById(id);
            if (!testimonial) {
                return res.status(404).json({ message: "Testimonial not found" });
            }

            // Delete image file if exists
            if (testimonial.image) {
                const fs = await
                import ('fs');
                const path = await
                import ('path');
                // Handle both old format (/uploads/testimonials/) and new format (/api/uploads/testimonials/)
                const imagePath = testimonial.image.replace('/api', '');
                const oldImagePath = path.join(process.cwd(), 'uploads/testimonials', path.basename(imagePath));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            await Testimonial.findByIdAndDelete(id);
            res.json({ message: "Testimonial deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new TestimonialController();