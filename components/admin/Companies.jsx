import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import useGetCompanies from "@/hooks/useGetCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";

function Companies() {
  useGetCompanies();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(text));
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
            placeholder="Search Company"
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
