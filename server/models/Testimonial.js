import mongoose from "mongoose";



const testimonialSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    }



}, {
    timestamps: true
});
const testimonial = mongoose.model('testimonial', testimonialSchema);

export default testimonial;