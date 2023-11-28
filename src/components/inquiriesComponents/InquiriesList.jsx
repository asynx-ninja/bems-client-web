import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const InquiriesList = ({ inquiries, selectedItems, checkboxHandler, setInquiry }) => {
    const location = useLocation()
    const page = location.pathname.split("/")[1]

    const DateFormat = (date) => {
        const dateFormat = date === undefined ? "" : date.substr(0, 10);
        return dateFormat;
    };

    const handleView = (item) => {
        setInquiry(item);
    };

    return (
        <tbody className="odd:bg-slate-100">
            {inquiries.map((item, index) => (
                <tr key={index} className="odd:bg-slate-100 text-center">
                    <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item._id)}
                                value={item._id}
                                onChange={checkboxHandler}
                                id=""
                            />
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                            {item.inq_id}
                        </span>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                            <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                                {item.name}
                            </span>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                            <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                                {item.email}
                            </span>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                            <span className="text-xs sm:text-sm text-black line-clamp-2">
                                {DateFormat(item.compose.date) || ""}
                            </span>
                        </div>
                    </td>

                    <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                            {item.isApproved === "Completed" && (
                                <div className="flex w-full items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                                    <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                        COMPLETED
                                    </span>
                                </div>
                            )}
                            {item.isApproved === "Not Responded" && (
                                <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
                                    <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                        NOT RESPONDED
                                    </span>
                                </div>
                            )}
                            {item.isApproved === "In Progress" && (
                                <div className="flex w-full items-center justify-center bg-custom-amber m-2 rounded-lg">
                                    <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                        IN PROGRESS
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
                                    data-hs-overlay="#hs-modal-viewInquiries"
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
            ))}
        </tbody>
    );
}

export default InquiriesList;