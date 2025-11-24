import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    images: [{ type: String }],
}, { timestamps: true });

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;