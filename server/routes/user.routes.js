import express from "express";
import userController from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// ========== Public routes ==========
router.post("/user/register", (req, res) => userController.register(req, res));
router.post("/user/login", (req, res) => userController.login(req, res));

// Forgot/Reset Password
router.post("/user/forgot-password", (req, res) => userController.forgotPassword(req, res));
router.post("/user/reset-password/:token", (req, res) => userController.resetPassword(req, res));

// ========== Protected routes ==========
router.post("/user/logout", (req, res) => userController.logout(req, res));
router.get("/user/profile", auth, (req, res) => userController.getProfile(req, res));
router.put("/user/profile", auth, (req, res) => userController.updateProfile(req, res));
router.put("/user/change-password", auth, (req, res) => userController.changePassword(req, res));

export default router;