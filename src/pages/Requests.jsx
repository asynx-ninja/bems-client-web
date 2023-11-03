import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ViewFeedbackModal from "../components/requests/ViewFeedbackModal";
import EditRequestModal from "../components/requests/EditRequestModal";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteRequestModal from "../components/requests/DeleteRequestModal";

const Requests = () => {
  const [status, setStatus] = useState("PENDING");

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img
          className="h-[400px] w-full object-cover"
          src="./../src/assets/image/1.png"
          alt=""
        />

        <img
          className="absolute inset-0 mx-auto my-auto w-[700px]"
          src="./../src/assets/header/montalban-banner2.png"
          alt=""
        />
      </div>

      <div className="p-4 lg:p-10 border">
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row">
            {/* SORT */}
            <div class="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-basic"
                type="button"
                class="hs-dropdown-toggle w-full lg:w-40 mb-5 lg:mb-0 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium text-white shadow-sm align-middle bg-custom-green-table-header"
              >
                SORT BY
                <svg
                  class="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>

              <div
                class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-full lg:w-56 hidden z-20 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown-basic"
              >
                <a
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 "
                  href="#"
                >
                  Request ID
                </a>
                <a
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 "
                  href="#"
                >
                  Name
                </a>
                <a
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Request Type
                </a>
                <a
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100"
                  href="#"
                >
                  Request Date
                </a>
              </div>
            </div>

            {/* Search */}
            <div className="relative lg:ml-5 w-full">
              <form className="flex my-auto">
                <div className="relative w-full xl:w-[500px]">
                  <div className="flex flex-row sm:w-12/6 sm:h-[2.5rem] ">
                    <button
                      type="submit"
                      className="sm:px-5 py-3.5 px-8 my-auto text-sm font-medium text-white bg-custom-green-table-header rounded-l-lg border"
                    >
                      <FiSearch
                        size={20} // You can adjust the size as needed
                        style={{ color: "#ffffff" }}
                      />
                    </button>

                    <input
                      type="search"
                      id="search-dropdown"
                      className="block py-6 flex-grow z-10 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300"
                      placeholder="Search..."
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div>
              <button
                className='w-full lg:w-40 mb-5 lg:mb-0 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium text-white shadow-sm align-middle bg-custom-green-table-header ml-[20px]'
              >
                Print Records
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto  lg:h-[680px] xl:h-[700px] xxl:h-[700px] xxxl:h-[640px] border border-b-0 mt-5 rounded-t-xl">
            <table className="w-full divide-y divide-gray-200 ">
              {/* Table Headers */}
              <thead className="bg-custom-green-table-header border">
                <tr>
                  {/* Service Name */}
                  <th
                    scope="col"
                    className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                  >
                    <div className="flex items-center">
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-white">
                        Request ID
                      </span>
                    </div>
                  </th>

                  {/* Details */}
                  <th
                    scope="col"
                    className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                  >
                    <div className="flex items-center">
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-white">
                        Full Name
                      </span>
                    </div>
                  </th>



                  {/* Type of Service */}
                  <th
                    scope="col"
                    className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                  >
                    <div className="flex items-center">
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-white mx-auto">
                        Request Type
                      </span>
                    </div>
                  </th>

                  {/* Date */}
                  <th
                    scope="col"
                    className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                  >
                    <div className="flex items-center">
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-white mx-auto">
                        Request Date
                      </span>
                    </div>
                  </th>

                  {/* Status */}
                  <th
                    scope="col"
                    className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                  >
                    <div className="flex items-center">
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-white mx-auto">
                        Status
                      </span>
                    </div>
                  </th>

                  {/* Actions */}
                  <th
                    scope="col"
                    className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                  >
                    <div className="flex items-center">
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-white mx-auto">
                        Actions
                      </span>
                    </div>
                  </th>

                  {/* Status */}
                  <th
                    scope="col"
                    className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                  >
                    <div className="flex items-center">
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-white mx-auto">
                        Feedback
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Datas */}
                {Array(3)
                  .fill("")
                  .map((_, idx) => (
                    <tr className="hover-bg-gray-50 border">
                      {/* Service Name */}
                      <td className="w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="px-2 sm:px-6 py-2">
                          <span className="text-xs sm:text-lg text-black mx-auto">
                            1
                          </span>
                        </div>
                      </td>

                      {/* Details */}
                      <td className="w-[15%] sm:w-3/5 border">
                        <div className="px-2 sm:px-6 py-2">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 lg:h-10 overflow-hidden line-clamp-3">
                            Batallones, Rimel John V.
                          </span>
                        </div>
                      </td>

                      {/* Service Type */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center">
                          <span className="text-xs sm:text-sm text-black">
                            Certificate of Indigency
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                            09 / 23 / 2023
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center bg-custom-green-button2 m-2">
                          <span className="text-xs sm:text-sm text-white p-3 mx-5">
                            APPROVED
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-none">
                          {/* View */}
                          <EditRequestModal />
                          <button
                            type="button"
                            className="text-white w-full justify-center bg-custom-red-button font-medium rounded-full text-sm m-2 py-2 px-10 text-center inline-flex items-center mr-2"
                            style={{ margin: "10px 0px", padding: "10px 20px" }}
                            data-hs-overlay="#hs-delete-request-modal"
                          >
                            <AiOutlineDelete
                              size={24}
                              style={{ color: "#ffffff" }}
                            />
                          </button>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-1 sm:space-x-none">
                          {/* View */}
                          <ViewFeedbackModal />
                        </div>
                      </td>
                    </tr>
                  ))}

                {Array(3)
                  .fill("")
                  .map((_, idx) => (
                    <tr className="bg-white hover-bg-gray-50 border">
                      {/* Service Name */}
                      <td className="w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="px-2 sm:px-6 py-2">
                          <span className="text-xs sm:text-lg text-black mx-auto">
                            2
                          </span>
                        </div>
                      </td>

                      {/* Details */}
                      <td className="w-[15%] sm:w-3/5 border">
                        <div className="px-2 sm:px-6 py-2">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 lg:h-10 overflow-hidden line-clamp-3">
                            Obsequio, Russell A.
                          </span>
                        </div>
                      </td>

                      {/* Service Type */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center">
                          <span className="text-xs sm:text-sm text-black">
                            Business Permit
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                            09 / 23 / 2023
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[20%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center bg-custom-red-button m-2">
                          <span className="text-xs sm:text-sm text-white p-3 mx-5">
                            REJECTED
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-none">
                          {/* View */}
                          <EditRequestModal />
                          <button
                            type="button"
                            className="text-white w-full justify-center bg-custom-red-button font-medium rounded-full text-sm m-2 py-2 px-10 text-center inline-flex items-center mr-2"
                            style={{ margin: "10px 0px", padding: "10px 20px" }}
                            data-hs-overlay="#hs-delete-request-modal"
                          >
                            <AiOutlineDelete
                              size={24}
                              style={{ color: "#ffffff" }}
                            />
                          </button>
                        </div>
                      </td>

                      {/* Feedback */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        {/* Feedback Buttons */}
                        <div className="flex justify-center space-x-1 sm:space-x-none">
                          {/* View */}
                          <ViewFeedbackModal />
                        </div>
                      </td>
                    </tr>
                  ))}

                {Array(3)
                  .fill("")
                  .map((_, idx) => (
                    <tr className="bg-white hover-bg-gray-50 border">
                      {/* Service Name */}
                      <td className="w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="px-2 sm:px-6 py-2">
                          <span className="text-xs sm:text-lg text-black mx-auto">
                            3
                          </span>
                        </div>
                      </td>

                      {/* Details */}
                      <td className="w-[15%] sm:w-3/5 border">
                        <div className="px-2 sm:px-6 py-2">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 lg:h-10 overflow-hidden line-clamp-3">
                            Nuguid, Andrei V.
                          </span>
                        </div>
                      </td>

                      {/* Service Type */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center">
                          <span className="text-xs sm:text-sm text-black">
                            Cedula
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                            09 / 23 / 2023
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[20%] sm:w-1/5 whitespace-nowrap border">
                        <div className="flex items-center justify-center bg-custom-amber m-2">
                          <span className="text-xs sm:text-sm text-white p-3 mx-5">
                            {status}
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-none">
                          {/* View */}
                          <EditRequestModal />
                          <button
                            type="button"
                            className="text-white w-full justify-center bg-custom-red-button font-medium rounded-full text-sm m-2 py-2 px-10 text-center inline-flex items-center mr-2"
                            style={{ margin: "10px 0px", padding: "10px 20px" }}
                            data-hs-overlay="#hs-delete-request-modal"
                          >
                            <AiOutlineDelete
                              size={24}
                              style={{ color: "#ffffff" }}
                            />
                          </button>
                        </div>
                      </td>

                      {/* Feedback */}
                      <td className="px-2 py-2 sm:px-3 sm:py-3 w-[15%] sm:w-1/5 whitespace-nowrap border">
                        {/* Feedback Buttons */}
                        <div className="flex justify-center space-x-1 sm:space-x-none">
                          {/* View */}
                          <ViewFeedbackModal />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div class="py-1 px-4 border rounded-b-lg bg-custom-green-table-header">
            <nav class="flex items-center space-x-2">
              <a
                class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span aria-hidden="true">«</span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="w-10 h-10 bg-custom-amber text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
                aria-current="page"
              >
                1
              </a>
              <a
                class="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
              >
                2
              </a>
              <a
                class="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
              >
                3
              </a>
              <a
                class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span class="sr-only">Next</span>
                <span aria-hidden="true">»</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <DeleteRequestModal />
    </div>
  );
};

export default Requests;
