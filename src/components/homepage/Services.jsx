import React from "react";
import reliable from "../../assets/services/reliable.png";
import userFriendly from "../../assets/services/user-friendly.png";
import secure from "../../assets/services/secure.png";
import transparency from "../../assets/services/transparency.png";
import fastTransaction from "../../assets/services/fast-transaction.png";
import backup from "../../assets/services/backup.png";
import { useState, useEffect } from "react";
import API_LINK from "../../config/API";
import axios from "axios";

const Services = () => {
  const brgy = "MUNICIPAL INFO";
  const [servicesinfo, setServicesInfo] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/services_info/?brgy=${brgy}&archived=false`
      );
      console.log ("aaa", response.data)
      if (response.status === 200) setServicesInfo(response.data);
      else setServicesInfo([]);
    };

    fetch();
  }, []);

  return (
    //

    <div
      id="services"
      data-aos="fade-in"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="sm:pt-[30px] md:pt-[60px] justify-center items-center mx-auto flex flex-col gap-4"
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
        <div className="container md:mx-auto sm:px-5 md:px-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 lg:w-[70rem] md:w-12/12 sm:w-full">
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
  );
};

export default Services;
