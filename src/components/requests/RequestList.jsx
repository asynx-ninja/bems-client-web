import { AiOutlineEye } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const RequestList = ({
  request,
  setRequest,
  setViewRequest,
  setRequestUpdate,
  setFilteredRequest,
  socket,
}) => {
  const location = useLocation();
  const page = location.pathname.split("/")[1];

  const DateFormat = (date) => {
    if (!date) return "";

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const handleView = (item) => {
    setViewRequest(item);
  };

  useEffect(() => {
    const handleRequest = (new_chat) => {
      setViewRequest(new_chat);

      setRequest((curItem) =>
        curItem.map((item) =>
          item._id === new_chat._id ? new_chat : item
        )
      );
    };

    const handleNewRequest = (obj) => {
      setFilteredRequest(prev => [obj, ...prev])
    };

    socket.on("receive-reply-service-req", handleRequest);
    socket.on("receive-service-req", handleNewRequest);

    return () => {
      socket.off("receive-reply-service-req", handleRequest);
      socket.off("receive-service-req", handleNewRequest);
    };
  }, [socket, setViewRequest, setFilteredRequest]);

  return Object.entries(request).map(([idx, item]) => (
    <tr key={idx} className="odd:bg-slate-100 text-center">
      <td className="px-6 py-3">
        <span className="text-xs sm:text-sm text-black line-clamp-2 uppercase">
          {item.req_id}
        </span>
      </td>
      <td className="px-6 py-3">
        <span className="text-xs sm:text-sm text-black line-clamp-2 uppercase">
          {item.service_name}
        </span>
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
          {item.status === "Transaction Completed" && (
            <div className="flex w-full items-center justify-center bg-green-500 m-2 rounded-lg">
              <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                TRANSACTION COMPLETED
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
            <div className="flex w-full items-center justify-center bg-[#3b66b6] m-2 rounded-lg">
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
              <AiOutlineEye size={24} style={{ color: "#ffffff" }} />
            </button>
            <span
              className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
              role="tooltip"
            >
              View Inquiry
            </span>
          </div>
          <div
            className={
              item.status !== "Pending" ? "hidden" : "hs-tooltip inline-block"
            }
          >
            <button
              type="button"
              data-hs-overlay="#hs-cancelRequest-modal"
              onClick={() => handleView({ ...item })}
              className="hs-tooltip-toggle text-white bg-red-800  font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
            >
              <FaTimes size={24} style={{ color: "#ffffff" }} />
            </button>
            <span
              className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
              role="tooltip"
            >
              Cancel Request
            </span>
          </div>
        </div>
      </td>
    </tr>
  ));
};

export default RequestList;
