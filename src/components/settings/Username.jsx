import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Username = ({ userCred, handleUserChangeCred, editButton, message, passwordStrengthError, passwordStrengthSuccess, passwordStrength, empty }) => {
    const [changePass, setChangePass] = useState(false);
    const [newpasswordShown, setNewPasswordShown] = useState(false);
    const [oldpasswordShown, setOldPasswordShown] = useState(false);

    const toggleOldPassword = (e) => {
        setOldPasswordShown(!oldpasswordShown);
    };

    const toggleNewPassword = (e) => {
        setNewPasswordShown(!newpasswordShown);
    };

    return (
        <div className="flex flex-col w-[80%] justify-center mx-auto gap-4">
            <div className={message.display ? "block" : "hidden"}>
                <div
                    className={
                        message.success
                            ? "w-[100%] bg-green-400 rounded-md flex"
                            : "hidden"
                    }
                >
                    <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                        {message.message}
                    </p>
                </div>
                <div
                    className={
                        message.error
                            ? "w-[100%] bg-red-500 rounded-md flex"
                            : "hidden"
                    }
                >
                    <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                        {message.message}
                    </p>
                </div>
            </div>
            <div className={"flex flex-col"}>
                <label
                    htmlFor="username"
                    className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                    Username
                </label>
                <input
                    type="text"
                    disabled={editButton}
                    id="username"
                    className={empty ? "py-3 px-4 block w-full border-1 border-red-200 text-black rounded-md text-sm focus:border-red-500 focus:ring-red-500 bg-white"
                        : "py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"} placeholder="username"
                    aria-describedby="hs-input-helper-text"
                    value={userCred.username || ""}
                    onChange={(e) =>
                        handleUserChangeCred("username", e.target.value)
                    }
                />
            </div>

            <div className="relative z-0">
                <label
                    htmlFor="oldpass"
                    className="block sm:text-xs lg:text-sm font-medium mb-2"
                >
                    Enter your old password
                </label>
                <input
                    type={oldpasswordShown ? "text" : "password"}
                    disabled={editButton}
                    id="oldpass"
                    className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                    placeholder="password"
                    aria-describedby="hs-input-helper-text"
                    onChange={(e) =>
                        handleUserChangeCred("oldPass", e.target.value)
                    }
                />
                <button
                    name="old"
                    type="button"
                    onClick={toggleOldPassword}
                    className="absolute right-2 sm:top-5 lg:top-7 p-2.5 mt-1 text-sm font-medium text-white"
                >
                    {oldpasswordShown ? (
                        <AiOutlineEye style={{ color: "green" }} size={20} />
                    ) : (
                        <AiOutlineEyeInvisible
                            style={{ color: "green" }}
                            size={20}
                        />
                    )}
                </button>
            </div>
        </div>
    )
}

export default Username