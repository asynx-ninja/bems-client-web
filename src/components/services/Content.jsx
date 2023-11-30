import React from "react";
import { AiFillFilePdf } from "react-icons/ai";
import defaultLogo from "../../assets/header/side-bg.png"

const Content = ({ service }) => {
  const files = service &&
    service.collections &&
    service.collections.file !== undefined
    ? service.collections.file
    : "";

  return (
    <div className="flex flex-col gap-5 px-5 md:px-0">
      {/* DESCRIPTION */}
      <div className="bg-white rounded-lg shadow-lg p-6 lg:w-[90%] w-100 mx-auto mb-10">
        <h1 className="text-custom-green-header font-bold text-2xl lg:text-[36px] w-[90%] mx-auto mb-10 text-center ">
          {service.name}
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 ">
          <div className="w-full flex flex-col justify-between">
            <p className="text-gray-600 leading-relaxed">{service.details}</p>

            <div className="flex flex-col  bg-white rounded-lg shadow-lg p-6 w-100 gap-5">
              <div className="flex flex-col w-full">
                {files &&
                  files.map((item, idx) => (
                    <div className="my-auto">
                      <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        className="flex gap-5 pb-[5px] hover:text-blue-900 text-blue-600 leading-relaxed"
                      >
                        <AiFillFilePdf className="my-auto" />
                        {item.name}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <img
            className="w-full lg:w-[400px] h-[400px] object-cover rounded-lg"
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
        </div>
      </div>
    </div>
  );
};

export default Content;
