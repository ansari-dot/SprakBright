import express from "express";
import ServicesController from "../controllers/services.js";
import { upload, convertToWebP } from "../utils/multer.js";
import { auth } from "../middleware/auth.js"
const router = express.Router();

// Public routes
router.get("/service/digital/first-five", (req, res) => ServicesController.getFiveDigitalServices(req, res));
router.get("/service/get", (req, res) => ServicesController.getServices(req, res));

// Protected routes (require authentication)
router.post("/service/add", auth, upload.single("image"), convertToWebP, (req, res) => ServicesController.createService(req, res));
router.get("/service/get/:id", auth, (req, res) => ServicesController.getService(req, res));
router.put("/service/update/:id", auth, upload.single("image"), convertToWebP, (req, res) => ServicesController.updateService(req, res));
router.delete("/service/:id", auth, (req, res) => ServicesController.deleteService(req, res));

// Additional service type routes
router.get("/service/digital", (req, res) => ServicesController.getDigitalServices(req, res));
router.get("/service/physical", (req, res) => ServicesController.getPhysicalServices(req, res));
router.get("/service/physical/first-five", (req, res) => ServicesController.getFivePhysicalServices(req, res));

// Featured services routes
router.put("/service/toggle-featured/:id", auth, (req, res) => ServicesController.toggleFeatured(req, res));
router.get("/service/featured", (req, res) => ServicesController.getFeaturedServices(req, res));

export default router;