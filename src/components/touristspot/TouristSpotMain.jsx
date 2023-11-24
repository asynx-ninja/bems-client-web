import { useLocation } from "react-router-dom";
import NavbarHome from "../global/NavbarHome";
import React, { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";

const TouristSpotMain = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const locations = queryParams.get("location");
  const details = queryParams.get("details");
  const image = queryParams.get("image");
  const image1 = queryParams.get("image1");
  const image2 = queryParams.get("image2");
  const image3 = queryParams.get("image3");

  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <NavbarHome />
      <div className="p-6 bg-white mb-12 rounded-lg shadow-md md:shadow-none max-w-4xl m-auto mt-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <Breadcrumbs/>
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-green-700">{name}</h1>
            <h2 className="text-xl leading-5 text-gray-600 mb-4">{locations}</h2>
          </div>
          {/* <Links to="/#tourist">
            <button className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 md:px-4 rounded">
              Back
            </button>
          </Links> */}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <img
            className="w-full h-32 object-cover rounded-lg cursor-pointer"
            src={image}
            alt={name}
            onClick={() => openImage(image)}
          />
          {/* Repeat for other images */}
          <img
            className="w-full h-32 object-cover rounded-lg cursor-pointer"
            src={image1}
            alt={name}
            onClick={() => openImage(image1)}
          />
          <img
            className="w-full h-32 object-cover rounded-lg cursor-pointer"
            src={image2}
            alt={name}
            onClick={() => openImage(image2)}
          />
          <img
            className="w-full h-32 object-cover rounded-lg cursor-pointer"
            src={image3}
            alt={name}
            onClick={() => openImage(image3)}
          />
          {selectedImage && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
              onClick={closeImage}
            >
              <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-md max-h-md rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
        {details.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
};

export default TouristSpotMain;
