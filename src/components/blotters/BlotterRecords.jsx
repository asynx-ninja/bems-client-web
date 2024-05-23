import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import API_LINK from "../../config/API";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BlotterRecords = ({
  blotters,
  setBlotter,
  setSpecBlotter,
  setBlotterUpdate,
  setFilteredBlotter,
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

  useEffect(() => {
    const handleBlotter = (new_blotter) => {
      setSpecBlotter(new_blotter);

      setFilteredBlotter((curItem) =>
        curItem.map((item) =>
          item._id === new_blotter._id ? new_blotter : item
        )
      );
    };
    socket.on("receive-reply-patawag", handleBlotter);

    return () => {
      socket.off("receive-reply-patawag", handleBlotter);
    };
  }, [socket, setSpecBlotter, setFilteredBlotter]);

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
    setSpecBlotter(item);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const isLatestResponseResident = (blotters) => {
    const { responses } = blotters;
    if (responses && responses.length > 0) {
      const latestResponse = responses[responses.length - 1];
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

  return (
    <>
      {blotters.length !== 0 ? (
        blotters.map((item, index) => (
          <tr key={index} className="odd:bg-slate-100 text-center">
            <td className="px-6 py-3">
              <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                {item.req_id}
              </span>
            </td>
            <td className="px-6 py-3">
              <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                {item.name}
              </span>
            </td>
            <td className="px-6 py-3">
              <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                {item.to.complainant.map((item, i) => (
                  <div key={i}>
                    {item.lastName}, {item.firstName}
                  </div>
                ))}
              </span>
            </td>
            <td className="px-6 py-3">
              <span className="text-xs sm:text-sm text-black line-clamp-2 ">
                {item.to.defendant.map((item, i) => (
                  <div key={i}>
                    {item.lastName}, {item.firstName}
                  </div>
                ))}
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
                  <div className="flex w-full items-center justify-center bg-custom-green-button2 m-2 rounded-lg">
                    <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                      COMPLETED
                    </span>
                  </div>
                )}
                {item.status === "Pending" && (
                  <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
                    <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                      Pending
                    </span>
                  </div>
                )}
                {item.status === "In Progress" && (
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
                    data-hs-overlay="#hs-modal-viewSpecBlotter"
                    onClick={() => handleView({ ...item })}
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
                    View Blotter Record
                  </span>
                </div>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BlotterRecords;
