import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params;
    if (!jobId)
      return res
        .status(400)
        .json({ message: "Job Id required", success: false });

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    // Check if the user has already applied for the job
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }
    //check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);

    await job.save();

    return res.status(201).json({
      message: "Job Applied successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to apply for the job.",
      success: false,
    });
  }
};
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    // Filter out applications where job is null (i.e., deleted)
    const filteredApplications = applications.filter((app) => app.job !== null);

    if (filteredApplications.length === 0) {
      return res.status(404).json({
        message: "No applications found.",
        success: false,
      });
    }

    return res.status(200).json({
      application: filteredApplications,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get applied jobs.",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Failed to get job applicants",
    });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }
    // Find the application by applicant ID
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
      success: false,
    });
  }
};
