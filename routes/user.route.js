import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { SingleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(SingleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/update/profile")
  .put(isAuthenticated, SingleUpload, updateProfile);

export default router;
