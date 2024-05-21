import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_LINK from "../../../config/API";
import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import Dropbox from "./Dropbox";
import ViewDropbox from "./ViewDropbox";
import Preloader from "../../loaders/Preloader";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { FaTimes } from "react-icons/fa";
// import EditDropbox from "./EditDropbox";

const ViewRequestModal = ({ viewRequest, setRequestUpdate, socket }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [userData, setUserData] = useState({});
  const chatContainerRef = useRef(null);
  const [reply, setReply] = useState(false);
  const [upload, setUpload] = useState(false);
  const [createFiles, setCreateFiles] = useState([]);
  const [newMessage, setNewMessage] = useState({
    sender: "",
    message: "",
    date: new Date(),
  });
  const [error, setError] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [errMsg, setErrMsg] = useState(false);
  const [onSend, setOnSend] = useState(false);
  const [viewTime, setViewTime] = useState({
    state: false,
    timeKey: 0,
  });

  const chats = document.getElementById("scrolltobottom");
  if (chats) {
    chats.scrollTop = chats.scrollHeight;
  }

  useEffect(() => {
    const container = chatContainerRef.current;

    if (
      container &&
      viewRequest &&
      viewRequest.response &&
      viewRequest.response.length > 0
    ) {
      container.scrollTop = container.scrollTo({
        bottom: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [viewRequest.response]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        setUserData(res.data[0]);
        setNewMessage({
          sender: `${res.data[0].firstName.toUpperCase()} ${res.data[0].lastName.toUpperCase()}`,
          message: "",
          date: new Date(),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const fileInputRef = useRef();

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

  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
  };

  const handleOnReply = () => {
    setReply(!reply);
  };

  const handleOnUpload = () => {
    setUpload(!upload);
  };

  const getType = (type) => {
    switch (type) {
      case "MUNISIPYO":
        return "Municipality";
      default:
        return "Barangay";
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      console.log("nag enter si idol");

      event.preventDefault();
      handleOnSend(event);
    }
  };

  const handleOnSend = async (e) => {
    e.preventDefault();
    console.log(newMessage);

    if (newMessage.message === "" && createFiles.length === 0) {
      setErrMsg(true);

      return;
    }

    // setSubmitClicked(true);

    try {
      setOnSend(true);

      const obj = {
        sender: `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}`,
        message: newMessage.message,
        status: viewRequest.status,
        date: new Date(),
        isRepliable: true,
        folder_id: viewRequest.folder_id,
        last_sender:
          viewRequest.response.length === 0
            ? newMessage.sender
            : viewRequest.response[viewRequest.response.length - 1],
        last_array:
          viewRequest.response.length === 0
            ? 0
            : viewRequest.response.length - 1,
      };
      var formData = new FormData();
      formData.append("response", JSON.stringify(obj));

      const res_folder = await axios.get(
        `${API_LINK}/folder/specific/?brgy=${brgy}`
      );

      if (res_folder.status === 200) {
        for (let i = 0; i < createFiles.length; i++) {
          formData.append("files", createFiles[i]);
        }

        const response = await axios.patch(
          `${API_LINK}/requests/?req_id=${viewRequest._id}&request_folder_id=${
            res_folder.data[0].request
          }&user_type=${"Resident"}`,
          formData
        );

        if (response.status === 200) {
          const getService = await axios.get(
            `${API_LINK}/services/specific_service/?service_id=${viewRequest.service_id}`
          );

          const notify = {
            category: "Many",
            compose: {
              subject: `REQUEST - ${viewRequest.service_name}`,
              message: `A user has replied to a service request for the service of ${
                viewRequest.service_name
              }.\n
            \n
            Request Details:\n
            - Name: ${`${userData.lastName}, ${userData.firstName}`}\n
            - Service Applied: ${viewRequest.service_name}\n
            - Request ID: ${viewRequest.req_id}\n
            - Date Created: ${moment(viewRequest.createdAt).format(
              "MMM. DD, YYYY h:mm a"
            )}\n
            \n
            Please update this service request!\n
            \n
            Thank you!!`,
              go_to: "Requests",
            },
            target: { user_id: userData.user_id, area: userData.address.brgy },
            type: getType(viewRequest.brgy),
            banner: getService.data[0].collections.banner,
            logo: getService.data[0].collections.logo,
          };

          const result = await axios.post(`${API_LINK}/notification/`, notify, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (result.status === 200) {
            document.getElementById("message").value = "";
            socket.emit("send-reply-service-req", response.data);

            setCreateFiles([]);
            setOnSend(false);
          }
        } else {
          setSubmitClicked(false);
          setUpdatingStatus("error");
          setError(error.message);
        }
      }
      return {
        socket,
        setRequestUpdate,
      };
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(viewRequest

  const setColor = (status) => {
    if (status === "Transaction Completed") return "green-800";
    else if (status === "Pending") return "custom-amber";
    else if (status === "Cancelled") return "gray-700";
    else if (status === "Processing") return "blue-800";
    else if (status === "Paid") return "violet-700";
    else if (status === "Not Responded") return "pink-700";
    else if (status === "Rejected") return "red-800";
    else return "black";
  };

  const handleOnViewTime = (item) => {
    if (viewTime.timeKey != item) {
      setViewTime({
        state: true,
        timeKey: item,
      });
    } else {
      setViewTime({
        state: false,
      });
    }
  };

  return (
    <div>
      <div
        id="hs-viewRequest-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all sm:w-full h-auto">
          <div className="flex flex-col justify-center items-center bg-white shadow-sm rounded-t-3xl rounded-b-[8px] w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen relative">
            {/* Header */}
            <div className="py-5 relative px-3 flex justify-between items-center w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-custom-green-button to-custom-green-header overflow-hidden rounded-t-2xl">
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                REPLY TO REQUEST APPLICATION
              </h3>
              <button
                type="button"
                className="absolute right-5 p-1 gap-2 rounded-full text-sm font-base text-white shadow-sm align-middle"
                data-hs-overlay="#hs-viewRequest-modal"
                onClick={() => {
                  setErrMsg(false);
                }}
                style={{
                  background: "#B95252",
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div
              className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[300px]"
              id="scrolltobottom"
              ref={chatContainerRef}
            >
              <div className="border-solid border-0 border-black/50 border-b-2 flex justify-between items-center mb-4">
                <b className="uppercase font-medium text-lg md:text-lg">
                  Evaluation
                </b>
                <div className="flex gap-1">
                  <p className="font-medium">Status: </p>
                  <p
                    className={`font-medium text-${setColor(
                      viewRequest.status
                    )}`}
                  >
                    {viewRequest.status}
                  </p>
                </div>
              </div>

              {
                <div className="flex flex-col p-2">
                  <form>
                    {viewRequest &&
                      viewRequest.response &&
                      viewRequest.response.map((responseItem, index) => (
                        <div
                          key={index}
                          className={
                            responseItem.sender ===
                              `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}` ||
                            responseItem.sender === "Resident"
                              ? "flex flex-col justify-end items-end w-full h-auto"
                              : "flex flex-col justify-start items-start mb-1 w-full h-auto"
                          }
                        >
                          <div
                            className={
                              responseItem.sender ===
                                `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}` ||
                              responseItem.sender === "Resident"
                                ? "flex flex-col items-end h-auto max-w-[80%]"
                                : "flex flex-col items-start mb-5 h-auto max-w-[80%]"
                            }
                          >
                            <div
                              className={
                                responseItem.sender ===
                                  `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}` ||
                                responseItem.sender === "Resident"
                                  ? "hidden"
                                  : "flex flex-row w-full justify-between"
                              }
                            >
                              <div className="flex flex-col md:flex-row md:items-center">
                                <p className="text-[14px] text-black md:text-sm font-medium capitalize text-wrap">
                                  {responseItem.sender.toLowerCase()}
                                </p>
                              </div>
                            </div>
                            {responseItem.message !== "" ? (
                              <div
                                className={
                                  responseItem.sender ===
                                    `${userData.firstName.toUpperCase()} ${userData.lastName.toUpperCase()}` ||
                                  responseItem.sender === "Resident"
                                    ? "flex flex-col rounded-xl bg-green-400 mb-1 text-white px-2 md:px-4 py-2 cursor-pointer"
                                    : "flex flex-col rounded-xl bg-gray-100 border text-black border-gray-300 px-2 md:px-4 py-2 cursor-pointer"
                                }
                                onClick={() => handleOnViewTime(index)}
                              >
                                <div className="w-full h-full">
                                  <div className="w-full h-full rounded-xl p-1">
                                    <p className="text-[12px] md:text-xs break-all">
                                      {responseItem.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            {!responseItem.file ? null : (
                              <div className="flex flex-col rounded-xl">
                                <ViewDropbox
                                  viewFiles={responseItem.file || []}
                                />
                              </div>
                            )}
                            <p
                              className={
                                viewTime.timeKey === index
                                  ? "text-[10px] md:text-xs mt-[5px] text-black text-right text-xs"
                                  : "hidden"
                              }
                            >
                              {DateFormat(responseItem.date) || ""}
                            </p>
                          </div>
                        </div>
                      ))}
                  </form>
                </div>
              }
            </div>

            {/* CHAT BOX */}

            {viewRequest &&
            viewRequest.response &&
            viewRequest.response.length === 0 ? (
              <p className="pb-1 text-[12px] px-[20px] text-black font-medium">
                Start a Conversation
              </p>
            ) : null}

            <div
              className={`${
                viewRequest.status === "Cancelled" ||
                viewRequest.status === "Rejected" ||
                viewRequest.status === "Transaction Completed"
                  ? "w-[98%] mb-2 border-0 rounded-lg"
                  : "w-[98%] mb-2 border-[1px] border-[#b7e4c7] rounded-lg"
              }`}
            >
              {viewRequest.status === "Cancelled" ||
              viewRequest.status === "Rejected" ||
              viewRequest.status === "Transaction Completed" ? (
                <div>
                  <p className="text-center text-[14px] my-5 px-5">
                    You are unable to reply to this conversation due to the
                    status of your Application is on{" "}
                    <b
                      className={`font-medium text-${setColor(
                        viewRequest.status
                      )}`}
                    >
                      {viewRequest.status}
                    </b>
                  </p>
                </div>
              ) : (
                <div className={"flex flex-col items-center"}>
                  {errMsg ? (
                    <div className="w-[100%] bg-red-500 rounded-md mb-[10px] flex justify-between">
                      <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                        Please enter a message or insert a file!
                      </p>
                      <button
                        className="px-[10px] text-white"
                        onClick={() => setErrMsg(!errMsg)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : null}
                  <div className="relative w-full">
                    <textarea
                      id="message"
                      name="message"
                      multiple
                      rows={1}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="p-4 resize-none pb-12 border-0 block w-full rounded-t-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-0 focus:border-[#b7e4c7]"
                      placeholder="Input response..."
                    ></textarea>

                    <div className="overflow-x-auto">
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

                    <div className="p-2 rounded-b-md bg-[#b7e4c7]">
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
                            className="p-2 hover:rounded-full hover:bg-white focus:shadow-outline focus:outline-none"
                          >
                            <IoIosAttach size={24} className="text-[#2d6a4f]" />
                          </button>
                        </div>

                        <div className="flex items-center gap-x-1">
                          <button
                            type="submit"
                            onClick={handleOnSend}
                            disabled={onSend}
                            className="inline-flex flex-shrink-0 justify-center items-center rounded-lg p-2 gap-2 text-[#2d6a4f] hover:bg-white hover:rounded-full  "
                          >
                            {onSend ? (
                              <div
                                class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                                role="status"
                                aria-label="loading"
                              >
                                <span class="sr-only">Loading...</span>
                              </div>
                            ) : (
                              <IoSend size={24} className="flex-shrink-0 " />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRequestModal;
