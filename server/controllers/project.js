import Project from "../models/Project.js";
import path from "path";
import fs from "fs";

class ProjectController {
    async create(req, res) {
        try {
            const { title, category, description, details, services } = req.body;

            // Validate required fields
            if (!title || !description) {
                return res.status(400).json({ success: false, message: "Title and description are required" });
            }

            // Check if files were uploaded
            if (!req.files || !req.files.image || !req.files.image[0]) {
                return res.status(400).json({ success: false, message: "Project image is required" });
            }

            const mainImage = req.files.image[0];

            let detailsObj = {};
            if (details) {
                try {
                    detailsObj = typeof details === "string" ? JSON.parse(details) : details;
                } catch (e) {
                    console.error("Error parsing details:", e);
                    detailsObj = {};
                }
            }

            // Process services if provided
            if (services) {
                try {
                    const arr = Array.isArray(services) ? services : JSON.parse(services);
                    detailsObj.services = arr.filter(Boolean).map((s) => String(s).trim());
                } catch (e) {
                    console.error("Error processing services:", e);
                    return res.status(400).json({ success: false, message: "Invalid services format" });
                }
            }

            try {
                // Initialize detailsObj if it doesn't exist
                detailsObj = detailsObj || {};

                // Handle gallery images if any
                if (req.files.images && req.files.images.length > 0) {
                    detailsObj.gallery = req.files.images.map(img => `/uploads/projects/${img.filename}`);
                } else {
                    // Ensure gallery is always an array, even if empty
                    detailsObj.gallery = [];
                }

                const newProject = new Project({
                    title,
                    category: category || "other",
                    description,
                    image: `/uploads/projects/${mainImage.filename}`,
                    details: detailsObj,
                });

                const saved = await newProject.save();
                return res.status(201).json({ success: true, data: saved });
            } catch (dbError) {
                console.error("Database save error:", dbError);
                // If there's an error, try to clean up the uploaded file
                if (req.file && req.file.path) {
                    try {
                        await fs.promises.unlink(req.file.path);
                    } catch (cleanupError) {
                        console.error("Error cleaning up uploaded file:", cleanupError);
                    }
                }
                throw dbError; // This will be caught by the outer try-catch
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error creating project", error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const list = await Project.find().sort({ createdAt: -1 });
            return res.json(list);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching projects", error: error.message });
        }
    }

    async getFirstN(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 4; // allow dynamic limit via query
            const list = await Project.find().sort({ createdAt: -1 }).limit(limit);
            return res.json(list);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching projects", error: error.message });
        }
    }
    async getOne(req, res) {
        try {
            const p = await Project.findById(req.params.id);
            if (!p) return res.status(404).json({ message: "Project not found" });
            return res.json(p);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching project", error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { title, category, description, details, services, addGallery } = req.body;
            const p = await Project.findById(req.params.id);
            if (!p) return res.status(404).json({ message: "Project not found" });

            // replace cover image if provided
            if (req.file) {
                if (p.image) {
                    const oldImagePath = path.join(process.cwd(), "uploads/projects", path.basename(p.image));
                    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
                }
                p.image = `/uploads/projects/${req.file.filename}`;
            }

            // parse details
            if (details !== undefined) {
                try {
                    const obj = typeof details === "string" ? JSON.parse(details) : details;
                    p.details = {...p.details, ...obj };
                } catch (e) {}
            }

            // update services
            if (services !== undefined) {
                try {
                    const arr = Array.isArray(services) ? services : JSON.parse(services);
                    p.details.services = arr.filter(Boolean).map((s) => String(s).trim());
                } catch (e) {
                    p.details.services = [String(services)];
                }
            }

            // optionally append gallery images via upload.array("images")
            if (req.files && Array.isArray(req.files) && (addGallery === "true" || addGallery === true)) {
                const newImgs = req.files.map((f) => `/uploads/projects/${f.filename}`);
                const existing = Array.isArray(p.details.gallery) ? p.details.gallery : [];
                p.details.gallery = [...existing, ...newImgs];
            }

            p.title = title || p.title;
            p.category = category || p.category;
            p.description = description || p.description;

            await p.save();
            return res.json(p);
        } catch (error) {
            return res.status(500).json({ message: "Error updating project", error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const p = await Project.findById(req.params.id);
            if (!p) return res.status(404).json({ message: "Project not found" });

            // delete cover image
            if (p.image) {
                const coverPath = path.join(process.cwd(), "uploads/projects", path.basename(p.image));
                if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);
            }
            // delete gallery images
            if (Array.isArray(p.details.gallery)) {
                p.details.gallery.forEach((img) => {
                    const gp = path.join(process.cwd(), "uploads/projects", path.basename(img));
                    if (fs.existsSync(gp)) fs.unlinkSync(gp);
                });
            }

            await p.deleteOne();
            return res.json({ message: "Project deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting project", error: error.message });
        }
    }

    async toggleFeatured(req, res) {
        try {
            const p = await Project.findById(req.params.id);
            if (!p) return res.status(404).json({ message: "Project not found" });
            p.featured = !p.featured;
            await p.save();
            return res.json({ message: p.featured ? "Marked as featured" : "Removed from featured", featured: p.featured });
        } catch (error) {
            return res.status(500).json({ message: "Error toggling featured", error: error.message });
        }
    }
}

export default new ProjectController();