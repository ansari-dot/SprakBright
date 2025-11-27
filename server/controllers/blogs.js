import Blogs from "../models/Blogs.js";

class blogsController {
    // ADD BLOG (ADMIN ONLY)
    async addBlogs(req, res) {
        try {

            const { title, category, date, snippet, link } = req.body;

            if (!title || !category || !date || !snippet || !link) {
                return res.status(400).json({
                    message: "Please fill all the fields",
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: "Please upload the image first",
                });
            }

            const newBlogs = new Blogs({
                title,
                snippet,
                date,
                link,
                category,
                image: `/uploads/blogs/${req.file.filename}`,
            });

            await newBlogs.save();

            res.status(200).json({
                message: "Blog added successfully",
            });
        } catch (err) {
            console.log("Server Error:", err);
            res.status(500).json({
                message: `Internal Server Error: ${err.message}`,
            });
        }
    }

    // UPDATE BLOG IMAGE PATHS (REMOVE /api PREFIX)
    async updateBlogImagePaths(req, res) {
        try {
            const blogs = await Blogs.find({});
            
            for (const blog of blogs) {
                if (blog.image && blog.image.startsWith('/api/uploads/blogs/')) {
                    blog.image = blog.image.replace('/api/uploads/blogs/', '/uploads/blogs/');
                    await blog.save();
                }
            }
            
            res.status(200).json({
                message: "Blog image paths updated successfully",
                updatedCount: blogs.length
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating blog image paths",
                error: error.message
            });
        }
    }

    // GET BLOGS
    async getBlogs(req, res) {
        try {
            const blogs = await Blogs.find();

            if (!blogs) {
                return res.status(400).json({
                    message: "No blogs found",
                });
            }

            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching blogs",
                error: error.message,
            });
        }
    }
}

export default new blogsController();
