import React from "react";
import headerImage from "../../assets/image/header.png";
import { useEffect, useState } from "react";
import API_LINK from "../../config/API";
import axios from "axios";

const Barangays = ({ selectedBarangay, closeModal }) => {
  if (!selectedBarangay) {
    return null; // Don't render anything if no barangay is selected
  }

  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchBrgy = async () => {
      const response = await axios.get(`${API_LINK}/brgyinfo/?brgy=${selectedBarangay.brgy}`);
      setInfo(response.data[0]);
    }
    fetchBrgy()
  }, [selectedBarangay])

  return (
    <div
      id="hs-vertically-centered-scrollable-modal"
      className="hs-overlay hidden w-full sm:w-11/12 md:w-10/12 lg:w-10/12 fixed top-0 left-0 right-0 bottom-0 m-auto z-[100] overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:w-11/12 md:w-10/12 lg:w-8/12 m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
        <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm  dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div
            className=" items-center lg:py-6 py-3 px-4 border-b dark:border-gray-700"
            style={{
              background: `url(${headerImage})`,
            }}
          >
            <h3 className="lg:tracking-[.4rem] tracking-widest text-md lg:text-lg font-bold uppercase text-center text-white dark:text-white">
              Barangay {selectedBarangay.brgy} Information
            </h3>
          </div>
          <div className="overflow-y-auto ">
            <div
              className="flex flex-col justify-center items-center"
              style={{
                backgroundSize: "contain",
                backgroundImage: `url(${selectedBarangay.banner})`,
                backgroundRepeat: "no-repeat", // Add this line to prevent the background image from repeating
              }}
            >
              <img
                className="w-[150px] sm:py-[25px] md:py-[50px]"
                src={selectedBarangay.logo}
                alt=""
              />
            </div>
            <div className="p-4 space-y-4 bg-white rounded-b-xl shadow-2xl transform transition-all duration-500 ease-in-out">
              <div className="space-y-2 ">
                <div className={`tracking-widest py-2 px-3 rounded-md text-white text-sm font-bold uppercase bg-gradient-to-r from-[${info && info.theme && info.theme.gradient && info.theme.gradient.start !== undefined ? info.theme.gradient.start : "#295141"}] to-[${info && info.theme && info.theme.gradient && info.theme.gradient.end !== undefined ? info.theme.gradient.end : "#408D51"}]`}>
                  Barangay Story
                </div>
                <div className="text-gray-700 text-sm bg-white p-3 rounded-md shadow-md mb-5 h-36 lg:h-auto overflow-y-auto">
                  {selectedBarangay.story}
                </div>
              </div>
              <div className="space-y-2 overflow-y-auto">
                <div className={`tracking-widest py-2 px-3 rounded-md text-white text-sm font-bold uppercase bg-gradient-to-r from-[${info && info.theme && info.theme.gradient && info.theme.gradient.start !== undefined ? info.theme.gradient.start : "#295141"}] to-[${info && info.theme && info.theme.gradient && info.theme.gradient.end !== undefined ? info.theme.gradient.end : "#408D51"}]`}>
                  Barangay Mission
                </div>
                <div className="text-gray-700 text-sm bg-white p-3 rounded-md shadow-md mb-5 h-36 lg:h-auto overflow-y-auto">
                  {selectedBarangay.mission}
                </div>
              </div>
              <div className="space-y-2">
                <div className={`tracking-widest py-2 px-3 rounded-md text-white text-sm font-bold uppercase bg-gradient-to-r from-[${info && info.theme && info.theme.gradient && info.theme.gradient.start !== undefined ? info.theme.gradient.start : "#295141"}] to-[${info && info.theme && info.theme.gradient && info.theme.gradient.end !== undefined ? info.theme.gradient.end : "#408D51"}]`}>
                  Barangay Vision
                </div>
                <div className="text-gray-700 text-sm bg-white p-3 rounded-md shadow-md mb-5 h-36 lg:h-auto overflow-y-auto">
                  {selectedBarangay.vision}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
            <button
              type="button"
              className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-overlay="#hs-vertically-centered-scrollable-modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barangays;
