import React from "react";
import { AiFillFilePdf } from "react-icons/ai";
import defaultLogo from "../../assets/header/side-bg.png";
import defaultBanner from "../../assets/image/1.png";

const Content = ({ service }) => {
  const files =
    service && service.collections && service.collections.file !== undefined
      ? service.collections.file
      : "";

  console.log(service);

  return (
    <div className="flex flex-col gap-5 sm:px-2 md:px-5 w-full">
      {/* DESCRIPTION */}
      <div className="sm:p-5 md:p-6 lg:w-full w-100 mx-auto">
        <img
          className=" rounded-[15px] w-full sm:h-[200px] lg:h-[300px] object-cover"
          src={
            service &&
            service.collections &&
            service.collections.banner &&
            service.collections.banner.link !== undefined
              ? service.collections.banner.link
              : defaultBanner
          }
          alt=""
        />

        <div className="flex flex-col lg:flex-row justify-between items-start gap-5 ">
          <div className="flex flex-col justify-between w-full lg:w-[70%]">
            <div className="flex flex-col my-5 space-y-4">
              <h1 className="text-custom-green-header font-bold text-2xl md:text-[36px] text-left">
                {service && service.name}
              </h1>
              <label className="flex max-w-40 items-center rounded-md justify-center bg-green-50 px-2 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                PHP {service && service.fee}
              </label>
            </div>

            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-justify h-full pr-3">
              {service && service.details}
            </p>
          </div>

          {files.length !== 0 && (
            <div className="flex flex-col w-full lg:w-[30%] border-2 bg-[#f3f3f3] rounded-lg shadow-lg mt-7">
              <div className="flex flex-col pb-2 md:w-full ">
                <h1 className="flex justify-center my-2 font-bold text-[#353535]">
                  ATTACHED FILES
                </h1>

                <div className="overflow-y-auto overflow-x-auto w-full h-[400px]">
                  {files.map((item, idx) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
