import React, { useState } from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const SignupPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [repasswordShown, setRePasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const RetogglePassword = () => {
    setRePasswordShown(!repasswordShown);
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

      <div className="sm:w-full lg:w-6/12 mx-auto sm:h-auto sm:py-[30px] md:h-screen flex flex-col items-center justify-center bg-white">
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

        <form action="" className="sm:w-[80%] md:w-9/12 lg:w-9/12">
          <div className=" flex sm:flex-col md:flex-row md:gap-4">
            <div className="relative z-0 w-full mb-3 group">
              {/* <label
                for="input-label"
                className="block text-sm font-medium mb-2 dark:text-black"
              >
                Firstname
              </label> */}
              <input
                required
                type="text"
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                placeholder="Enter your firstname"
              />
            </div>
            <div className="relative z-0 w-full mb-3 group">
              {/* <label
                for="input-label"
                className="block text-sm font-medium mb-2 dark:text-black"
              >
                Lastname
              </label> */}
              <input
                required
                type="text"
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                placeholder="Enter your lastname"
              />
            </div>
          </div>
          <div className=" flex sm:flex-col md:flex-row md:gap-4">
            <div className="relative z-0 w-full mb-3 group">
              {/* <label
                for="input-label"
                className="block text-sm font-medium mb-2 dark:text-black"
              >
                Birthdate
              </label> */}

              <input
                required
                type="date"
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
              />
            </div>
            <div className="relative z-0 w-full mb-3 group">
              {/* <label
                for="input-label"
                className="block text-sm font-medium mb-2 dark:text-black"
              >
                Sex
              </label> */}
              <select
                required
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
              >
                <option selected>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            {/* <label
              for="input-label"
              className="block text-sm font-medium mb-2 dark:text-black"
            >
              Email
            </label> */}
            <input
              type="email"
              id="input-label"
              className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
              placeholder="Enter your email"
              required
            />
          </div>
          <div className=" flex sm:flex-col md:flex-row md:gap-4">
            <div className="relative z-0 w-full mb-3 group">
              {/* <label
                for="input-label"
                className="block text-sm font-medium mb-2 dark:text-black"
              >
                Password
              </label> */}
              <input
                required
                type={passwordShown ? "text" : "password"}
                placeholder="Enter password"
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-0 right-0 p-2.5 mt-1 text-sm font-medium text-white"
              >
                {passwordShown ? (
                  <AiOutlineEye style={{ color: "green" }} size={20} />
                ) : (
                  <AiOutlineEyeInvisible style={{ color: "green" }} size={20} />
                )}
              </button>
            </div>
            <div className="relative z-0 w-full mb-3 group">
              {/* <label
                for="input-label"
                className="block text-sm font-medium mb-2 dark:text-black"
              >
                Re-enter Password
              </label> */}
              <input
                required
                type={repasswordShown ? "text" : "password"}
                placeholder="Re-enter password"
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
              />
              <button
                type="button"
                onClick={RetogglePassword}
                className="absolute top-0 right-0 p-2.5 mt-1 text-sm font-medium text-white"
              >
                {repasswordShown ? (
                  <AiOutlineEye style={{ color: "green" }} size={20} />
                ) : (
                  <AiOutlineEyeInvisible style={{ color: "green" }} size={20} />
                )}
              </button>
            </div>
          </div>
          <Link to="/next_signup">
            <button
              type="button"
              className="w-full mt-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Next
            </button>
          </Link>
        </form>
        <p className="text-sm text-black text-center mt-2">
          Already have an account?
          <span className="font-bold">
            <Link to="/login"> Login here.</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
