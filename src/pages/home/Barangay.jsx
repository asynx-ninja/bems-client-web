import { useState, useEffect } from "react";
import React from "react";
import NavbarHome from "../../components/global/NavbarHome";
import { Link } from "react-router-dom";
import video from "../../assets/image/video.mp4";
import headerImage from "../../assets/image/header.png";
import Footer from "../../components/homepage/Footer";
import logo from "../../assets/header/montalban-logo.png";
import brgyImg from "../../assets/image/brgy-list-img.jpg";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";
import Barangays from "../../components/homepage/Barangays";
import axios from "axios";
const Barangay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [information, setInformation] = useState({});
  const id = searchParams.get("id");
  // const { id } = useParams();
  console.log("ssdsds", id);
  const [barangays, setBarangays] = useState([]);
  const [selectedBarangay, setSelectedBarangay] = useState(null);

  useEffect(() => {
    document.title = "Barangay Information | Barangay E-Services Management";
    const fetchBarangays = async () => {
      try {
        const response = await axios.get(`${API_LINK}/brgyinfo/allinfo`);
        setBarangays(response.data);
      } catch (error) {
        console.error("Error fetching barangays:", error);
      }
    };

    fetchBarangays();
  }, []);
  const handleView = (barangay) => {
    setSelectedBarangay(barangay);
  };
  const closeModal = () => {
    setSelectedBarangay(null);
  };
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

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = barangays.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(barangays.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

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
                src={logo}
                alt=""
                className="sm:w-[120px] md:w-[160px] mx-auto absolute left-0 right-0 sm:-top-[70px] md:-top-[6rem]"
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

          {/* table */}
          <div className="mt-12 px-4 md:px-8">
            <div className="w-full h-auto bg-green-800 p-4 sm:p-2 md:p-4 flex flex-col md:flex-row items-center justify-between rounded-lg">
              <h6 className="text-white mb-2 md:mb-0 font-bold uppercase">
                List of Barangays
              </h6>
            </div>
            <div className="py-2 mb-16 flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden rounded-lg">
                    <table className="min-w-full rounded-b-lg divide-y divide-gray-200 dark:divide-gray-700">
                      {/* The table content */}
                      <thead>
                        <tr className="bg-gray-300 ">
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-black whitespace-nowrap text-xs font-bold uppercase"
                          >
                            Barangay Logo
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center whitespace-nowrap text-xs font-bold text-black uppercase"
                          >
                            Barangay Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center whitespace-nowrap text-xs font-bold text-black uppercase"
                          >
                            Barangay Description
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left whitespace-nowrap text-xs font-bold text-black uppercase"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 ">
                        {currentItems.map((barangay, idx) => (
                          <tr key={idx} className="bg-gray-200 text-left">
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                              <img
                                className="object-contain w-full h-28"
                                src={barangay.logo}
                                alt=""
                              />
                            </td>
                            <td className="px-6 whitespace-nowrap uppercase text-sm font-bold text-gray-800 dark:text-gray-200">
                              barangay {barangay.brgy}
                            </td>
                            <td className="h-full text-center">
                              <p className="px-6 items-center text-sm my-auto text-gray-800 line-clamp-4 text-justify dark:text-gray-200">
                                {barangay.story}
                              </p>
                            </td>

                            <td className="px-6 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              <Link
                                type="button"
                                onClick={() => handleView({ ...barangay })}
                                className="text-center py-2 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                data-hs-overlay="#hs-vertically-centered-scrollable-modal"
                              >
                                Read more
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 flex justify-center">
                      <div className="flex rounded-md shadow-sm">
                        {pageNumbers.map((number) => (
                          <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number
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
      <Footer />
      <Barangays selectedBarangay={selectedBarangay} closeModal={closeModal} />
    </>
  );
};

export default Barangay;
