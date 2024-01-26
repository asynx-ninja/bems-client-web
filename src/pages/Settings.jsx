import React, { useEffect, useState, useRef } from "react";
import defaultPFP from "../assets/sample-image/default-pfp.png";
import {
  FaCamera,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";
import banner from "../assets/image/1.png";

// COMPONENTS 
import PersonalInfo from "../components/settings/PersonalInfo";
import AddressDetails from "../components/settings/AddressDetails";
import OtherPersonalData from "../components/settings/OthersPersonalData";
import Username from "../components/settings/Username";
import Password from "../components/settings/Password";
import Preloader from "../components/loaders/Preloader";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const fileInputRef = useRef();
  const [activeButton, setActiveButton] = useState({
    personal: true,
    username: false,
    password: false
  });
  const [editButton, setEditButton] = useState(true);
  const [pfp, setPfp] = useState();
  const [userAddress, setUserAddress] = useState({
    street: "",
    brgy: "",
    city: "",
  });
  const [userData, setUserData] = useState({});
  const [userCred, setUserCred] = useState({
    username: "",
    oldPass: "",
    newPass: "",
  });
  const [userSocials, setUserSocials] = useState({
    facebook: {
      name: "",
      link: "",
    },
    instagram: {
      name: "",
      link: "",
    },
    twitter: {
      name: "",
      link: "",
    },
  });
  const [message, setMessage] = useState({
    display: false,
    success: false,
    error: false,
    message: "",
  });
  const [passwordStrengthError, setPasswordStrengthError] = useState(false);
  const [passwordStrengthSuccess, setPasswordStrengthSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [empty, setEmpty] = useState(false);
  const [showError, setShowError] = useState({
    error: false,
    message: ""
  });
  const [error, setError] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setPfp(e.target.files[0]);

    var output = document.getElementById("pfp");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        if (res.status === 200) {
          setUserData(res.data[0]);
          setUserAddress({
            street: res.data[0].address.street,
            brgy: res.data[0].address.brgy,
            city: res.data[0].address.city,
          });
          setUserCred({
            username: res.data[0].username,
            oldPass: "",
            newPass: "",
          });
          setUserSocials({
            facebook: {
              name: res.data[0].socials.facebook.name,
              link: res.data[0].socials.facebook.link,
            },
            instagram: {
              name: res.data[0].socials.instagram.name,
              link: res.data[0].socials.instagram.link,
            },
            twitter: {
              name: res.data[0].socials.twitter.name,
              link: res.data[0].socials.twitter.link,
            },
          });
          var pfpSrc = document.getElementById("pfp");
          pfpSrc.src =
            res.data[0].profile.link !== ""
              ? res.data[0].profile.link
              : defaultPFP;
        } else {
          setError("Invalid username or password");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    document.title = "Settings | Barangay E-Services Management";
  }, []);

  const handleUserDataChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleUserChangeAdd = (field, value) => {
    setUserAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUserChangeCred = (field, value) => {
    setUserCred((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "newPass") {
      const password = value;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
      const symbolRegex = /[@$!%*?&]/;

      if (!passwordRegex.test(password) || !symbolRegex.test(password)) {
        setPasswordStrengthError(true);
        setPasswordStrengthSuccess(false);
      } else {
        setPasswordStrengthError(false);
        setPasswordStrengthSuccess(true);
      }

      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      setPasswordStrength(strength * 25);
    }
  };

  const handleUserSocials = (social, subsocial, value) => {
    setUserSocials({
      ...userSocials,
      [social]: {
        ...userSocials[social],
        [subsocial]: value,
      },
    });
  };

  const saveChanges = async (e) => {
    e.preventDefault()

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.contact ||
      !userData.username
    ) {
      setEmpty(true);
      setShowError({
        error: true,
        message: "Please fill up Required information!"
      });
      return;
      // Proceed with form submission...
    } else {
      setShowError({
        error: false,
        message: "Please fill up Required information!"
      });
      setEmpty(false);
    }

    const obj = {
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      suffix: userData.suffix,
      religion: userData.religion,
      email: userData.email,
      birthday: userData.birthday,
      age: userData.age,
      contact: userData.contact,
      sex: userData.sex,
      address: {
        street: userAddress.street,
        brgy: userAddress.brgy,
        city: userAddress.city,
      },
      occupation: userData.occupation,
      civil_status: userData.civil_status,
      type: userData.type,
      isVoter: userData.isVoter,
      isHead: userData.isHead,
      username: userData.username,
      profile: userData.profile,
      socials: {
        facebook: userSocials.facebook,
        instagram: userSocials.instagram,
        twitter: userSocials.twitter,
      },
    };

    try {
      // CHANGE USER CREDENTIALS

      if (activeButton.username === true && userCred.oldPass !== "") {
        // CHANGE USERNAME
        if (userCred.username !== userData.username) {
          changeCredentials(
            userData.username,
            userCred.username,
            userCred.oldPass,
            userCred.newPass
          );
        }
      } else if (activeButton.password === true && userCred.oldPass !== "") {
        // CHANGE PASSWORD
        if (userCred.newPass !== "") {
          changeCredentials(
            userData.username,
            userCred.username,
            userCred.oldPass,
            userCred.newPass
          );
        }
      } else if (activeButton.personal === true) {
        setSubmitClicked(true);
        try {
          var formData = new FormData();
          formData.append("users", JSON.stringify(obj));
          formData.append("file", pfp);
          const response = await axios.patch(`${API_LINK}/users/?doc_id=${id}`, formData);

          if (response.status === 200) {
            console.log("Update successful:", response);
            setUserData(response.data);
            setUserAddress({
              street: response.data.address.street,
              brgy: response.data.address.brgy,
              city: response.data.address.city,
            });
            setUserSocials({
              facebook: response.data.socials.facebook,
              instagram: response.data.socials.instagram,
              twitter: response.data.socials.twitter,
            });
            setEditButton(true);
            setTimeout(() => {
              setSubmitClicked(false);
              setUpdatingStatus("success");
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }, 1000);

          } else {
            console.error("Update failed. Status:", response.status);
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        setShowError({
          error: true,
          message: "Please fill up Required information!"
        });
      }

    } catch (error) {
      console.error("Error saving changes:", error);
      setSubmitClicked(false);
      setUpdatingStatus("error");
      setError(error.message);
    }
  };

  const changeCredentials = async (
    oldUsername,
    newUsername,
    oldPassword,
    newPassword
  ) => {
    const user = {
      username: newUsername !== oldUsername ? newUsername : oldUsername,
      password: newPassword !== "" ? newPassword : oldPassword,
    };

    try {
      const response = await axios.get(
        `${API_LINK}/auth/${oldUsername}/${oldPassword}`
      );

      if (response.status === 200) {
        setSubmitClicked(true);
        await axios.patch(`${API_LINK}/auth/${id}`, user);
        setMessage({
          display: true,
          success: true,
          error: false,
          message: "Success!",
        });
        setUserCred({
          username: "",
          oldPass: "",
          newPass: "",
        });
        setEditButton(true);
        setTimeout(() => {
          setSubmitClicked(false);
          setUpdatingStatus("success");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }, 1000);
      }
    } catch (err) {
      setMessage({
        display: true,
        success: false,
        error: true,
        message: "The password you entered is incorrect",
      });
    }
  };

  const birthdayFormat = (date) => {
    const birthdate = date === undefined ? "" : date.substr(0, 10);
    return birthdate;
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

  const handleOnActive = (e) => {
    if (e.target.name === "personal") {
      setActiveButton({
        personal: true,
        username: false,
        password: false
      });
    } else if (e.target.name === "username") {
      setActiveButton({
        personal: false,
        username: true,
        password: false
      });
    } else if (e.target.name === "password") {
      setActiveButton({
        personal: false,
        username: false,
        password: true
      });
    }
  };

  const handleOnEdit = (e) => {
    if (e.target.name === "edit") {
      setEditButton(false);
    } else {
      setEditButton(true);
    }
  };

  return (
    <div className="relative">
      <div className="">
        <div className="flex flex-col w-full">
          <div className="w-full relative">
            <img
              className="h-[250px] w-full obj object-cover bg-black opacity-[80%]"
              src={banner}
              alt=""
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-300 opacity-[50%]"></div>
          </div>
          <div className="flex sm:flex-col-reverse lg:flex-row-reverse sm:px-[5px] px-[20px] justify-center mb-[20px]">
            <div className="flex flex-col sm:w-full lg:w-9/12 mx-auto">
              {
                showError.error ?
                  <div
                    className="bg-red-50 border text-center border-red-200 text-sm text-red-600 rounded-md py-4 mt-2 mb-4"
                    role="alert"
                  >
                    <span className="font-bold ">Warning:</span> {showError.message}
                  </div>
                  : null
              }
              <div className="flex gap-[10px] my-5 pb-[10px] border-b-[2px] border-b-gray-200 px-[10px]">
                <button
                  name="personal"
                  onClick={handleOnActive}
                  className={
                    activeButton.personal
                      ? "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-custom-green-button text-white font-medium"
                      : "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-white text-black font-medium transition-all ease-in-out hover:bg-custom-green-button hover:text-white"
                  }
                >
                  Personal Info
                </button>
                <button
                  name="username"
                  onClick={handleOnActive}
                  className={
                    activeButton.credential
                      ? "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-custom-green-button text-white font-medium"
                      : "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-white text-black font-medium transition-all ease-in-out hover:bg-custom-green-button hover:text-white"
                  }
                >
                  Change Username
                </button>
                <button
                  name="password"
                  onClick={handleOnActive}
                  className={
                    activeButton.credential
                      ? "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-custom-green-button text-white font-medium"
                      : "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-white text-black font-medium transition-all ease-in-out hover:bg-custom-green-button hover:text-white"
                  }
                >
                  Change Password
                </button>
              </div>

              <div className={activeButton.personal ? "block" : "hidden"}>
                <div className="h-full w-full shadow-lg px-[30px] pb-[30px]">
                  {/* PERSONAL DATA */}
                  <PersonalInfo userData={userData} editButton={editButton} handleUserDataChange={handleUserDataChange} birthdayFormat={birthdayFormat} calculateAge={calculateAge} empty={empty} />

                  {/* ADDRESS DETAILS */}
                  <AddressDetails userAddress={userAddress} editButton={editButton} handleUserChangeAdd={handleUserChangeAdd} empty={empty} />

                  {/* OTHER PERSONAL DATA */}
                  <OtherPersonalData userData={userData} userSocials={userSocials} handleUserDataChange={handleUserDataChange} handleUserSocials={handleUserSocials} editButton={editButton} empty={empty} />

                </div>
              </div>
              <div
                className={
                  activeButton.username
                    ? "shadow-lg px-[30px] pb-[30px]"
                    : "hidden"
                }
              >
                {/* CREDENTIALS */}
                <Username userCred={userCred} handleUserChangeCred={handleUserChangeCred} editButton={editButton} message={message} passwordStrengthError={passwordStrengthError} passwordStrengthSuccess={passwordStrengthSuccess} passwordStrength={passwordStrength} empty={empty} />
              </div>
              <div
                className={
                  activeButton.password
                    ? "shadow-lg px-[30px] pb-[30px]"
                    : "hidden"
                }
              >
                {/* CREDENTIALS */}
                <Password userCred={userCred} handleUserChangeCred={handleUserChangeCred} editButton={editButton} message={message} passwordStrengthError={passwordStrengthError} passwordStrengthSuccess={passwordStrengthSuccess} passwordStrength={passwordStrength} empty={empty} />
              </div>
            </div>
            <div className="sm:w-full lg:w-[20%] relative mt-[-80px] mb-[20px]">
              <div className="block">
                <div className="relative lg:w-full flex flex-col m-auto justify-center items-center">
                  <div className="absolute top-[75px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <label
                      htmlFor="file_input"
                      onClick={handleAdd}
                      className={
                        editButton
                          ? "hidden"
                          : "block text-transparent p-[45px] font-medium rounded-full text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60 cursor-pointer"
                      }
                    >
                      <FaCamera
                        size={50}
                        style={{ color: "#ffffff" }}
                        className="cursor-none"
                      />
                    </label>
                    <input
                      disabled={editButton}
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      accept="image/*"
                      multiple="multiple"
                      className="hidden"
                    />
                  </div>
                  <img
                    id="pfp"
                    className="w-[150px] h-[150px] rounded-full sm:mb-3 lg:mb-0 border-[5px] border-[#295141] object-cover"
                  />
                  {/* <button className="relative bottom-[25px] w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#295141] text-white px-3 py-2">
                                    <FaCamera size={20} className="cursor-none" />
                                </button> */}
                </div>
                <div className="flex flex-col justify-center items-center mt-1">
                  <h6 className="font-bold">
                    {userData.firstName} {userData.lastName}
                  </h6>
                  <p className="text-[12px] leading-[10px]">
                    {userData.username}
                  </p>
                </div>
                <div className="flex flex-col justify-center sm:w-[250px] md:w-[90%] lg:w-full items-center mx-auto mt-5 bg-custom-green-header rounded-md p-[10px]">
                  <div className="flex justify-center items-center border-b-[1px] border-white w-full pb-[10px]">
                    <h6 className="font-bold text-white">Socials</h6>
                  </div>
                  <div className="p-[10px] flex sm:flex-col md:flex-row lg:flex-col gap-5">
                    {userSocials.facebook.name.length !== 0 ?
                      <button className="flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-white hover:rounded-full hover:text-custom-green-table-header text-white hover:p-2">
                        <FaFacebook />
                        <p className="text-left truncate text-[12px]">
                          {userSocials.facebook.name}
                        </p>
                      </button>
                      : null
                    }
                    {userSocials.instagram.name.length !== 0 ?
                      <button className="flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-white hover:rounded-full hover:text-custom-green-table-header text-white hover:p-2">
                        <FaInstagram />
                        <p className="text-left truncate text-[12px]">
                          {userSocials.instagram.name}
                        </p>
                      </button>
                      : null
                    }
                    {userSocials.twitter.name.length !== 0 ?
                      <button className="flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-white hover:rounded-full hover:text-custom-green-table-header text-white hover:p-2">
                        <FaTwitter />
                        <p className="text-left truncate text-[12px]">
                          {userSocials.twitter.name}
                        </p>
                      </button>
                      : null
                    }
                    {userData.contact !== "" ?
                      <button className="flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-white hover:rounded-full hover:text-custom-green-table-header text-white hover:p-2">
                        <FaPhone />
                        <p className="text-left truncate text-[12px]">
                          {userData.contact}
                        </p>
                      </button>
                      : null
                    }
                    {userData.email !== "" ?
                      <button className=" flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-white hover:rounded-full hover:text-custom-green-table-header text-white hover:p-2">
                        <FaEnvelope />
                        <p className="text-left truncate text-[12px]">
                          {userData.email}
                        </p>
                      </button>
                      : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-[20px] flex justify-center items-center gap-5">
          {/* Sm to md screen loader */}
          {editButton ? (
            <button
              name="edit"
              onClick={handleOnEdit}
              className="bg-custom-green-button text-white font-medium px-[20px] py-[5px] rounded-md"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-5">
              <button
                type="submit"
                name="save"
                onClick={saveChanges}
                className="bg-custom-green-button text-white font-medium px-[20px] py-[5px] rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleOnEdit}
                name="cancel"
                className="bg-custom-red-button text-white font-medium px-[20px] py-[5px] rounded-md"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      {submitClicked && <Preloader updatingStatus="updating" />}
      {updatingStatus && (
        <Preloader updatingStatus={updatingStatus} error={error} />
      )}
    </div>
  );
};

export default Settings;
