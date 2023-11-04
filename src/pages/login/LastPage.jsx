import React, { useState, useEffect } from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import API_LINK from "../../config/API";
const LastPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [repasswordShown, setRePasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const RetogglePassword = () => {
    setRePasswordShown(!repasswordShown);
  };
  const [passwordError, setPasswordError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [passwordStrengthError, setPasswordStrengthError] = useState(false);
  const [passwordMatchSuccess, setPasswordMatchSuccess] = useState(false);
  const [passwordStrengthSuccess, setPasswordStrengthSuccess] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [duplicateError, setDuplicateError] = useState(false);
  const [successReg, setsuccessReg] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    age: 18,
    type: "Resident",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    // Check if the password meets the requirements when the user types in the password field
    if (event.target.name === "password") {
      const password = event.target.value;
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
  };
  useEffect(() => {
    const stepOneData = JSON.parse(localStorage.getItem("Step1"));
    const stepTwoData = JSON.parse(localStorage.getItem("Step2"));

    setFormData({
      ...stepOneData,
      ...stepTwoData,
      email: "",
      username: "",
      password: "",
      age: 18,
      type: "Resident",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setEmpty(true);
      setDuplicateError(false);
      setShowError(false);
      return;
      // Proceed with form submission...
    } else {
      setEmpty(false);
    }

    if (!termsAccepted || !policyAccepted) {
      setShowError(true);
      setDuplicateError(false);
      setEmpty(false);
      return;
    } else {
      setShowError(false);
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      setPasswordMatchSuccess(false);
      return;
    } else {
      setPasswordError(false);
      setPasswordMatchSuccess(true);
    }
    // Check if username and email already exist

    console.log(formData);
    const obj = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      suffix: formData.suffix,
      religion: formData.religion,
      email: formData.email,
      birthday: formData.birthday,
      age: formData.age,
      contact: formData.contact,
      sex: formData.sex,
      address: {
        street: formData.street,
        brgy: formData.brgy,
        city: formData.city,
      },
      occupation: formData.occupation,
      civil_status: formData.civil_status,
      type: formData.type,
      isVoter: formData.isVoter,
      isHead: formData.isHead,
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await axios.get(`${API_LINK}/users/${brgy}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const users = response.data; // Assign the response data to users

      const usernameExists = users.some(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      );
      const emailExists = users.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (usernameExists || emailExists) {
        setDuplicateError(true);
        setEmpty(false);
        setShowError(false);
      } else {
        setDuplicateError(false);
        // Proceed with registration...
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setDuplicateError(error.response.data.error);
        setEmpty(false);
        setShowError(false);
      } else {
        setDuplicateError("An unknown error occurred.");
      }
    }

    // Continue with the form submission if the passwords match
    try {
      const response = await axios.post(`${API_LINK}/users/`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEmpty(false);
      setShowError(false);
      setDuplicateError(false);
      setsuccessReg(true);
      
      const email = btoa(obj._id);
      const barangay = btoa(obj.address.brgy);
      
      
      setTimeout(function () {
        navigate(`/loading/${email}/${barangay}`);
      }, 3000);
      console.log(response);
      // Redirect to the second signup page
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row-reverse ">
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

        <form className="sm:w-[80%] md:w-9/12 lg:w-9/12">
          {successReg && (
            <div
              className="bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4 mt-2 mb-4"
              role="alert"
            >
              <span className="font-bold">Success:</span> Registered
              Successfully
            </div>
          )}
          {empty && (
            <div
              className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
              role="alert"
            >
              <span className="font-bold">Warning:</span> Please fill-out all
              fields!
            </div>
          )}
          {showError && (
            <div
              className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
              role="alert"
            >
              <span className="font-bold">Warning:</span> Please read both the
              Terms of Use and Data Privacy Policy!
            </div>
          )}

          {duplicateError && (
            <div
              className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
              role="alert"
            >
              <span className="font-bold">Warning:</span> Username or email
              already exists.
            </div>
          )}

          <h1 className="py-3 mb-3 font-bold">Step 3: Credentials</h1>
          <div className="relative z-0 w-full mb-3 group">
            <input
              required
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex sm:flex-col md:flex-row md:gap-4">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter password"
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
              <input
                type={repasswordShown ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Re-enter password"
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
          {/* //password error messages */}
          {formData.password && (
            <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <div
                className={`flex flex-col justify-center overflow-hidden ${
                  passwordStrength < 25
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
          {passwordMatchSuccess && (
            <div
              className="bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4 mt-2"
              role="alert"
            >
              <span className="font-bold">Sucess:</span> Password match
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
          {passwordError && (
            <div
              className="bg-orange-50 border border-orange-200 text-sm text-orange-600 rounded-md p-4 mt-2"
              role="alert"
            >
              <span className="font-bold">Warning:</span> Passwords do not
              match!
            </div>
          )}
          <hr className="w[10px]"></hr>

          <div className="relative z-0 px-2 w-full mt-3 mb-3 group">
            <div className="flex gap-x-6">
              <div className="flex">
                <input
                  type="checkbox"
                  name="terms"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
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
                  name="policy"
                  checked={policyAccepted}
                  onChange={() => setPolicyAccepted(!policyAccepted)}
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

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full mt-5 text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </button>
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
export default LastPage;
