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
    const newFormat = date === undefined ? "" : date.substr(0, 10);
    return newFormat;
  };

  const reqAnother = () => {

  }

  // console.log(announcement)

  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto w-[90%]">
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
            className="w-[400px] h-[400px] sm:mx-auto lg:mx-0 object-cover rounded-[25px]"
            id="logo"
            src={logo}
            alt=""
          />

          <div className="flex flex-col w-full items-center bg-green-500 shadow-lg py-3 px-3 mt-3 rounded-lg">
            {files &&
              files.map((item, idx) => (
                <div className="my-auto flex justify-start items-center">
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    className="flex gap-5 hover:text-yellow-300 text-white leading-relaxed font-bold uppercase"
                  >
                    <AiFillFilePdf className="my-auto" />
                    {item.name}
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
