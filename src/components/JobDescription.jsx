import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { setSingleJobById } from "@/redux/JobSlice";
import axios from "axios";
import { toast } from "sonner";

function JobDescription() {
  const { user } = useSelector((store) => store.user);
  const { singleJobById } = useSelector((store) => store.job);
  const params = useParams();
  const JobId = params.id;
  //check if the user has already applied for the job
  const isInitiallyApplied =
    singleJobById?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${JobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedJob = {
          ...singleJobById,
          applications: [
            ...singleJobById.applications,
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJobById(updatedJob)); // Update the Redux state
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${JobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, [JobId, dispatch, user?._id]);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">{singleJobById?.title}</h1>
          <div className="flex items-center gap-2 my-2">
            <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
              positions {singleJobById?.positions}
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
              {singleJobById?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
              {singleJobById?.salary}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div className="my-4">
        <h1 className="border-b-2 pb-1 border-b-gray-300 font-medium">
          Job Description
        </h1>
      </div>
      <div>
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJobById?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJobById?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJobById?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJobById?.experienceLevel}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJobById?.salary}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJobById?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJobById?.createdAt
              ? singleJobById.createdAt.split("T")[0]
              : "N/A"}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
