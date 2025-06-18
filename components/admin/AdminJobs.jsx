import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import AdminJobsTable from "./AdminJobsTable";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import { setSearchAdminJobsByText } from "@/redux/JobSlice";

function AdminJobs() {
  useGetAdminJobs();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchAdminJobsByText(text));
  });
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center my-5">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-fit"
            placeholder="Search Job By role "
          />
          <Button onClick={() => navigate("/admin/job/create")}>New JOB</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
