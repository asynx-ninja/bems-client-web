import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { io } from 'socket.io-client'
// import Socket_link from "../../config/Socket";
// const socket = io(Socket_link)
const InquiriesList = ({
  inquiries,
  setInquiries,
  setInquiry,
  setInqsUpdate,
  setFilteredInquiries,
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

  // console.log(inquiries)

  const handleView = (item) => {
    setInquiry(item);
    setInqsUpdate((prevState) => !prevState);
  };

  useEffect(() => {
    const handleMuniInq = (muni_inquiry) => {
      setInquiry(muni_inquiry);

      setFilteredInquiries((curItem) =>
        curItem.map((item) =>
          item._id === muni_inquiry._id ? muni_inquiry : item
        )
      );
    };

    const handleStaffInq = (staff_inquiry) => {
      setInquiry(staff_inquiry);

      setFilteredInquiries((curItem) =>
        curItem.map((item) =>
          item._id === staff_inquiry._id ? staff_inquiry : item
        )
      );
    };

    const handleNewInq = (obj) => {
      setInquiries((prev) => [obj, ...prev]);
      setFilteredInquiries((prev) => [obj, ...prev]);
    };

    socket.on("receive-reply-muni-inquiry", handleMuniInq);
    socket.on("receive-muni-inquiry", handleNewInq);
    socket.on("receive-reply-staff-inquiry", handleStaffInq);
    socket.on("receive-staff-inquiry", handleNewInq);

    return () => {
      socket.off("receive-reply-muni-inquiry", handleMuniInq);
      socket.off("receive-muni-inquiry", handleNewInq);
      socket.off("receive-reply-staff-inquiry", handleStaffInq);
      socket.off("receive-staff-inquiry", handleNewInq);
    };
  }, [socket, setInquiry, setFilteredInquiries]);

  const [showTooltip, setShowTooltip] = useState(false);

  const isLatestResponseResident = (inquiry) => {
    const { response } = inquiry;
    console.log(response)
    if (response && response.length > 0) {
      const latestResponse = response[response.length - 1];
      return (
        latestResponse.type === "Staff" && latestResponse.type === "Admin"
      );
    }
    return false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return inquiries.map((item, index) => (
    <tr key={index} className="odd:bg-slate-100 text-center">
      <td className="px-6 py-3">
        <span className="text-xs sm:text-sm text-black line-clamp-2 ">
          {item.inq_id}
        </span>
      </td>
      <td className="px-6 py-3">
        <span className="text-xs sm:text-sm text-black line-clamp-2 ">
          {item.compose.subject}
        </span>
      </td>
      <td className="px-6 py-3">
        <span className="text-xs sm:text-sm text-black line-clamp-2 ">
          {item.compose.to}
        </span>
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
            <div className="flex w-full items-center justify-center bg-custom-green-button2 m-2 rounded-lg">
              <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                COMPLETED
              </span>
            </div>
          )}
          {item.isApproved === "Pending" && (
            <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
              <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                PENDING
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
              onClick={() => handleView(item)}
              className="hs-tooltip-toggle relative text-white bg-teal-800  font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
            >
              <AiOutlineEye size={24} style={{ color: "#ffffff" }} />
              {isLatestResponseResident(item) && (
                <span className="tooltip inline-block absolute top-[-5px] right-2 z-10">
                <span className="absolute inline-flex rounded-full bg-red-500 text-white h-3 w-3"></span>
                <span className="absolute animate-ping inline-flex rounded-full bg-red-500 text-white h-3 w-3"></span>
                {showTooltip && (
                  <span className="tooltiptext bg-red-500 text-white text-xs py-1 px-2 rounded absolute -left-full top-1/2 transform -translate-y-1/2 -translate-x-full whitespace-nowrap">
                    You have a new reply
                  </span>
                )}
              </span>
              )}
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
  ));
};

export default InquiriesList;
