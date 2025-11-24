import express from 'express'
import blogsController from '../controllers/blogs.js';
import { auth } from '../middleware/auth.js'
import { upload } from '../utils/multer.js';
import { convertToWebP } from '../utils/multer.js';
const router = express.Router();

// the path to add the blogs.... 

router.post('/blogs/add', auth, upload.single('image'), convertToWebP, (req, res) => blogsController.addBlogs(req, res));
// the path to get all the blogs
router.get('/blogs/get', (req, res) => blogsController.getBlogs(req, res))


export default router;