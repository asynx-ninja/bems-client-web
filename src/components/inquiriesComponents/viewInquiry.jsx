import React from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../assets/sample-image/profile.jpg";
import Reply from "../inquiriesComponents/ReplyModal";
import DeleteInquiryModal from "../../components/inquiriesComponents/DeleteModal";
import { MdArrowBack, MdDelete } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

function viewMessage() {
  const { id, brgy } = useParams();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="bg-[#CBD6DA] min-h-screen p-6 md:p-12 xl:p-24 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 bg-white rounded-lg p-6 mb-6 md:mb-0 md:mr-6">
        <h2 className="text-[2rem] font-bold text-green-900 mb-6">INQUIRIES</h2>
        <div className="mb-6">
          <Link
            to={`/inquiries/${id}/${brgy}`}
            className="py-2 px-4 rounded-lg font-bold lg:text-left text-center bg-green-900 text-white  mb-4  transition ease-in-out delay-50 block"
          >
            Inbox
          </Link>
          <Link
            to={`/sent/${id}/${brgy}`}
            className="py-2 px-4 rounded-lg font-bold lg:text-left text-center bg-[#d9d9d9] text-green-900 hover:bg-green-900 hover:text-white transition ease-in-out delay-50 block"
          >
            Sent
          </Link>
        </div>
      </div>
      <div className="w-full md:w-3/4 bg-white rounded-lg p-6 flex flex-col items-start justify-start">
        <div className="w-full flex justify-between mb-2">
          <Link
            to={`/inquiries/${id}/${brgy}`}
            className="bg-green-700 p-2 rounded-full"
          >
            <MdArrowBack size={isSmallScreen ? 18 : 24} color="white" />
          </Link>

          <button
            data-hs-overlay="#hs-modal-deleteInquiry"
            className="bg-red-700 p-2 rounded-full"
          >
            <MdDelete size={isSmallScreen ? 18 : 24} color="white" />
          </button>
        </div>
        <div className="py-2 ml-0 lg:ml-4">
          <h1 className="text-black lg:text-xl uppercase lg:text-center font-heavy">
            SUBJECT: Inquiries
          </h1>
        </div>
        <div className="flex items-center w-full lg:h-[6rem] h-[3rem]  justify-between mb-2">
          <div className="flex flex-row items-center ml-0 lg:ml-4">
            <img
              className="  rounded-full  lg:w-16  lg:h-16 w-10 h-10"
              src={image}
              alt=""
            />
            <div className="flex flex-col ml-4">
              <h1 className="sm:text-sm lg:text-xl font-heavy text-black">
                Kinet Batista
              </h1>
              <span className="text-black sm:text-[9px] lg:text-[11px]">
                KinetBatista@gmail.com
              </span>
            </div>
          </div>
          <div className="sm:text-[10px] lg:text-sm  flex justify-end text-black lg:h-[4rem]  items-center px-4">
            September 101, 2023
          </div>
        </div>
        <hr className="w-full h-[10px]" />
        <div className="w-full h-[3rem]  lg:p-4 mb-2 flex-grow">
          <div className="bg-white w-full  h-auto">
            <h1 className="text-black sm:text-sm lg:text-lg">
              kahit kasinungalingan papaniwalaan ko basta galing sa labi mo
            </h1>
          </div>
        </div>
        <hr className="w-full h-[10px]" />
        <button
          data-hs-overlay="#hs-modal-reply"
          className="lg:px-6 lg:py-2 px-4 py-2 lg:text-base text-xs bg-green-900 text-white rounded-full self-start"
        >
          Reply
        </button>
      </div>
      <Reply />
      <DeleteInquiryModal />
    </div>
  );
}

export default viewMessage;
