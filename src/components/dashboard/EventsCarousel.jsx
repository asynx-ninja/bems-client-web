import { React, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { useParams, useSearchParams, Link } from "react-router-dom";
import API_LINK from '../../config/API';
import axios from 'axios';


const EventsCarousel = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get("id")
    const brgy = searchParams.get("brgy")
    const [announcements, setAnnouncements] = useState([])
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${API_LINK}/announcement/all/?brgy=${brgy}`)

                setAnnouncements(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchEvents();
    }, [brgy]);

    const dateFormat = (date) => {
        const birthdate = date === undefined ? "" : date.substr(0, 10)
        return birthdate;
    }

    // console.log(allAnnouncement)

    return (
        <div
            id="animation-carousel"
            className='relative overflow-hidden sm:w-full md:w-full pt-[25px] sm:px-[25px] md:pl-[25px]'
        >
            <div className='bg-gradient-to-r from-[#295141] to-[#408D51] rounded-t-md'>
                <div className='flex bg-[url("/header-bg.png")] p-5'>
                    <h1 className='font-medium text-white'>Upcoming Events</h1>
                </div>
            </div>
            <div className='w-full border-[1px] rounded-b-md border-green-600'>
                <Carousel
                    stopOnHover={true}
                    interval={10000}
                    showIndicators={false}
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                >
                    {
                        announcements.map((item, i) => (
                            <div key={i} className='sm:w-full flex flex-col h-auto text-left p-5'>
                                <div className='pl-[10px] my-[10px]'>
                                    <h1 className='font-medium truncate'>
                                        {item.title}
                                    </h1>
                                    <p className='text-gray-500'>{dateFormat(item.date)}</p>
                                </div>
                                <div className='w-full'>
                                    <p className='pl-[10px] sm:line-clamp-6 md:line-clamp-3 w-full'>{item.details}</p>
                                </div>
                                <Link
                                    to={`/events/?id=${id}&brgy=${brgy}&obj=${btoa(JSON.stringify(item))}`}
                                    className='bg-custom-green-button w-[150px] sm:mx-auto md:mx-0 text-white font-medium px-[25px] py-[10px] my-[25px] rounded-lg hover:bg-gradient-to-r from-[#295141] to-[#408D51] transition duration-500 ease-in-out hover:text-custom-gold'
                                >
                                    Read More
                                </Link>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default EventsCarousel