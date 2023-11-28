const PersonalInfo = ({userData, editButton, handleUserDataChange, birthdayFormat, calculateAge}) => {

    return (
        <div>
            <div className="w-full border-b-[2px] border-black mb-5">
                <h6 className="font-bold">PERSONAL DATA</h6>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                <div>
                    <label
                        htmlFor="fistName"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        First name
                    </label>
                    <input
                        disabled={editButton}
                        type="text"
                        id="firstname"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="First name"
                        value={userData.firstName || ""}
                        onChange={(e) =>
                            handleUserDataChange("firstName", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="middleName"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Middle name
                    </label>
                    <input
                        disabled={editButton}
                        type="text"
                        id="middleName"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="First name"
                        value={userData.middleName || ""}
                        onChange={(e) =>
                            handleUserDataChange("middleName", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="lastName"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Last name
                    </label>
                    <input
                        disabled={editButton}
                        id="lastName"
                        type="text"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Last name"
                        aria-describedby="hs-input-helper-text"
                        value={userData.lastName || ""}
                        onChange={(e) =>
                            handleUserDataChange("lastName", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label
                        htmlFor="suffix"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Suffix
                    </label>
                    <input
                        disabled={editButton}
                        id="suffix"
                        type="text"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Suffix"
                        aria-describedby="hs-input-helper-text"
                        value={userData.suffix || ""}
                        onChange={(e) =>
                            handleUserDataChange("suffix", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="gender"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Gender
                    </label>
                    <select
                        disabled={editButton}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Suffix"
                        aria-describedby="hs-input-helper-text"
                        id="gender"
                        name="gender"
                        value={userData.sex || ""}
                        onChange={(e) =>
                            handleUserDataChange("sex", e.target.value)
                        }
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="birthday"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Birthday
                    </label>
                    <input
                        type="date"
                        disabled={editButton}
                        id="birthday"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Birthday"
                        aria-describedby="hs-input-helper-text"
                        value={birthdayFormat(userData.birthday) || ""}
                        onChange={(e) =>
                            handleUserDataChange("birthday", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="age"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Age
                    </label>
                    <input
                        type="number"
                        disabled={editButton}
                        readOnly
                        id="age"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Suffix"
                        aria-describedby="hs-input-helper-text"
                        value={calculateAge(userData.birthday) || ""}
                    />
                </div>
                <div>
                    <label
                        htmlFor="phone"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Phone number
                    </label>
                    <input
                        type="text"
                        disabled={editButton}
                        id="phone"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="#"
                        aria-describedby="hs-input-helper-text"
                        value={userData.contact || ""}
                        onChange={(e) =>
                            handleUserDataChange("contact", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Email
                    </label>
                    <input
                        disabled={editButton}
                        type="email"
                        id="email"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="you@example.com"
                        aria-describedby="hs-input-helper-text"
                        value={userData.email || ""}
                        onChange={(e) =>
                            handleUserDataChange("email", e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo