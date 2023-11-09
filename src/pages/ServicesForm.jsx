import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/services/Breadcrumbs";
import Content from "../components/services/Content";
import headerImage from "../assets/image/header.png";
import { useEffect, useState, React } from "react";

const ServicesForm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const service = JSON.parse(atob(searchParams.get("obj")))

  console.log(service)

  const handleLinkClick = () => {
    // Perform any additional logic you need here

    // Navigate to the new page
    navigate(-1);
  };
  return (
    <div className="w-full flex flex-col sm:px-[15px] lg:px-[70px] pt-[40px] mb-[30px]">
      <img
        className=" rounded-[25px] h-[300px] object-cover"
        src={service.collections.banner[0].link}
        alt=""
      />

      {/* CONTENTS */}

      <div className="flex flex-col">
        <div className="flex my-[10px]">
          <Breadcrumbs serviceTitle={service.name} />
        </div>

        <div>
          <Content
            name={service.name}
            details={service.details}
            logo={service.collections.logo[0].link}
            file={service.collections.file}
          />
        </div>
      </div>

      <div className="w-[90%] mx-auto flex items-center mt-5 px-6 lg:px-0">
        <div className="flex mx-auto sm:flex-row md:flex-row w-full items-center gap-4 justify-center">
          <Link
            data-hs-overlay="#hs-full-screen-modal"
            className="flex items-center justify-center bg-green-700 sm:w-full md:w-[150px] sm:my-[5px] md:m-5 h-[50px] text-sm text-white font-medium rounded-lg hover:bg-gradient-to-r from-[#295141] to-[#408D51] transition duration-500 ease-in-out hover:text-custom-gold"
          >
            Submit a request
          </Link>
          <Link
            onClick={handleLinkClick}
            className="flex items-center justify-center bg-custom-red sm:w-full md:w-[150px] h-[50px] sm:my-[20px] text-sm md:m-5 text-white font-medium rounded-lg hover:bg-gradient-to-r from-[#B90000] to-[#FF2828] transition duration-500 ease-in-out hover:text-custom-gold"
          >
            Back
          </Link>
        </div>
      </div>
      <div
        id="hs-full-screen-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto flex items-center justify-center"
      >
        <div className="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full w-[90%] md:w-[60%] lg:w-[60%] bg-white dark:bg-gray-800 rounded-lg ">
          <div className="flex flex-col bg-white dark:bg-gray-800 overflow-y-auto max-h-[90vh]">
            <div
              style={{
                background: `url(${headerImage})`,
              }}
              className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700"
            >
              <h3 className="lg:tracking-[.2rem] tracking-widest text-md lg:text-lg font-bold uppercase text-center text-white ">
                {service.name}
              </h3>
            </div>

            <div className="p-4 overflow-y-auto ">
              <form className="space-y-4">
                <div
                  className="w-full bg-green-400 border rounded-md dark:border-gray-700"
                  role="alert"
                >
                  <div className="flex p-2">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-4 w-4 text-green-700 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-black dark:text-gray-400">
                        Note: Please read through the form before completing it.
                        All question MUST be answered. Failure to provide full
                        and accurate information will disqualify the
                        application.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Lastname"
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Firstname"
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Middle Initial"
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <select
                    required
                    className="py-3 px-4 block w-full lg:w-1/2 border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option selected>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  <input
                    disabled
                    type="number"
                    placeholder="Age"
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="date"
                    placeholder="Birthdate"
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                  <select className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                    <option selected>Select City</option>
                    <option>Montalban</option>
                  </select>
                  <select className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                    <option selected>Select Barangay</option>
                    <option>Balite</option>
                    <option>Burgos</option>
                    <option>Geronimo</option>
                    <option>Macabud</option>
                    <option>Manggahan</option>
                    <option>Mascap</option>
                    <option>Puray</option>
                    <option>Rosario</option>
                    <option>San Isidro</option>
                    <option>San Jose</option>
                    <option>San Rafael</option>
                  </select>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Contact no."
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-row-2 sm:flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Guardian full name (if you're a child)"
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Relationship to guardian"
                    className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <textarea
                  placeholder="Reason/Purpose of this request"
                  className="py-3 px-4 block w-full border-gray-300 text-black rounded-lg shadow-sm text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  rows={4}
                />
              </form>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                data-hs-overlay="#hs-full-screen-modal"
              >
                Close
              </button>
              <button
                data-hs-overlay="#hs-toggle-between-modals-second-modal"
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="hs-toggle-between-modals-second-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-visible overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-lg md:w-10/12 w-8/12 m-3 sm:mx-auto flex flex-col items-center">
          <img
            className="h-auto w-[100px] lg:w-[150px] -mb-[50px] lg:-mb-[75px] z-10"
            src="https://img.icons8.com/?size=256&id=IFyb9G1c6yAC&format=png"
          ></img>
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] pt-12">
            <div className="pb-4 px-4 overflow-y-auto mt-0 lg:mt-8 text-center">
              <h3 className="font-bold lg:text-2xl text-sm text-green-800 ">
                Success!
              </h3>
              <p className="mt-1 text-gray-800 lg:px-12 px-4 lg:text-lg text-xs">
                Please note that you can only "
                <span className="text-green-500 font-bold">Edit</span>" or "
                <span className="text-red-500 font-bold">Delete</span>" your
                request in “
                <span className="text-yellow-500 font-bold">Pending</span>"
                stage.
              </p>
              <div className="flex justify-center pt-5">
                <button
                  type="button"
                  className="hs-dropdown-toggle bg-green-600 inline-flex justify-center items-center h-8 w-20 p-2 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                  data-hs-overlay="#hs-toggle-between-modals-second-modal"
                  data-hs-overlay-close=""
                >
                  <span className="text-white font-bold text-center">OK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesForm;
