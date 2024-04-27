import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_LINK from "../../../../config/API";
import Error from "../../../../assets/image/Error.png";
import Preloader from "../../../loaders/Preloader";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
// import EditDropbox from "./EditDropbox";

const CancelEventApplicationModal = ({ viewEvent }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [errMsg, setErrMsg] = useState(false);

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

  const getType = (type) => {
    switch (type) {
      case "MUNISIPYO":
        return "Municipality";
      default:
        return "Barangay";
    }
  };

  const handleOnCancel = async (e) => {
    e.preventDefault();

    setSubmitClicked(true);

    try {
      const response = await axios.patch(
        `${API_LINK}/application/cancel/?application_id=${viewEvent._id}&status=Cancelled`
      );

      if (response.status === 200) {
        const getEvent = await axios.get(
          `${API_LINK}/announcement/specific/?brgy=${brgy}&archived=false&event_id=${viewEvent.event_id}`
        );

        const notify = {
          category: "Many",
          compose: {
            subject: `APPLICATION - ${viewEvent.event_name}`,
            message: `A user has cancelled an Event Application ${
              viewEvent.event_name
            }.\n\n
          
          Application Details:\n
          - Name: ${`${userData.lastName}, ${userData.firstName}`}\n
          - Event Applied: ${viewEvent.event_name}\n
          - Application ID: ${viewEvent.application_id}\n
          - Date Created: ${moment(viewEvent.createdAt).format(
            "MMM. DD, YYYY h:mm a"
          )}\n\n `,
            go_to: "Application",
          },
          target: { user_id: userData.user_id, area: viewEvent.brgy },
          type: getType(viewEvent.brgy),
          banner: getEvent.data.result.collections.banner,
          logo: getEvent.data.result.collections.logo,
        };

        const result = await axios.post(`${API_LINK}/notification/`, notify, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.status === 200) {
          setTimeout(() => {
            setSubmitClicked(false);
            setUpdatingStatus("success");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }, 1000);
        } else {
          setSubmitClicked(false);
          setUpdatingStatus("error");
          setError(error.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        id="hs-cancelEvent-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all sm:w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl h-full sm:max-w-[300px] mx-auto max-h-screen border-[1px] border-black">
            <div className="h-[200px] flex flex-col justify-center items-center p-[30px]">
              <img className="w-[80px]" src={Error} alt="" />
              <h3 className="text-[18px] font-bold text-center">
                Are you sure you want to cancel this Event Application?
              </h3>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-x-2 py-3 px-6">
              <button
                type="button"
                onClick={handleOnCancel}
                className="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base text-white shadow-sm align-middle"
                style={{
                  background: "#268F26",
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base text-white shadow-sm align-middle"
                data-hs-overlay="#hs-cancelEvent-modal"
                style={{
                  background: "#B95252",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {submitClicked && <Preloader updatingStatus="waiting" />}
      {updatingStatus && (
        <Preloader updatingStatus={updatingStatus} error={error} />
      )}
    </div>
  );
};

export default CancelEventApplicationModal;
