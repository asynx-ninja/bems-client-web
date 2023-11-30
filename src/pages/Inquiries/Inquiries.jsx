import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlineStop } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
import axios from "axios";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ArchiveInquiryModal from "../../components/inquiriesComponents/inquiriesModals/ArchivedInquiryModal";
import ViewMessage from "../../components/inquiriesComponents/inquiriesModals/ViewMessage";
import ComposeModal from "../../components/inquiriesComponents/inquiriesModals/Compose";
import InquiriesList from "../../components/inquiriesComponents/InquiriesList";


const Inquiries = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);

  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/inquiries/?id=${id}&brgy=${brgy}&archived=false`
      );

      // console.log(response)
      if (response.status === 200) setInquiries(response.data);
      else setInquiries([]);
    };

    fetch();
  }, []);

  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = inquiries.slice().sort((a, b) => {
      if (sortBy === "inquiries_id") {
        return newSortOrder === "asc"
          ? a.inquiries_id.localeCompare(b.inquiries_id)
          : b.inquiries_id.localeCompare(a.inquiries_id);
      } else if (sortBy === "lastName") {
        return newSortOrder === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName);
      } else if (sortBy === "isApproved") {
        const order = { Completed: 1, "In Progress": 2, "Not Responded": 3 };
        return newSortOrder === "asc"
          ? order[a.isApproved] - order[b.isApproved]
          : order[b.isApproved] - order[a.isApproved];
      }

      return 0;
    });

    setInquiries(sortedData);
  };

  // console.log(inquiries);

  const checkboxHandler = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  };

  const checkAllHandler = () => {
    if (inquiries.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = inquiries.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = [
    "Inquiry id",
    "name",
    "e-mail",
    "date",
    "status",
    "actions",
  ];

  return (
    <div className="flex flex-col h-full">
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
      <div className="p-4 lg:p-10 border flex sm:flex-col lg:flex-row">
        <div className="w-full lg:w-[30%] md:mr-[20px] bg-white rounded-lg">
          <h2 className="text-[2rem] font-bold text-green-900 mb-6">INQUIRIES</h2>
          <div className="mb-6">
            <Link
              to={`/inquiries/?id=${id}&brgy=${brgy}`}
              className="py-2 px-4 rounded-lg font-bold lg:text-left text-center bg-green-900 text-white mb-4 transition ease-in-out delay-50 block"
            >
              Inquiries
            </Link>
            <Link
              to={`/archive/?id=${id}&brgy=${brgy}`}
              className="py-2 px-4 rounded-lg font-bold lg:text-left text-center bg-[#d9d9d9] text-green-900 hover:bg-green-900 hover:text-white transition ease-in-out delay-50 block"
            >
              Archives
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-col lg:flex-row justify-center">
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
              <ul
                className="bg-custom-green-header hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 shadow-md rounded-lg p-2 "
                aria-labelledby="hs-dropdown"
              >
                <li
                  onClick={() => handleSort("inquiries_id")}
                  className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-custom-green-button to-custom-green-header hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
                >
                  SERVICE ID
                  {sortColumn === "inquiries_id" && (
                    <span className="ml-auto">
                      {sortOrder === "asc" ? (
                        <span>DESC &darr;</span>
                      ) : (
                        <span>ASC &uarr;</span>
                      )}
                    </span>
                  )}
                </li>
                <li
                  onClick={() => handleSort("date")}
                  className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-custom-green-button to-custom-green-header hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
                >
                  Date
                  {sortColumn === "date" && (
                    <span className="ml-auto">
                      {sortOrder === "asc" ? (
                        <span>OLD TO LATEST &darr;</span>
                      ) : (
                        <span>LATEST TO OLD &uarr;</span>
                      )}
                    </span>
                  )}
                </li>
                <li
                  onClick={() => handleSort("isApproved")}
                  className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-custom-green-button to-custom-green-header hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
                >
                  STATUS
                  {sortColumn === "isApproved" && (
                    <span className="ml-auto">
                      {sortOrder === "asc" ? (
                        <span>DESC &darr;</span>
                      ) : (
                        <span>ASC &uarr;</span>
                      )}
                    </span>
                  )}
                </li>
              </ul>
            </div>

            <div className="flex sm:flex-col md:flex-row w-full h-auto">
              {/* Search */}
              <div className="relative lg:ml-5 w-full">
                <form className="flex my-auto">
                  <div className="relative w-full">
                    <div className="flex flex-row sm:w-12/6 sm:h-[2.5rem]">
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

              <div className="sm:mt-[20px] sm:mx-auto md:mt-0 flex">
                {/* ARCHIVE BUTTON */}
                <div className="hs-tooltip inline-block mx-[10px] my-auto w-[50px]">
                  <button
                    type="button"
                    data-hs-overlay="#hs-modal-archiveInquiry"
                    className="hs-tooltip-toggle w-[50px] h-[50px] text-white rounded-md  bg-pink-800 font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <AiOutlineStop size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Archived Selected Inquiries
                    </span>
                  </button>
                </div>

                {/* COMPOSE BUTTON */}
                <button
                  type="button"
                  data-hs-overlay="#hs-modal-compose"
                  className="hs-tooltip-toggle flex justify-center items-center rounded-lg bg-custom-green-header text-white font-medium text-sm text-center w-[100px] h-[50px]"
                >
                  <FaPlus size={24} style={{ color: "#ffffff" }} />
                  <span
                    className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                    role="tooltip"
                  >
                    Compose
                  </span>
                </button>
              </div>

            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto sm:h-[380px] lg:h-[680px] xl:h-[700px] xxl:h-[700px] xxxl:h-[640px] border border-b-0 mt-5 rounded-t-xl">
            <table className="w-full divide-y divide-gray-200 ">
              {/* Table Headers */}
              <thead className="bg-custom-green-table-header border">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        name=""
                        onClick={checkAllHandler}
                        id=""
                      />
                    </div>
                  </th>
                  {
                    tableHeader.map((item, i) => (
                      <th
                        scope="col"
                        key={i}
                        className="px-6 py-3 text-center text-xs font-bold text-white uppercase"
                      >
                        {item}
                      </th>
                    ))
                  }
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  inquiries.length === 0 ?
                    <tr>
                      <th className="pt-[50px]" rowSpan={5} colSpan={7}>
                        No Records Shown
                      </th>
                    </tr>
                    :
                    <InquiriesList inquiries={inquiries} selectedItems={selectedItems} checkboxHandler={checkboxHandler} setInquiry={setInquiry} />
                }
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
      <ComposeModal />
      <ArchiveInquiryModal selectedItems={selectedItems} />
      <ViewMessage inquiry={inquiry} setInquiry={setInquiry} />
    </div>
  );
};

export default Inquiries;