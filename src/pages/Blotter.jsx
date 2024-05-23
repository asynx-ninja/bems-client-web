import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import video from "../assets/image/video.mp4";
import no_data from "../assets/image/no-data.png";
import ViewMessage from "../components/blotters/blotterModals/ViewMessage";
import BlotterRecords from "../components/blotters/BlotterRecords";
import { io } from "socket.io-client";
import Socket_link from "../config/Socket";
const socket = io(Socket_link);

const Blotter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const user_id = searchParams.get("user_id");
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [blotter, setBlotter] = useState([]);
  const [filteredBlotter, setFilteredBlotter] = useState([]);
  const [specBlotter, setSpecBlotter] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(0);
  const [info, setInfo] = useState({});
  const [blotterupdate, setBlotterUpdate] = useState(false);

  useEffect(() => {
    document.title = "Blotter | Barangay E-Services Management";
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
      } catch (error) {
        console.log(error);
      }
    };

    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/blotter/specific/patawag/?user_id=${user_id}`
        );

        // console.log(response)

        if (response.status === 200) {
          // setBlotter(response.data.result.sort((date1, date2) => new Date(date2.createdAt) - new Date(date1.createdAt)))
          setBlotter(response.data.result);
          setFilteredBlotter(response.data.result.slice(0, 10));
          setPageCount(response.data.pageCount);
        } else {
          setBlotter([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBrgy();
    fetch();
  }, [user_id, brgy]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    const start = selected * 10;
    const end = start + 10;
    setFilteredBlotter(blotter.slice(start, end));
  };

  const handleOnSearch = (e) => {
    setSearchInput(e.target.value);
    const filteredData = blotter.filter(
      (item) =>
        item.patawag_id.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResult(filteredData.length);
    setFilteredBlotter(filteredData.slice(0, 10)); // Show first page of filtered results
    setPageCount(Math.ceil(filteredData.length / 10)); // Update page count based on filtered results
  };

  const tableHeader = [
    "Blotter ID",
    "Name",
    "Complainant",
    "Defendant",
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
            <div className="sm:mx-auto md:mx-0 md:mr-[20px] rounded-lg">
              <h2 className="sm:text-[26px] sm:text-center md:text-[2rem] font-bold text-green-900">
                PATAWAG RECORDS
              </h2>
            </div>
          </div>

          <div className="mt-5 sw-full flex flex-row sm:justify-center md:justify-end items-center">
            {/* SEARCH */}
            <div className="flex sm:flex-col-reverse md:flex-row items-center gap-2">
              <p className={searchInput !== "" ? "text-gray-400" : "hidden"}>
                Searching {searchInput}, return {searchResult} result/s
              </p>
              <div className="flex items-center gap-2">
                <input
                  className="rounded-lg"
                  type="text"
                  placeholder="Search..."
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
          </div>

          {/* Table */}
          <div className="overflow-scroll sm:h-[380px] lg:h-[680px] border border-b-0 mt-5 rounded-t-xl bg-white">
            <table className="relative table-auto w-full divide-y divide-gray-200 ">
              {/* Table Headers */}
              <thead
                className={`bg-[${
                  info && info.theme && info.theme.primary !== undefined
                    ? info.theme.primary
                    : ""
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
                {blotter.length === 0 ? (
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
                  <BlotterRecords
                    blotters={filteredBlotter}
                    setBlotter={setBlotter}
                    setSpecBlotter={setSpecBlotter}
                    setBlotterUpdate={setBlotterUpdate}
                    setFilteredBlotter={setFilteredBlotter}
                    socket={socket}
                  />
                )}
              </tbody>
            </table>
          </div>

          <div
            className={`md:py-4 md:px-4 bg-[${
              info && info.theme && info.theme.primary !== undefined
                ? info.theme.primary
                : ""
            }] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3`}
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
      <ViewMessage
        specBlotter={specBlotter}
        setSpecBlotter={setSpecBlotter}
        setBlotterUpdate={setBlotterUpdate}
        socket={socket}
      />
    </div>
  );
};

export default Blotter;
