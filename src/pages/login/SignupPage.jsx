import React, { useState, useRef } from "react";
import myImage from "../../assets/image/rizallogo2.png";
import { FaCameraRetro } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";
import moment from "moment";
import Webcam from "react-webcam";
import Preloader from "../../components/loaders/Preloader";

// COMPONENTS
import SideInfo from "../../components/signup/SideInfo";
import PersonalInfo from "../../components/signup/PersonalInfo";
import Address from "../../components/signup/Address";
import AccountCredentials from "../../components/signup/AccountCredentials";
import Verification from "../../components/signup/Verification";

const SignupPage = () => {
  const WebcamComponent = () => <Webcam />;
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
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
  const [restrict, setRestrict] = useState(false);
  const [signupPage, setSignupPage] = useState({
    personal: true,
    address: false,
    credential: false,
    verification: false,
  });
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
    primary_id: "",
    primary_file: [],
    secondary_id: "",
    secondary_file: [],
    selfie: null,
  });
  const [error, setError] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [errMsg, setErrMsg] = useState(false);
  const fileInputPrimaryIDRef = useRef();
  const fileInputSecondaryIDRef = useRef();

  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const capture = React.useCallback(
      async (e) => {
        e.preventDefault(); // Prevent the default behavior
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);

        try {
          const response = await fetch(imageSrc);
          const file = await response.blob();

          // Use the existing Blob for selfie with data:image/jpeg;base64 format
          let selfieFile = new File(
            [file],
            `${formData.lastName}, ${formData.firstName} - SELFIE`,
            {
              type: "image/jpeg",
              size: file.size,
              uri: `data:image/jpeg;base64,${imageSrc.split(",")[1]}`,
            }
          );

          console.log("selfieFile: ", selfieFile);

          setFormData((prev) => ({
            ...prev,
            selfie: selfieFile,
          }));
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      },
      [webcamRef]
    );

    return (
      <>
        <div className="relative">
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={600}
            className="rounded-xl mx-auto"
          />
          <button
            onClick={capture}
            className="h-12 w-12 py-1 px-2 rounded-full border text-sm font-base bg-teal-900 text-white shadow-sm absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex items-center justify-center">
              <FaCameraRetro size={20} />
            </div>
          </button>
        </div>
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured Photo"
            className="w-full h-full px-2 py-2 object-cover rounded-xl mt-2"
          />
        )}
      </>
    );
  };

  const handleFileChange = (field, e) => {
    e.preventDefault();
    const files = e.target.files;

    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === null ? files : [...prev[field], ...files],
    }));
  };

  const handleAddPrimaryID = () => {
    fileInputPrimaryIDRef.current.click();
  };

  const handleAddSecondaryID = () => {
    fileInputSecondaryIDRef.current.click();
  };

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
        verification: false,
      });
    } else if (e.target.name === "Address") {
      setSignupPage({
        personal: false,
        address: true,
        credential: false,
        verification: false,
      });
    } else if (e.target.name === "Credentials") {
      setSignupPage({
        personal: false,
        address: false,
        credential: true,
        verification: false,
      });
    } else if (e.target.name === "Verification") {
      setSignupPage({
        personal: false,
        address: false,
        credential: false,
        verification: true,
      });
    }
  };

  // console.log(formData)

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
      !formData.confirmPassword ||
      !formData.primary_file ||
      !formData.primary_id ||
      !formData.secondary_file ||
      !formData.secondary_id ||
      !formData.selfie
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
      primary_id: formData.primary_id,
      primary_file: formData.primary_file,
      secondary_id: formData.secondary_id,
      secondary_file: formData.secondary_file,
      selfie: formData.selfie,
    };

    const res_folder = await axios.get(
      `${API_LINK}/folder/specific/?brgy=${obj.address.brgy}`
    );

    if (res_folder.status === 200) {
      try {
        setSubmitClicked(true);

        var newFormData = new FormData();

        newFormData.append("user", JSON.stringify(obj));

        let selfieFile = new File(
          [formData.selfie],
          `${formData.lastName}, ${formData.firstName} - SELFIE`,
          {
            type: "image/jpeg",
            size: formData.selfie.size,
            uri: formData.selfie.uri,
          }
        );

        newFormData.append("files", selfieFile);

        for (let i = 0; i < formData.primary_file.length; i++) {
          let file = {
            name: `${formData.lastName}, ${
              formData.firstName
            } - PRIMARY ID ${moment(new Date()).format("MMDDYYYYHHmmss")}`,
            size: formData.primary_file[i].size,
            type: formData.primary_file[i].type,
            uri: formData.primary_file[i].uri,
          };

          newFormData.append(
            "files",
            new File([formData.primary_file[i]], file.name, {
              type: file.type,
            })
          );
        }

        for (let i = 0; i < formData.secondary_file.length; i++) {
          let file = {
            name: `${formData.lastName}, ${
              formData.firstName
            } - SECONDARY ID ${moment(new Date()).format("MMDDYYYYHHmmss")}`,
            uri: formData.secondary_file[i].uri,
            type: formData.secondary_file[i].type,
            size: formData.secondary_file[i].size,
          };

          newFormData.append(
            "files",
            new File([formData.secondary_file[i]], file.name, {
              type: file.type,
            })
          );
        }

        const response = await axios.post(
          `${API_LINK}/users/?folder_id=${res_folder.data[0].verification}`,
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);

        if (response.status === 200) {
          setsuccessReg(true);

          const email = btoa(obj.email);
          const barangay = btoa(obj.address.brgy);

          setTimeout(() => {
            setSubmitClicked(false);
            setUpdatingStatus("success");
            setTimeout(function () {
              navigate(`/loading/?email=${email}&brgy=${barangay}`);
            }, 3000);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setDuplicateError(error.response.data.error);
          setEmpty(false);
          setShowError(false);
          setSubmitClicked(false);
          setUpdatingStatus("error");
        } else {
          setDuplicateError("An unknown error occurred.");
        }
      }
    }
  };

  // console.log(formData);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row-reverse md:h-screen">
        <SideInfo />

        <div className="sm:w-full lg:w-6/12 mx-auto sm:h-auto sm:py-[30px] flex flex-col items-center justify-center bg-white">
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
            <PersonalInfo
              formData={formData}
              empty={empty}
              emptyFields={emptyFields}
              restrict={restrict}
              handleChange={handleChange}
              handleNextPage={handleNextPage}
            />
          ) : null}
          {signupPage.address === true ? (
            <Address
              formData={formData}
              empty={empty}
              emptyFields={emptyFields}
              restrict={restrict}
              handleChange={handleChange}
              handleNextPage={handleNextPage}
            />
          ) : null}
          {signupPage.verification === true ? (
            <Verification
              formData={formData}
              setFormData={setFormData}
              empty={empty}
              emptyFields={emptyFields}
              restrict={restrict}
              handleAddPrimaryID={handleAddPrimaryID}
              handleAddSecondaryID={handleAddSecondaryID}
              fileInputPrimaryIDRef={fileInputPrimaryIDRef}
              fileInputSecondaryIDRef={fileInputSecondaryIDRef}
              handleFileChange={handleFileChange}
              WebcamCapture={WebcamCapture}
              setViewerVisible={setViewerVisible}
              setSelectedImage={setSelectedImage}
              setCapturedImage={setCapturedImage}
              handleNextPage={handleNextPage}
            />
          ) : null}
          {signupPage.credential === true ? (
            <AccountCredentials
              formData={formData}
              empty={empty}
              emptyFields={emptyFields}
              restrict={restrict}
              handleChange={handleChange}
              passwordError={passwordError}
              passwordStrengthError={passwordStrengthError}
              passwordMatchSuccess={passwordMatchSuccess}
              passwordStrengthSuccess={passwordStrengthSuccess}
              showError={showError}
              passwordStrength={passwordStrength}
              duplicateError={duplicateError}
              successReg={successReg}
              termsAccepted={termsAccepted}
              setTermsAccepted={setTermsAccepted}
              policyAccepted={policyAccepted}
              setPolicyAccepted={setPolicyAccepted}
              handleSubmit={handleSubmit}
              handleNextPage={handleNextPage}
            />
          ) : null}

          <p className="text-sm text-black text-center mt-2">
            Already have an account?
            <span className="font-bold">
              <Link to="/login"> Login here.</Link>
            </span>
          </p>
        </div>
        {submitClicked && <Preloader updatingStatus="waiting" />}
        {updatingStatus && (
          <Preloader updatingStatus={updatingStatus} error={error} />
        )}
      </div>
    </>
  );
};
export default SignupPage;
