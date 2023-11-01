import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const NewsCarousel = () => {

    const image = [
        {
            url: "./../src/assets/dashboard/banner1.jpg",
        },
        {
            url: "./../src/assets/dashboard/banner2.png",
        },
        {
            url: "./../src/assets/dashboard/banner3.jpg",
        },
    ]

    return (
        <div className='w-full flex justify-center py-5'>
            <Carousel
                interval={10000}
                showIndicators={false}
                showStatus={false}
                autoPlay
                infiniteLoop
                showArrows={true}
                showThumbs={false}
            >
                {
                    image.map((item, i) => (
                        <div key={i} className='my-auto'>
                            <div className="relative">
                                <img
                                    src={item.url}
                                    alt="Your alt text"
                                    className="w-full h-[300px] object-cover md:h-96 md:object-cover md:w-full"
                                />
                            </div>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default NewsCarousel