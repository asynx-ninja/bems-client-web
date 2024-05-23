import React from "react";
import axios from "axios";
import API_LINK from "../../config/API";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import BrgyOfficials from "./BrgyOfficials";

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
  const [textareaHeight, setTextareaHeight] = useState("auto");

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);
      setInfo(response.data[0]);
      // console.log(response.data[0])
    };

    fetch();
  }, []);

  useEffect(() => {
    const resizeTextarea = () => {
      const textarea = document.getElementById("storyTextarea");
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    resizeTextarea();
    window.addEventListener("resize", resizeTextarea);
    return () => window.removeEventListener("resize", resizeTextarea);
  }, [info.story]);

  return (
    <>
      <div className="flex justify-center w-full sm:-mt-[50px] md:-mt-[150px] md:mb-[50px]">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(192,192,192,1) 0%, rgba(250,250,250,1) 10%)",
          }}
          className="rounded-[25px] sm:mx-0 md:mx-[20px] mx-auto bg-white mb-4 lg:shadow-2xl shadow-none w-full flex flex-col"
        >
          <div
            className={`relative bg-gradient-to-r from-[${
              info &&
              info.theme &&
              info.theme.gradient &&
              info.theme.gradient.start !== ""
                ? info.theme.gradient.start
                : "#295141"
            }] to-[${
              info &&
              info.theme &&
              info.theme.gradient &&
              info.theme.gradient.end !== ""
                ? info.theme.gradient.end
                : "#408D51"
            }] mx-auto justify-center items-center rounded-t-[25px] w-full`}
          >
            <div className="bg-[url('/header-bg.png')] sm:h-[180px] lg:h-auto rounded-t-[25px]">
              <img
                src={info.logo.link !== "" ? info.logo.link : null}
                alt=""
                className="sm:w-[120px] md:w-[160px] rounded-full border border-[5px] mx-auto absolute left-0 right-0 sm:-top-[65px] md:-top-[5.5rem]"
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
          <div className="pb-[20px] sm:w-[90%] lg:w-[1000px] mx-auto sm:mt-[50px] md:mt-[30px] grid grid-cols-1 gap-5 px-[20px]">
            <div className="w-full">
              <img
                className="w-full sm:h-[200px] md:h-[400px] rounded-md sm:mx-auto lg:mx-0 object-cover"
                src={info.banner.link !== "" ? info.banner.link : null}
                alt=""
              />
            </div>

            <textarea
              id="storyTextarea"
              disabled
              value={info.story}
              className="w-full max-h-[100%] text-black border-0 bg-transparent resize-none"
              style={{ height: textareaHeight }}
            >
              {info.story}
            </textarea>
          </div>

          {/* MISSION VISION */}
          <div className="flex pb-[20px] sm:w-[90%] lg:w-[1000px] border-t-2 pt-[20px] border-b-2 border-gray-400 mx-auto sm:mt-[50px] md:mt-[80px] justify-between sm:flex-col lg:flex-row gap-5 px-[20px]">
            <div className="sm:w-full lg:w-[50%]">
              <h6
                className={`font-bold bg-[${
                  info && info.theme && info.theme.primary !== undefined
                    ? info.theme.primary
                    : ""
                }] text-[24px] sm:text-center md:text-left md:pl-[15px] text-white`}
              >
                MISSION
              </h6>
              <p className="mt-[15px]">{info.mission}</p>
            </div>

            <div className="sm:w-full lg:w-[50%]">
              <h6
                className={`font-bold bg-[${
                  info && info.theme && info.theme.primary !== undefined
                    ? info.theme.primary
                    : ""
                }] text-[24px] sm:text-center md:text-left md:pl-[15px] text-white`}
              >
                VISION
              </h6>
              <p className="mt-[15px]">{info.vision}</p>
            </div>
          </div>

          <div className="mt-[50px] mx-auto sm:w-full lg:w-[1000px]">
            <div className="container mx-auto text-center py-[30px]">
              <p className="sm:text-[14px] md:text-[18px] font-bold uppercase">
                Meet Our
              </p>
              <h1 className="sm:text-[24px] md:text-4xl font-bold mb-4 text-custom-green-header uppercase">
                Barangay Officials
              </h1>
            </div>

            <BrgyOfficials />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
