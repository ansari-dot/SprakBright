import express from "express";
import team from "../controllers/team.js";
import { upload, convertToWebP } from "../utils/multer.js";
import { auth } from '../middleware/auth.js';
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

// Add team member (admin only)
router.post(
  "/team/add", 
  auth, 
  upload.single('image'), 
  convertToWebP,
  authorizeRoles("admin"),
  (req, res) => team.addMember(req, res)
);

// Get all team members (public)
// Optional query param: ?type=digital or ?type=physical
router.get("/team/get", (req, res) => team.getMembers(req, res));

// Update team member (admin only)
router.put(
  "/team/update/:id", 
  auth, 
  upload.single('image'), 
  convertToWebP,
  authorizeRoles("admin"),
  (req, res) => team.updateMember(req, res)
);

// Delete team member (admin only)
router.delete(
  "/team/delete/:id", 
  auth, 
  authorizeRoles("admin"),
  (req, res) => team.deleteMember(req, res)
);

export default router;