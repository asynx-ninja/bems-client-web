import { React, useState, useRef } from "react";
import { IoIosAttach } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import Dropbox from "./Dropbox";
import API_LINK from "../../../config/API";
import axios from "axios";

const ComposeModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fileInputRef = useRef();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [upload, setUpload] = useState(false);
  const [createFiles, setCreateFiles] = useState([]);
  const [composeMessage, setComposeMessage] = useState({
    name: "",
    email: "",
    compose: {
      subject: "",
      message: "",
      date: new Date(),
      to: "",
    },
    brgy: brgy,
  })

  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
  };

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

  // console.log(composeMessage)

  const handleOnSend = async (e) => {
    e.preventDefault();

    try {
      var formData = new FormData()
      formData.append("inquiries", JSON.stringify(composeMessage))
      for (let i = 0; i < createFiles.length; i++) {
        formData.append("files", createFiles[i])
      }

      const response = await axios.post(`${API_LINK}/inquiries/`, formData)

      // console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(composeMessage)

  return (
    <div>
      <div className="">
        <div
          id="hs-modal-compose"
          className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
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
              <div className="mt-5">
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
                        className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
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
                        className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
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
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
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
                      onChange={handleOnCompose}
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="" disabled>-- Select Recipient --</option>
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
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="m-[10px] w-full">
                    <div class="flex items-center">
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
                  onClick={handleOnSend}
                  className="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                  data-hs-overlay="#hs-modal-compose"
                >
                  Send
                </button>
                <button
                  type="button"
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
    </div>
  );
}

export default ComposeModal;
