import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: false,
    },
    imagePosition: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        required: true
    },
    jobs: [{
        type: String,
        required: false,
    }, ],

    featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);
export default Service;