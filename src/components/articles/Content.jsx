import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

//COMPONENTS
import ReservationModal from "./ReservationModal";

const Content = ({ announcement }) => {


  const dateFormat = (date) => {
    const newFormat = date === undefined ? "" : date.substr(0, 10)
    return newFormat;
  }

  // console.log(event)

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
          <button
            type="button"
            data-hs-overlay="#hs-modal-reservation"
            className="border-[1.5px] text-custom-green-header border-custom-green-header rounded-full px-[15px] hover:bg-custom-green-header hover:text-white transition duration-200 ease-in-out"
          >
            Reserve your Slots!
          </button>
        </div>

      </div>


      {/* DESCRIPTION */}
      <div className="flex border-b-[3px] border-gray-300 mb-[20px] pb-[20px] w-[90%] mx-auto justify-between sm:flex-col lg:flex-row gap-5">
        <p className="sm:w-full md:w-[60%]">{announcement.details}</p>

        <img
          className="w-[400px] h-[400px] sm:mx-auto lg:mx-0 object-cover rounded-[25px]"
          id="logo"
          alt=""
        />
      </div>
      <ReservationModal eventId={announcement._id} announcement={announcement} />
    </div>
  );
};

export default Content;
