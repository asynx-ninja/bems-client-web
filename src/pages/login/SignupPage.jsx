import React, { useState } from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

const SignupPage = () => {
  const [empty, setEmpty] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    birthday: "",
    age: 0,
    sex: "",
    religion: "",
  });

  const religions = [
    "Roman Catholic",
    "Islam",
    "Iglesia ni Cristo",
    "Philippine Independent Church (Aglipayan)",
    "Seventh-day Adventist",
    "Bible Baptist Church",
    "United Church of Christ in the Philippines",
    "Jehovah Witnesses",
    "Church of Christ",
    "Born Again",
    "Other Religous Affiliation",
    // Add more religions here...
  ];

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // if(e.target.name === "birthday"){
    //   setFormData({
    //     ...formData,
    //     age: calculateAge(e.target.value)
    //   })
    // }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      age: calculateAge(formData.birthday)
    })

    for (let key in formData) {
      if (key !== "suffix" && key !== "middleName" && !formData[key]) {
        setEmpty(true);
        return;
      }
    }
    const birthdayDate = new Date(formData.birthday);

    // Convert the Date object to a string in the format 'MM/DD/YYYY'

    // Store the form data in local storage
    localStorage.setItem(
      "Step1",
      JSON.stringify({
        ...formData,
        birthday: birthdayDate, // Use the birthday string instead of the original date
      })
    );

    // Clear the form
    setFormData({
      firstName: "",
      lastName: "",
      middleName: "",
      suffix: "",
      birthday: "",
      age: 0,
      sex: "",
    });

    setEmpty(false);

    // Navigate to the next page
    navigate("/next_signup");
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
          {empty && (
            <div
              className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
              role="alert"
            >
              <span className="font-bold">Warning:</span> Please fill-out all
              fields!
            </div>
          )}
          <h1 className="py-3 mb-3 font-bold">Step 1: Personal Information</h1>
          <div className="flex sm:flex-col md:flex-row md:gap-4">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your firstname"
              />
            </div>
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your lastname"
              />
            </div>
          </div>
          <div className="flex sm:flex-col md:flex-row md:gap-4">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your middle name"
              />
            </div>
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="suffix"
                value={formData.suffix}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your suffix (optional)"
              />
            </div>
          </div>
          <div className="flex sm:flex-col md:flex-row md:gap-4">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="relative z-0 w-full mb-3 group">
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
              >
                <option disabled={formData.sex !== ""} value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
            >
              <option disabled={formData.religion !== ""} value="">Select Religion</option>
              {religions.map((religion) => (
                <option value={religion}>{religion}</option>
              ))}
            </select>
          </div>
          <Link to="/next_signup">
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full mt-5 text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
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
