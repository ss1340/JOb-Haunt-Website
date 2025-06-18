import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/JobSlice";
import { useNavigate } from "react-router-dom";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Game Development",
  "Mobile Development",
  "Software Development",
  "Web Development",
  "App Development",
  "UI/UX",
];

function CategorialCarousal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselPrevious />
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 " key={index}>
              <Button
                onClick={() => searchJobHandler(item)}
                variant="outline"
                className=" rounded-full"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategorialCarousal;
