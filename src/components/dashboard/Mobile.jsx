import React from 'react'
import mobile from "../../assets/image/mobile.png"
import video from "../../assets/image/video.mp4";
import { useState, useEffect } from "react";
import API_LINK from "../../config/API";
import axios from "axios";

import Breadcrumbs from "../../components/dashboard/Breadcrumbs"
import Home from "../homepage/Home"

const Mobile = () => {

    const brgy = "MUNICIPAL INFO";
    const [servicesinfo, setServicesInfo] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `${API_LINK}/services_info/?brgy=${brgy}&archived=false`
            );
            console.log("aaa", response.data)
            if (response.status === 200) setServicesInfo(response.data.result);
            else setServicesInfo([]);
        };

        fetch();
    }, []);

    return (

        <div>

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

                <section className="mt-4 md:mt-6 sm:px-[20px] md:px-0 mb-[50px]">
                    <div className=" mx-auto  sm:px-0 lg:px-12">
                        <div
                            className="flex flex-wrap md:flex-nowrap items-center mt-6"
                        >

                            <div className="w-0 md:w-0 lg:w-1/2 sm:p-0 md:p-6 order-2 md:order-1 hidden sm:hidden md:hidden lg:block">
                                <div className="">
                                    <img
                                        className="flex mx-auto h-72"
                                        src={mobile}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-full lg:w-1/2 sm:p-0 md:p-6 order-1 md:order-2">
                                <h1 className="sm:text-[24px] md:text-4xl sm:leading-6 md:leading-none font-bold text-gray-900 mb-4 sm:text-center lg:text-left">
                                    Introducing <b className='text-custom-green-header'>Bagong Montalban</b> Mobile App
                                </h1>
                                <p className="mt-4 sm:text-[14px] md:text-[18px] text-black sm:text-center lg:text-left">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="sm:pt-[30px] md:pt-[60px] md:w-[90%] justify-center items-center mx-auto flex flex-col gap-4 border-t-[1px] border-t-gray-300"
                >
                    {/* Hero Section */}
                    <section className="">
                        <div className="container mx-auto text-center">
                            <h1 className="sm:text-[24px] md:text-4xl font-bold mb-4">
                                Our Services
                            </h1>
                            <p className="sm:text-[14px] md:text-[18px]">
                                Explore our range of premium services
                            </p>
                        </div>
                    </section>

                    {/* Service Cards */}
                    <section className="mt-4 mb-10">
                        <div className="md:mx-auto sm:px-0 md:px-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 w-full">
                            {servicesinfo.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg md:w-full shadow-md overflow-hidden"
                                >
                                    <img
                                        src={service.icon.link}
                                        alt={service.name}
                                        className="lg:w-24 w-auto mx-auto h-24 md:h-32 lg:h-24 object-cover"
                                    />
                                    <div className="p-2 sm:p-3 md:p-4">
                                        <h2 className="text-sm sm:text-sm md:text-xl sm:leading-6 md:leading-none font-bold mb-2">
                                            {service.name}
                                        </h2>
                                        <p className="text-gray-600 sm:text-[14px] md:text-[18px]">
                                            {service.details}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Mobile