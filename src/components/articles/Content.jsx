import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { AiFillFilePdf } from "react-icons/ai";

const Content = ({ announcement }) => {
  const files =
    announcement && announcement.collections && announcement.collections.file !== undefined
      ? announcement.collections.file
      : "";

  const logo =
    announcement && announcement.collections && announcement.collections.logo.link !== undefined
      ? announcement.collections.logo.link
      : "";

  const dateFormat = (date) => {
    if (!date) return "";

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const reqAnother = () => {

  }

  // console.log(announcement)

  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto sm:pt-[30px] md:pt-[20px] sm:w-[90%] md:w-[95%]">
        <h1 className="text-custom-green-header font-bold sm:text-center md:text-left sm:text-[24px] md:text-[36px] mx-auto">
          {announcement.title}
        </h1>
        <div className="flex sm:flex-col md:flex-row justify-start items-center gap-5">
          <div className="flex justify-start items-center gap-5">
            <FaCalendarAlt className="text-custom-green-header" />
            <p className="font-medium text-custom-green-header">
              {dateFormat(announcement.date)}
            </p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex border-b-[3px] border-gray-300 mb-[20px] pb-[20px] w-[90%] mx-auto justify-between sm:flex-col lg:flex-row gap-5">
        <p className="sm:w-full md:w-[60%] whitespace-pre-wrap border-none">
          {announcement.details}
        </p>

        <div>
          <img
            className="sm:w-[300px] sm:h-[200px] lg:w-[400px] lg:h-[400px] sm:mx-auto lg:mx-0 object-cover rounded-[25px]"
            id="logo"
            src={logo}
            alt=""
          />

          {
            files.length !== 0 ?
              <div className="flex flex-col w-full items-center bg-green-500 shadow-lg py-3 px-3 mt-3 rounded-lg">
                {files &&
                  files.map((item, idx) => (
                    <div key={idx} className="my-auto flex justify-start items-center w-full">
                      <a
                        href={item.link}
                        target="_blank"
                        className="flex gap-5 hover:text-yellow-300 text-white leading-relaxed font-bold uppercase truncate"
                      >
                        <AiFillFilePdf className="my-auto" />
                        {item.name}
                      </a>
                    </div>
                  ))}
              </div>
              : null
          }
        </div>
      </div>
    </div>
  );
};

export default Content;
