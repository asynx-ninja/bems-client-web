import {
    FaCamera,
    FaFacebook,
    FaEnvelope,
    FaPhone,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";

const GovernmentID = ({ userData, editButton, handleAdd, empty, handleFileChange, filePrimeIDRef, fileSecIDRef, govID, setGovID }) => {

    return (
        <div>
            <div className="w-full border-b-[2px] border-black my-5">
                <h6 className="font-bold">VERIFICATION</h6>
            </div>
            <div className="relative lg:w-full grid gap-5 sm:grid-cols-1 md:grid-cols-2 m-auto justify-center items-center">
                <div className="relative lg:w-full flex flex-col m-auto justify-center items-center">
                    <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <label
                            htmlFor="primary_input"
                            id="primeID"
                            onClick={handleAdd}
                            className={
                                editButton
                                    ? "hidden"
                                    : "block text-transparent py-[70px] px-[120px] font-medium rounded-xl text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60 cursor-pointer"
                            }
                        >
                            <FaCamera
                                size={50}
                                style={{ color: "#ffffff" }}
                                className="cursor-none"
                            />
                        </label>
                        <input
                            disabled={editButton}
                            type="file"
                            id="primary_input"
                            name="file"
                            onChange={handleFileChange}
                            ref={filePrimeIDRef}
                            accept="image/*"
                            multiple="multiple"
                            className="hidden"
                        />
                    </div>
                    <img
                        id="primary"
                        className="w-[300px] h-[200px] rounded-xl sm:mb-3 lg:mb-0 border-[1px] border-[#295141] object-cover"
                    />
                    <div>
                        <h1 className="font-bold mt-[5px]">Primary ID</h1>
                    </div>
                    <div className="w-[90%]">
                        <select
                            disabled={editButton}
                            id="select_primary"
                            name="primaryID"
                            // value={userAddress.brgy || ""}
                            // onChange={(e) =>
                            //     handleUserChangeAdd("brgy", e.target.value)
                            // }
                            className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        >
                            {/* <option>{userAddress.brgy}</option> */}
                            <option value="philippinePassport">Philippine Passport</option>
                            <option value="philSysID">Philippine National ID (PhilSys ID)</option>
                            <option value="driversLicense">Driver's License</option>
                            <option value="umidCard">Unified Multi-Purpose ID (UMID)</option>
                            <option value="votersID">Voter's ID</option>
                            <option value="postalID">Postal ID</option>
                            <option value="sssID">Social Security System ID (SSS ID)</option>
                            <option value="gsisID">Government Service Insurance System ID (GSIS ID)</option>
                            <option value="pagibigID">Pag-IBIG Fund ID</option>
                            <option value="companyID">Company ID</option>
                            <option value="prcID">Professional Regulation Commission ID (PRC ID)</option>
                            <option value="ofwID">Overseas Filipino Worker ID (OFW ID)</option>
                            <option value="seniorCitizenID">Senior Citizen ID</option>
                            <option value="pwdID">Person with Disability ID (PWD ID)</option>
                            <option value="owwaID">Overseas Workers Welfare Administrator</option>
                            <option value="philID">PhilHealth ID</option>
                            <option value="studentID">Student ID</option>
                            <option value="alienCertificateOfRegistration">Alien Certificate of Registration (ACR)</option>
                        </select>
                    </div>
                </div>
                <div className="relative lg:w-full flex flex-col m-auto justify-center items-center">
                    <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <label
                            htmlFor="secondary_input"
                            id="secID"
                            onClick={handleAdd}
                            className={
                                editButton
                                    ? "hidden"
                                    : "block text-transparent py-[70px] px-[120px] font-medium rounded-xl text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60 cursor-pointer"
                            }
                        >
                            <FaCamera
                                size={50}
                                style={{ color: "#ffffff" }}
                                className="cursor-none"
                            />
                        </label>
                        <input
                            disabled={editButton}
                            type="file"
                            id="secondary_input"
                            name="file"
                            onChange={handleFileChange}
                            ref={fileSecIDRef}
                            accept="image/*"
                            multiple="multiple"
                            className="hidden"
                        />
                    </div>
                    <img
                        id="secondary"
                        className="w-[300px] h-[200px] rounded-xl sm:mb-3 lg:mb-0 border-[1px] border-[#295141] object-cover"
                    />
                    <div>
                        <h1 className="font-bold mt-[5px]">Secondary ID</h1>
                    </div>
                    <div className="w-[90%]">
                        <select
                            disabled={editButton}
                            id="select_secondary"
                            name="secondaryID"
                            // value={userAddress.brgy || ""}
                            // onChange={(e) =>
                            //     handleUserChangeAdd("brgy", e.target.value)
                            // }
                            className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        >
                            {/* <option>{userAddress.brgy}</option> */}
                            <option value="philHealthID">PhilHealth ID</option>
                            <option value="barangayClearance">Barangay Clearance</option>
                            <option value="nbiClearance">National Bureau of Investigation (NBI) Clearance</option>
                            <option value="policeClearance">Police Clearance</option>
                            <option value="studentID">Student ID</option>
                            <option value="birthCertificate">Birth Certificate (PSA/NSO)</option>
                            <option value="marriageCertificate">Marriage Certificate (PSA/NSO)</option>
                            <option value="baptismalCertificate">Baptismal Certificate</option>
                            <option value="transcriptOfRecords">Transcript of Records</option>
                            <option value="alienCertificateOfRegistration">Alien Certificate of Registration (ACR)</option>
                            <option value="seamanBook">Seaman's Book</option>
                            <option value="bankPassbook">Bank Passbook</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GovernmentID