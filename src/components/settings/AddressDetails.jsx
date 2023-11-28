const AddressDetails = ({ userAddress, editButton, handleUserChangeAdd }) => {

    return (
        <div>
            <div className="w-full border-b-[2px] border-black my-5">
                <h6 className="font-bold">ADDRESS DETAILS</h6>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                <div>
                    <label
                        htmlFor="street"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Street
                    </label>
                    <input
                        type="text"
                        disabled={editButton}
                        id="street"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Street"
                        aria-describedby="hs-input-helper-text"
                        value={userAddress.street || ""}
                        onChange={(e) =>
                            handleUserChangeAdd("street", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="brgy"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        Barangay
                    </label>
                    <select
                        disabled={editButton}
                        id="brgy"
                        name="brgy"
                        value={userAddress.brgy || ""}
                        onChange={(e) =>
                            handleUserChangeAdd("brgy", e.target.value)
                        }
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                    >
                        <option selected>{userAddress.brgy}</option>
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
                <div>
                    <label
                        htmlFor="city"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                        City
                    </label>
                    <select
                        id="city"
                        name="city"
                        disabled={editButton}
                        readOnly
                        value={userAddress.city || ""}
                        onChange={(e) =>
                            handleUserChangeAdd("city", e.target.value)
                        }
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                    >
                        <option selected>Montalban</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default AddressDetails