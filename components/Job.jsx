import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate();
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const today = new Date();
    const timeDiff = today.getTime() - createdAt.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };
  return (
    <div className="p-5 rounded-md shadow-xl border border-gray-200 cursor-pointer bg-white max-w-md mx-auto sm:max-w-lg lg:max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 sm:text-base">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-4 my-4">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="@shadcn" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium  text-lg sm:text-xl">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">
            <MapPinIcon className="w-4 h-5 text-gray-700 inline" />{" "}
            {job?.location}
          </p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 sm:text-xl">{job?.title}</h1>
        <p className="text-sm text-gray-600 sm:text-base">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge variant="ghost" className="text-[#124def] font-bold">
          {job?.positions} Positions
        </Badge>
        <Badge variant="ghost" className="text-[#6f06ef] font-bold">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-[#ef4609] font-bold">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
          className="rounded-lg"
        >
          Details
        </Button>
        <Button className="bg-[#d8683f] text-white rounded-lg">
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
