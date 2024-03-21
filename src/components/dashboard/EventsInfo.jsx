import { React, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams, useSearchParams, Link } from "react-router-dom";
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

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const brgyInfo = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);
                setInfo(brgyInfo.data[0]);

                const response = await axios.get(
                    `${API_LINK}/announcement/all/?brgy=${brgy}&page=${currentPage}`
                );

                setAnnouncements(response.data.result);
                setPageCount(response.data.pageCount);

            } catch (err) {
                console.log(err);
            }
        };
        fetchEvents();
    }, [brgy, currentPage]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const dateFormat = (date) => {
        if (!date) return "";

        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    };

    // console.log(announcements)

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

            <div className='w-[90%] mt-[20px] mx-auto'>

                <Breadcrumbs />

                <div className='font-bold px-[20px] mx-auto mt-[30px] flex justify-between'>
                    <div>
                        <h1 className='text-[38px] text-custom-green-header'>EVENTS LIST</h1>
                    </div>
                </div>

                <div className="sm:mt-[20px] lg:mt-[50px]">
                    {announcements.map((item, i) => (
                        <div
                            key={i}
                            className="sm:w-full flex sm:flex-col lg:flex-row h-auto text-left sm:p-5 gap-5 border-b-[2px] border-b-gray-500 shadow-lg rounded-lg mb-[20px] hover:border-b-[5px] hover:border-b-custom-green-header hover:scale-105 transition-all bg-white"
                        >
                            <div>
                                <img className="sm:w-full sm:h-[150px] md:w-[300px] h-[300px] rounded-md object-cover" src={item.collections.banner.link === undefined ? banner : item.collections.banner.link} alt="" />
                            </div>
                            <div className="sm:w-full lg:w-[70%] flex flex-col gap-3">
                                <div className="my-[10px]">
                                    <h1 className="font-medium truncate">{item.title}</h1>
                                    <p className="text-gray-500">{dateFormat(item.createdAt)}</p>
                                </div>
                                <div className="w-full">
                                    <p className="sm:line-clamp-6 md:line-clamp-3 w-full">
                                        {item.details}
                                    </p>
                                </div>
                                <Link
                                    to={`/events/?id=${id}&brgy=${brgy}&event_id=${item.event_id}&page=${currentPage}`}
                                    className={`bg-[${info && info.theme && info.theme.primary !== "" ? info.theme.primary : "#295141"}] w-[150px] sm:mx-auto md:mx-0 text-white font-medium px-[25px] py-[10px] my-[25px] rounded-lg hover:bg-gradient-to-r from-[${info && info.theme && info.theme.gradient && info.theme.gradient.start !== "" ? info.theme.gradient.start : "#295141"}] to-[${info && info.theme && info.theme.gradient && info.theme.gradient.end !== "" ? info.theme.gradient.end : "#408D51"}] transition duration-500 ease-in-out hover:text-custom-gold`}
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
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

            <div className="md:py-4 md:px-4 mt-[30px] bg-custom-green-header flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
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