import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const EventsCarousel = () => {

    const events = [
        {
            title: "Libreng Tule!",
            date: "10/16/2023",
            message: "Tama ang iyong narinig! Libre! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a Lorem Ipsum has been the industry's "
        },
        {
            title: "Kasalanan ng Bayan!",
            date: "11/01/2023",
            message: "Si crush na ba ang the one? Pakasal na kayo! Lorem Ipsum is simply Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when a dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        },
        {
            title: "Kapanganakan ni Kenneth Bautista",
            date: "12/25/2023",
            message: "May tatlong kumag nag-si dalaw! LoremLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        },
        {
            title: "Kumain ng kennet ang tae",
            date: "01/02/2024",
            message: "May tatlong kumag nag-si dalaw! LoremLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        },
    ]

    return (
        <div
            id="animation-carousel"
            className='relative overflow-hidden sm:w-full md:w-full pt-[25px] px-[25px]'
        >
            <h1 className='font-medium'>Events Details</h1>
            <div className='w-full border-b-[1px] border-b-gray-600'></div>
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
                    events.map((item, i) => (
                        <div key={i} className='sm:w-full flex flex-col h-auto text-left'>
                            <div className='pl-[10px] my-[10px]'>
                                <h1 className='font-medium truncate'>
                                    {item.title}
                                </h1>
                                <p className='text-gray-500'>{item.date}</p>
                            </div>
                            <div className='w-full'>
                                <p className='pl-[10px] sm:line-clamp-6 md:line-clamp-3 w-full'>{item.message}</p>
                            </div>
                            <Link
                                to="/article"
                                className='bg-custom-green-button w-[150px] sm:mx-auto md:mx-0 text-white font-medium px-[25px] py-[10px] my-[25px] rounded-lg hover:bg-gradient-to-r from-[#295141] to-[#408D51] transition duration-500 ease-in-out hover:text-custom-gold'
                            >
                                Read More
                            </Link>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default EventsCarousel