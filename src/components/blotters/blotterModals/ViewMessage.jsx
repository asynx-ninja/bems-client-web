import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_LINK from "../../../config/API";
import EditDropbox from "./EditDropbox";
import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import Dropbox from "./Dropbox";
import ViewDropbox from "./ViewDropbox";
import Preloader from "../../loaders/Preloader";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const ViewMessage = ({ specBlotter, setSpecBlotter }) => {
  // console.log(inquiry.folder_id);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [userData, setUserData] = useState({})
  const [reply, setReply] = useState(false);
  const [upload, setUpload] = useState(false);
  const [files, setFiles] = useState([]);
  const [createFiles, setCreateFiles] = useState([]);
  const [viewFiles, setViewFiles] = useState([]);
  const [newMessage, setNewMessage] = useState({
    sender: '',
    message: "",
    date: new Date(),
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [errMsg, setErrMsg] = useState(false)
  const [isComplainant, setIsComplainant] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        setUserData(res.data[0])
        setNewMessage({
          sender: `${res.data[0].firstName.toUpperCase()} ${res.data[0].lastName.toUpperCase()}`,
          message: "",
          date: new Date(),
        })

      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [id])

  // useEffect(() => {
  //   setFiles(specBlotter.length === 0 ? [] : specBlotter.compose.file);
  // }, [specBlotter]);

  useEffect(() => {
    if (specBlotter.length !== 0) {
      if (specBlotter && specBlotter.responses.length !== 0) {
        const lastResponse = specBlotter.responses[specBlotter.responses.length - 1];

        if (lastResponse.file && lastResponse.file.length > 0) {
          setViewFiles(lastResponse.file);
        } else {
          setViewFiles([]);
        }
      } else {
        setViewFiles([]);
      }
    }
  }, [specBlotter]);

  const fileInputRef = useRef();

  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
  };

  const handleOnReply = () => {
    setReply(!reply);
  };

  // console.log(newMessage)

  const handleOnUpload = () => {
    setUpload(!upload);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const DateFormat = (date) => {
    if (!date) return "";

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setCreateFiles([...createFiles, ...e.target.files]);
  };

  const setType = (item) => {
    if(item === "Complainant"){
      return "COMPLAINANT"
      setIsComplainant(true)
    } else { 
      return "DEFENDANT"
    }
  }

  const handleOnSend = async (e) => {
    e.preventDefault();
    console.log(newMessage);

    if (newMessage.message === "" && createFiles.length === 0) {
      setErrMsg(true)

      return
    }

    setSubmitClicked(true);

    try {
      const obj = {
        sender: `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}`,
        type: "Resident",
        message: newMessage.message,
        date: newMessage.date,
        folder_id: specBlotter.folder_id,
      };

      const targetIds = [
        specBlotter?.to[0]?.user_id,
        specBlotter?.to[1]?.user_id
      ]

      var formData = new FormData();
      formData.append("response", JSON.stringify(obj));
      for (let i = 0; i < createFiles.length; i++) {
        formData.append("files", createFiles[i]);
      }

      const response = await axios.patch(
        `${API_LINK}/blotter/?patawag_id=${specBlotter._id}`,
        formData
      );

      if (response.status === 200) {

        const notify = {
          category: "Many",
          compose: {
            subject: `PATAWAG REPLY - ${`${userData.lastName}, ${userData.firstName}`}`,
            message: `A user has replied to a Service Blotter named ${specBlotter.name}!\n
            \n
            Please view and response as you've seen this notification!\n
            \n
            Thank you!!`,
            go_to: "Patawag",
          },
          target: {
            user_id: targetIds,
            area: userData.address.brgy,
          },
          type: "Barangay",
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

      } else {
        setSubmitClicked(false);
        setUpdatingStatus("error");
        setError(error.message);
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="">
        <div
          id="hs-modal-viewInquiries"
          className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
        >
          {/* Modal */}
          <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
            <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
              {/* Header */}
              <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-custom-green-button to-custom-green-header overflow-hidden rounded-t-2xl">
                <h3
                  className="font-bold text-white mx-auto md:text-xl text-center"
                  style={{ letterSpacing: "0.3em" }}
                >
                  BLOTTER
                </h3>
              </div>

              <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb flex flex-col mx-auto w-full pt-5 px-5 overflow-y-auto relative max-h-[470px]">
                <b className="border-solid border-0 border-black/50 border-b-2  uppercase font-medium text-lg md:text-lg mb-4">
                  Patawag Details
                </b>
                <div className="flex flex-col lg:flex-row">
                  <div className="mb-4 px-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      value={specBlotter && specBlotter.name || ""}
                      disabled
                    />
                  </div>
                  <div className="mb-4 px-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      To
                    </label>
                    <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                      {
                        specBlotter && specBlotter.to && specBlotter.to.length !== 0 ?
                          specBlotter.to.map((item, i) => (
                            <div key={i}>
                              {item.lastName}, {item.firstName} ({setType(item.type)})
                            </div>
                          ))
                          :
                          <div>

                          </div>
                      }
                    </span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                  <div className="mb-4 px-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Barangay
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      value={specBlotter && specBlotter.brgy || ""}
                      disabled
                    />
                  </div>
                  <div className="mb-4 px-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                      value={
                        DateFormat(specBlotter && specBlotter.createdAt) || ""
                      }
                      disabled
                    />
                  </div>
                </div>

                <EditDropbox files={specBlotter && files} setFiles={setFiles} />

                <div className="flex flex-col mt-5 w-full">
                  <b className="border-solid border-0 w-full border-black/50 border-b-2 my-4 uppercase font-medium text-lg md:text-lg mb-4">
                    Conversation History
                  </b>
                  <form>
                    {!specBlotter.responses || specBlotter.responses.length === 0 ? (
                      <div className="flex flex-col items-center">
                        {
                          errMsg ? (
                            <div className="w-[100%] bg-red-500 rounded-md mb-[10px] flex">
                              <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">Please enter a message or insert a file!</p>
                            </div>
                          ) : null
                        }
                        <div className="relative w-full mt-4 mx-2">
                          <div className="relative w-full">
                            <textarea
                              id="message"
                              name="message"
                              onChange={handleChange}
                              className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border"
                              placeholder="Input response..."
                            ></textarea>

                            <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white">
                              <div className="flex justify-between items-center">
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
                                    onClick={handleAdd || handleOnUpload}
                                    className="mt-2 rounded-xl px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                  >
                                    <IoIosAttach size={24} />
                                  </button>
                                </div>

                                <div className="flex items-center gap-x-1">
                                  <button
                                    type="submit"
                                    onClick={handleOnSend}
                                    className="inline-flex flex-shrink-0 justify-center items-center w-28 rounded-lg text-white py-1 px-6 gap-2 bg-cyan-700"
                                  >
                                    <span>SEND</span>
                                    <IoSend
                                      size={18}
                                      className="flex-shrink-0"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {!upload ? (
                            // Render Dropbox only when there are uploaded files
                            createFiles.length > 0 && (
                              <Dropbox
                                createFiles={createFiles}
                                setCreateFiles={setCreateFiles}
                                handleFileChange={handleFileChange}
                              />
                            )
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    ) : null}
                    {specBlotter &&
                      specBlotter.responses &&
                      specBlotter.responses.map((responseItem, index) => (
                        <div
                          key={index}
                          className={responseItem.sender === `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}` || responseItem.sender === "Resident" ? "flex flex-col justify-end items-end mb-5 w-full h-auto" : "flex flex-col justify-start items-start mb-5 w-full h-auto"}
                        >
                          <div
                            className="flex flex-col items-end mb-5 h-auto"
                          >
                            <div
                              className="flex flex-row w-full justify-between"
                            >
                              <div className="flex flex-col md:flex-row md:items-center">
                                <p className="text-[14px] text-black md:text-sm font-medium uppercase ">
                                  {responseItem.sender}
                                </p>
                              </div>
                            </div>
                            {
                              responseItem.message !== "" ?
                                <div
                                  className="flex flex-col rounded-xl bg-custom-green-button w-full px-2 md:px-4 py-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="w-full h-full">
                                    <div className="w-full h-full rounded-xl p-1">
                                      <p className="text-[10px] text-white md:text-xs">
                                        {responseItem.message}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                : null
                            }
                            {
                              !responseItem.file.length ?
                                null
                                :
                                <div className="flex flex-col rounded-xl bg-custom-green-button w-full mt-2 px-2 md:px-4 py-2">
                                  <ViewDropbox
                                    viewFiles={responseItem.file || []}
                                    setViewFiles={setViewFiles}
                                  />
                                </div>
                            }
                            <p className="text-[10px] md:text-xs mt-[5px] text-black text-right text-xs">
                              {DateFormat(responseItem.date) || ""}
                            </p>
                          </div>
                          {index === specBlotter.responses.length - 1 ?
                            <div className="flex flex-row items-center w-full">
                              {
                                responseItem.isRepliable === false ?
                                  null
                                  :
                                  <button
                                    type="button"
                                    className="h-8 w-full lg:w-32 py-1 px-2 gap-2 mt-4 rounded-full borde text-sm font-base bg-custom-green-header text-white shadow-sm"
                                    onClick={handleOnReply}
                                    hidden={reply}
                                  >
                                    REPLY
                                  </button>
                              }
                              {!reply ? (
                                <div></div>
                              ) : (
                                <div className="relative w-full mt-4 mx-2">
                                  {
                                    errMsg ? (
                                      <div className="w-[100%] bg-red-500 rounded-md mb-[10px] flex">
                                        <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">Please enter a message or insert a file!</p>
                                      </div>
                                    ) : null
                                  }
                                  <div className="relative w-full">
                                    <textarea
                                      id="message"
                                      name="message"
                                      onChange={handleChange}
                                      className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border"
                                      placeholder="Input response..."
                                    ></textarea>

                                    <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white">
                                      <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                          <input
                                            type="file"
                                            name="file"
                                            onChange={(e) =>
                                              handleFileChange(e)
                                            }
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
                                            className="mt-2 rounded-xl px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                          >
                                            <IoIosAttach size={24} />
                                          </button>
                                        </div>

                                        <div className="flex items-center gap-x-1">
                                          <button
                                            type="submit"
                                            onClick={handleOnSend}
                                            className="inline-flex flex-shrink-0 justify-center items-center w-28 rounded-lg text-white py-1 px-6 gap-2 bg-cyan-700"
                                          >
                                            <span>SEND</span>
                                            <IoSend
                                              size={18}
                                              className="flex-shrink-0"
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {!upload ? (
                                    // Render Dropbox only when there are uploaded files
                                    createFiles.length > 0 && (
                                      <Dropbox
                                        createFiles={createFiles}
                                        setCreateFiles={setCreateFiles}
                                        handleFileChange={handleFileChange}
                                      />
                                    )
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              )}
                            </div>
                            : null}
                        </div>
                      ))}
                  </form>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-900 text-white shadow-sm"
                    data-hs-overlay="#hs-modal-viewInquiries"
                  >
                    CLOSE
                  </button>
                </div>
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

export default ViewMessage;