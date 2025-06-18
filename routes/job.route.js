import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getJobByAdmin,
  getAllJobs,
  getJobById,
  postJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/postjob").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getJobByAdmin);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);
export default router;
