import { setAdminJobs } from "@/redux/JobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`);
        if (res.data.success) {
          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error occured while fetching companies", error);
      }
    };
    fetchJobs();
  }, [dispatch]);
};
export default useGetAdminJobs;
