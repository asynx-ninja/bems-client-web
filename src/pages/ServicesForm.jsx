import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/services/Breadcrumbs";
import Content from "../components/services/Content";
import headerImage from "../assets/image/header.png";
import { useEffect, useState, React, useRef } from "react";
import axios from "axios";
import API_LINK from "../config/API";
import defaultPFP from "../assets/sample-image/formPic.png";

import { FaCamera } from "react-icons/fa";

// FORM DETAILS
import PersonalDetails from "../components/serviceform/PersonalDetails";
import OtherDetails from "../components/serviceform/OtherDetails";

const ServicesForm = () => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const service = JSON.parse(atob(searchParams.get("obj")));
  const [detail, setDetail] = useState({});
  const [userData, setUserData] = useState({});
  const [emptyFields, setEmptyFields] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const filterDetail = (item) => {
      return item.filter((item) => item.isActive === true);
    };

    const fetchForms = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/forms/?brgy=${brgy}&service_id=${service.service_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const getUser = await axios.get(`${API_LINK}/users/specific/${id}`);
        const filter = Object.assign({}, filterDetail(response.data)[0]);

        filter.form[0] = Object.fromEntries(
          Object.entries(filter.form[0]).filter(
            ([key, value]) => value.checked === true
          )
        );

        setUserData(getUser.data[0]);
        setDetail(filter);

        const newData = filter.form[0];
        newData["user_id"] = {
          ...newData["user_id"],
          value: getUser.data[0].user_id,
        };

        setDetail((prev) => ({
          ...prev,
          form: [newData, filter.form[1]],
        }));
      } catch (error) {
        console.log(error);
      }
      var pfpSrc = document.getElementById("formPic");
      pfpSrc.src = defaultPFP;
    };
    fetchForms();
  }, []);

  const checkEmptyFields = () => {
    let arr = [];

    const indexOne = detail.form[0];
    const indexTwo = detail.form[1];

    for (const [key, value] of Object.entries(indexOne)) {
      if (
        key !== "suffix" &&
        (value.value === "" ||
          value.value === null ||
          value.value === undefined ||
          value.value === 0)
      ) {
        arr.push(value.display.toUpperCase());
      }
    }

    for (const item of indexTwo) {
      for (const element of item.form) {
        if (
          element.value === "" ||
          element.value === null ||
          element.value === undefined
        ) {
          arr.push(element.display.toUpperCase());
        }
      }
    }

    return arr;
  };

  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
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

  const getUserDetailsChecked = (key) => {
    const newData = detail.form[0];

    const objectConstraint = {
      id_pic: null,
      address: `${userData.address.street}, ${userData.address.brgy}, ${userData.address.city}`,
      birthday:
        userData.birthday === undefined ? "" : userData.birthday.substr(0, 10),
      age: calculateAge(userData.birthday),
      value: userData[key],
    };

    newData[key] = {
      ...newData[key],
      value: Object.entries(objectConstraint).find(([k]) => key === k)
        ? objectConstraint[key]
        : userData[key],
    };

    return newData;
  };

  const setUserDetailsChecked = (key) => {
    const newData = detail.form[0];

    const objectConstraint = {
      id_pic: null,
      age: 0,
      weight: 0,
    };

    newData[key] = {
      ...newData[key],
      value: Object.entries(objectConstraint).find(([k]) => key === k)
        ? objectConstraint[key]
        : key === "user_id"
        ? newData[key].value
        : "",
    };

    return newData;
  };

  const getDefaultDeets = (e) => {
    if (e.target.checked) {
      Object.entries(detail.form[0]).map(([key]) => {
        const newData = getUserDetailsChecked(key);

        setDetail((prev) => ({
          ...prev,
          form: [newData, detail.form[1]],
        }));
      });
    } else {
      Object.entries(detail.form[0]).map(([key]) => {
        const newData = setUserDetailsChecked(key);

        setDetail((prev) => ({
          ...prev,
          form: [newData, detail.form[1]],
        }));
      });
    }
  };

  const handlePersonalDetail = (e, key) => {
    e.preventDefault();

    const newData = detail.form[0];

    if (key === "id_pic") {
      var output = document.getElementById("formPic");
      output.src = URL.createObjectURL(e.target.files[0]);
      output.onload = function () {
        URL.revokeObjectURL(output.src); // free memory
      };

      newData[key] = {
        ...newData[key],
        value: e.target.files[0],
      };
    } else {
      if (key === "birthday") {
        newData.age = {
          ...newData.age,
          value: calculateAge(e.target.value),
        };
      }

      newData[key] = {
        ...newData[key],
        value: e.target.value,
      };
    }

    setDetail((prev) => ({
      ...prev,
      form: [newData, detail.form[1]],
    }));
  };

  const handleOtherDetail = (e, key, sectionInx) => {
    const newData = [...detail.form[1]];

    newData[sectionInx].form[key] = {
      ...newData[sectionInx].form[key],
      value: e.target.value,
    };

    setDetail((prev) => ({
      ...prev,
      form: [detail.form[0], newData],
    }));
  };

  const handleSubmit = (e) => {
    const arr = checkEmptyFields();

    console.log("arr", arr);
    console.log("final", detail);

    if (arr.length === 0) {
      HSOverlay.close(
        document.getElementById("hs-toggle-between-modals-second-modal")
      );
    } else {
      setEmptyFields(arr);
      setEmpty(true);
    }
  };

  // console.log("user default data: ", userData)
  // console.log("new form detail: ", detail);

  const handleLinkClick = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col sm:px-[15px] lg:px-[70px] pt-[40px] mb-[30px]">
      <img
        className=" rounded-[25px] h-[300px] object-cover"
        src={service.collections.banner.link}
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
            logo={service.collections.logo.link}
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
        <div className="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full w-[90%] md:w-[80%] lg:w-[80%] bg-white dark:bg-gray-800 rounded-lg ">
          <div className="flex flex-col bg-white dark:bg-gray-800 overflow-y-auto max-h-[90vh] rounded-lg">
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
                {empty && (
                  <div
                    className="bg-red-50 border text-center border-red-200 text-sm text-red-600 rounded-md py-4 mt-2 mb-4"
                    role="alert"
                  >
                    Please fill out the required information!
                  </div>
                )}
                <div className="flex mx-5">
                  <div className="flex flex-col w-full space-y-2">
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
                            Note: Please read through the form before completing
                            it. All question MUST be answered. Failure to
                            provide full and accurate information will
                            disqualify the application.
                          </p>
                        </div>
                      </div>
                    </div>
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
                            In accordance to this request form, I give consent
                            to the collection, processing and use of my personal
                            data in accordance with the Data Privacy Act of 2012
                            (Republic Act No. 10173). The information will serve
                            as reference, any personal information will not be
                            disclosed without your consent, and it will only be
                            accessed by necessary organization staff.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-start items-center gap-5">
                      <input
                        id="defaultDeets"
                        type="checkbox"
                        onChange={(e) => getDefaultDeets(e)}
                        className="shrink-0 mt-0.5 border-gray-500 rounded-sm h-[20px] w-[20px] text-green-500 focus:ring-green-500"
                      />
                      <label htmlFor="defaultDeets">
                        Check to insert your personal details
                      </label>
                    </div>
                  </div>
                  <div className="relative lg:w-4/12 flex m-auto justify-end items-center">
                    <div className="absolute top-[100px] right-[-90px] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <label
                        htmlFor="file_input"
                        onClick={handleAdd}
                        className="block text-transparent p-[70px] font-medium text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60 cursor-pointer"
                      >
                        <FaCamera
                          size={50}
                          style={{ color: "#ffffff" }}
                          className="cursor-none"
                        />
                      </label>
                    </div>
                    <img
                      id="formPic"
                      className={`${
                        emptyFields.includes("ID PICTURE (WHITE BACKGROUND)")
                          ? "border-red-700"
                          : "border-[#295141]"
                      } w-[200px] border-[1px] h-[200px] sm:mb-3 lg:mb-0  object-cover`}
                    />
                  </div>
                </div>
                <PersonalDetails
                  detail={detail}
                  fileInputRef={fileInputRef}
                  handlePersonalDetail={handlePersonalDetail}
                  emptyFields={emptyFields}
                />
                <OtherDetails
                  detail={detail}
                  handleOtherDetail={handleOtherDetail}
                  emptyFields={emptyFields}
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
                type="submit"
                onClick={handleSubmit}
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
