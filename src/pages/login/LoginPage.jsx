import React, { useState } from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import API_LINK from "../../config/API";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const type = "Resident";

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${API_LINK}/auth/${username}/${password}`
      );
      setErrorMessage("");

      if(response.data[0].type !== type){
        setErrorMessage("Invalid account type! Please create a Resident account.")
      }else{
        navigate(
          `/dashboard/?id=${response.data[0]._id}&brgy=${response.data[0].address.brgy}`
        );
      }
      
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else if (error.request) {
        setErrorMessage("The request was made but no response was received");
      } else {
        setErrorMessage("Error: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="contaiiner  flex flex-col-reverse md:flex-row-reverse">
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
                <h2 className="text-3xl via-fuchsia-400 font-bold mb-2">
                  Welcome to Rodriguez Rizal
                </h2>
                <p className="mb-4">
                  Immerse yourself in the rich culture and stunning landscapes
                  of our city.
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
        {/* //Home */}
        <div className="sm:w-full lg:w-6/12 mx-auto h-screen flex flex-col items-center justify-center bg-white">
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

          <form className="sm:w-[80%] md:w-8/12 lg:w-8/12">
            {errorMessage && (
              <div
                className="bg-red-50 border text-center border-red-200 text-sm text-red-600 rounded-md py-4 mt-2 mb-4"
                role="alert"
              >
                <span className="font-bold ">Warning:</span> {errorMessage}
              </div>
            )}
            <div className="relative z-0 w-full mb-3 group">
              <input
                name="username"
                type="text"
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative z-0 w-full mb-3 group">
              <input
                name="password"
                type={passwordShown ? "text" : "password"}
                placeholder="Enter your password"
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="relative z-0 w-full mb-3 group flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="mr-2 text-green-500 focus:border-green-500 focus:ring-green-500"
                />
                <label
                  htmlFor="remember-me"
                  className="sm:text-[12px] md:text-sm text-black dark:text-black-400"
                >
                  Remember Me
                </label>
              </div>
              <Link
                className="sm:text-[12px] md:text-sm text-sm text-black font-bold"
                to="/email_verify"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full mt-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Login
            </button>
          </form>
          <p className="sm:text-[12px] md:text-sm text-black text-center mt-2">
            Don't have an account yet?
            <span className="font-bold">
              <Link to="/signup"> Register here.</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
