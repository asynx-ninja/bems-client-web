import OccupationList from "../../components/occupations/OccupationList";

const OtherPersonalData = ({ userData, userSocials, handleUserDataChange, handleUserSocials, editButton, empty}) => {

    return (
        <div>
            <div>
                <div className="w-full border-b-[2px] border-black my-5">
                    <h6 className="font-bold">OTHER PERSONAL DATA</h6>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                    <div>
                        <label
                            htmlFor="occupation"
                            className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                            Occupation
                        </label>
                        <div className="relative z-0 w-full mb-3 group">
                            <OccupationList
                                handleUserDataChange={handleUserDataChange}
                                occupation={userData.occ}
                                editButton={editButton}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                            * Head of the Family?
                        </label>
                        <div className="flex items-center">
                            <input
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                                disabled={editButton}
                                id="isHeadYes"
                                name="isHead"
                                type="radio"
                                value={1}
                                checked={userData.isHead}
                                onChange={(e) => handleUserDataChange("isHead", true)}
                            />
                            <label htmlFor="male" className="ml-2">
                                Yes
                            </label>
                            <input
                                className="ml-4 shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                                disabled={editButton}
                                id="isHeadNo"
                                name="isHead"
                                type="radio"
                                value={0}
                                checked={!userData.isHead}
                                onChange={(e) =>
                                    handleUserDataChange("isHead", false)
                                }
                            />
                            <label className="ml-2">No</label>
                        </div>
                    </div>
                    <div>
                        <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                            * Registered Voter
                        </label>
                        <div className="flex items-center">
                            <input
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                                disabled={editButton}
                                id="isVoterYes"
                                name="isVoter"
                                type="radio"
                                value={1}
                                checked={userData.isVoter}
                                onChange={(e) =>
                                    handleUserDataChange("isVoter", true)
                                }
                            />
                            <label htmlFor="male" className="ml-2">
                                Yes
                            </label>
                            <input
                                disabled={editButton}
                                className="ml-4 shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                                id="isVoterNo"
                                name="isVoter"
                                type="radio"
                                value={0}
                                checked={!userData.isVoter}
                                onChange={(e) =>
                                    handleUserDataChange("isVoter", false)
                                }
                            />
                            <label className="ml-2">No</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* SOCIALS */}

            <div className={editButton ? "hidden" : "block"}>
                <div className="w-full border-b-[2px] border-black my-5">
                    <h6 className="font-bold">SOCIALS</h6>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-3 p-2">
                        <div>
                            <label
                                htmlFor="facebook-name"
                                className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                                Facebook Name
                            </label>
                            <input
                                id="facebook-name"
                                type="text"
                                value={userSocials.facebook.name || ""}
                                disabled={editButton}
                                onChange={(e) => {
                                    handleUserSocials(
                                        "facebook",
                                        "name",
                                        e.target.value
                                    );
                                }}
                                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                aria-describedby="hs-input-helper-text"
                                placeholder="Enter your Facebook Link"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="facebook-link"
                                className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                                Facebook Link
                            </label>
                            <input
                                type="text"
                                id="facebook-link"
                                value={userSocials.facebook.link || ""}
                                disabled={editButton}
                                onChange={(e) => {
                                    handleUserSocials(
                                        "facebook",
                                        "link",
                                        e.target.value
                                    );
                                }}
                                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                aria-describedby="hs-input-helper-text"
                                placeholder="Enter your Facebook Link"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-2 sm:border-[0px] sm:border-t-[1px] sm:border-b-[1px] md:border-t-[0px] md:border-b-[0px] md:border-l-[1px] md:border-r-[1px] border-green-300">
                        <div>
                            <label
                                htmlFor="instagram-name"
                                className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                                Instagram Name
                            </label>
                            <input
                                id="instagram-name"
                                type="text"
                                value={userSocials.instagram.name || ""}
                                disabled={editButton}
                                onChange={(e) => {
                                    handleUserSocials(
                                        "instagram",
                                        "name",
                                        e.target.value
                                    );
                                }}
                                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                aria-describedby="hs-input-helper-text"
                                placeholder="Enter your Facebook Link"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="instagram-link"
                                className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                                Instagram Link
                            </label>
                            <input
                                id="instagram-link"
                                type="text"
                                value={userSocials.instagram.link || ""}
                                disabled={editButton}
                                onChange={(e) => {
                                    handleUserSocials(
                                        "instagram",
                                        "link",
                                        e.target.value
                                    );
                                }}
                                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                aria-describedby="hs-input-helper-text"
                                placeholder="Enter your Facebook Link"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-2">
                        <div>
                            <label
                                htmlFor="twitter-name"
                                className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                                Twitter Name
                            </label>
                            <input
                                id="twitter-name"
                                type="text"
                                value={userSocials.twitter.name || ""}
                                disabled={editButton}
                                onChange={(e) => {
                                    handleUserSocials(
                                        "twitter",
                                        "name",
                                        e.target.value
                                    );
                                }}
                                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                aria-describedby="hs-input-helper-text"
                                placeholder="Enter your Facebook Link"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="twitter-link"
                                className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                                Twitter Link
                            </label>
                            <input
                                id="twitter-link"
                                type="text"
                                value={userSocials.twitter.link || ""}
                                disabled={editButton}
                                onChange={(e) => {
                                    handleUserSocials(
                                        "twitter",
                                        "link",
                                        e.target.value
                                    );
                                }}
                                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                aria-describedby="hs-input-helper-text"
                                placeholder="Enter your Facebook Link"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherPersonalData