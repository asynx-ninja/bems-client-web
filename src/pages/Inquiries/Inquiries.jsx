import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ViewMessage from "../../components/inquiriesComponents/inquiriesModals/ViewMessage";
import ComposeModal from "../../components/inquiriesComponents/inquiriesModals/Compose";
import InquiriesList from "../../components/inquiriesComponents/InquiriesList";
import video from "../../assets/image/video.mp4";
import no_data from "../../assets/image/no-data.png";
import { io } from 'socket.io-client'

const socket = io(`https://bems-server.onrender.com`)
const Inquiries = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const user_id = searchParams.get("user_id");
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [sortBy, setSortBy] = useState([]);
  const [SortByName, setSortByName] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [getAll, setGetAll] = useState([]);
  const [searchResult, setSearchResult] = useState(0);
  const [info, setInfo] = useState({});
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";
  }, []);

  useEffect(() => {
    const getBrgy = async () => {
      try {
        const brgyInfo = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);
        if (brgyInfo.status === 200) {
          setInfo(brgyInfo.data[0]);
        } else {
          setInfo({});
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/inquiries/?id=${user_id}&brgy=${brgy}&to=${SortByName}&archived=false&page=${currentPage}`
        );

        console.log(response.data);

        if (response.status === 200) {
          setUpdate(false)
          setInquiries(
            response.data.result.sort(
              (date1, date2) =>
                new Date(date2.createdAt) - new Date(date1.createdAt)
            )
          );
          setPageCount(response.data.pageCount);
          setGetAll(response.data.all);

          let uniqueInquiries = new Set(
            response.data.all.map((item) => item.compose.to)
          );
          let arr = [...uniqueInquiries].sort();
          setSortBy(arr);
        } else {
          setInquiries([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBrgy();
    const interval = setInterval(() => {
      fetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [user_id, brgy, SortByName, currentPage, update]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleRequestFilter = (selectedType) => {
    setSortByName(selectedType);
  };

  const handleResetFilter = () => {
    setSortByName("all");
  };

  const handleOnSearch = (e) => {
    const inputValue = e.target.value.toUpperCase();
    setSearchInput(inputValue);

    const getSearch = getAll.filter(
      (item) =>
        item.inq_id.toUpperCase().includes(e.target.value.toUpperCase()) ||
        item.compose.subject
          .toUpperCase()
          .includes(e.target.value.toUpperCase())
    );
    setSearchResult(getSearch.length);
    setInquiries(getSearch);
  };

  // console.log(inquiries)

  const tableHeader = [
    "Inquiry ID",
    "subject",
    "to",
    "date",
    "status",
    "actions",
  ];

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="relative h-[250px] w-full object-cover">
        <video className="h-full w-full object-cover" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{
            content: "''",
          }}
        />
      </div>
      <div className="p-4 lg:p-10 border flex flex-col overflow-hidden">
        <div className="w-full flex flex-col">
          <div className="flex w-full justify-between">
            <div className="md:mr-[20px] rounded-lg">
              <h2 className="text-[2rem] font-bold text-green-900">
                INQUIRIES
              </h2>
            </div>

            <div className="flex h-auto justify-end">
              {/* COMPOSE BUTTON */}
              <button
                type="button"
                data-hs-overlay="#hs-modal-compose"
                className={`hs-tooltip-toggle flex justify-center items-center rounded-lg text-white font-medium text-sm text-center w-[100px] h-[50px]`}
                style={{
                  background: `${
                    info && info.theme && info.theme.primary !== ""
                      ? info.theme.primary
                      : "#295141"
                  }`,
                }}
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

          <div className="mt-10 w-full flex sm:flex-col sm:gap-5 md:flex-row justify-between items-center">
            {/* Events Application Type Sort */}
            <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
              <button
                id="hs-dropdown"
                type="button"
                className={` h-[40px] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  `}
                style={{
                  background: `${
                    info && info.theme && info.theme.primary !== ""
                      ? info.theme.primary
                      : "#295141"
                  }`,
                }}
              >
                TO {SortByName !== "all" ? SortByName.toUpperCase() : ""}
                <svg
                  // className={`hs-dropdown-open:rotate-${sortOrder === "asc" ? "180" : "0"
                  //   } w-2.5 h-2.5 text-white`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <ul
                className="bg-[#f8f8f8] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-xl rounded-xl p-2 "
                aria-labelledby="hs-dropdown"
              >
                <a
                  onClick={handleResetFilter}
                  className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-2 text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 hover:rounded-[12px] focus:ring-2 focus:ring-blue-500"
                  href="#"
                >
                  RESET FILTERS
                </a>
                <hr className="border-[#4e4e4e] my-1" />
                <div className="flex flex-col scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll h-44">
                  {sortBy.map((event_name, index) => (
                    <a
                      key={index}
                      onClick={() => handleRequestFilter(event_name)}
                      className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                      href="#"
                    >
                      {event_name}
                    </a>
                  ))}
                </div>
              </ul>
            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-2">
              <p className={searchInput !== "" ? "text-gray-400" : "hidden"}>
                Searching {searchInput}, return {searchResult} result/s
              </p>
              <input
                className="rounded-lg sm:w-[250px] md:w-[350px] placeholder:text-[14px] placeholder:text-gray-300"
                type="text"
                placeholder="Search by ID"
                onChange={handleOnSearch}
              />
              <button
                className="rounded-xl w-[40px] h-[40px] justify-center items-center text-white"
                style={{
                  background: `${
                    info && info.theme && info.theme.primary !== ""
                      ? info.theme.primary
                      : "#295141"
                  }`,
                }}
              >
                <FaSearch className="w-full" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-scroll sm:h-[380px] lg:h-[680px] border border-b-0 mt-5 rounded-t-xl bg-white">
            <table className="relative table-auto w-full divide-y divide-gray-200 ">
              {/* Table Headers */}
              <thead
                className={`bg-[${
                  info && info.theme && info.theme.primary !== ""
                    ? info.theme.primary
                    : "#295141"
                }] border`}
              >
                <tr>
                  {tableHeader.map((item, i) => (
                    <th
                      scope="col"
                      key={i}
                      className="px-6 py-3 text-center text-xs font-bold text-white uppercase"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Table Body */}
                {inquiries.length === 0 ? (
                  <tr className="sm:h-[380px] lg:h-[630px]">
                    <td
                      className="text-center m-auto"
                      colSpan={tableHeader.length}
                    >
                      <img className="w-[150px] m-auto" src={no_data} alt="" />
                      No Records Shown
                    </td>
                  </tr>
                ) : (
                  <InquiriesList
                    inquiries={inquiries}
                    setInquiry={setInquiry}
                    setUpdate={setUpdate}
                  />
                )}
              </tbody>
            </table>
          </div>

          <div
            className={
              searchInput === ""
                ? `md:py-4 md:px-4 bg-[${
                    info && info.theme && info.theme.primary !== ""
                      ? info.theme.primary
                      : "#295141"
                  }] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3 w-full`
                : "hidden"
            }
          >
            <span className="font-medium text-white sm:text-xs text-sm">
              Showing {currentPage + 1} out of {pageCount} pages
            </span>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">>"
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<<"
              className="flex space-x-3 text-white font-bold"
              activeClassName="text-yellow-500"
              disabledLinkClassName="text-gray-300"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
      <ComposeModal />
      <ViewMessage inquiry={inquiry} setInquiry={setInquiry} setUpdate={setUpdate} />
    </div>
  );
};

export default Inquiries;
