import { React, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams, useSearchParams, Link } from "react-router-dom";
import API_LINK from "../../config/API";
import axios from "axios";
import banner from "../../assets/header/montalban-banner2.png"
import video from "../../assets/image/video.mp4";
import Breadcrumbs from "../../components/dashboard/Breadcrumbs"

const EventsInfo = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const brgy = searchParams.get("brgy");
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(
                    `${API_LINK}/announcement/all/?brgy=${brgy}`
                );

                setAnnouncements(res.data.sort((date1, date2) => new Date(date2.createdAt) - new Date(date1.createdAt)));

            } catch (err) {
                console.log(err);
            }
        };
        fetchEvents();
    }, [brgy]);

    const dateFormat = (date) => {
        if (!date) return "";

        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    };

    // console.log(announcements)

    return (
        <div className="mb-[50px]">
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
                            className="sm:w-full flex sm:flex-col lg:flex-row h-auto text-left p-5 gap-5 border-t-[1px] border-t-gray-300"
                        >
                            <div>
                                <img className="sm:w-full sm:h-full lg:w-[300px] h-[300px] rounded-md object-cover" src={item.collections.banner.link === undefined ? banner : item.collections.banner.link} alt="" />
                            </div>
                            <div className="sm:w-full md:w-[70%] flex flex-col gap-3">
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
                                    to={`/events/?id=${id}&brgy=${brgy}&event_id=${item._id}`}
                                    className="bg-custom-green-button w-[150px] sm:mx-auto md:mx-0 text-white font-medium px-[25px] py-[10px] my-[25px] rounded-lg hover:bg-gradient-to-r from-[#295141] to-[#408D51] transition duration-500 ease-in-out hover:text-custom-gold"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EventsInfo