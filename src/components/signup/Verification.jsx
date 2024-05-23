import { useRef } from "react";
import { useState } from "react";
import {
    FaCamera,
    FaPlusCircle
} from "react-icons/fa";

import DropboxPrimary from "../settings/verification/DropboxPrimary";
import DropboxSecondary from "../settings/verification/DropboxSecondary";

const Verification = ({ formData, setFormData, empty, emptyFields, handleAddPrimaryID, handleAddSecondaryID, fileInputPrimaryIDRef, fileInputSecondaryIDRef, handleFileChange, WebcamCapture, handleNextPage = { handleNextPage } }) => {
    const userDeets = formData !== undefined ? formData : ""
    const [editButton, setEditButton] = useState(false)
    const [upload, setUpload] = useState({
        primary: false,
        secondary: false,
    });
    const [capture, setCapture] = useState(false);

    const handleOnCapture = () => {
        setCapture(!capture);
    };

    const handleOnUpload = () => {
        setUpload({
            primary: !upload.primary,
            secondary: !upload.secondary
        });
    };

    const handleIDType = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div className="sm:w-[80%] md:w-9/12 lg:w-9/12">
            {empty && (
                <div
                    className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
                    role="alert"
                >
                    <span className="font-bold">Warning:</span> Please fill-out all
                    fields: {emptyFields.join(", ")}!
                </div>
            )}
            <h1 className="py-3 mb-3 font-bold">Step 3: Verification</h1>
            <div className="relative lg:w-full grid grid-cols-1 gap-5 m-auto justify-center items-center mb-5 h-[250px] overflow-y-auto">
                <div className="relative lg:w-full grid gap-10 grid-cols-1 m-auto justify-end items-end">

                    <div className={"flex flex-col gap-5"}>

                        <div className="mt-5">
                            <h1 className="font-bold mt-[5px] text-center">Primary ID</h1>
                        </div>
                        <div className={"relative w-full flex flex-col m-auto justify-center items-center"}>
                            <div className="w-full">
                                <select
                                    id="primary_id"
                                    name="primary_id"
                                    value={userDeets.primary_id || ""}
                                    onChange={(e) =>
                                        handleIDType("primary_id", e.target.value)
                                    }
                                    className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                >
                                    <option value="" disabled>Select Primary ID</option>
                                    <option>Philippine Passport</option>
                                    <option>SSS/GSIS/UMID</option>
                                    <option>Driver's License</option>
                                    <option>PRC ID</option>
                                    <option>OWWA ID</option>
                                    <option>iDOLE Card</option>
                                    <option>Voter's ID</option>
                                    <option>Voter's Certification</option>
                                    <option>Firearms License</option>
                                    <option>Senior Citizen ID</option>
                                    <option>PWD ID</option>
                                    <option>NBI Clearance</option>
                                    <option>Alien Certification of Registration or Immigrant Certificate of Registration</option>
                                    <option>PhilHealth ID</option>
                                    <option>GOCC ID</option>
                                    <option>IBP ID</option>
                                    <option>School ID</option>
                                    <option>Current Valid ePassport</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <DropboxPrimary
                                viewFiles={userDeets.primary_file}
                                setUserData={setFormData}
                                editButton={editButton}
                            />
                        </div>
                        <div
                            className={"block bg-custom-green-button text-white rounded-lg mx-auto mt-1"}
                        >
                            <button
                                className="flex gap-5 items-center py-2 px-5 justify-center"
                                id="button"
                                onClick={handleAddPrimaryID || handleOnUpload}
                            >
                                Please Insert your ID
                                <FaPlusCircle />
                            </button>
                            <input
                                type="file"
                                id="primary_input"
                                name="file"
                                onChange={(e) => handleFileChange("primary_file", e)}
                                ref={fileInputPrimaryIDRef}
                                accept="image/*"
                                multiple="multiple"
                                className="hidden"
                            />
                        </div>

                        <div className="mt-5">
                            <h1 className="font-bold mt-[5px] text-center">Secondary ID</h1>
                        </div>
                        <div className={"relative w-full flex flex-col m-auto justify-center items-center"}>
                            <div className="w-full">
                                <select
                                    id="secondary_id"
                                    name="secondary_id"
                                    value={userDeets.secondary_id || ""}
                                    onChange={(e) =>
                                        handleIDType("secondary_id", e.target.value)
                                    }
                                    className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                >
                                    <option value="" disabled>Select Secondary ID</option>
                                    <option>TIN ID</option>
                                    <option>Postal ID</option>
                                    <option>Barangay Certification</option>
                                    <option>GSIS e-Card</option>
                                    <option>Seaman's Book</option>
                                    <option>NCWDP Certification</option>
                                    <option>DSWD Certification</option>
                                    <option>Copmpany ID</option>
                                    <option>Police Clearance</option>
                                    <option>Barangay Clearance</option>
                                    <option>Cedula</option>
                                    <option>Government Service Record</option>
                                    <option>Elementary or High School Form 137 Records</option>
                                    <option>Transcript of Records from University</option>
                                    <option>Land Title</option>
                                    <option>PSA Marriage Contract</option>
                                    <option>PSA Birth Certificate</option>
                                    <option>Homeowner's Certification</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <DropboxSecondary
                                viewFiles={userDeets.secondary_file}
                                setUserData={setFormData}
                                editButton={editButton}
                            />
                        </div>
                        <div
                            className={"block bg-custom-green-button text-white rounded-lg mx-auto mt-1"}
                        >
                            <button
                                className="flex gap-5 items-center py-2 px-5 justify-center"
                                id="button"
                                onClick={handleAddSecondaryID || handleOnUpload}
                            >
                                Please Insert your ID
                                <FaPlusCircle />
                            </button>
                            <input
                                type="file"
                                id="primary_input"
                                name="file"
                                onChange={(e) => handleFileChange("secondary_file", e)}
                                ref={fileInputSecondaryIDRef}
                                accept="image/*"
                                multiple="multiple"
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-2 relative mt-10">
                    <div className="w-full text-center">
                        <label
                            className="block text-sm font-bold mb-2 mt-2"
                            htmlFor="name"
                        >
                            Selfie of the Resident
                        </label>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col">
                            {capture ? (
                                <button
                                    type="button"
                                    className="h-[2.5rem] mx-auto py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-900 text-white shadow-sm mb-2"
                                    onClick={handleOnCapture}
                                >
                                    CANCEL
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="h-[2.5rem] mx-auto py-1 px-6 gap-2 rounded-md border text-sm font-base bg-custom-green-button text-white shadow-sm mb-2"
                                    onClick={handleOnCapture}
                                >
                                    TAKE A NEW PHOTO
                                </button>
                            )}

                            {!capture ? (
                                <div></div>
                            ) : (
                                <div>
                                    <WebcamCapture setCapture={setCapture} />
                                </div>
                            )}
                        </div>
                        {userDeets.selfie &&
                            (Array.isArray(userDeets.selfie) ? (
                                userDeets.selfie.map((item, idx) => <></>)
                            ) : (
                                <div
                                    className="w-[400px] h-[350px] border mx-auto border-gray-300 rounded-xl bg-gray-300 cursor-pointer mt-2"
                                    onClick={() =>
                                        handleImageClick(userDeets.selfie)
                                    }
                                >
                                    <img
                                        src={
                                            userDeets.selfie instanceof File
                                                ? URL.createObjectURL(
                                                    userDeets.selfie
                                                )
                                                : userDeets.selfie.hasOwnProperty(
                                                    "link"
                                                )
                                                    ? userDeets.selfie.link
                                                    : userDeets.selfie.uri
                                        }
                                        alt={`Selfie`}
                                        className="px-2 py-2 object-cover rounded-xl"
                                    />
                                    <div className="text-black pb-2 ml-2 rounded-b-xl">
                                        {userDeets.selfie.name}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className='flex gap-5'>
                <button
                    onClick={handleNextPage}
                    name='Address'
                    className="w-full mt-5 text-center text-black hover:text-white border-[1px] bg-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
                >
                    Back
                </button>
                <button
                    type="submit"
                    onClick={handleNextPage}
                    name='Credentials'
                    className="w-full mt-5 text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Verification