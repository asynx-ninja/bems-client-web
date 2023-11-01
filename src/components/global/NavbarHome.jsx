import React, { useState, useEffect } from "react";
import myImage from "../../assets/image/rizallogo.png";
import { Link, useLocation } from "react-router-dom";

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

  // useEffect(() => {
  //   // Add event listener to handle scroll and update the navbar's position
  //   const handleScroll = () => {
  //     const navbar = document.getElementById("navbar");
  //     if (window.scrollY > 0) {
  //       navbar.style.position = "fixed";
  //       navbar.style.width = "100%"; // Set width to 100% for full-width navbar
  //       navbar.style.zIndex = "1000"; // Adjust the z-index value as needed
  //     } else {
  //       navbar.style.position = "static";
  //       navbar.style.width = "auto"; // Reset width to auto
  //       navbar.style.zIndex = "auto";
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Remove event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const { pathname, hash, key } = useLocation();

  // useEffect(() => {
  //   // if not a hash link, scroll to top
  //   if (hash === "") {
  //     window.scrollTo(0, 0);
  //   }
  //   // else scroll to id
  //   else {
  //     setTimeout(() => {
  //       const id = hash.replace("#", "");
  //       const element = document.getElementById(id);
  //       if (element) {
  //         element.scrollIntoView();
  //       }
  //     }, 0);
  //   }
  // }, [pathname, hash, key]); // do this on route change

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
      <div className="mx-auhref px-4 sm:px-6 lg:px-8">
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
            <div className="flex-justify-end items-baseline space-x-4">
              <Link
                to="/"
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-xs"
              >
                Home
              </Link>
              <button
                value={"about"}
                onClick={OnNav}
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-xs"
              >
                About us{" "}
              </button>
              <button
                value={"services"}
                onClick={OnNav}
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-xs"
              >
                Services
              </button>
              <button
                value={"tourist"}
                onClick={OnNav}
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-xs"
              >
                Tourist Spot
              </button>
              <Link
                to="/barangay"
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-xs"
              >
                List of Barangay
              </Link>
              <Link
                to="/login"
                className="text-white uppercase hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-xs"
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
        className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-800`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <button
            value={"about"}
            onClick={OnNav}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About us
          </button>
          <button
            value={"services"}
            onClick={OnNav}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </button>
          <button
            value={"tourist"}
            onClick={OnNav}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Tourist Spot
          </button>
          <Link
            to="/barangay"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            List of Barangay
          </Link>
          <Link
            to="/login"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>
        </div>
      </div>
      {
        isVisible && (
          <button
            value={"home"}
            onClick={OnNav}
            className="text-[26px] border-white border-[1px] text-white z-[100] fixed sm:bottom-10 md:bottom-5 sm:right-5 md:right-10 bg-custom-green-header w-[50px] h-[50px] rounded-full flex justify-center items-center"
          >
            <FaAngleUp className="pointer-events-none" />
          </button>
        )
      }
    </nav>
  );
};

export default NavbarHome;