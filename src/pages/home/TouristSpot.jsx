import { React, useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";

//COMPONENTS
import NavbarHome from "../../components/global/NavbarHome";
import video from "../../assets/image/video.mp4";
import Breadcrumbs from "../../components/touristspot/Breadcrumbs"

const TouristSpot = () => {
    const brgy = "MUNICIPAL INFO";
    const [touristSpot, setTouristSpot] = useState([]);

    useEffect(() => {
        const fetchTouristSpot = async () => {
            try {
                const response = await axios.get(
                    `${API_LINK}/tourist_spot/?brgy=${brgy}&archived=false`
                );

                setTouristSpot(response.data.result)
            } catch (error) {
                console.log(error)
            }

        }
        fetchTouristSpot();
    })

    return (
        <>
            <NavbarHome />

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

            <div className='flex flex-col mb-[50px] sm:px-[15px] md:px-[30px]'>

                <div className='font-bold w-[90%] mx-auto py-5 mt-[30px] flex justify-center'>
                    <div>
                        <p className="text-center">FAMOUS TOURIST SPOT IN</p>
                        <h1 className='text-[38px] text-center'><b className='text-custom-green-header'>MONTALBAN RIZAL</b></h1>
                    </div>
                </div>

                <Breadcrumbs />

                <div className="sm:mt-[20px] lg:mt-[50px]">
                    {touristSpot.map((item, i) => (
                        <div
                            key={i}
                            className="sm:w-full flex sm:flex-col lg:flex-row h-auto text-left sm:p-2 md:p-5 gap-5 border-t-[1px] border-t-gray-300"
                        >
                            <div>
                                <img className="sm:w-full sm:h-full lg:w-[300px] h-[300px] rounded-md object-cover" src={item.image[0].link === undefined ? banner : item.image[0].link} alt="" />
                            </div>
                            <div className="sm:w-full md:w-[90%] flex flex-col gap-3">
                                <div className="my-[10px]">
                                    <h1 className="font-medium truncate text-[26px]">{item.name}</h1>
                                    <p className="text-gray-500">LOCATION: {item.brgy}</p>
                                </div>
                                <div className="w-full">
                                    <p className="sm:line-clamp-6 md:line-clamp-3 w-full">
                                        {item.details}
                                    </p>
                                </div>
                                <Link
                                    to={`/tourist-spot/?tourist_id=${item._id}`}
                                    className="bg-custom-green-button w-[150px] sm:mx-auto md:mx-0 text-white font-medium px-[25px] py-[10px] my-[25px] rounded-lg hover:bg-gradient-to-r from-[#295141] to-[#408D51] transition duration-500 ease-in-out hover:text-custom-gold"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TouristSpot;
