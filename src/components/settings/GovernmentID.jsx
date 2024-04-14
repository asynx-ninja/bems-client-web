import {
    FaCamera,
    FaPlusCircle
} from "react-icons/fa";
import { useState } from "react";

import DropboxPrimary from "./verification/DropboxPrimary";
import DropboxSecondary from "./verification/DropboxSecondary";


const GovernmentID = ({ userData, setUserData, editButton, handleAddPrimaryID, handleAddSecondaryID, fileInputPrimaryIDRef, fileInputSecondaryIDRef, handleFileChange, totalProcessedFiles, setTotalProcessedFiles, WebcamCapture, setViewerVisible, setSelectedImage, setCapturedImage }) => {
    const userDeets = userData && userData.verification !== undefined ? userData.verification : ""
    const [addID, setAddID] = useState(false)
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

    const handleAddNew = () => {
        setAddID(!addID)
    }

    const handleIDType = (field, value) => {
        setUserData((prev) => ({
            ...prev,
            verification: {
                ...prev.verification,
                [field]: value
            }
        }))
    }

    return (
        <div>
            <div className="w-full border-b-[2px] border-black my-5">
                <h6 className="font-bold">VERIFICATION</h6>
            </div>
            <div className="relative lg:w-full grid gap-10 grid-cols-1 m-auto justify-end items-end">

                <div className={"flex flex-col gap-5"}>

                    <div className="mt-5">
                        <h1 className="font-bold mt-[5px] text-center">Primary ID</h1>
                    </div>
                    <div className={"relative w-full flex flex-col m-auto justify-center items-center"}>
                        <div className="w-[70%]">
                            <select
                                disabled={editButton}
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
                            setUserData={setUserData}
                            editButton={editButton}
                        />
                    </div>
                    <div
                        className={editButton ? "hidden" : "block bg-custom-green-button text-white rounded-lg mx-auto mt-1"}
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
                            disabled={editButton}
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
                        <div className="w-[70%]">
                            <select
                                disabled={editButton}
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
                            setUserData={setUserData}
                            editButton={editButton}
                        />
                    </div>
                    <div
                        className={editButton ? "hidden" : "block bg-custom-green-button text-white rounded-lg mx-auto mt-1"}
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
                            disabled={editButton}
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

            <div className="flex flex-col items-center space-y-2 relative my-10">
                <div className="w-full text-center">
                    <label
                        className="block text-sm font-bold mb-2 mt-2"
                        htmlFor="name"
                    >
                        Selfie of the Resident
                    </label>
                </div>

                <div className="w-full">
                    {editButton ? (
                        <div></div>
                    ) : (
                        <div className="flex flex-col">
                            {capture ? (
                                <button
                                    type="button"
                                    className="h-[2.5rem] mx-auto py-1 px-6 gap-2 rounded-md borde text-sm font-base text-white shadow-sm mb-2"
                                    onClick={handleOnCapture}
                                    style={{
                                        background: '#B95252'
                                    }}
                                >
                                    CANCEL
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="h-[2.5rem] mx-auto py-1 px-6 gap-2 rounded-md border text-sm font-base text-white shadow-sm mb-2"
                                    onClick={handleOnCapture}
                                    style={{
                                        background: '#268F26'
                                    }}
                                >
                                    TAKE A NEW PHOTO
                                </button>
                            )}

                            {!capture ? (
                                <div></div>
                            ) : (
                                <div>
                                    <WebcamCapture />
                                </div>
                            )}
                        </div>
                    )}

                    {userDeets.selfie &&
                        (Array.isArray(userDeets.selfie) ? (
                            userDeets.selfie.map((item, idx) => <></>)
                        ) : (
                            <div
                                className="md:w-[400px] md:h-[350px] border mx-auto border-gray-300 rounded-xl bg-gray-300 cursor-pointer mt-2"
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
                                    className="px-2 py-2 object-cover rounded-xl sm:w-full sm:h-[350px] md:w-[400px] md:h-[350px]"
                                />
                                <div className="text-black pb-2 ml-2 rounded-b-xl">
                                    {userDeets.selfie.name}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default GovernmentID