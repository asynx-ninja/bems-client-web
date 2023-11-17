import React from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";

import Breadcrumbs from "../components/articles/Breadcrumbs";
import Content from "../components/articles/Content";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id")
  const brgy = searchParams.get("brgy")
  const event = JSON.parse(atob(searchParams.get("obj")))

  console.log(event)

  return (
    <div className="w-full flex flex-col sm:px-[15px] lg:px-[70px] pt-[40px] mb-[30px]">
      <img
        className=" rounded-[25px] h-[300px] object-cover"
        src={event.collections.banner.link}
        alt=""
      />

      {/* CONTENTS */}

      <div className="flex flex-col">
        <div className="flex my-[10px]">
          <Breadcrumbs title={event.title}/>
        </div>

        <div>
          <Content event={event} />
        </div>
      </div>

      <div className="w-[90%] mx-auto flex items-center">
        <div className="flex mx-auto sm:flex-col md:flex-row w-full justify-center">
          <Link
            to="/article"
            className="flex items-center justify-center bg-green-700 sm:w-full md:w-[150px] sm:my-[5px] md:m-5 h-[50px] text-sm text-white font-medium rounded-lg hover:bg-gradient-to-r from-[#295141] to-[#408D51] transition duration-500 ease-in-out hover:text-custom-gold"
          >
            Register
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center bg-custom-red sm:w-full md:w-[150px] h-[50px] sm:my-[20px] text-sm md:m-5 text-white font-medium rounded-lg hover:bg-gradient-to-r from-[#B90000] to-[#FF2828] transition duration-500 ease-in-out hover:text-custom-gold"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Articles;
