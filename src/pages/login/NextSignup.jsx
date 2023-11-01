import React from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const NextSignup = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse">
      <div
        className="sm:hidden lg:flex flex-col justify-center items-center w-6/12 hidden"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.template.net/99413/nature-forest-background-3b296.jpg')",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="relative w-full px-16">
          <div className="relative h-auto overflow-hidden md:h-full">
            <Carousel
              showThumbs={false}
              autoPlay
              infinite
              interval={3000}
              showStatus={false}
              showArrows={false}
              showIndicators={true} // Add this to hide the indicators
              width="100%" // Set the width to 100%
              dynamicHeight
            >
              {/* Add more items here */}

              <div className="relative h-full">
                <img
                  src="https://www.vigattintourism.com/assets/tourist_spots_photos/optimize/1352778031ovsjTSQS.jpg"
                  alt="Your alt text"
                  className="block w-full h-auto object-cover rounded-lg md:h-120 md:object-cover"
                />
              </div>

              <div className="relative h-full">
                <img
                  src="https://i0.wp.com/www.nognoginthecity.com/wp-content/uploads/2015/03/wawa-dam-rodriguez-rizal-2.jpg"
                  alt="Your alt text"
                  className="block w-full h-auto object-cover rounded-lg md:h-120 md:object-cover"
                />
              </div>
            </Carousel>
            <div className="flex flex-col justify-center items-start pt-2 px-2 mt-6 text-white">
              <h2 className="text-3xl font-bold mb-2">
                Welcome to Rodriguez Rizal
              </h2>
              <p className="mb-4">
                Immerse yourself in the rich culture and stunning landscapes of
                our city.
              </p>
              <Link
                to="/#"
                className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-6/12 mx-auto sm:h-auto sm:py-[30px] md:py-0 md:h-screen flex flex-col items-center justify-center bg-white">
        <img
          className="sm:w-[250px] md:w-1/3 lg:w-[450px]"
          src={myImage}
          alt=""
        />
        <div className="bg-green-700 flex justify-center items-center sm:w-auto md:w-6/12 mt-5 mb-5 rounded-full text-white">
          <h1 className="text-xs sm:text-sm text-center sm:px-5 sm:py-2 md:p-1">
            City of Rodriguez Rizal
          </h1>
        </div>
        <div
          className="w-10/12  md:w-9/12 lg:w-9/12 bg-blue-400 border rounded-md   dark:border-gray-700"
          role="alert"
        >
          <div className="flex p-2">
            <div className="flex-shrink-0">
              <svg
                className="h-4 w-4 text-blue-700 mt-0.5"
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
              <p className="text-xs text-black dark:text-gray-400">
                Note: Before you can totally register your account you must
                fill-out first all these important details below
              </p>
            </div>
          </div>
        </div>

        <form
          action=""
          className="sm:w-[80%] h-auto mt-5 md:w-9/12 lg:w-9/12"
        >
          <div className=" flex sm:flex-col md:flex-row md:gap-4">
            <div className="relative z-0 w-full mb-3 group">
              {/* <label
                for="input-label"
                className="block text-sm font-medium mb-2 dark:text-black"
              >
                Address
              </label> */}
              <select className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-white dark:border-gray-700">
                <option selected>Select City</option>
                <option>Montalban</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-3 group">
              <label
                for="input-label"
                className="block sr-only  text-sm font-medium mb-2 dark:text-black"
              >
                Barangay
              </label>
              <select className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-white dark:border-gray-700">
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
          </div>

          <div className="relative z-0 w-full mb-3 group">
            {/* <label
              for="input-label"
              className="block text-sm font-medium mb-2 dark:text-black"
            >
              Address Line
            </label> */}

            <input
              type="text"
              id="input-label"
              className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
              placeholder="Enter your address line"
            />
          </div>
          <hr className="w[10px]"></hr>

          <div className="flex md:flex-row sm:flex-col sm:gap-5 mb-3 mt-3 px-2 md:gap-x-20 lg:gap-x-20 justify-between">
            <div className="relative z-0 w-full group">
              <label
                for="input-label"
                className="block text-xs font-medium mb-2 dark:text-black"
              >
                Are you currently working on Rodriguez Rizal?
              </label>
              <div className="flex gap-x-6">
                <div className="flex">
                  <input
                    type="radio"
                    name="hs-radio-group"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="hs-radio-group-1"
                    defaultChecked=""
                  />
                  <label
                    htmlFor="hs-radio-group-1"
                    className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    name="hs-radio-group"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="hs-radio-group-2"
                  />
                  <label
                    htmlFor="hs-radio-group-2"
                    className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="relative z-0 w-full group ml-auto">
              <label
                for="input-label"
                className="block text-xs font-medium mb-2 dark:text-black"
              >
                Are you a registered voter on Rodriguez Rizal?
              </label>
              <div className="flex gap-x-6">
                <div className="flex">
                  <input
                    type="radio"
                    name="radio-group"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="radio-group-3"
                    defaultChecked=""
                  />
                  <label
                    htmlFor="radio-group-3"
                    className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    name="radio-group"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="radio-group-4"
                  />
                  <label
                    htmlFor="radio-group-4"
                    className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          <hr className="w[10px]"></hr>

          <div className="relative z-0 px-2 w-full mt-3 mb-3 group">
            <div className="flex gap-x-6">
              <div className="flex">
                <input
                  type="checkbox"
                  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-checkbox-group-1"
                />
                <label
                  htmlFor="hs-checkbox-group-1"
                  className="text-sm text-black ml-3 dark:text-gray-400"
                >
                  I have read and understood the{" "}
                  <span className="font-bold">Terms of Use.</span>
                </label>
              </div>
            </div>
          </div>
          <div className="relative px-2 z-0 w-full mt-3 mb-3 group">
            <div className="flex gap-x-6">
              <div className="flex">
                <input
                  type="checkbox"
                  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-checkbox-group-1"
                />
                <label
                  htmlFor="hs-checkbox-group-1"
                  className="text-sm text-black ml-3 dark:text-gray-400"
                >
                  I have read and understood the{" "}
                  <span className="font-bold">Data Privacy Policy.</span>
                </label>
              </div>
            </div>
          </div>
          <p className="text-black text-sm px-2">
            By clicking on the register button below, I hereby agree to both the
            <span className="font-bold"> Terms of Use</span> and{" "}
            <span className="font-bold">Data Privacy Policy</span>.
          </p>
          <Link
            to="/loading"
            type="button"
            className="w-full mt-5 text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </Link>
        </form>
      </div>
    </div>
  );
};

export default NextSignup;
