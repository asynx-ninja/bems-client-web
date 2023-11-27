import React from "react";
import { FaPlus } from "react-icons/fa";

const Content = ({ event }) => {
  const requirements = [
    {
      req: "Lorem Ipsum is ",
    },
    {
      req: "Lorem Ipsum is ",
    },
    {
      req: "Lorem Ipsum is ",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-custom-green-header font-bold text-[36px] w-[90%] mx-auto">
        {event.title}
      </h1>

      {/* DESCRIPTION */}
      <div className="flex border-b-[3px] border-gray-300 mb-[20px] pb-[20px] w-[90%] mx-auto justify-between sm:flex-col lg:flex-row gap-5">
        <p className="sm:w-full lg:w-[60%]">{event.details}</p>

        <img
          className="w-[400px] h-[400px] sm:mx-auto lg:mx-0 object-cover rounded-[25px]"
          src={event.collections.logo.link}
          alt=""
        />
      </div>
    </div>
  );
};

export default Content;
