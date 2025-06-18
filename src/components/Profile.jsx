import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Contact, Mail, Pen } from "lucide-react";

import { Button } from "./ui/button";
import UpdateProfileDialog from "./UpdateProfileDialog";

import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useSelector } from "react-redux";
import useGetAllappliedJobs from "@/hooks/useGetAllappliedJobs";

const Profile = () => {
  useGetAllappliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">
                {user?.fullname || "UserName"}
              </h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="h-4 w-4" />
            <span>{user?.email || "Email"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="h-4 w-4" />
            <span>{user?.phoneNumber || "+91-0000000000"}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="my-2 font-bold">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.lengrh !== 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="w-full text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName || "Download Resume"}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-xl font-bold p-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
