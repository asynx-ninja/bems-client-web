import { React, useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useParams, useSearchParams, Link } from "react-router-dom";
// import API_LINK from '../config/API';
// import axios from 'axios';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

// COMPONENTS
import NewsCarousel from '../components/dashboard/NewsCarousel'
import EventsCarousel from '../components/dashboard/EventsCarousel'

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id")
  const brgy = searchParams.get("brgy")
  // const [events, setEvents] = useState([])
  // const [allAnnouncement, setAllAnnouncement] = useState([])

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const archived = false
  //       const res = await axios.get(`${API_LINK}/announcement/?brgy=${brgy}&archived=${archived}`)
  //       setEvents(res.data)

  //       const res1 = await axios.get(`${API_LINK}/announcement/all/?archived=${archived}`)
  //       setAllAnnouncement(res1.data.filter((announcement) => announcement.brgy !== brgy))
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchEvents();
  // }, [brgy]);

  // const dateFormat = (date) => {
  //   const birthdate = date === undefined ? "" : date.substr(0, 10)
  //   console.log(birthdate)
  //   return birthdate;
  // }

  // console.log(events)

  return (
    <div className='flex flex-col'>

      <div className='w-full h-full text-center'>
        {/* CAROUSEL */}
        <NewsCarousel />
      </div>

      <div className='flex sm:flex-col md:flex-row w-[100%] mx-auto mb-[50px]'>

        {/* NEWS */}

        <EventsCarousel />

        {/* CALENDAR */}

        <div className='sm:w-full md:w-[50%] p-[25px] flex flex-col justify-center items-center'>
          {/* <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={
              (
                events.map((items, i) => (
                  { title: events[i].title, date: dateFormat(events[i].date) }
                )),
                allAnnouncement.map((items, i) => (
                  { title: events[i].title, date: dateFormat(events[i].date) }
                )))
            }
          /> */}
          <div className='flex gap-5 justify-center items-center pt-10 pb-5'>
            <div className='flex flex-col justify-center items-center'>
              <button className='w-[50px] flex justify-center items-center h-[50px] bg-custom-green-header rounded-md rotate-0 transition-all ease-in-out hover:rotate-45 hover:bg-gradient-to-r from-[#295141] to-[#408D51]'>
                <FaFacebook size={"32px"} color='white' />
              </button>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <button className='w-[50px] flex justify-center items-center h-[50px] bg-custom-green-header rounded-md rotate-0 transition-all ease-in-out hover:rotate-45 hover:bg-gradient-to-r from-[#295141] to-[#408D51]'>
                <FaInstagram size={"32px"} color='white' />
              </button>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <button className='w-[50px] flex justify-center items-center h-[50px] bg-custom-green-header rounded-md rotate-0 transition-all ease-in-out hover:rotate-45 hover:bg-gradient-to-r from-[#295141] to-[#408D51]'>
                <FaTwitter size={"32px"} color='white' />
              </button>
            </div>
          </div>
          <div className='text-white w-full py-2 text-center rounded-md bg-custom-green-header'>
            <h1>Follow Our Socials</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard