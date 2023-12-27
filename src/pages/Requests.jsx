import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ViewRequestModal from "../components/requests/modals/ViewRequestModal";
import RequestList from "../components/requests/RequestList";

const Requests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const user_id = searchParams.get("user_id")
  const [request, setRequest] = useState([])
  const [viewRequest, setViewRequest] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);

  useEffect(() => {
    document.title = "Service Request | Barangay E-Services Management";
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/requests/specific/?user_id=${user_id}`
        );

        // const getUser = await axios.get(`${API_LINK}/users/specific/${id}`);

        setRequest(response.data)

      } catch (err) {
        console.log(err)
      }
    };

    fetch();
  }, [brgy, id]);

  console.log(request)

  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = request.slice().sort((a, b) => {
      if (sortBy === "service_id") {
        return newSortOrder === "asc"
          ? a.service_id.localeCompare(b.service_id)
          : b.service_id.localeCompare(a.service_id);
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

    setRequest(sortedData);
  };

  // console.log(viewRequest);

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
    "Request Name",
    "date requested",
    "status",
    "actions",
  ];

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
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-basic"
                type="button"
                className="hs-dropdown-toggle w-full lg:w-40 mb-5 lg:mb-0 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium text-white shadow-sm align-middle bg-custom-green-table-header"
              >
                SORT BY
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
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
                      className="block py-6 flex-grow z-1 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300"
                      placeholder="Search..."
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto sm:h-[380px] lg:h-[680px] xl:h-[700px] xxl:h-[700px] xxxl:h-[640px] border border-b-0 mt-5 rounded-t-xl">
            <table className="w-full divide-y divide-gray-200 ">
              {/* Table Headers */}
              <thead className="bg-custom-green-table-header border">
                <tr>
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
                  request.length === 0 ?
                    <tr>
                      <th className="pt-[50px]" rowSpan={5} colSpan={6}>
                        No Records Shown
                      </th>
                    </tr>
                    :
                    <RequestList request={request} selectedItems={selectedItems} checkboxHandler={checkAllHandler} setViewRequest={setViewRequest} />
                }
              </tbody>
            </table>
          </div>

          <div className="py-1 px-4 border rounded-b-lg bg-custom-green-table-header">
            <nav className="flex items-center space-x-2">
              <a
                className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span aria-hidden="true">«</span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="w-10 h-10 bg-custom-amber text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
                aria-current="page"
              >
                1
              </a>
              <a
                className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
              >
                2
              </a>
              <a
                className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
              >
                3
              </a>
              <a
                className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span className="sr-only">Next</span>
                <span aria-hidden="true">»</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <ViewRequestModal viewRequest={viewRequest} />
    </div>
  );
};

export default Requests;