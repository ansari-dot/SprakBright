import express from "express";
import TestimonialController from "../controllers/testimonial.js";
import { upload, convertToWebP } from '../utils/multer.js';
import { auth } from '../middleware/auth.js'
const router = express.Router();

router.post('/testimonial/add', auth, upload.single('image'), convertToWebP, (req, res) => TestimonialController.create(req, res));
router.get('/testimonial/get', (req, res) => TestimonialController.getAll(req, res));
router.put('/testimonial/update/:id', auth, upload.single('image'), convertToWebP, (req, res) => TestimonialController.update(req, res));
router.delete('/testimonial/delete/:id', auth, (req, res) => TestimonialController.delete(req, res));

export default router;