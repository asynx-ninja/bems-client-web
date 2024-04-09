import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import API_LINK from "../../config/API";
import axios from "axios";
import { useEffect, useState } from "react";

const Footer = () => {
  
  const [aboutus, setAboutus] = useState([]);
  const brgy = "MUNISIPYO";
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/aboutus/?brgy=${brgy}&archived=false`
      );
      // console.log(response.data.result[0])
      if (response.status === 200) setAboutus(response.data.result[0]);
      else setAboutus(response.data.result[0]);
    };

    fetch();
  }, []);

  // console.log(aboutus)

  return (
    <div data-aos="" className="container-fluid w-full">
      <footer className="bg-[#295141] text-white py-8">
        <div className=" mx-auto px-4">
          <div className="flex flex-wrap text-center">
            <div className="w-full md:w-1/3">
              <h4 className="uppercase font-bold mt-5 sm:text-[14px] md:text-[18px]">About us</h4>
              <p className="sm:text-[12px] md:text-[16px]">
                {aboutus && aboutus.details !== undefined ? aboutus.details : ""}
              </p>
            </div>
            <div className="w-full md:w-1/3 mt-5">
              <h4 className="uppercase  font-bold sm:text-[14px] md:text-[18px]">Contact us</h4>
              <p className="sm:text-[12px] md:text-[16px]">1234 Street Name, Montalban Rizal</p>
              <p className="sm:text-[12px] md:text-[16px]">Email: montalbanrizal@domain.com</p>
              <p className="sm:text-[12px] md:text-[16px]">Phone: (123) 111-1111</p>
            </div>
            <div className="w-full md:w-1/3 mt-5">
              <h4 className="uppercase font-bold sm:text-[14px] md:text-[18px]">Follow us</h4>
              <p className="sm:text-[12px] md:text-[16px]">Stay updated with our latest news and events.</p>
              <div className="mt-4">
                <Link className="mr-4 sm:text-[12px] md:text-[16px]" to="https://www.facebook.com/BangonBagongMontalban"> <FontAwesomeIcon icon={faFacebook} /> Facebook</Link>
                <Link className="mr-4 sm:text-[12px] md:text-[16px]" to="/#"><FontAwesomeIcon icon={faTwitter} /> Twitter</Link>
                <Link to="/#" className="mr-4 sm:text-[12px] md:text-[16px]"><FontAwesomeIcon icon={faInstagram} /> Instagram</Link>
              </div>
            </div>
          </div>
          <hr className="border-gray-400 border-opacity-50 my-8" />
          <p className="mb-4 text-center sm:text-[12px] md:text-[16px]">&copy; 2023 City of Montalban Rizal</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
