import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

// COMPONENTS
import NewsCarousel from '../components/dashboard/NewsCarousel'
import EventsCarousel from '../components/dashboard/EventsCarousel'

const Dashboard = () => {

  return (
    <div className='flex flex-col'>

      <div className='w-full h-full text-center'>
        {/* CAROUSEL */}
        <NewsCarousel />
      </div>

      <div className='flex sm:flex-col md:flex-row gap-5 w-[100%] mx-auto mb-[50px]'>

        {/* NEWS */}

        <EventsCarousel />

        {/* CALENDAR */}

        <div className='sm:w-full p-[25px]'>
          <h1 className='font-medium'>Events Calendar</h1>
          <div className='border-b-[1px] border-b-gray-600'></div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={[
              { title: 'event 1', date: '2023-10-10' },
              { title: 'event 2', date: '2019-04-02' }
            ]}
          />
        </div>

      </div>
    </div>
  )
}

export default Dashboard