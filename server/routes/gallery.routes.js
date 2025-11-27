import express from "express";
import GalleryController from "../controllers/gallery.js";
import { upload, convertToWebP } from "../utils/multer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get('/gallery/get', (req, res) => GalleryController.getAll(req, res));
router.post('/gallery/add', auth, (req, res, next) => upload.fields([{ name: 'clean', maxCount: 1 }, { name: 'dirty', maxCount: 20 }])(req, res, next), convertToWebP, (req, res) => GalleryController.create(req, res));
router.put('/gallery/update/:id', auth, (req, res, next) => upload.fields([{ name: 'clean', maxCount: 1 }, { name: 'dirty', maxCount: 20 }])(req, res, next), convertToWebP, (req, res) => GalleryController.update(req, res));
router.delete('/gallery/delete/:id', auth, (req, res) => GalleryController.delete(req, res));

export default router;