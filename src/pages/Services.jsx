import React, { useState, useEffect } from "react";
import NewsCarousel from "../components/dashboard/NewsCarousel";
import { Link, useSearchParams } from "react-router-dom";
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
      <div className="w-full h-full text-center">
        {/* CAROUSEL */}
        {/* <NewsCarousel /> */}
      </div>
      <h1 className="text-center font-bold text-2xl sm:text-lg tracking-widest text-[#326350] mb-4 mt-8">
        PLEASE CHOOSE FROM THE FOLLOWING SERVICES
      </h1>
      <div className="w-full max-w-md mx-auto mb-4">
        <select
          onChange={handleOnFilter}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All types</option>
          <option value="Healthcare">Healthcare Services</option>
          <option value="Education">Education Services</option>
          <option value="Social Welfare">Social Welfare Services</option>
          <option value="Security and Safety">
            Security and Safety Services
          </option>
          <option value="Infrastructure">Infrastructure Services</option>
          <option value="Community Services">Community Services</option>
          <option value="Administrative">Administrative Services</option>
          <option value="Environmental">Environmental Services</option>
        </select>
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
