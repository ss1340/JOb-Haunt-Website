import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategorialCarousal from "./CategorialCarousal";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAlljobs from "@/hooks/useGetAlljobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  useGetAlljobs();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") navigate("/admin/companies");
  }, []); 

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategorialCarousal />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
