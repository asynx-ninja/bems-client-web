import React, { useState, useEffect } from "react";
import myImage from "../../assets/image/rizallogo.png";
import { Link, useLocation } from "react-router-dom";
import { HashLink as Links } from "react-router-hash-link";
import { FaAngleUp } from "react-icons/fa";

const NavbarHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  const hrefggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // In useEffect, we'll listen to scroll event
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  const OnNav = (e) => {
    document
      .getElementById(e.target.value)
      .scrollIntoView({ behavior: "smooth" });
  };

  const iconStyle = {
    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease-in-out", // Transition the transform property
  };
  return (
    <nav
      id="navbar" // Give the navbar an ID for easier selection
      className="bg-[#326350] container-fluid"
    >
      <div className="mx-auhref px-4 sm:px-6 lg:px-8 lg:py-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/">
              <img
                className="h-12 w-auhref"
                src={myImage}
                alt="Business Logo"
              />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex-justify-end items-baseline space-x-3 md:text-[12px] lg:text-[16px]">
              <Links
                to="/"
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-md"
              >
                Home
              </Links>
              <Links to="/#about">
                <button
                  // value={"about"}
                  // onClick={OnNav}
                  className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-md"
                >
                  About us{" "}
                </button>
              </Links>
              <Links to="/#services">
                <button
                  // value={"services"}
                  // onClick={OnNav}
                  className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-md"
                >
                  Services
                </button>
              </Links>
              <Links
                to="/tourist-spot-list"
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-md"
              >
                Tourist Spot
              </Links>
              <Link
                to="/barangay"
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-md"
              >
                List of Barangay
              </Link>
              <Link
                to="/login"
                className="
                text-white 
                uppercase 
                px-3 py-2 
                rounded-md 
                text-md 
                font-bold 
                bg-gradient-to-r 
                from-green-400 
                via-green-500 
                to-green-600 
                hover:from-green-600 
                hover:via-green-500 
                hover:to-green-400 
                transition 
                duration-500"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={hrefggleNavbar}
              type="button"
              style={iconStyle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Cross icon when the menu is open
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon when the menu is closed
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-200`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-black-300 hover:bg-gray-700 w-full text-left hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Links to="/#about">
            <button
              // value={"about"}
              // onClick={OnNav}
              className="text-black-300 hover:bg-gray-700 w-full text-left hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About us
            </button>
          </Links>
          <Links to="/#services">
            <button
              // value={"services"}
              // onClick={OnNav}
              className="text-black-300 hover:bg-gray-700 w-full text-left hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </button>
          </Links>
          <Links
            to="/tourist-spot-list"
            className="text-black-300 hover:bg-gray-700 w-full text-left hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Tourist Spot
          </Links>
          <Link
            to="/barangay"
            className="text-black-300 hover:bg-gray-700 w-full text-left hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            List of Barangay
          </Link>
          <Link
            to="/login"
            className="text-black-300 hover:bg-gray-700 w-full text-left hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>
        </div>
      </div>
      {isVisible && (
        <button
          value={"navbar"}
          onClick={OnNav}
          className="text-[26px] border-white border-[1px] text-white z-[1] fixed sm:bottom-10 md:bottom-5 sm:right-5 md:right-10 bg-custom-green-header w-[50px] h-[50px] rounded-full flex justify-center items-center"
        >
          <FaAngleUp className="pointer-events-none" />
        </button>
      )}
    </nav>
  );
};

export default NavbarHome;
