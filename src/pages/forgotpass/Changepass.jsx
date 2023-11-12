import React, { useState } from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import API_LINK from "../../config/API";
import axios from "axios";


const Changepass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const client_email = atob(location.pathname.split("/")[2])
  const [passwordStrengthError, setPasswordStrengthError] = useState(false);
  const [passwordStrengthSuccess, setPasswordStrengthSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [password, setPassword] = useState({
    enter: "",
    reenter: ""
  })
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: ""
  });
  const [credential, setCredential] = useState({
    email: "",
    password: ""
  })

  const [passwordShown, setPasswordShown] = useState(false);
  const [repasswordShown, setRePasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const RetogglePassword = () => {
    setRePasswordShown(!repasswordShown);
  };

  const handleOnChange = (e) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setCredential({
      email: client_email,
      password: password.enter
    })

    if (e.target.name === "enter") {
      const password = e.target.value;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
      const symbolRegex = /[@$!%*?&]/;

      if (!passwordRegex.test(password) || !symbolRegex.test(password)) {
        setPasswordStrengthError(true);
        setPasswordStrengthSuccess(false);
      } else {
        setPasswordStrengthError(false);
        setPasswordStrengthSuccess(true);
      }
      // Check if passwords match

      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      setPasswordStrength(strength * 25);
    }
  }

  const handleOnSubmit = async () => {
    try {

      if (password.enter !== password.reenter) {
        setResponse({
          success: false,
          error: true,
          message: "Password does not Match! Please Try Again"
        })
      } else {
        await axios.patch(`${API_LINK}/auth/pass/`, credential, {
          headers: {
            'Content-Type': 'application/json',
          }
        })

        setResponse({
          success: true,
          error: false,
          message: "Password Change Successfully!"
        })

        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    } catch (error) {
      setResponse({
        success: false,
        error: true,
        message: "Error: Please Try Again"
      })
      console.log(error)
    }
  }

  // console.log(email)
  // console.log(password.enter)
  // console.log(password.reenter)

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
        <div
          className="w-9/12 md:w-8/12 lg:w-8/12 bg-green-400 border rounded-md   dark:border-red-700"
          role="alert"
        >
          <div className="flex p-2">
            <div className="flex-shrink-0">
              <svg
                className="h-4 w-4 text-green-700  mt-0.5"
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
                Finally, you have successfully verified your account. Please now change your password
              </p>
            </div>
          </div>
        </div>

        <div>
          {
            response.success ? (
              <div className="w-[100%] bg-green-400 rounded-md mt-[10px] flex">
                <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">{response.message}</p>
              </div>
            ) : null
          }
          {
            response.error ? (
              <div className="w-[100%] bg-red-500 rounded-md mt-[10px] flex">
                <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">{response.message}</p>
              </div>
            ) : null
          }
        </div>

        <form action="" className="sm:w-[80%] mt-5 md:w-8/12 lg:w-8/12">
          <div className="relative z-0 w-full mb-3 group">
            {/* <label
                for="input-label"
                className="block text-sm font-medium mb-2 dark:text-black"
              >
                Password
              </label> */}
            <input
              required
              name="enter"
              onChange={handleOnChange}
              type={passwordShown ? "text" : "password"}
              placeholder="Enter password"
              className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
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
              name="reenter"
              onChange={handleOnChange}
              type={repasswordShown ? "text" : "password"}
              placeholder="Re-enter password"
              className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
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
          <div>
            {password.enter && (
              <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                <div
                  className={`flex flex-col justify-center overflow-hidden ${passwordStrength < 25
                      ? "bg-red-500"
                      : passwordStrength < 50
                        ? "bg-yellow-500"
                        : passwordStrength < 75
                          ? "bg-amber-500"
                          : passwordStrength < 100
                            ? "bg-blue-500"
                            : "bg-green-500"
                    }`}
                  role="progressbar"
                  style={{ width: `${passwordStrength}%` }}
                  aria-valuenow={passwordStrength}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            )}
            {passwordStrengthSuccess && (
              <div
                className="bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4 mt-2"
                role="alert"
              >
                <span className="font-bold">Sucess:</span> Password is already
                strong
              </div>
            )}
            {passwordStrengthError && passwordStrength < 100 && (
              <div
                className="bg-orange-50 border border-orange-200 text-sm text-orange-600 rounded-md p-4 mt-2"
                role="alert"
              >
                <span className="font-bold">Warning:</span> Password must contain
                at least 8 characters, one uppercase letter, one lowercase letter,
                one number, and one special character
              </div>
            )}
          </div>
          <button
            type="submit"
            onClick={handleOnSubmit}
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Changepass;
