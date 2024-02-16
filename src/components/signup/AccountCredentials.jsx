import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const AccountCredentials = ({ formData, empty, emptyFields, restrict, handleChange, passwordError, passwordStrengthError, passwordMatchSuccess, passwordStrengthSuccess, showError, passwordStrength, duplicateError, successReg, termsAccepted, setTermsAccepted, policyAccepted, setPolicyAccepted, handleSubmit, handleNextPage }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [repasswordShown, setRePasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const RetogglePassword = () => {
        setRePasswordShown(!repasswordShown);
    };

    return (
        <div className="sm:w-[80%] md:w-9/12 lg:w-9/12">
            {successReg && (
                <div
                    className="bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4 mt-2 mb-4"
                    role="alert"
                >
                    <span className="font-bold">Success:</span> Registered
                    Successfully
                </div>
            )}
            {empty && (
                <div
                    className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
                    role="alert"
                >
                    <span className="font-bold">Warning:</span> Please fill-out all
                    fields!
                </div>
            )}
            {showError && (
                <div
                    className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
                    role="alert"
                >
                    <span className="font-bold">Warning:</span> Please read both the
                    Terms of Use and Data Privacy Policy!
                </div>
            )}

            {duplicateError && (
                <div
                    className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 mt-2 mb-4"
                    role="alert"
                >
                    <span className="font-bold">Warning:</span> Username or email
                    already exists.
                </div>
            )}

            <h1 className="py-3 mb-3 font-bold">Step 4: Credentials</h1>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    required
                    type="text"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your username"
                />
            </div>
            <div className="relative z-0 w-full mb-3 group">
                <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your email"
                />
            </div>
            <div className="flex sm:flex-col md:flex-row md:gap-4">
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        value={formData.password || ""}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter password"
                    />
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute top-0 right-0 p-2.5 mt-1 text-sm font-medium text-white"
                    >
                        {passwordShown ? (
                            <AiOutlineEye style={{ color: "green" }} size={20} />
                        ) : (
                            <AiOutlineEyeInvisible style={{ color: "green" }} size={20} />
                        )}
                    </button>
                </div>
                <div className="relative z-0 w-full mb-3 group">
                    <input
                        type={repasswordShown ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword || ""}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Re-enter password"
                    />
                    <button
                        type="button"
                        onClick={RetogglePassword}
                        className="absolute top-0 right-0 p-2.5 mt-1 text-sm font-medium text-white"
                    >
                        {repasswordShown ? (
                            <AiOutlineEye style={{ color: "green" }} size={20} />
                        ) : (
                            <AiOutlineEyeInvisible style={{ color: "green" }} size={20} />
                        )}
                    </button>
                </div>
            </div>
            {/* //password error messages */}
            {formData.password && (
                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                    <div
                        className={`flex flex-col justify-center overflow-hidden ${passwordStrength < 25
                            ? "bg-red-500"
                            : passwordStrength < 50
                                ? "bg-yellow-500"
                                : passwordStrength < 75
                                    ? "bg-amber-500"
                                    : passwordStrength < 100
                                        ? "bg-blue-500"
                                        : "bg-green-500"
                            }`}
                        role="progressbar"
                        style={{ width: `${passwordStrength}%` }}
                        aria-valuenow={passwordStrength}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>
            )}
            {passwordStrengthSuccess && (
                <div
                    className="bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4 mt-2"
                    role="alert"
                >
                    <span className="font-bold">Sucess:</span> Password is already
                    strong
                </div>
            )}
            {passwordMatchSuccess && (
                <div
                    className="bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4 mt-2"
                    role="alert"
                >
                    <span className="font-bold">Sucess:</span> Password match
                </div>
            )}
            {passwordStrengthError && passwordStrength < 100 && (
                <div
                    className="bg-orange-50 border border-orange-200 text-sm text-orange-600 rounded-md p-4 mt-2"
                    role="alert"
                >
                    <span className="font-bold">Warning:</span> Password must contain
                    at least 8 characters, one uppercase letter, one lowercase letter,
                    one number, and one special character
                </div>
            )}
            {passwordError && (
                <div
                    className="bg-orange-50 border border-orange-200 text-sm text-orange-600 rounded-md p-4 mt-2"
                    role="alert"
                >
                    <span className="font-bold">Warning:</span> Passwords do not
                    match!
                </div>
            )}
            <hr className="w[10px]"></hr>

            <div className="relative z-0 px-2 w-full mt-3 mb-3 group">
                <div className="flex gap-x-6">
                    <div className="flex">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                            className="shrink-0 mt-0.5 border-gray-200 rounded text-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            id="hs-checkbox-group-1"
                        />
                        <label
                            htmlFor="hs-checkbox-group-1"
                            className="text-sm text-black ml-3 dark:text-gray-400"
                        >
                            I have read and understood the{" "}
                            <span className="font-bold">Terms of Use.</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="relative px-2 z-0 w-full mt-3 mb-3 group">
                <div className="flex gap-x-6">
                    <div className="flex">
                        <input
                            type="checkbox"
                            name="policy"
                            checked={policyAccepted}
                            onChange={() => setPolicyAccepted(!policyAccepted)}
                            className="shrink-0 mt-0.5 border-gray-200 rounded text-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            id="hs-checkbox-group-1"
                        />
                        <label
                            htmlFor="hs-checkbox-group-1"
                            className="text-sm text-black ml-3 dark:text-gray-400"
                        >
                            I have read and understood the{" "}
                            <span className="font-bold">Data Privacy Policy.</span>
                        </label>
                    </div>
                </div>
            </div>
            <p className="text-black text-sm px-2">
                By clicking on the register button below, I hereby agree to both the
                <span className="font-bold"> Terms of Use</span> and{" "}
                <span className="font-bold">Data Privacy Policy</span>.
            </p>

            <div className='flex gap-5'>
                <button
                    onClick={handleNextPage}
                    name='Verification'
                    className="w-full mt-5 text-center text-black hover:text-white border-[1px] bg-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    name='Credentials'
                    className="w-full mt-5 text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AccountCredentials