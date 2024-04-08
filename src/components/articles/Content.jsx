import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { AiFillFilePdf } from "react-icons/ai";

const Content = ({ announcement }) => {
  const files =
    announcement &&
    announcement.collections &&
    announcement.collections.file !== undefined
      ? announcement.collections.file
      : "";

  const logo =
    announcement &&
    announcement.collections &&
    announcement.collections.logo.link !== undefined
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

  const reqAnother = () => {};

  // console.log(announcement)

  return (
    <div className="flex flex-col gap-5 sm:px-2 md:px-5 w-full">
      {/* DESCRIPTION */}
      <div className="sm:p-5 md:p-6 lg:w-full w-100 mx-auto">
        <img
          className=" rounded-[15px] w-full sm:h-[200px] lg:h-[300px] object-cover"
          id="logo"
          src={logo}
          alt=""
        />

        <div className="flex flex-col lg:flex-row justify-between items-start gap-5 ">
          <div className="flex flex-col justify-between w-full lg:w-[70%]">
            <div className="flex flex-col my-5 space-y-4">
              <h1 className="text-custom-green-header font-bold text-2xl md:text-[36px] text-left">
                {announcement.title}
              </h1>
            </div>

            <p className="sm:w-full md:w-[60%] whitespace-pre-wrap border-none">
              {announcement.details}
            </p>
          </div>

          {files.length !== 0 ? (
            <div className="flex flex-col w-full lg:w-[30%] border-2 bg-[#f3f3f3] rounded-lg shadow-lg mt-7">
              <div className="flex flex-col pb-2 md:w-full ">
                <h1 className="flex justify-center my-2 font-bold text-[#353535]">
                  ATTACHED FILES
                </h1>

                <div className="overflow-y-auto overflow-x-auto w-full h-[400px]">
                  {files &&
                    files.map((item, idx) => (
                      <div
                        key={idx}
                        className="my-auto flex justify-start items-center w-full px-5"
                      >
                        <a
                          href={item.link}
                          target="_blank"
                          className="flex flex-row gap-5 w-full items-center bg-[#ffffff] shadow-lg py-3 px-3 my-1 rounded-lg text-[#353535] leading-relaxed font-bold uppercase truncate ...  hover:text-yellow-300 transform transition duration-500 ease-in-out hover:scale-105"
                        >
                          <AiFillFilePdf size={20} style={{ color: "black" }} />
                          <label className="w-40 md:w-96 lg:w-full truncate ...">
                            {item.name}
                          </label>
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Content;
