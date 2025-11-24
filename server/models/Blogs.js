import mongoose from 'mongoose';

const blogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        maxLength: 30
    },
    date: {
        type: Date,
        required: true,
    },
    snippet: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})
const Blogs = mongoose.model('Blogs', blogsSchema);
export default Blogs