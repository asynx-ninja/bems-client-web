import { useRef } from "react";
import {
    FaCamera,
    FaFacebook,
    FaEnvelope,
    FaPhone,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";

const Verification = ({ formData, empty, emptyFields, handleChange, handleNextPage }) => {
    const filePrimeIDRef = useRef()
    const fileSecIDRef = useRef()

    const handleAdd = (e) => {
        e.preventDefault();

        if (e.target.id === "primeID") {
            filePrimeIDRef.current.click();
        } else if (e.target.id === "secID") {
            fileSecIDRef.current.click();
        }

    };


    const handleFileChange = (e) => {
        e.preventDefault();

        if (e.target.id === "primary_input") {
            var primary = document.getElementById("primary");
            primary.src = URL.createObjectURL(e.target.files[0]);
            primary.onload = function () {
                URL.revokeObjectURL(primary.src); // free memory
            };
            // setGovID({
            //     primary: e.target.files[0],
            // });
        } else if (e.target.id = "secondary_input") {
            var secondary = document.getElementById("secondary");
            secondary.src = URL.createObjectURL(e.target.files[0]);
            secondary.onload = function () {
                URL.revokeObjectURL(secondary.src); // free memory
            };
            // setGovID({
            //     secondary: e.target.files[0]
            // })
        }
    };

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
            <div className="relative lg:w-full grid sm:grid-cols-1 md:grid-cols-2 gap-5 m-auto justify-center items-center mb-5">
                <div className="relative lg:w-full flex flex-col m-auto justify-center items-center">
                    <div className="absolute top-[75px] w-full h-[150px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center items-center">
                        <label
                            htmlFor="primary_input"
                            id="primeID"
                            onClick={handleAdd}
                            className="flex justify-center items-center text-transparent w-full h-full font-medium rounded-xl text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60 cursor-pointer"
                        >
                            <FaCamera
                                size={50}
                                style={{ color: "#ffffff" }}
                                className="cursor-none m-auto"
                            />
                        </label>
                        <input
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
                        className="w-[300px] h-[150px] rounded-xl sm:mb-3 lg:mb-0 border-[1px] border-[#295141] object-cover"
                    />
                    <div>
                        <h1 className="font-bold mt-[5px]">Primary ID</h1>
                    </div>
                    <div className="w-[90%]">
                        <select
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
                    <div className="absolute top-[75px] w-full h-[150px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center items-center">
                        <label
                            htmlFor="secondary_input"
                            id="secID"
                            onClick={handleAdd}
                            className="flex justify-center items-center text-transparent w-full h-full font-medium rounded-xl text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60 cursor-pointer"
                        >
                            <FaCamera
                                size={50}
                                style={{ color: "#ffffff" }}
                                className="cursor-none m-auto"
                            />
                        </label>
                        <input
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
                        className="w-[300px] h-[150px] rounded-xl sm:mb-3 lg:mb-0 border-[1px] border-[#295141] object-cover"
                    />
                    <div>
                        <h1 className="font-bold mt-[5px]">Secondary ID</h1>
                    </div>
                    <div className="w-[90%]">
                        <select
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
            <div className='flex gap-5'>
                <button
                    onClick={handleNextPage}
                    name='Address'
                    className="w-full mt-5 text-center text-black hover:text-white border-[1px] bg-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Back
                </button>
                <button
                    type="submit"
                    onClick={handleNextPage}
                    name='Credentials'
                    className="w-full mt-5 text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Verification