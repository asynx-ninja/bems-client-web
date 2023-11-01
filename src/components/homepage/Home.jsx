import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import image from "../../assets/image/rizallogo_vert.png";
import myImage from "../../assets/image/rizalleader.png";
const Home = () => {
  return (
    <>
      <div className="h-auto rounded-t-[25px]">
        <div className="relative bg-gradient-to-r from-[#295141] to-[#408D51] mx-auto justify-center items-center rounded-t-[25px]">
          <div className="bg-[url('/header-bg.png')] rounded-t-[25px]">
            <img
              src="https://montalbanrizalph.com/wp-content/uploads/2020/07/MONTALBAN-LOGO.png"
              alt=""
              className="sm:w-[120px] md:w-[160px] mx-auto absolute left-0 right-0 sm:-top-[73px] md:-top-[6rem]"
            />
            <div className="h-[220px] flex flex-col justify-center items-center">
              <h1 className="text-[26px] md:text-4xl font-bold uppercase text-white text-center pt-[40px]">
                Municipality of Montalban
              </h1>
              <h6 className="text-xl md:text-2xl text-center mt-2 font-medium text-white">
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
