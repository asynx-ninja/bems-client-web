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
import no_data from "../assets/image/no-data.png"
import ViewMessage from "../components/blotters/blotterModals/ViewMessage";
import BlotterRecords from "../components/blotters/BlotterRecords";

const Blotter = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const user_id = searchParams.get("user_id");
    const id = searchParams.get("id");
    const brgy = searchParams.get("brgy");
    const [blotter, setBlotter] = useState([]);
    const [specBlotter, setSpecBlotter] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [searchName, setSearchName] = useState("")
    const [getAll, setGetAll] = useState([])
    const [info, setInfo] = useState({});

    useEffect(() => {
        document.title = "Blotter | Barangay E-Services Management";
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

                // const response = await axios.get(
                //     `${API_LINK}/blotter/?id=${user_id}&brgy=${brgy}&to=${SortByName}&archived=false&page=${currentPage}`
                // );

                const response = await axios.get(
                    `${API_LINK}/blotter/specific/patawag/?user_id=${user_id}&page=${currentPage}`
                );

                if (response.status === 200) {
                    // setBlotter(response.data.result.sort((date1, date2) => new Date(date2.createdAt) - new Date(date1.createdAt)))
                    setBlotter(response.data.result)
                    setPageCount(response.data.pageCount);
                    setGetAll(response.data.all)
                } else {
                    setBlotter([]);
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetch();
    }, [user_id, brgy, searchName, currentPage]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleOnSearch = (e) => {
        const getSearch = getAll.filter((item) =>
            item.req_id.toUpperCase()
                .includes(e.target.value.toUpperCase()))

        setBlotter(getSearch)
    }

    const tableHeader = [
        "Blotter ID",
        "Name",
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
            <div className="p-4 lg:p-10 border flex flex-col">
                <div className="w-full flex flex-col">
                    <div className="flex w-full justify-between">
                        <div className="sm:mx-auto md:mx-0 md:mr-[20px] rounded-lg">
                            <h2 className="sm:text-[26px] sm:text-center md:text-[2rem] font-bold text-green-900">BLOTTER RECORDS</h2>
                        </div>
                    </div>

                    <div className="mt-5 sw-full flex flex-row sm:justify-center md:justify-end items-center">
                        {/* SEARCH */}
                        <div className="flex gap-2">
                            <input
                                className="rounded-lg uppercase"
                                type="text"
                                placeholder="Search..."
                                onChange={handleOnSearch}
                            />
                            <button
                                className="rounded-xl bg-custom-green-header w-[40px] h-[40px] justify-center items-center text-white"
                            >
                                <FaSearch className="w-full" />
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto sm:h-[380px] lg:h-[680px] border border-b-0 mt-5 rounded-t-xl bg-white">
                        <table className="w-full divide-y divide-gray-200 ">
                            {/* Table Headers */}
                            <thead className={`bg-[${info && info.theme && info.theme.primary !== undefined ? info.theme.primary : ""}] border`}>
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
                            <tbody className="divide-y divide-gray-200">
                                {/* Table Body */}
                                {
                                    blotter.length === 0 ?
                                        <tr>
                                            <th className="pt-[50px]" rowSpan={5} colSpan={7}>
                                                <img className="w-[150px] mx-auto" src={no_data} alt="" />
                                                No Records Shown
                                            </th>
                                        </tr>
                                        :
                                        <BlotterRecords
                                            blotters={blotter}
                                            setSpecBlotter={setSpecBlotter}
                                        />
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className={`md:py-4 md:px-4 bg-[${info && info.theme && info.theme.primary !== undefined ? info.theme.primary : ""}] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3`}>
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
            <ViewMessage specBlotter={specBlotter} setSpecBlotter={setSpecBlotter} />
        </div>
    )
}

export default Blotter