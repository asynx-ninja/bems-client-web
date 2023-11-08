import React from "react";
import { IoMdCreate } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import Compose from "../../components/inquiriesComponents/Compose";
import DeleteInquiryModal from "../../components/inquiriesComponents/DeleteModal";
import { Link, useParams } from "react-router-dom";

function Inquiries() {
  const { id, brgy } = useParams();
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
      <div className="w-full md:w-3/4 bg-white rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full md:w-1/3">
            <select
              id="sortby"
              name="sortby"
              className="w-full py-2 px-4 border-1 border-gray-500 rounded-full bg-white  font-bold text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:bg-green-500 focus:ring-gray-500 focus:text-white"
              >
              <option value="" disabled selected>
                Sort by
              </option>
              <option value="date">Date</option>
              <option value="fname">First Name</option>
              <option value="lname">Last Name</option>
            </select>
          </div>
          <div className="w-full md:w-2/3 mt-4 md:mt-0">
            <form className="w-full ">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="w-full pl-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Inquiry"
                  required
                />
              </div>
            </form>
          </div>
        </div>
        <div className="sm:mt-3 flex flex-col px-8 overflow-hidden">
          <div className="overflow-x-auto sm:h-[300px] sm:mb-6 md:h-[256px] lg:h-[450px] lg:mb-[-0.5rem] rounded-3xl">
            <div className="align-middle inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 w-full">
                  <thead className="bg-green-500">
                    <tr>
                      {[
                        "Name",
                        "Email",
                        "Subject",
                        "Message",
                        "Date",
                        "Action",
                      ].map((header, idx) => (
                        <th
                          key={idx}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array(10)
                      .fill("")
                      .map((_, index) => (
                        <tr key={index}>
                          {Array(5)
                            .fill("")
                            .map((_, idx) => (
                              <td
                                key={idx}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              >
                                Data {index}-{idx}
                              </td>
                            ))}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center space-x-3">
                            <Link
                              to={`/message/${id}/${brgy}`}
                              className="bg-blue-500 px-3 py-2 rounded-r-[20px] rounded-bl-[25px] text-white font-bold"
                            >
                              <AiFillEye size={20} />
                            </Link>
                            <button
                              data-hs-overlay="#hs-modal-deleteInquiry"
                              className="bg-red-500 px-3 py-2 rounded-r-[20px] rounded-bl-[25px] text-white font-bold"
                            >
                              <BsTrash3 size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        data-hs-overlay="#hs-modal-compose"
        className="fixed bottom-6 right-6 bg-green-900 py-2 px-4 rounded-full flex justify-center items-center font-bold text-white"
      >
        <IoMdCreate size={20} className="mr-2" />
        Compose
      </button>
      <Compose />
      <DeleteInquiryModal />
    </div>
  );
}

export default Inquiries;
