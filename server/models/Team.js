import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    type: { 
        type: String, 
        required: true,
        enum: ['digital', 'physical'],
        default: 'physical'
    },
    image: { type: String, required: true },
    socialLinks: {
        twitter: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        facebook: { type: String, default: "" },
    },
}, { timestamps: true });

// Index for better query performance
teamSchema.index({ type: 1 });

export default mongoose.model("Team", teamSchema);
