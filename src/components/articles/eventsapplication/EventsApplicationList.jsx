import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import API_LINK from "../../../config/API";
import { FaTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EventsApplicationList = ({
  events,
  setEvents,
  setViewEvent,
  setEventUpdate,
  setFilteredEvents,
  socket,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        setUserData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

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
    setViewEvent(item);
  };

  useEffect(() => {
    const handleEventAppli = (event_appli) => {
      setViewEvent(event_appli);

      setFilteredEvents((curItem) =>
        curItem.map((item) =>
          item._id === event_appli._id ? event_appli : item
        )
      );
    };

    const handleNewEventAppli = (obj) => {
      setEvents((prev) => [obj, ...prev])
      setFilteredEvents((prev) => [obj, ...prev]);
    };

    socket.on("receive-reply-event-appli", handleEventAppli);
    socket.on("receive-event-appli", handleNewEventAppli);

    return () => {
      socket.off("receive-reply-event-appli", handleEventAppli);
      socket.off("receive-event-appli", handleNewEventAppli);
    };
  }, [socket, setViewEvent, setFilteredEvents]);

  const [showTooltip, setShowTooltip] = useState(false);

  const isLatestResponseResident = (request) => {
    const { response } = request;
    if (response && response.length > 0) {
      const latestResponse = response[response.length - 1];
      return (
        latestResponse.sender != `${userData.firstName} ${userData.lastName}`
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

  return Object.entries(events).map(([idx, item]) => (
    <tr key={idx} className="odd:bg-slate-100 text-center">
      <td className="px-6 py-3">
        <span className="text-xs sm:text-sm text-black line-clamp-2 uppercase">
          {item.application_id}
        </span>
      </td>
      <td className="px-6 py-3">
        <span className="text-xs sm:text-sm text-black line-clamp-2 uppercase">
          {item.event_name}
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
          {item.status === "Application Completed" && (
            <div className="flex w-full items-center justify-center bg-green-500 m-2 rounded-lg">
              <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                APPLICATION COMPLETED
              </span>
            </div>
          )}
          {item.status === "Paid" && (
            <div className="flex w-full items-center justify-center bg-green-500 m-2 rounded-lg">
              <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                PAID
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
              onClick={() => {
                handleView({ ...item }); // Call handleView function
              }}
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
              View Event
            </span>
          </div>
          <div
            className={
              item.status !== "Pending" ? "hidden" : "hs-tooltip inline-block"
            }
          >
            <button
              type="button"
              data-hs-overlay="#hs-cancelEvent-modal"
              onClick={() => {
                handleView({ ...item });
              }}
              className="hs-tooltip-toggle text-white bg-red-800  font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
            >
              <FaTimes size={24} style={{ color: "#ffffff" }} />
            </button>
            <span
              className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
              role="tooltip"
            >
              Cancel Event Application
            </span>
          </div>
        </div>
      </td>
    </tr>
  ));
};

export default EventsApplicationList;
