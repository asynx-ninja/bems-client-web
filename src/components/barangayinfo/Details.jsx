import React from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Details = () => {
  const [searchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const [info, setInfo] = useState({
    banner: {
      link: "",
    },
    logo: {
      link: "",
    },
  });

  const stats = [
    {
      title: "Total Population",
      value: "443,954",
    },
    {
      title: "Total Population",
      value: "123,456",
    },
    {
      title: "Registered Voters",
      value: "789,012",
    },
    {
      title: "Total Barangays",
      value: "789,012",
    },
    {
      title: "Total Male",
      value: "789,012",
    },
    {
      title: "Total Female",
      value: "789,012",
    },
    // Add more data as needed
  ];

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);

      setInfo(response.data[0]);
    };

    fetch();
  }, []);

  return (
    <>
      <div className="flex justify-center w-full sm:-mt-[50px] md:-mt-[150px] mb-[50px]">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(192,192,192,1) 0%, rgba(250,250,250,1) 10%)",
          }}
          className="rounded-[25px] sm:mx-0 md:mx-[20px] mx-auto bg-white mb-4 lg:shadow-2xl shadow-none w-full flex flex-col pb-[50px]"
        >
          <div className="relative bg-gradient-to-r from-[#295141] to-[#408D51] mx-auto justify-center items-center rounded-t-[25px] w-full">
            <div className="bg-[url('/header-bg.png')] sm:h-[180px] lg:h-auto rounded-t-[25px]">
              <img
                src={info.logo.link !== "" ? info.logo.link : null}
                alt=""
                className="sm:w-[120px] md:w-[160px] mx-auto absolute left-0 right-0 sm:-top-[65px] md:-top-[5.5rem]"
              />
              <div className="h-[220px] flex flex-col justify-center items-center">
                <h1 className="text-[22px] md:text-4xl font-bold uppercase text-white text-center pt-0 lg:pt-[40px]">
                  Welcome to Barangay {brgy}
                </h1>
                <h6 className="text-md md:text-2xl text-center mt-2 font-medium text-white">
                  Municipality of Rodriguez, Rizal
                </h6>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex pb-[20px] w-[90%] mx-auto sm:mt-[50px] md:mt-[80px] justify-between sm:flex-col-reverse lg:flex-row gap-5">
            <textarea disabled className="sm:w-full lg:w-[60%] sm:text-[14px] md:text-[18px] border-0 bg-transparent resize-none">
              {info.story}
            </textarea>

            <img
              className="w-[400px] h-[400px] sm:mx-auto lg:mx-0 object-cover rounded-[25px]"
              src={info.banner.link !== "" ? info.banner.link : null}
              alt=""
            />
          </div>

          <div className="px-4 md:px-8 mt-12 md:mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="text-center flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[0.7]"
              >
                <div className="p-4 md:p-5">
                  <h3 className="text-lg sm:leading-5 md:leading-none sm:text-[12px] md:text-xl uppercase font-bold mb-4 text-green-800 dark:text-white">
                    {item.title}
                  </h3>
                  <span className="font-bold text-green-800 text-4xl sm:text-[24px] md:text-5xl dark:text-gray-400">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* MISSION VISION */}
          <div className="flex pb-[20px] border-t-2 pt-[20px] border-b-2 border-gray-400 w-[90%] mx-auto sm:mt-[50px] md:mt-[80px] justify-between sm:flex-col lg:flex-row gap-5">
            <div className="sm:w-full lg:w-[50%]">
              <h6 className="font-bold bg-custom-green-header text-[24px] pl-[15px] text-white">
                MISSION
              </h6>
              <p className="mt-[15px] sm:text-[14px] md:text-[18px]">
                {info.mission}
              </p>
            </div>

            <div className="sm:w-full lg:w-[50%]">
              <h6 className="font-bold bg-custom-green-header text-[24px] pl-[15px] text-white">
                VISION
              </h6>
              <p className="mt-[15px] sm:text-[14px] md:text-[18px]">
                {info.vision}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
