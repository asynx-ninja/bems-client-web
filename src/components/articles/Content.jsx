import React from "react";
import { FaPlus } from "react-icons/fa";

const Content = ({ event }) => {

  // console.log(event)

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
        <p className="sm:w-full lg:w-[60%]">
          {event.details}
        </p>

        <img
          className="w-[400px] h-[400px] sm:mx-auto lg:mx-0 object-cover rounded-[25px]"
          src={event.collections.logo.link}
          alt=""
        />
      </div>

      {/* REQUIREMENTS */}

      <div className="flex flex-col border-b-[3px] border-gray-300 mb-[20px] pb-[20px] w-[90%] mx-auto gap-5">
        <h1 className="text-custom-green-header font-bold text-[36px]">
          Requirements
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <div className="flex flex-col w-[80%] mx-auto">
          {requirements.map((item, i) => (
            <div key={i} className="my-auto">
              <p className="flex gap-5 pb-[5px]">
                {" "}
                <FaPlus className="my-auto" /> {item.req}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
