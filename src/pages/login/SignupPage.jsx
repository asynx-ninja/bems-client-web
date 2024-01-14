import React, { useState } from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API"

// COMPONENTS
import SideInfo from "../../components/signup/SideInfo";
import PersonalInfo from "../../components/signup/PersonalInfo";
import Address from "../../components/signup/Address";
import AccountCredentials from "../../components/signup/AccountCredentials";

const SignupPage = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [passwordStrengthError, setPasswordStrengthError] = useState(false);
  const [passwordMatchSuccess, setPasswordMatchSuccess] = useState(false);
  const [passwordStrengthSuccess, setPasswordStrengthSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [duplicateError, setDuplicateError] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [successReg, setsuccessReg] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [restrict, setRestrict] = useState(false)
  const [signupPage, setSignupPage] = useState({
    personal: true,
    address: false,
    credential: false,
  })
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    birthday: "",
    age: 0,
    sex: "",
    religion: "",
    contact: "",
    civil_status: "",
    occupation: "",
    city: "Rodriguez, Rizal",
    brgy: "",
    street: "",
    isVoter: false,
    isHead: false,
    email: "",
    username: "",
    password: "",
    type: "Resident",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "password") {
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

  const handleNextPage = (e) => {
    if (e.target.name === "Personal") {
      setSignupPage({
        personal: true,
        address: false,
        credential: false,
      })
    } else if (e.target.name === "Address") {
      setSignupPage({
        personal: false,
        address: true,
        credential: false,
      })
    } else if (e.target.name === "Credentials") {
      setSignupPage({
        personal: false,
        address: false,
        credential: true,
      })
    }
  }

  console.log(formData)

  const checkEmptyFields = () => {
    let arr = [];

    const obj = {
      firstName: "First Name",
      lastName: "Last Name",
      middleName: "Middle Name",
      suffix: "Suffix",
      birthday: "Birthday",
      age: 0,
      sex: "Sex",
      religion: "Religion",
      contact: "Contact",
      civil_status: "Civil Status",
      occupation: "Occupation",
      city: "City",
      brgy: "Barangay",
      street: "Street",
      isVoter: "Registered Voter",
      isHead: "Head of the Family",
    };

    for (const [key, value] of Object.entries(formData)) {
      if (key !== "suffix" && value === "") {
        arr.push(Object.entries(obj).find(([k, v]) => key === k)[1]);
      }
    }

    return arr;
  };

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

    const obj = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      suffix: formData.suffix,
      religion: formData.religion,
      email: formData.email,
      birthday: formData.birthday,
      age: calculateAge(formData.birthday),
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
      isApproved: "Pending",
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

      const email = btoa(obj.email);
      const barangay = btoa(obj.address.brgy);

      setTimeout(function () {
        navigate(`/loading/?email=${email}&brgy=${barangay}`);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row-reverse ">

      <SideInfo />

      <div className="sm:w-full lg:w-6/12 mx-auto sm:h-auto sm:py-[30px] md:h-screen flex flex-col items-center justify-center bg-white">
        <img
          className="sm:w-[250px] md:w-1/3 lg:w-[450px]"
          src={myImage}
          alt=""
        />
        <div className="bg-green-700 flex justify-center items-center sm:w-auto md:w-6/12 mt-5 mb-2 rounded-full text-white">
          <h1 className="text-xs sm:text-sm text-center sm:px-5 sm:py-2 md:p-1">
            City of Rodriguez Rizal
          </h1>
        </div>

        {signupPage.personal === true ? (
          <PersonalInfo formData={formData} empty={empty} emptyFields={emptyFields} restrict={restrict} handleChange={handleChange} handleNextPage={handleNextPage} />
        ) : null}
        {signupPage.address === true ? (
          <Address formData={formData} empty={empty} emptyFields={emptyFields} restrict={restrict} handleChange={handleChange} handleNextPage={handleNextPage} />
        ) : null}
        {signupPage.credential === true ? (
          <AccountCredentials formData={formData} empty={empty} emptyFields={emptyFields} restrict={restrict} handleChange={handleChange} passwordError={passwordError} passwordStrengthError={passwordStrengthError} passwordMatchSuccess={passwordMatchSuccess} passwordStrengthSuccess={passwordStrengthSuccess} showError={showError} passwordStrength={passwordStrength} duplicateError={duplicateError} successReg={successReg} termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} policyAccepted={policyAccepted} setPolicyAccepted={setPolicyAccepted} handleSubmit={handleSubmit} handleNextPage={handleNextPage} />
        ) : null}

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
