import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import myImage from "../../assets/image/rizalleader.png";
import API_LINK from "../../config/API";
import axios from "axios";
import sampleImg from "../../assets/image/montalban-without-logo.png"
import { useEffect, useState } from "react";

const About = () => {
  const [aboutus, setAboutus] = useState([]);
  const brgy = "MUNISIPYO";
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
  const extractUrl = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);
    return urls ? urls[0] : null;
  };
  
  const renderDescriptionWithLink = (description, linkText = "Download Here") => {
    const url = extractUrl(description);
    if (url) {
      const parts = description.split(url);
      return (
        <>
          {parts[0]}
          <br /> {/* Ensure the link starts on a new line */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {linkText}
          </a>
          {parts[1]}
        </>
      );
    }
    return description;
  };
  
  return (
    <div
      id="about"
      className="text-gray-900 sm:pt-[70px] md:pt-40 pt-20 mx-auto gap-14 sm:pb-[90px]"
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
        {renderDescriptionWithLink(item.details)}
      </p>
    </div>
    <div className="w-0 md:w-0 lg:w-1/2 p-6 hidden sm:hidden lg:block">
      <div className="h-64  rounded-md">
        <img
          className="h-64 w-full object-contain"
          src={item.banner.link !== "" ? item.banner.link : sampleImg}
          alt=""
        />
      </div>
    </div>
  </>
) : (
  <>
    {/* Image on the left, text on the right */}
    <div className="w-0 md:w-0 lg:w-1/2 p-6 hidden sm:hidden lg:block">
      <div className="h-64  rounded-md">
        <img
          className="h-64 w-full object-contain"
          src={item.banner.link !== "" ? item.banner.link : sampleImg}
          alt=""
        />
      </div>
    </div>
    <div className="w-full md:w-full lg:w-1/2 md:p-6">
      <h3 className="sm:text-4xl md:text-4xl font-medium text-black sm:text-center lg:text-left">
        {item.title}
      </h3>
      <p className="mt-4 sm:text-[14px] md:text-[18px] text-black sm:text-center lg:text-left">
        {renderDescriptionWithLink(item.details)}
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
