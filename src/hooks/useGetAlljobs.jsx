import { setAlljobs } from "@/redux/JobSlice";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAlljobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAlljobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);
};
export default useGetAlljobs;
