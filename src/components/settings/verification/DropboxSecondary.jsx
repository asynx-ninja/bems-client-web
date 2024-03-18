import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DropboxSecondary = ({ viewFiles, setUserData, editButton }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isImage, setIsImage] = useState(false)
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const checkExtension = (item) => {
    const fileExtension = item.split('.').pop().toLowerCase();

    return fileExtension
  }

  const viewImage = (file) => {
    var verificationID = URL.createObjectURL(file);

    return verificationID
  }

  const handleDelete = (idx) => {
    // setViewFiles((prev) => prev.filter((_, index) => index !== idx));
    setUserData((prev) => ({
      ...prev,
      verification: {
        ...prev.verification,
        secondary_file: prev.verification.secondary_file.filter((_, index) => index !== idx)
      }
    }))
  };

  const handleFileClick = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="">
      <main className="container mx-auto h-auto px-1">
        <article
          aria-label="File Upload Modal"
          className="relative h-full flex flex-col "
        >
          {isDragging && (
            <div
              id="overlay"
              className="w-full h-full bg-opacity-75 bg-gray-100 absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
            >
              <i>{/* SVG code */}</i>
              <p className="text-lg text-blue-700">Drop files to upload</p>
            </div>
          )}
          <section className="h-full overflow-auto p-1 w-full flex flex-col">
            <ul id="gallery" className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 items-center">
              {viewFiles && viewFiles.length > 0 ? (
                viewFiles.map((file, idx) => (
                  <li
                    className="h-full w-full"
                    key={idx}
                  >
                    <article
                      tabIndex={0}
                      className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm"
                    >
                      <img
                        alt="upload preview"
                        className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed"
                      />
                      <section className="flex flex-col rounded-md text-xs break-words w-full h-full">
                        <div className="flex flex-col justify-center items-center">
                          <article
                            tabIndex={0}
                            className="group rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer shadow-sm"
                          >
                            <a
                              href={file.link}
                            >
                              <img
                                className="w-[400px] h-[150px] object-cover rounded-t-md"
                                src={file.link ? file.link : viewImage(file)}
                                alt="" />
                            </a>
                          </article>
                          <div className="flex justify-between items-center w-full bg-custom-green-button py-2 px-3 rounded-b-md">
                            <h1 className="flex-1 group-hover:text-white line-clamp-1 text-white">
                              {file.name}
                            </h1>
                            <button
                              className={editButton ? "hidden" : "delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-red-500"}
                              onClick={(e) => handleDelete(idx, e)}
                            >
                              <svg
                                className="pointer-events-none fill-current w-4 h-4 ml-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className="pointer-events-none"
                                  d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </section>
                    </article>
                  </li>
                ))
              ) : (
                <li
                  id="empty"
                  className="h-full w-full text-center flex flex-col items-center justify-center col-span-2"
                >
                  <img
                    className="mx-auto w-32"
                    src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                    alt="no data"
                  />
                  <span className="text-small text-gray-500">
                    No files Attached
                  </span>
                </li>
              )}
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
};

export default DropboxSecondary;