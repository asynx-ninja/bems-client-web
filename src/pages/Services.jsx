import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaSearch } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import video from "../assets/image/video.mp4";
import axios from "axios";
import API_LINK from "../config/API";
import no_data from "../assets/image/no-data.png"

const Services = () => {
  const [filter, setFilter] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [filterType, setFilterType] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState("")
  const [searchResult, setSearchResult] = useState(0)
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetchServices();
  }, [brgy, currentPage]);

  const fetchServices = async () => {
    try {
      const brgyInfo = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);
      if (brgyInfo.status === 200) {
        setInfo(brgyInfo.data[0]);
      } else {
        setInfo({})
      }

      const response = await axios.get(
        `${API_LINK}/services/?brgy=${brgy}&archived=false&approved=Approved&page=${currentPage}`
      );

      const search = await axios.get(
        `${API_LINK}/services/search/?brgy=${brgy}&archived=false&approved=Approved`
      );

      setSearch(search.data.result)
      setFilter(response.data.result);
      setFilterType(response.data.result);
      setPageCount(response.data.pageCount);

    } catch (error) {
      console.log(error);
    }
  };

  // console.log(filter);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleOnSearch = (e) => {
    const inputValue = e.target.value.toUpperCase();

    setSearchInput(inputValue)

    if (inputValue !== "") {
      const getSearch = search.filter((item) =>
        item.name.toUpperCase().includes(inputValue)
      )
      setFilterType(getSearch);
      setSearchResult(getSearch.length)
    } else {
      fetchServices()
    }
  };

  return (
    <div className="flex flex-col items-center">

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

      <div className='font-bold w-[90%] mx-auto py-10 flex justify-center'>
        <h1 className='text-[38px] text-center border-b-[2px] border-custom-green-header'>OFFERED <b className='text-custom-green-header'>SERVICES</b></h1>
      </div>

      <div className="mb-5 flex gap-2">
        <input
          className="rounded-lg sm:w-[250px] md:w-[350px] placeholder:text-[14px] placeholder:text-gray-300"
          type="text"
          placeholder="Search specific Services"
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
      <p className={searchInput !== "" ? "text-gray-400" : "hidden"}>
        Searching {searchInput}, return {searchResult} result/s
      </p>

      <div className={filterType.length === 0 ? "grid grid-cols-1 justify-center items-center" : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4 w-full max-w-7xl"}>
        {filterType.map((item, i) => (
          <Link
            key={i}
            to={`/services_form/?id=${id}&brgy=${brgy}&service_id=${item.service_id}`}
          >
            <div className="group border-[1px] md:h-[350px] border-gray-300 relative rounded-lg shadow-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105">
              <div className="overflow-hidden">
                <img
                  className="w-full h-48 object-cover hover:scale-150 transition-all"
                  src={item.collections.banner.link}
                  alt={item.name}
                />
              </div>
              <div className="px-6 py-4 bg-white">
                <h3 className="text-sm lg:text-xl font-bold mb-3 text-gray-700 group-hover:text-green-700 transition duration-500">
                  {item.name}
                </h3>
                <p className="text-gray-700 group-hover:text-green-600  text-justify text-xs lg:text-sm transition duration-500 line-clamp-3">
                  {item.details}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {
          filterType.length === 0 ?
            <div className="flex flex-col my-[80px]">
              <img className="w-[150px] mx-auto" src={no_data} alt="" />
              <p className="mx-auto">No Records Shown</p>
            </div>
            : null
        }
      </div>
      <div className={searchInput === "" ? `md:py-4 md:px-4 bg-[${info && info.theme && info.theme.primary !== "" ? info.theme.primary : "#295141"}] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3 w-full` : "hidden"}>
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
  );
};

export default Services;
