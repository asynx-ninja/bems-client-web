import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import video from "../assets/image/video.mp4";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ViewRequestModal from "../components/requests/modals/ViewRequestModal";
import RequestList from "../components/requests/RequestList";
import no_data from "../assets/image/no-data.png"

const Requests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const user_id = searchParams.get("user_id")
  const [request, setRequest] = useState([])
  const [viewRequest, setViewRequest] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [sortBy, setSortBy] = useState([])
  const [SortByName, setSortByName] = useState("all")
  const [getAll, setGetAll] = useState([])
  const [info, setInfo] = useState({});

  useEffect(() => {
    document.title = "Service Request | Barangay E-Services Management";
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const brgyInfo = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);
        if (brgyInfo.status === 200) {
          setInfo(brgyInfo.data[0]);
        } else {
          setInfo({})
        }

        const response = await axios.get(
          `${API_LINK}/requests/specific/?user_id=${user_id}&service_name=${SortByName}&page=${currentPage}`
        );

        if (response.status === 200) {
          setRequest(response.data.result)
          setPageCount(response.data.pageCount);
          setGetAll(response.data.all)

          let uniqueServiceNames = new Set(
            response.data.all.map((item) => item.service_name));
          let arr = [...uniqueServiceNames].sort();
          setSortBy(arr);
        }

      } catch (err) {
        console.log(err)
      }
    };

    fetch();
  }, [brgy, id, SortByName, currentPage]);

  // console.log(request)

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // console.log(viewRequest);

  const handleRequestFilter = (selectedType) => {
    setSortByName(selectedType);
  };

  const handleResetFilter = () => {
    setSortByName("all");
  };

  const handleOnSearch = (e) => {
    const getSearch = getAll.filter((item) =>
      item.req_id.toUpperCase()
        .includes(e.target.value.toUpperCase()))

    setRequest(getSearch)
  }

  const checkAllHandler = () => {
    if (request.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = request.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = [
    "Request ID",
    "Request Name",
    "date requested",
    "status",
    "actions",
  ];

  return (
    <div className="flex flex-col bg-gray-100 h-auto">
      <div className="relative sm:h-[200px] lg:h-[250px] w-full object-cover">
        <video className="h-full w-full object-cover" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{
            content: "''"
          }}
        />
      </div>

      <div className="p-4 lg:p-10">
        <div className="flex flex-col">

          <div className="sm:mx-auto md:mx-0 md:mr-[20px] rounded-lg">
            <h2 className="text-[2rem] font-bold text-green-900">REQUEST</h2>
          </div>

          <div className="mt-10 w-full flex sm:flex-col sm:gap-5 md:flex-row justify-between items-center">
            {/* Service Type Sort */}
            <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
              <button
                id="hs-dropdown"
                type="button"
                className="h-[40px] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                style={{
                  background: `${info && info.theme && info.theme.primary !== "" ? info.theme.primary : '#295141'}`
                }}
              >
                {SortByName !== "all" ? SortByName.toUpperCase() : "SERVICE NAME"}
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
                  {sortBy.map((service_name, index) => (
                    <a
                      key={index}
                      onClick={() => handleRequestFilter(service_name)}
                      className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                      href="#"
                    >
                      {service_name}
                    </a>
                  ))}
                </div>
              </ul>
            </div>

            {/* SEARCH */}
            <div className="flex gap-2">
              <input
                className="rounded-lg uppercase"
                type="text"
                placeholder="Search..."
                onChange={handleOnSearch}
              />
              <button
                className="rounded-xl w-[40px] h-[40px] justify-center items-center text-white"
                style={{
                  background: `${info && info.theme && info.theme.primary !== "" ? info.theme.primary : '#295141'}`
                }}
              >
                <FaSearch className="w-full" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto overflow-y-auto sm:w-full sm:max-h-[380px] lg:max-h-[680px] border border-b-0 mt-5 rounded-t-xl bg-white">
            <table className="w-full divide-y divide-gray-200">
              <thead className={`bg-[${info && info.theme && info.theme.primary !== "" ? info.theme.primary : "#295141"}] border`}>
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

              {/* Table Body */}
              <tbody>
                {request.length === 0 ? (
                  <tr>
                    <th className="pt-[50px]" colSpan={tableHeader.length}>
                      <img className="w-[150px] mx-auto" src={no_data} alt="" />
                      No Records Shown
                    </th>
                  </tr>
                ) : (
                  <RequestList request={request} selectedItems={selectedItems} checkboxHandler={checkAllHandler} setViewRequest={setViewRequest} />
                )}
              </tbody>
            </table>
          </div>

          <div className={`md:py-4 md:px-4 bg-[${info && info.theme && info.theme.primary !== "" ? info.theme.primary : "#295141"}] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3`}>
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
      <ViewRequestModal viewRequest={viewRequest} />
    </div>
  );
};

export default Requests;