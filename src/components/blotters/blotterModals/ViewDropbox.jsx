import React, { useState, useRef, useEffect } from "react";
import { FaRegFileLines } from "react-icons/fa6";

const ViewDropbox = ({ viewFiles, responseItem }) => {
  const [isDragging, setIsDragging] = useState(false);

  function truncateFileName(fileName) {
    const maxLength = 20; // Maximum length of the displayed file name
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      const truncatedFileName =
        fileName.substring(0, maxLength / 2) +
        "..." +
        fileName.substring(fileName.length - maxLength / 2);
      return truncatedFileName;
    }
  }

  const checkExtension = (item) => {
    const fileExtension = item.split(".").pop().toLowerCase();

    return fileExtension;
  };

  const checkImage = (item) => {
    const fileExtension = checkExtension(item.name);

    if (
      fileExtension === "jpg" ||
      fileExtension === "png" ||
      fileExtension === "jpeg" ||
      fileExtension === "gif" ||
      fileExtension === "bmp"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
    setIsDragging(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.target.classList.remove("drag-over");
    setIsDragging(false);
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
    setIsDragging(true);
  };

  return (
    <div className="">
      <main className="container mx-auto h-auto">
        <article
          aria-label="File Upload Modal"
          className="relative h-full flex flex-col "
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDragEnter={dragEnterHandler}
        >
          <section
            className="h-full p-1 flex flex-row"
          >
            <ul
              id="gallery"
              className= "h-full p-1 flex flex-col gap-1"
            >
              {viewFiles && viewFiles.length > 0 ? (
                viewFiles.map((file, idx) => (
                  <li
                    className={
                      responseItem
                        ? "flex flex-col justify-end items-end"
                        : "flex flex-col justify-end items-start"
                    }
                    key={idx}
                    // onClick={() => handleFileClick(file)}
                  >
                    {checkImage(file) === true ? (
                      <article
                        tabIndex={0}
                        className="group sm:w-[80px] sm:h-[80px] lg:w-[150px] lg:h-[150px] object-cover rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative shadow-sm"
                      >
                        <a href={file.link}>
                          <img
                            className="sm:w-[80px] sm:h-[80px] lg:w-[150px] lg:h-[150px] object-cover rounded-md"
                            src={file.link}
                            alt=""
                          />
                        </a>
                      </article>
                    ) : (
                      <article
                        tabIndex={0}
                        // className={
                        //   responseItem
                        //     ? "flex flex-col justify-end items-end"
                        //     : "flex flex-col justify-end items-start"
                        // }
                        className="group rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 border border-gray-300 cursor-pointer shadow-sm"
                      >
                        <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 top-0 py-2 px-3">
                          <a
                            href={file.link}
                            target="_blank"
                            className="flex-1 relative group-hover:text-blue-800 truncate line-clamp-1 z-20 flex items-center"
                          >
                            <FaRegFileLines className="mr-1" />
                            {truncateFileName(file.name)}
                          </a>
                        </section>
                      </article>
                    )}
                  </li>
                ))
              ) : (
                <li
                  id="empty"
                  className="h-full w-full text-center flex flex-col items-center justify-center"
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

export default ViewDropbox;
