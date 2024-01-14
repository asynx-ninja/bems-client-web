import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import myImage from "../../assets/image/rizalleader.png";
import API_LINK from "../../config/API";
import axios from "axios";
import { useEffect, useState } from "react";

const About = () => {
  const [aboutus, setAboutus] = useState([]);
  const brgy = "MUNICIPAL INFO";
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/aboutus/?brgy=${brgy}&archived=false`
      );
      if (response.status === 200) setAboutus(response.data.result);
      else setAboutus([]);
    };

    fetch();
  }, []);
  return (
    <div
      id="about"
      className=" text-gray-900 sm:pt-[70px] md:pt-40 pt-20 container mx-auto gap-14 sm:pb-[90px]"
    >
      <section className="pt-6 mb-24 sm:px-[20px] md:px-0">
        <div className="mx-auto sm:px-0 lg:px-12">
          {aboutus.map((item, index) => (
            <div
              className="flex flex-wrap md:flex-nowrap items-center mb-8" // Added margin bottom
              data-aos="fade-in"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
              key={index}
            >
              {/* Conditionally render text and image based on the index */}
              {index % 2 === 0 ? (
                <>
                  {/* Text on the left, image on the right */}
                  <div className="w-full md:w-full lg:w-1/2 md:p-6">
                    <h3 className="sm:text-4xl md:text-4xl font-medium text-black sm:text-center lg:text-left">
                      {item.title}
                    </h3>
                    <p className="mt-4 sm:text-[14px] md:text-[18px] text-black sm:text-center lg:text-left">
                      {item.details}
                    </p>
                  </div>
                  <div className="w-0 md:w-0 lg:w-1/2 p-6 hidden sm:hidden md:hidden lg:block">
                    <div className="h-64  rounded-md">
                      <img
                        className="h-64 w-full object-contain"
                        src={item.banner.link}
                        alt=""
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Image on the left, text on the right */}
                  <div className="w-0 md:w-0 lg:w-1/2 p-6 hidden sm:hidden md:hidden lg:block">
                    <div className="h-64  rounded-md">
                      <img
                        className="h-64 w-full object-contain"
                        src={item.banner.link}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-full lg:w-1/2 md:p-6">
                    <h3 className="sm:text-4xl md:text-4xl font-medium text-black sm:text-center lg:text-left">
                      {item.title}
                    </h3>
                    <p className="mt-4 sm:text-[14px] md:text-[18px] text-black sm:text-center lg:text-left">
                      {item.details}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
