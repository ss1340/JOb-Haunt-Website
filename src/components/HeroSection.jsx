import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { setSearchedQuery } from "@/redux/JobSlice";
function HeroSection() {
  const { user } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        {user ? (
          <h1 className="text-4xl font-mono font-bold  ">
            Hi,{user.fullname}
            <span className="animate-wave inline-block">👋</span>
          </h1>
        ) : (
          <div className=" mx-auto text-[#fd5417] px-4 py-2 rounded-full bg-gray-100 font-medium">
            Please Login to explore No. 1 Job Hunt Website
          </div>
        )}
        <div>
          <h1 className="text-5xl font-bold">
            Discover, Apply & <br /> Secure Your
            <span className="text-[#265df5]"> Dream Career</span>
          </h1>
        </div>
        <div>
          <p className="text-gray-500">
            We provide a platform for students to find their dream job and
            recruiters <br /> to find their dream candidates.
          </p>
        </div>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find you dream jobs"
            className="outline-none w-full border-none"
          />
          <Button
            onClick={handleSearch}
            className="  bg-[#f55d27] rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
