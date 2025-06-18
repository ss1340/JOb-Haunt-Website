import React, { useEffect } from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/JobSlice";
import useGetAlljobs from "@/hooks/useGetAlljobs";

function Browse() {
  useGetAlljobs();
  const { alljobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({alljobs?.length})
        </h1>
        <div className="flex-1 h-[88vh] overflow-y-auto  no-scrollbar pb-5">
          <div className="grid grid-cols-3 gap-4">
            {alljobs?.length !== 0 ? (
              alljobs?.map((job) => {
                return <Job key={job._id} job={job} />;
              })
            ) : (
              <span>No Job Found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Browse;
