import express from "express";
import ProjectController from "../controllers/project.js";
import { upload, convertToWebP } from "../utils/multer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/project/get", (req, res) => ProjectController.getAll(req, res));

// Protected
router.post(
    "/project/add",
    auth,
    (req, res, next) => upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 10 }])(req, res, next),
    convertToWebP,
    (req, res) => ProjectController.create(req, res)
);
router.get("/project/get/:id", auth, (req, res) => ProjectController.getOne(req, res));
router.put(
    "/project/update/:id",
    auth,
    (req, res, next) => upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 10 }])(req, res, next),
    convertToWebP,
    (req, res) => ProjectController.update(req, res)
);
router.delete("/project/delete/:id", auth, (req, res) => ProjectController.delete(req, res));
router.put("/project/toggle-featured/:id", auth, (req, res) => ProjectController.toggleFeatured(req, res));
router.get('/project/four/get', (req, res) => ProjectController.getFirstN(req, res))
export default router;