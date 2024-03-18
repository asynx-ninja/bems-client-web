import { React, useState, useRef, useEffect } from "react";
import { IoIosAttach } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import Dropbox from "./Dropbox";
import API_LINK from "../../../config/API";
import axios from "axios";
import moment from 'moment'

import Preloader from "../../loaders/Preloader";

const ComposeModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fileInputRef = useRef();
  const id = searchParams.get("id");
  const user_id = searchParams.get("user_id");
  const brgy = searchParams.get("brgy");
  const [userData, setUserData] = useState({});
  const [upload, setUpload] = useState(false);
  const [createFiles, setCreateFiles] = useState([]);
  const [composeMessage, setComposeMessage] = useState({
    user_id: user_id,
    name: "",
    email: "",
    compose: {
      subject: "",
      type: "Resident",
      message: "",
      date: new Date(),
      to: "",
    },
    brgy: brgy,
  })
  const [error, setError] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [showError, setShowError] = useState({
    error: false,
    message: ""
  });

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const getUser = await axios.get(`${API_LINK}/users/specific/${id}`);
        setUserData(getUser.data[0]);
      } catch (error) {
        console.log(error);
      }
      // imageRef.current.src = defaultPFP;
    };

    fetchForms();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
  };

  const handleOnClose = () => {
    setShowError({
      error: false,
      message: ""
    })
  }

  const handleOnUpload = () => {
    setUpload(!upload);
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setCreateFiles([...createFiles, ...e.target.files]);
  };

  const handleOnCompose = (e) => {
    const newInquiry = composeMessage

    if (e.target.name === "subject" || e.target.name === "message" || e.target.name === "file" || e.target.name === "to") {
      newInquiry.compose = {
        ...newInquiry.compose,
        [e.target.name]: e.target.value,
      };

      setComposeMessage((prev) => ({
        ...prev,
        compose: newInquiry.compose
      }))
    } else {
      setComposeMessage((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    }

  }

  const getType = (type) => {
    switch (type) {
      case "MUNISIPYO":
        return "Municipality";
      default:
        return "Barangay";
    }
  };
  // console.log(composeMessage)

  const handleOnSend = async (e) => {
    e.preventDefault();

    if (!composeMessage.name ||
      !composeMessage.email ||
      !composeMessage.compose.to || 
      !composeMessage.compose.subject
    ) {
      setShowError({
        error: true,
        message: "Please fill up Required information!"
      });
      return;
      // Proceed with form submission...
    } else {
      setShowError({
        error: false,
        message: ""
      });
    }

    setSubmitClicked(true);

    try {
      var formData = new FormData()
      formData.append("inquiries", JSON.stringify(composeMessage))
      console.log(composeMessage)
      for (let i = 0; i < createFiles.length; i++) {
        formData.append("files", createFiles[i])
      }

      const folderResponse = await axios.get(
        `${API_LINK}/folder/specific/?brgy=${userData.address.brgy}`
      );

      if (folderResponse.status == 200) {

        const response = await axios.post(
          `${API_LINK}/inquiries/?inq_folder_id=${folderResponse.data[0].inquiries}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {

          const notify = {
            category: "Many",
            compose: {
              subject: `INQUIRY - ${`${userData.lastName}, ${userData.firstName}`}`,
              message: `A user has submitted an inquiry!\n
              \n
              Inquiry Details:\n
              - Subject: ${response.data.compose.subject}\n
              - Message: ${response.data.compose.message}\n
              - Date Created: ${moment(response.data.createdAt).format(
                "MMM. DD, YYYY h:mm a"
              )}\n
              \n
              Please update this inquiry!\n
              \n
              Thank you!!`,
              go_to: "Inquiries",
            },
            target: {
              user_id: userData.user_id,
              area:
                response.data.compose.to === "Admin"
                  ? "Municipality"
                  : userData.address.brgy,
            },
            type:
              response.data.compose.to === "Admin"
                ? "Municipality"
                : "Barangay",
            banner: {
              link: "https://drive.google.com/thumbnail?id=1v009xuRjSNW8OGUyHbAYTJt3ynxjhtGW&sz=w1000",
              name: "inquiries_banner.jpg",
              id: "1SM_QPFb_NmyMTLdsjtEd-2M6ersJhBUc",
            },
            logo: {
              link: "https://drive.google.com/thumbnail?id=1sh24YL7RQY_cHLcTZ_G3GXCG18Y6_JAL&sz=w1000",
              name: "inquiries_logo.png",
              id: "1SM_QPFb_NmyMTLdsjtEd-2M6ersJhBUc",
            },
          };

          try {

            const result = await axios.post(
              `${API_LINK}/notification/`,
              notify,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (result.status === 200) {
              setTimeout(() => {
                setSubmitClicked(false);
                setUpdatingStatus("success");
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }, 1000);
            }

          } catch (err) {
            console.log(err)
          }

        } else {
          setSubmitClicked(false);
          setUpdatingStatus("error");
          setError(error.message);
        }

      }

    } catch (error) {
      console.log(error)
    }
  }

  // console.log(composeMessage)

  return (
    <div>
      <div className="flex">
        <div
          id="hs-modal-compose"
          className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full my-auto h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto rounded-t-2xl">
            <div className="flex flex-col bg-white shadow-sm rounded-2xl">
              {/* Header */}
              <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-custom-green-button to-custom-green-header overflow-hidden rounded-t-2xl">
                <h3
                  className="font-bold text-white mx-auto md:text-xl text-center"
                  style={{ letterSpacing: "0.3em" }}
                >
                  COMPOSE
                </h3>
              </div>
              <div className="mt-5 h-[400px] overflow-y-auto overflow-x-hidden">
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
                <form>
                  <div className="flex flex-col lg:flex-row">
                    <div className="mb-4 px-4 w-full">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="title"
                        onChange={handleOnCompose}
                        name="name"
                        className={showError.error ? "w-full p-2 border border-red-300 rounded focus:border-red-500 focus:ring-red-500"
                          : "w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"}
                      />
                    </div>
                    <div className="mb-4 px-4 w-full">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="title"
                        onChange={handleOnCompose}
                        name="email"
                        className={showError.error ? "w-full p-2 border border-red-300 rounded focus:border-red-500 focus:ring-red-500"
                          : "w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"}
                      />
                    </div>
                  </div>

                  <div className="mb-4 px-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject:
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="subject"
                      onChange={handleOnCompose}
                      className={showError.error ? "w-full p-2 border border-red-300 rounded focus:border-red-500 focus:ring-red-500"
                        : "w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"}
                    />
                  </div>

                  <div className="mb-4 px-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      To:
                    </label>
                    <select
                      id="title"
                      name="to"
                      value={composeMessage.compose.to || ""}
                      onChange={handleOnCompose}
                      className={showError.error ? "w-full p-2 border border-red-300 rounded focus:border-red-500 focus:ring-red-500"
                        : "w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"}
                    >
                      <option value='' disabled>-- Select Recipient --</option>
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>

                  <div className="mb-4 px-4">
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="details"
                      name="message"
                      onChange={handleOnCompose}
                      rows="4"
                      className={showError.error ? "w-full p-2 border border-red-300 rounded focus:border-red-500 focus:ring-red-500"
                        : "w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"}
                    />
                  </div>
                  <div className="m-[10px] w-full">
                    <div className="flex items-center">
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => handleFileChange(e)}
                        ref={fileInputRef}
                        accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                        multiple="multiple"
                        className="hidden"
                      />
                      <button
                        id="button"
                        onClick={
                          handleAdd || handleOnUpload
                        }
                        className="mt-2 flex rounded-xl px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                      >
                        <IoIosAttach size={24} />
                        Attach a File
                      </button>
                    </div>
                    {
                      createFiles.length > 0 && (
                        <Dropbox
                          createFiles={createFiles}
                          setCreateFiles={setCreateFiles}
                          handleFileChange={handleFileChange}
                        />
                      )
                    }
                  </div>
                </form>
              </div>
              {/* Buttons */}
              <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <button
                  type="button"
                  data-hs-overlay="#hs-modal-compose"
                  onClick={handleOnSend}
                  className="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={handleOnClose}
                  className="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-compose"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {submitClicked && <Preloader updatingStatus="waiting" />}
      {updatingStatus && (
        <Preloader updatingStatus={updatingStatus} error={error} />
      )}
    </div>
  );
}

export default ComposeModal;
