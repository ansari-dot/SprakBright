import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema(
  {
    client: { type: String },
    location: { type: String },
    duration: { type: String },
    size: { type: String },
    gallery: [{ type: String }],
    services: [{ type: String }],
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ["residential", "commercial", "industrial", "construction", "other"], default: "other" },
    image: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: detailsSchema, default: {} },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;