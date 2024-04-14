import { React, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API_LINK from "../../config/API";
import axios from "axios";
import ReactPaginate from "react-paginate";
import banner from "../../assets/header/montalban-banner2.png"
import video from "../../assets/image/video.mp4";
import Breadcrumbs from "../../components/dashboard/Breadcrumbs"
import no_data from "../../assets/image/no-data.png"

const EventsInfo = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const brgy = searchParams.get("brgy");
    const [announcements, setAnnouncements] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [info, setInfo] = useState({
        banner: {
            link: "",
        },
        logo: {
            link: "",
        },
    });
    const [search, setSearch] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [searchResult, setSearchResult] = useState(0)
    const [sortByOpen, setSortByOpen] = useState("brgy")

    useEffect(() => {
        fetchEvents();
    }, [brgy, currentPage, sortByOpen]);

    const fetchEvents = async () => {
        try {
            const brgyInfo = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);
            setInfo(brgyInfo.data[0]);

            if (sortByOpen === "brgy") {
                const response = await axios.get(
                    `${API_LINK}/announcement/?brgy=${brgy}&achived=false&page=${currentPage}`
                );
                setAnnouncements(response.data.result);
                setPageCount(response.data.pageCount);
            } else {
                const response = await axios.get(
                    `${API_LINK}/announcement/all/?brgy=${brgy}&page=${currentPage}`
                );
                setAnnouncements(response.data.result);
                setPageCount(response.data.pageCount);
            }

            const search = await axios.get(
                `${API_LINK}/announcement/search/?brgy=${brgy}`
            );

            setSearch(search.data.result)

        } catch (err) {
            console.log(err);
        }
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleEventsFilter = (type) => {
        setSortByOpen(type);
    };

    const handleOnSearch = (e) => {
        const inputValue = e.target.value.toUpperCase();
        setSearchInput(inputValue)

        if (inputValue !== "") {
            const getSearch = search.filter((item) =>
                item.title.toUpperCase().includes(inputValue)
            )
            setAnnouncements(getSearch);
            setSearchResult(getSearch.length)
        } else {
            fetchEvents()
        }
    };

    return (
        <div className="bg-gray-100">
            <div>
                <div className="relative lg:h-[250px] w-full object-cover">
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
            </div>

            <div className='flex flex-col w-[90%] mt-[20px] mx-auto'>

                <Breadcrumbs />

                <div className='font-bold px-[20px] mx-auto mt-[30px] flex justify-between'>
                    <div>
                        <h1 className='text-[38px] text-custom-green-header'>EVENTS LIST</h1>
                    </div>
                </div>

                <div className="mt-5 w-full flex sm:flex-col sm:gap-5 md:flex-row justify-between items-center">
                    {/* Event Type Sort */}
                    <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                        <button
                            id="hs-dropdown"
                            type="button"
                            className="h-[40px] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                            style={{
                                background: `${info && info.theme && info.theme.primary !== "" ? info.theme.primary : '#295141'}`
                            }}
                        >
                            SORT BY {sortByOpen === "brgy" ? "BARANGAY" : sortByOpen.toUpperCase()}
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
                            <hr className="border-[#4e4e4e] my-1" />
                            <div className="flex flex-col scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb overflow-y-scroll">
                                <a
                                    onClick={() => handleEventsFilter("brgy")}
                                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                                    href="#"
                                >
                                    Barangay
                                </a>
                                <a
                                    onClick={() => handleEventsFilter("all")}
                                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                                    href="#"
                                >
                                    All
                                </a>
                            </div>
                        </ul>
                    </div>

                    <div className="mb-5 flex gap-2 items-center justify-end my-5">
                        <p className={searchInput !== "" ? "text-gray-400" : "hidden"}>
                            Searching {searchInput}, return {searchResult} result/s
                        </p>
                        <input
                            className="rounded-lg sm:w-[250px] md:w-[350px] placeholder:text-[14px] placeholder:text-gray-300"
                            type="text"
                            placeholder="Search specific Event"
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

                <div className={announcements.length === 0 ? "grid grid-cols-1 justify-center items-center" : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4 w-full max-w-7xl"}>
                    {announcements.map((item, i) => (
                        <Link
                            key={i}
                            to={`/events/?id=${id}&brgy=${brgy}&event_id=${item.event_id}&page=${currentPage}`}
                        >
                            <div className={`border-[1px] hover:border-[${info && info.theme && info.theme.secondary !== "" ? info.theme.secondary : '#295141'}] group md:h-[350px] relative rounded-lg shadow-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105`}>
                                <div className={`bg-opacity-[50%] bg-[${info && info.theme && info.theme.secondary !== "" ? info.theme.secondary : '#295141'}] overflow-hidden`}>
                                    <img
                                        className="w-full h-48 object-contain hover:scale-150 transition-all"
                                        src={item.collections.logo.link}
                                        alt={item.name}
                                    />
                                </div>
                                <div className="px-6 py-4 bg-white">
                                    <h3 className="text-sm lg:text-xl font-bold mb-3 text-gray-700 group-hover:text-green-700 transition duration-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-700 group-hover:text-green-600  text-justify text-xs lg:text-sm transition duration-500 line-clamp-3">
                                        {item.details}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {
                        announcements.length === 0 ?
                            <div className="flex flex-col my-[80px]">
                                <img className="w-[150px] mx-auto" src={no_data} alt="" />
                                <p className="mx-auto">No Records Shown</p>
                            </div>
                            : null
                    }
                </div>
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
    )
}

export default EventsInfo