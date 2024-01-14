import React from 'react'

const PersonalInfo = ({ formData, empty, emptyFields, restrict, handleChange, handleNextPage }) => {

    const religions = [
        "Roman Catholic",
        "Islam",
        "Iglesia ni Cristo",
        "Philippine Independent Church (Aglipayan)",
        "Seventh-day Adventist",
        "Bible Baptist Church",
        "United Church of Christ in the Philippines",
        "Jehovah Witnesses",
        "Church of Christ",
        "Born Again",
        "Other Religous Affiliation",
        // Add more religions here...
    ];

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
            {restrict && (
                <div
                    className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
                    role="alert"
                >
                    <span className="font-bold">Warning:</span> Age must be
                    18 and above to Register.
                </div>
            )}
            <h1 className="py-3 mb-3 font-bold">Step 1: Personal Information</h1>
            <div className="flex sm:flex-col md:flex-row md:gap-4">
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter your firstname"
                    />
                </div>
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter your lastname"
                    />
                </div>
            </div>
            <div className="flex sm:flex-col md:flex-row md:gap-4">
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter your middle name"
                    />
                </div>
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="text"
                        name="suffix"
                        value={formData.suffix}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter your suffix (optional)"
                    />
                </div>
            </div>
            <div className="flex sm:flex-col md:flex-row md:gap-4">
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                    />
                </div>
                <div className="relative z-0 w-full mb-3 group">
                    <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        defaultValue={""}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                >
                    <option disabled={formData.religion !== ""} value="">
                        Select Religion
                    </option>
                    {religions.map((religion) => (
                        <option value={religion}>{religion}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleNextPage}
                type="submit"
                name='Address'
                className="w-full mt-5 text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Next
            </button>
        </div>
    )
}

export default PersonalInfo