import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const RequestList = ({ request, selectedItems, checkboxHandler, setViewRequest }) => {
    const location = useLocation()
    const page = location.pathname.split("/")[1]

    const DateFormat = (date) => {
        const dateFormat = date === undefined ? "" : date.substr(0, 10);
        return dateFormat;
    };

    const handleView = (item) => {
        setViewRequest(item);
    };

    return (
        Object.entries(request).map(([idx, item]) => (
            <tr key={idx} className="odd:bg-slate-100 text-center">
                <td className="px-6 py-3">
                    <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                        {item.service_id}
                    </span>
                </td>
                <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                            {item.form[0].lastName.value}, {item.form[0].firstName.value}
                        </span>
                    </div>
                </td>
                <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                        <span className="text-xs sm:text-sm text-black line-clamp-2">
                            {DateFormat(item.createdAt) || ""}
                        </span>
                    </div>
                </td>

                <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                        {item.status === "Completed" && (
                            <div className="flex w-full items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                                <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                    COMPLETED
                                </span>
                            </div>
                        )}
                        {item.status === "Not Responded" && (
                            <div className="flex w-full items-center justify-center bg-pink-700 m-2 rounded-lg">
                                <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                    NOT RESPONDED
                                </span>
                            </div>
                        )}
                        {item.status === "Rejected" && (
                            <div className="flex w-full items-center justify-center bg-red-800 m-2 rounded-lg">
                                <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                    REJECTED
                                </span>
                            </div>
                        )}
                        {item.status === "Cancelled" && (
                            <div className="flex w-full items-center justify-center bg-gray-700 m-2 rounded-lg">
                                <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                    CANCELLED
                                </span>
                            </div>
                        )}
                        {item.status === "Processing" && (
                            <div className="flex w-full items-center justify-center bg-custom-amber m-2 rounded-lg">
                                <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                    PROCESSING
                                </span>
                            </div>
                        )}
                        {item.status === "Paid" && (
                            <div className="flex w-full items-center justify-center bg-violet-800 m-2 rounded-lg">
                                <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                    PAID
                                </span>
                            </div>
                        )}
                        {item.status === "Pending" && (
                            <div className="flex w-full items-center justify-center bg-custom-amber m-2 rounded-lg">
                                <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                    PENDING
                                </span>
                            </div>
                        )}
                    </div>
                </td>

                <td className="px-6 py-3">
                    <div className="flex justify-center space-x-1 sm:space-x-none">
                        <div className="hs-tooltip inline-block">
                            <button
                                type="button"
                                data-hs-overlay="#hs-viewRequest-modal"
                                onClick={() => handleView({ ...item })}
                                className="hs-tooltip-toggle text-white bg-teal-800  font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                            >
                                <AiOutlineEye
                                    size={24}
                                    style={{ color: "#ffffff" }}
                                />
                            </button>
                            <span
                                className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                role="tooltip"
                            >
                                View Inquiry
                            </span>
                        </div>
                    </div>
                </td>
            </tr>
        ))
    );
}

export default RequestList;