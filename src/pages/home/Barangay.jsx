import { useState } from "react";
import React from "react";
import NavbarHome from "../../components/global/NavbarHome";
import { Link } from "react-router-dom";
import video from "../../assets/image/video.mp4";
import headerImage from "../../assets/image/header.png";
const Barangay = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Change this to your desired number of items per page
  const stats = [
    {
      title: "Total Population",
      value: "443,954",
    },
    {
      title: "Total Population",
      value: "123,456",
    },
    {
      title: "Registered Voters",
      value: "789,012",
    },
    {
      title: "Total Barangays",
      value: "789,012",
    },
    {
      title: "Total Male",
      value: "789,012",
    },
    {
      title: "Total Female",
      value: "789,012",
    },
    // Add more data as needed
  ];
  const sections = [
    {
      title: "Logo",
      content: (
        <img
          src="https://montalbanrizalph.com/wp-content/uploads/2020/07/MONTALBAN-LOGO.png"
          alt=""
          className="w-[100px] md:w-[100px] items-center mx-auto"
        />
      ),
    },
    {
      title: "Story",
      content: (
        <p className="mt-2 text-sm md:text-base text-gray-800 whitespace-normal dark:text-gray-400">
          Balite, formerly Poblacion, is a barangay in the municipality of
          Rodriguez, in the province of Rizal. Its population as determined by
          the 2020 Census was 8,533. This represented 1.92% of the total
          population of Rodriguez.
        </p>
      ),
    },
    {
      title: "Mission",
      content: (
        <p className="mt-2 text-sm md:text-base text-gray-800 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          ipsum fugiat possimus laborum in aut quas ratione. Omnis, id
          distinctio!
        </p>
      ),
    },
    {
      title: "Vision",
      content: (
        <p className="mt-2 text-sm md:text-base text-gray-800 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          ipsum fugiat possimus laborum in aut quas ratione. Omnis, id
          distinctio!
        </p>
      ),
    },
  ];
  const data = [
    {
      logo: "https://montalbanrizalph.com/wp-content/uploads/2020/07/MONTALBAN-LOGO.png",
      name: "Barangay Balite",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
      mission:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
      vision:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
    },
    {
      logo: "https://montalbanrizalph.com/wp-content/uploads/2020/07/MONTALBAN-LOGO.png",
      name: "Barangay Balite",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
      mission:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
      vision:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
    },
    {
      logo: "https://montalbanrizalph.com/wp-content/uploads/2020/07/MONTALBAN-LOGO.png",
      name: "Barangay Balite",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
      mission:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
      vision:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
    },
    {
      logo: "https://montalbanrizalph.com/wp-content/uploads/2020/07/MONTALBAN-LOGO.png",
      name: "Barangay Balite",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
      mission:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
      vision:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, possimus.",
    },
    // Add more entries as needed
  ];

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // const [isModalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <>
      <NavbarHome />
      <div
      // style={{
      //   position: "sticky",
      //   top: "0",
      //   zIndex: "0",
      // }}
      >
        <div className="relative lg:h-[443px] w-full object-cover">
          <video className="h-full w-full object-cover" autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-black opacity-50"
            style={{
              content: "''",
            }}
          />
        </div>
      </div>
      <div className="flex justify-center sm:-mt-[20px] md:-mt-[60px]">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(192,192,192,1) 0%, rgba(250,250,250,1) 10%)",
            margin: "0 20px",
          }}
          className="w-full relative rounded-t-[25px] mx-auto bg-white mb-4 shadow-2xl md:w-full flex flex-col"
        >
          <div className="relative bg-gradient-to-r from-[#295141] to-[#408D51] mx-auto justify-center items-center rounded-t-[25px] w-full">
            <div className="bg-[url('/header-bg.png')] sm:h-[180px] lg:h-auto rounded-t-[25px]">
              <img
                src="https://montalbanrizalph.com/wp-content/uploads/2020/07/MONTALBAN-LOGO.png"
                alt=""
                className="sm:w-[120px] md:w-[160px] mx-auto absolute left-0 right-0 sm:-top-[70px] md:-top-[6rem]"
              />
              <div className="h-[220px] flex flex-col justify-center items-center">
                <h1 className="text-[22px] md:text-4xl font-bold uppercase text-white text-center pt-0 lg:pt-[40px]">
                  Municipality of Montalban
                </h1>
                <h6 className="text-md md:text-2xl text-center mt-2 font-medium text-white">
                  City of Rodriguez Rizal
                </h6>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-8 mt-12 md:mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="text-center flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[0.7]"
              >
                <div className="p-4 md:p-5">
                  <h3 className="text-lg sm:leading-5 md:leading-none sm:text-[16px] md:text-xl uppercase font-bold mb-4 text-green-800 dark:text-white">
                    {item.title}
                  </h3>
                  <span className="font-bold text-green-800 sm:text-[24px] md:text-5xl dark:text-gray-400">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* table */}
          <div className="mt-12 px-4 md:px-8">
            <div className="w-full h-auto bg-green-800 p-4 sm:p-2 md:p-4 flex flex-col md:flex-row items-center justify-between rounded-lg">
              <h6 className="text-white mb-2 md:mb-0 font-bold uppercase">
                List of Barangays
              </h6>
              <div className="flex items-center">
                <input
                  className="w-full sm:w-60 md:w-96 h-8 px-4 md:px-8 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="search"
                  placeholder="Search"
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="py-2 mb-16 flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden rounded-lg">
                    <table className="min-w-full rounded-b-lg divide-y divide-gray-200 dark:divide-gray-700">
                      {/* The table content */}
                      <thead>
                        <tr className="bg-gray-300 text-left">
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-black whitespace-nowrap text-xs font-bold uppercase"
                          >
                            Barangay Logo
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left whitespace-nowrap text-xs font-bold text-black uppercase"
                          >
                            Barangay Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left whitespace-nowrap text-xs font-bold text-black uppercase"
                          >
                            Barangay Description
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left whitespace-nowrap text-xs font-bold text-black uppercase"
                          >
                            Barangay Mission
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left whitespace-nowrap text-xs font-bold text-black uppercase"
                          >
                            Barangay Vission
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left whitespace-nowrap text-xs font-bold text-black uppercase"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 ">
                        {currentItems.map((items, index) => (
                          <tr key={index} className="bg-gray-200 text-left">
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                              <img
                                className="w-[100px]"
                                src={items.logo}
                                alt=""
                              />
                            </td>
                            <td className="px-6 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-200">
                              {items.name}
                            </td>
                            <td className="px-6 text-sm text-gray-800 dark:text-gray-200">
                              {items.description}
                            </td>
                            <td className="px-6 text-sm text-gray-800 dark:text-gray-200">
                              {items.mission}
                            </td>
                            <td className="px-6 text-sm text-gray-800 dark:text-gray-200">
                              {items.vision}
                            </td>
                            <td className="px-6 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              <Link
                                type="button"
                                className="text-center py-2 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                data-hs-overlay="#hs-vertically-centered-scrollable-modal"
                              >
                                Read more
                              </Link>
                            </td>
                          </tr>
                        ))}
                        <div
                          id="hs-vertically-centered-scrollable-modal"
                          className="hs-overlay hidden w-full sm:w-11/12 md:w-10/12 lg:w-10/12 fixed top-0 left-0 right-0 bottom-0 m-auto z-[60] overflow-x-hidden overflow-y-auto"
                        >
                          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:w-11/12 md:w-10/12 lg:w-8/12 m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
                            <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm  dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                              <div
                                className=" items-center lg:py-6 py-3 px-4 border-b dark:border-gray-700"
                                style={{
                                  background: `url(${headerImage})`,
                                }}
                              >
                                <h3 className="lg:tracking-[.4rem] tracking-widest text-md lg:text-lg font-bold uppercase text-center text-white dark:text-white">
                                  Barangay Balite Information
                                </h3>
                              </div>
                              <div className="overflow-y-auto">
                                <img
                                  className="w-full md:block hidden h-auto md:h-auto lg:h-[300px] object-cover"
                                  src="https://4.bp.blogspot.com/-_FYgSO4YHks/WBrEvVVhEvI/AAAAAAAAEkI/Q_298d7-bfATX10pZqN30vlsV1w39vBkACLcB/s1600/PhotoGrid_1475712844439.jpg"
                                  alt=""
                                />
                                <div className="p-4 space-y-4 bg-white rounded-b-xl shadow-2xl transform transition-all duration-500 ease-in-out">
                                  {sections.map((section, index) => (
                                    <div key={index} className="space-y-2">
                                      <div className="tracking-widest py-2 px-3 rounded-md text-white text-sm font-bold uppercase bg-gradient-to-r from-[#295141] to-[#408D51]">
                                        {section.title}
                                      </div>
                                      <div className="text-gray-700 text-sm bg-white p-3 rounded-md shadow-md">
                                        {section.content}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                <button
                                  type="button"
                                  className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                  data-hs-overlay="#hs-vertically-centered-scrollable-modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </tbody>
                    </table>
                    <div className="mt-4 flex justify-center">
                      <div className="flex rounded-md shadow-sm">
                        {pageNumbers.map((number) => (
                          <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === number
                                ? "bg-blue-500 text-white"
                                : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Barangay;
