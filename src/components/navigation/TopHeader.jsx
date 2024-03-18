import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ErrorImg from "../../assets/image/Error.png"
import {
  FaPlusCircle
} from "react-icons/fa";

const TopHeader = ({ fetch, userData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [date, setDate] = useState(new Date());
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    const popup = setInterval(() => {
        setPopup(userData.isApproved !== "Verified" ? true : false)
    }, 300000);

    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // fetch()

    return () => {
      clearInterval(interval);
    };
  }, [userData]);

  const handleOnGotoSettings = () => {
    setPopup(false)
  }

  const handleClosePopup = () => {
    setPopup(false)
  }

  const formattedDate = date.toLocaleDateString("en-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const formattedTime = date.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <>
      <div className="flex justify-center items-center font-medium py-2 z-50 bg-[#295141] uppercase text-white text-sm text-center md:text-sm lg:text-base 2xl:text-xl">
        <h1>
          {formattedDate} | {formattedTime} Philippine Standard Time (PMT)
        </h1>
      </div>

      {/* POP UP */}
      <div className={!popup ? "hidden" : "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen bg-black bg-opacity-[25%] w-full z-[90]"}>
        <div
          className="w-[300px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white border-[1px] border-custom-green-header rounded-xl shadow-lg"
          role="alert"
        >

          <div className="absolute right-[10px] top-[10px] text-red-500 rotate-[45deg]">
            <FaPlusCircle
              className="h-[20px] w-[20px] cursor-pointer hover:border-[1px] hover:border-gray-500 rounded-full"
              onClick={handleClosePopup}
            />
          </div>

          <img
            className="h-auto w-[90px] z-10 absolute top-[-40px] left-[35%]"
            src={ErrorImg}
          ></img>

          <div className="flex flex-col mx-auto items-center mt-[70px] p-4 space-x-3 relative m-auto">
            <div role="status" className="inline">
              <h1 className="text-center font-medium">Your Account is not verified yet, please complete your account information.</h1>
            </div>
            <Link
              to={`/settings/?id=${id}&brgy=${brgy}`}
              onClick={handleOnGotoSettings}
              className='flex h-[50px] mt-5 rounded-md my-auto gap-5 px-5 py-3 bg-custom-green-button'>
              <h1 className="text-bold my-auto font-bold text-sm text-white">GO TO ACCOUNT</h1>
            </Link>
          </div>

        </div>
      </div >
    </>
  );
};

export default TopHeader;
