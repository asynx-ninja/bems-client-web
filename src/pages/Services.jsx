import React, { useState, useEffect } from "react";
import NewsCarousel from "../components/dashboard/NewsCarousel";
import { Link, useSearchParams } from "react-router-dom";
import video from "../assets/image/video.mp4";
import axios from "axios";
import API_LINK from "../config/API";

const Services = () => {
  const [filter, setFilter] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [filterType, setFilterType] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/services/?brgy=${brgy}&archived=false&approved=Approved`
        );

        console.log(response.data);

        setFilter(response.data);
        setFilterType(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, [brgy]);

  console.log(filter);

  const handleOnFilter = (e) => {
    e.target.value === "all"
      ? setFilterType(filter)
      : setFilterType(
        filter.filter((service) => service.type === e.target.value)
      );
  };

  return (
    <div className="flex flex-col items-center">

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

      <div className='font-bold w-[90%] mx-auto py-10 mt-[30px] flex justify-center'>
        <h1 className='text-[38px] text-center border-b-[2px] border-custom-green-header'>OFFERED <b className='text-custom-green-header'>SERVICES</b></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4 w-full max-w-7xl">
        {filterType.map((item, i) => (
          <Link
            key={i}
            to={`/services_form/?id=${id}&brgy=${brgy}&service_id=${item.service_id}`}
          >
            <div className="group border-[1px] border-gray-300 relative rounded-lg shadow-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105">
              <img
                className="w-full h-48 object-cover"
                src={item.collections.banner.link}
                alt={item.name}
              />
              <div className="px-6 py-4 bg-white">
                <h3 className="text-sm lg:text-xl font-bold mb-3 text-gray-700 group-hover:text-green-700 transition duration-500">
                  {item.name}
                </h3>
                <p className="text-gray-700 group-hover:text-green-600  text-justify text-xs lg:text-sm transition duration-500 line-clamp-4">
                  {item.details}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
