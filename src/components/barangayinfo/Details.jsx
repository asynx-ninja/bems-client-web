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

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);

      setInfo(response.data[0]);
      // console.log(response.data[0])
    };

    fetch();
  }, []);

  return (
    <>
      <div className="flex justify-center w-full sm:-mt-[50px] md:-mt-[150px] md:mb-[50px]">
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
            <textarea
            disabled
            value={info.story}
            className="sm:w-full sm:h-full lg:h-auto lg:w-[60%] text-black border-0 bg-transparent resize-none">
              {info.story}
            </textarea>

            <img
              className="w-[400px] sm:h-[200px] lg:h-[400px] sm:mx-auto lg:mx-0 object-cover rounded-[25px]"
              src={info.banner.link !== "" ? info.banner.link : null}
              alt=""
            />
          </div>

          {/* MISSION VISION */}
          <div className="flex pb-[20px] border-t-2 pt-[20px] border-b-2 border-gray-400 w-[90%] mx-auto sm:mt-[50px] md:mt-[80px] justify-between sm:flex-col lg:flex-row gap-5">
            <div className="sm:w-full lg:w-[50%]">
              <h6 className="font-bold bg-custom-green-header text-[24px] sm:text-center md:text-left md:pl-[15px] text-white">
                MISSION
              </h6>
              <p className="mt-[15px]">
                {info.mission}
              </p>
            </div>

            <div className="sm:w-full lg:w-[50%]">
              <h6 className="font-bold bg-custom-green-header text-[24px] sm:text-center md:text-left md:pl-[15px] text-white">
                VISION
              </h6>
              <p className="mt-[15px]">
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
