import React from 'react'
import OccupationList from "../../components/occupations/OccupationList";

const Address = ({ formData, empty, emptyFields, restrict, handleChange, handleNextPage }) => {


    return (
        <div action="" className="sm:w-[80%] h-auto md:w-9/12 lg:w-9/12">
            {empty && (
                <div
                    className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
                    role="alert"
                >
                    <span className="font-bold">Warning:</span> Please fill-out all
                    fields: {emptyFields.join(", ")}!
                </div>
            )}
            <h1 className="py-3 mb-3 font-bold">
                Step 2: Other Personal Information
            </h1>
            <div className=" flex sm:flex-col md:flex-row md:gap-4">
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="number"
                        name="contact"
                        value={formData.contact || ""}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Contact number"
                    />
                </div>

                <div className="relative z-0 w-full mb-3 group">
                    <label
                        htmlFor="input-label"
                        className="block sr-only  text-sm font-medium mb-2 "
                    >
                        Barangay
                    </label>
                    <select
                        name="civil_status"
                        value={formData.civil_status || ""}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
                    >
                        <option value="" disabled>
                            Civil Status
                        </option>
                        <option>Single</option>
                        <option>Married</option>
                        <option>Widowed</option>
                        <option>Legally Separated</option>
                    </select>
                </div>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <OccupationList
                    handleChange={handleChange}
                    occupation={formData.occupation}
                />
            </div>
            <div className=" flex sm:flex-col md:flex-row md:gap-4">
                <div className="relative z-0 w-full mb-3 group">
                    <select
                        disabled
                        value={"Montalban"}
                        className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
                    >
                        <option value={"Montalban"}>Montalban</option>
                    </select>
                </div>
                <div className="relative z-0 w-full mb-3 group">
                    <label
                        htmlFor="input-label"
                        className="block sr-only  text-sm font-medium mb-2 "
                    >
                        Barangay
                    </label>
                    <select
                        name="brgy"
                        value={formData.brgy || ""}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
                    >
                        <option value="" disabled>
                            Select Barangay
                        </option>
                        <option>Balite</option>
                        <option>Burgos</option>
                        <option>Geronimo</option>
                        <option>Macabud</option>
                        <option>Manggahan</option>
                        <option>Mascap</option>
                        <option>Puray</option>
                        <option>Rosario</option>
                        <option>San Isidro</option>
                        <option>San Jose</option>
                        <option>San Rafael</option>
                    </select>
                </div>
            </div>

            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="text"
                    id="input-label"
                    name="street"
                    value={formData.street || ""}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
                    placeholder="Enter your address line"
                />
            </div>

            <hr className="w[10px]"></hr>

            <div className="flex md:flex-row sm:flex-col sm:gap-5 mb-3 mt-3 px-2 md:gap-x-20 lg:gap-x-20 justify-between">
                <div className="relative z-0 w-full group">
                    <label
                        htmlFor="input-label"
                        className="block text-xs font-medium mb-2 "
                    >
                        Are you a head of your household?
                    </label>
                    <div className="flex gap-x-6">
                        <div className="flex">
                            <input
                                type="radio"
                                name="isHead"
                                value="true"
                                onChange={handleChange}
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-green-500 "
                                id="hs-radio-group-1"
                                defaultChecked=""
                            />
                            <label
                                htmlFor="hs-radio-group-1"
                                className="text-sm text-gray-500 ml-2 "
                            >
                                Yes
                            </label>
                        </div>
                        <div className="flex">
                            <input
                                type="radio"
                                name="isHead"
                                value="false"
                                onChange={handleChange}
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-green-500 "
                                id="hs-radio-group-2"
                            />
                            <label
                                htmlFor="hs-radio-group-2"
                                className="text-sm text-gray-500 ml-2 "
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>

                <div className="relative z-0 w-full group ml-auto">
                    <label
                        htmlFor="input-label"
                        className="block text-xs font-medium mb-2 "
                    >
                        Are you a registered voter on Rodriguez Rizal?
                    </label>
                    <div className="flex gap-x-6">
                        <div className="flex">
                            <input
                                type="radio"
                                name="isVoter"
                                value="true"
                                onChange={handleChange}
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-green-500 "
                                id="radio-group-3"
                                defaultChecked=""
                            />
                            <label
                                htmlFor="radio-group-3"
                                className="text-sm text-gray-500 ml-2 "
                            >
                                Yes
                            </label>
                        </div>
                        <div className="flex">
                            <input
                                type="radio"
                                name="isVoter"
                                value="false"
                                onChange={handleChange}
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-green-500 "
                                id="radio-group-4"
                            />
                            <label
                                htmlFor="radio-group-4"
                                className="text-sm text-gray-500 ml-2 "
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-5'>
                <button
                    onClick={handleNextPage}
                    name='Personal'
                    className="w-full mt-5 text-center text-black hover:text-white border-[1px] bg-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
                >
                    Back
                </button>
                <button
                    onClick={handleNextPage}
                    type="submit"
                    name='Verification'
                    className="w-full mt-5 text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Address