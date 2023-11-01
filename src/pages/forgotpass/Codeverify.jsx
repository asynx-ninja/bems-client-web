import React, { useState, useRef } from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

const Codeverfiy = () => {
  const [code, setCode] = useState("");
  const inputRefs = useRef([]);
  const setInputRef = (index, element) => {
    inputRefs.current[index] = element;
  };
  // This handleOnChange will get the code inputted by the user
  const handleOnChange = (event, index) => {
    // Only allow one digit
    if (event.target.value.length > 1) {
      return;
    }

    // Set the code
    setCode((prevState) => {
      const newState =
        prevState.substring(0, index) +
        event.target.value +
        prevState.substring(index + 1);
      return newState;
    });

    // Move the focus to the next input element if there is one
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
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
              <Link to="/#" className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold">
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:w-full lg:w-6/12 h-screen flex flex-col items-center justify-center bg-white">
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
        <h1 className="font-bold text-2xl py-4">Security PIN</h1>
        <div
          className="sm:w-[80%] md:w-8/12 lg:w-8/12 bg-red-400 border rounded-md   dark:border-red-700"
          role="alert"
        >
          <div className="flex p-2">
            <div className="flex-shrink-0">
              <svg
                className="h-4 w-4 text-red-700  mt-0.5"
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
              <p className="text-xs text-black dark:text-gray-400 ">
                Note: Please check the verifcation code that sent through your email and input it to the input field below.
              </p>
            </div>
          </div>
        </div>
        <form action="" className="mt-5 sm:w-[80%] md:w-8/12 lg:w-9/12">
          <div className="grid grid-cols-4 md:gap-3 gap-2 lg:mx-5">
            {[...Array(4)].map((_, index) => (
              <div className="relative z-0 w-full mb-6 group" key={index}>
                <input
                  type="number"
                  maxLength="1"
                  ref={(el) => setInputRef(index, el)}
                  value={code.charAt(index)}
                  onChange={(event) => handleOnChange(event, index)}
                  className="no-arrow text-lg md:text-2xl lg:text-2xl text-center font-bold h-[90px] rounded-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-2 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            ))}
          </div>
          <Link to="/change_pass">
            <button
              type="button"
              className="w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Submit
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Codeverfiy;
