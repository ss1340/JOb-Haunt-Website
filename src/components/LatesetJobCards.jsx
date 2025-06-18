import React from "react";
import { Badge } from "./ui/badge";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

function LatesetJobCards({ job }) {
  return (
    <div className="bg-white p-5 rounded-md shadow-xl border border-gray-200 cursor-pointer">
      <div className="flex items-center gap-5 mb-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="@shadcn" />
          </Avatar>
        </Button>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
      </div>
      <p className="text-sm text-gray-500">
        <MapPinIcon className="w-4 h-5 text-gray-700 inline" />
        {job?.location}
      </p>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="ghost" className={"text-[#124def] font-bold"}>
          {job?.positions} Positions
        </Badge>
        <Badge variant="ghost" className={"text-[#6f06ef] font-bold"}>
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className={"text-[#ef4609] font-bold"}>
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatesetJobCards;
