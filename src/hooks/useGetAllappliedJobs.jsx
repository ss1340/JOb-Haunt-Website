import { setAllApliedJobs } from "@/redux/JobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllappliedJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/getallappliedjobs`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
}
export default useGetAllappliedJobs;
