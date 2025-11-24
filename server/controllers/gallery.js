import Gallery from "../models/Gallery.js";

class GalleryController {
    async create(req, res) {
        try {
            const imgs = (req.files || []).map((f) => `/uploads/gallery/${f.filename}`);
            const g = await Gallery.create({ images: imgs });
            return res.status(201).json(g);
        } catch (e) {
            return res.status(500).json({ message: "Error creating gallery", error: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const list = await Gallery.find().sort({ createdAt: -1 });
            return res.json(list);
        } catch (e) {
            return res.status(500).json({ message: "Error fetching galleries", error: e.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const g = await Gallery.findById(id);
            if (!g) return res.status(404).json({ message: "Gallery not found" });
            if (title) g.title = title;
            if (req.files && req.files.length) {
                const imgs = req.files.map((f) => `/uploads/gallery/${f.filename}`);
                g.images = imgs; // replace set for simplicity
            }
            await g.save();
            return res.json(g);
        } catch (e) {
            return res.status(500).json({ message: "Error updating gallery", error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const g = await Gallery.findByIdAndDelete(req.params.id);
            if (!g) return res.status(404).json({ message: "Gallery not found" });
            return res.json({ message: "Gallery deleted" });
        } catch (e) {
            return res.status(500).json({ message: "Error deleting gallery", error: e.message });
        }
    }
}

export default new GalleryController();