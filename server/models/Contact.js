import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
    },

    service: {
        type: String, // <── FIX: add service field
    },

    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Message", contactSchema);