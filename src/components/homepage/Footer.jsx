import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div data-aos="fade-in" className="container-fluid w-full">
      <footer className="bg-[#295141] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center md:text-left">
            <div className="w-full md:w-1/3">
              <h4 className="uppercase font-bold mt-5 sm:text-[14px] md:text-[18px]">About us</h4>
              <p className="sm:text-[12px] md:text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
