import React from "react";
import { AiFillFilePdf } from "react-icons/ai";
import defaultLogo from "../../assets/header/side-bg.png";

const Content = ({ service }) => {
  const files =
    service && service.collections && service.collections.file !== undefined
      ? service.collections.file
      : "";

  // console.log(service)

  return (
    <div className="flex flex-col gap-5 sm:px-2 md:px-5">
      {/* DESCRIPTION */}
      <div className="bg-white rounded-lg shadow-xl sm:p-5 md:p-6 lg:w-full w-100 mx-auto mb-10">
        <h1 className="text-custom-green-header font-bold text-2xl lg:text-[36px] w-[90%] mx-auto mb-10 text-center ">
          {service && service.name}
        </h1>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 justify-between items-start gap-10 ">
          <div className="flex flex-col justify-between sm:w-full">
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-justify">
              {service && service.details}
            </p>
          </div>

          <div className="flex flex-col">
            <img
              className="w-full lg:w-[400px] mx-auto sm:h-[200px] lg:h-[400px] object-cover rounded-lg"
              src={
                service &&
                  service.collections &&
                  service.collections.logo &&
                  service.collections.logo.link !== undefined
                  ? service.collections.logo.link
                  : defaultLogo
              }
              alt=""
            />
            {
              files.length !== 0 ?
                <div className="flex flex-col w-full items-center bg-green-500 shadow-lg py-3 px-3 mt-3 rounded-lg">
                  {files &&
                    files.map((item, idx) => (
                      <div className="my-auto flex justify-start items-center w-full">
                        <a
                          key={idx}
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
    </div>
  );
};

export default Content;
