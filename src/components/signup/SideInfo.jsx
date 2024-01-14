import React from 'react'
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";

const SideInfo = () => {


    return (
        <div
            className="sm:hidden lg:flex flex-col justify-center items-center w-6/12 hidden"
            style={{
                background:
                    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.template.net/99413/nature-forest-background-3b296.jpg')",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
            }}
        >
            <div className="relative w-full px-16">
                <div className="relative h-auto overflow-hidden md:h-full">
                    <Carousel
                        showThumbs={false}
                        autoPlay
                        infinite
                        interval={3000}
                        showStatus={false}
                        showArrows={false}
                        showIndicators={true} // Add this to hide the indicators
                        width="100%" // Set the width to 100%
                        dynamicHeight
                    >
                        {/* Add more items here */}

                        <div className="relative h-full">
                            <img
                                src="https://www.vigattintourism.com/assets/tourist_spots_photos/optimize/1352778031ovsjTSQS.jpg"
                                alt="Your alt text"
                                className="block w-full h-auto object-cover rounded-lg md:h-120 md:object-cover"
                            />
                        </div>

                        <div className="relative h-full">
                            <img
                                src="https://i0.wp.com/www.nognoginthecity.com/wp-content/uploads/2015/03/wawa-dam-rodriguez-rizal-2.jpg"
                                alt="Your alt text"
                                className="block w-full h-auto object-cover rounded-lg md:h-120 md:object-cover"
                            />
                        </div>
                    </Carousel>
                    <div className="flex flex-col justify-center items-start pt-2 px-2 mt-6 text-white">
                        <h2 className="text-3xl font-bold mb-2">
                            Welcome to Rodriguez Rizal
                        </h2>
                        <p className="mb-4">
                            Immerse yourself in the rich culture and stunning landscapes of
                            our city.
                        </p>
                        <Link
                            to="/#"
                            className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold"
                        >
                            Discover More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideInfo