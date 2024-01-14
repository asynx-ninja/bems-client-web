import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import logo from "../../assets/header/montalban-logo.png"
import API_LINK from "../../config/API"
import axios from "axios";

const Home = () => {

  return (
    <>
      <div className="h-auto rounded-t-[25px]">
        <div className="relative bg-gradient-to-r from-[#295141] to-[#408D51] mx-auto justify-center items-center rounded-t-[25px]">
          <div className="bg-[url('/header-bg.png')] sm:h-[180px] lg:h-auto rounded-t-[25px]">
            <img
              src={logo}
              alt=""
              className="sm:w-[120px] md:w-[160px] mx-auto absolute left-0 right-0 sm:-top-[65px] md:-top-[5.5rem]"
            />
            <div className="sm:h-[220px] md:h-[250px] lg:h-[220px] flex flex-col justify-center items-center">
              <h1 className="text-[22px] md:text-4xl font-bold uppercase text-white text-center pt-0 lg:pt-[40px]">
                Municipality of Montalban
              </h1>
              <h6 className="text-md md:text-2xl text-center mt-2 font-medium text-white">
                City of Rodriguez Rizal
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
