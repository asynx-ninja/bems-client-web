import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EditDropbox = ({ files, setFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const dropHandler = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setFiles([...files, ...droppedFiles]);
    setIsDragging(false);
  };

  const checkExtension = (item) => {
    const fileExtension = item.split('.').pop().toLowerCase();

    return fileExtension
  }

  const checkImage = (item) => {
    const fileExtension = checkExtension(item.name)

    if (fileExtension === 'jpg' ||
      fileExtension === 'png' ||
      fileExtension === 'jpeg' ||
      fileExtension === 'gif' ||
      fileExtension === 'bmp') {

      return true
    } else {
      return false
    }
  }

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

  const handleAdd = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleDelete = (idx) => {
    setFiles((prev) => prev.filter((_, index) => index !== idx));
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
      <main className="container mx-auto max-w-screen-lg h-full mt-3 px-1">
        <article
          aria-label="File Upload Modal"
          className="relative h-full flex flex-col "
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDragEnter={dragEnterHandler}
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
            <h1 className="pb-3 text-sm font-medium text-gray-700">
              Files Attached:
            </h1>
            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              {files.length > 0 ? (
                files.map((file, idx) => (
                  <li
                    className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
                    key={idx}
                    onClick={() => handleFileClick(file)}
                  >
                    {
                      checkImage(file) === true ?
                        <article
                          tabIndex={0}
                          className="group w-[80px] h-[80px] object-cover rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm"
                        >
                          <a
                            href={file.link}
                          >
                            <img
                              className="w-[80px] h-[80px] object-cover rounded-md"
                              src={file.link}
                              alt="" />
                          </a>
                        </article>
                        :
                        <article
                          tabIndex={0}
                          className="group w-[80px] h-[80px] rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm"
                        >
                          <img
                            alt="upload preview"
                            className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed"
                          />
                          <section className="flex flex-col relative rounded-md text-xs break-words w-full h-full z-20 top-0 py-2 px-3">
                            <a
                              href={file.link}
                              target="_blank"
                              className="flex-1 group-hover:text-blue-800 line-clamp-1"
                            >
                              {file.name}
                            </a>
                            <div className="flex absolute right-0 left-0 top-0 bottom-0 opacity-50">
                              <span className="p-1 text-blue-800 m-auto">
                                <i>
                                  <svg
                                    className="fill-current w-[50px] h-[50px] pt-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                  </svg>
                                </i>
                              </span>
                            </div>
                          </section>
                        </article>
                    }
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
                    No files selected
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

export default EditDropbox;