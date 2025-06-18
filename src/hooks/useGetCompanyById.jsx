import { setSingleCompany } from "@/redux/companySlice";
import { Company_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${Company_API_ENDPOINT}/get/${id}`);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("Error occured while fetching company details", error);
      }
    };
    fetchCompanyDetails();
  }, [id, dispatch]);
};
export default useGetCompanyById;
