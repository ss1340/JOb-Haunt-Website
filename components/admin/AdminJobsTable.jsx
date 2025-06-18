import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

const AdminJobsTable = () => {
  const { adminJobs, searchAdminJobsBytext } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(adminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      adminJobs &&
      adminJobs.filter((Jobs) => {
        if (!searchAdminJobsBytext) return true;
        return (
          Jobs?.title
            ?.toLowerCase()
            .includes(searchAdminJobsBytext.toLowerCase()) ||
          Jobs?.company?.name
            .toLowerCase()
            .includes(searchAdminJobsBytext.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [adminJobs, searchAdminJobsBytext]);
  const DeleteHandler = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setFilterJobs(filterJobs.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent Posted Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterJobs?.map((job) => (
          <motion.tr
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.5 }}
            key={job._id}
          >
            <TableCell>{job?.company?.name}</TableCell>
            <TableCell>{job?.title}</TableCell>
            <TableCell>{job?.experienceLevel}</TableCell>

            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
            <TableCell className="float-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div
                    onClick={() =>
                      navigate(`/admin/jobs/${job._id}/applicants`)
                    }
                    className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                  >
                    <Eye className="w-4" />
                    <span>Applicants</span>
                  </div>
                  <div
                    onClick={() => DeleteHandler(job._id)}
                    className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                  >
                    <Delete className="w-4" />
                    <span>Delete</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  );
};
export default AdminJobsTable;
