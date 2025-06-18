import { setCompanies } from "@/redux/companySlice";
import { Company_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${Company_API_ENDPOINT}/get`);
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Error occured while fetching companies", error);
      }
    };
    fetchCompanies();
  }, [dispatch]);
};
export default useGetCompanies;
