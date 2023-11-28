import { React, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../../config/API";
import axios from "axios";

const ReservationModal = ({ eventId, announcement }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const brgy = searchParams.get("brgy");
    const [message, setMessage] = useState({
        success: false,
        error: false,
        message: ""
    })
    const [reservationDetails, setReservationDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        brgy: brgy,
    })

    // console.log(announcement)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${API_LINK}/users/specific/${id}`);
                if (res.status === 200) {
                    setReservationDetails({
                        firstName: res.data[0].firstName,
                        lastName: res.data[0].lastName,
                        email: res.data[0].email,
                        contact: res.data[0].contact,
                        brgy: brgy,
                    });
                } else {
                    setError("Invalid username or password");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [])

    const handleOnReservation = (e) => {
        setReservationDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSend = async () => {
        const attendees = [...announcement.attendees]

        const alreadyReserved = attendees.find(attendee => attendee.email === reservationDetails.email);

        if (alreadyReserved === undefined || alreadyReserved.length === 0) {
            try {
                const response = await axios.patch(`${API_LINK}/announcement/attendees/${eventId}`, reservationDetails)

                setMessage({
                    success: true,
                    error: false,
                    message: "You've succesfully reserved a slot! Please check your email for further information."
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            setMessage({
                success: false,
                error: true,
                message: "The email you've provided is already registered!"
            })
        }
    }

    return (
        <div>
            <div className="">
                <div
                    id="hs-modal-reservation"
                    className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
                >
                    {/* Modal */}
                    <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto rounded-t-2xl">
                        <div className="flex flex-col bg-white shadow-sm rounded-2xl">
                            {/* Header */}
                            <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-custom-green-button to-custom-green-header overflow-hidden rounded-t-2xl">
                                <h3
                                    className="font-bold text-white mx-auto md:text-xl text-center"
                                    style={{ letterSpacing: "0.3em" }}
                                >
                                    RESERVATION
                                </h3>
                            </div>
                            <div>
                                <div className="p-2">
                                    {
                                        message.success ? (
                                            <div className="w-[100%] bg-green-400 rounded-md mb-[10px] flex">
                                                <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">{message.message}</p>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        message.error ? (
                                            <div className="w-[100%] bg-red-500 rounded-md mb-[10px] flex">
                                                <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">{message.message}</p>
                                            </div>
                                        ) : null
                                    }
                                </div>
                                <form>
                                    <div className="flex flex-col">
                                        <div className="mb-4 px-4 w-full">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                value={reservationDetails.firstName || ""}
                                                type="text"
                                                id="title"
                                                onChange={handleOnReservation}
                                                name="firstName"
                                                className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
                                            />
                                        </div>
                                        <div className="mb-4 px-4 w-full">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                value={reservationDetails.lastName || ""}
                                                type="text"
                                                id="title"
                                                onChange={handleOnReservation}
                                                name="lastName"
                                                className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="mb-4 px-4 w-full">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email
                                            </label>
                                            <input
                                                value={reservationDetails.email || ""}
                                                type="text"
                                                id="title"
                                                onChange={handleOnReservation}
                                                name="email"
                                                className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
                                            />
                                        </div>
                                        <div className="mb-4 px-4 w-full">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Contact#:
                                            </label>
                                            <input
                                                value={reservationDetails.contact || ""}
                                                type="text"
                                                id="title"
                                                onChange={handleOnReservation}
                                                name="contact"
                                                className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={handleOnSend}
                                    className="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm align-middle"
                                >
                                    Send
                                </button>
                                <button
                                    type="button"
                                    className="h-[2.5rem] w-[9.5rem] py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-pink-800 text-white shadow-sm align-middle"
                                    data-hs-overlay="#hs-modal-reservation"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationModal;
