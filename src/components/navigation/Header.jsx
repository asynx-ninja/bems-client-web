import { React, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import axios from "axios";
import defaultPFP from "../../assets/sample-image/default-pfp.png";
import API_LINK from "../../config/API";
import moment from "moment";
import no_data from "../../assets/image/no-data.png"

import Notification from "../notification/Notification";
import ViewNotification from "../notification/ViewNotification";
import TopHeader from "./TopHeader";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [userData, setUserData] = useState({});
  const [notification, setNotification] = useState([]);
  const [viewNotif, setViewNotif] = useState([]);
  const [unread, setUnread] = useState(0)
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const brgyInfo = await axios.get(`${API_LINK}/brgyinfo/?brgy=${brgy}`);
      if (brgyInfo.status === 200) {
        setInfo(brgyInfo.data[0]);
      } else {
        setInfo({})
      }

      const res = await axios.get(`${API_LINK}/users/specific/${id}`);
      if (res.status === 200) {
        setUserData(res.data[0]);

      } else {
        setError("Invalid username or password");
      }

      const response = await axios.get(
        `${API_LINK}/notification/?user_id=${res.data[0].user_id}&area=${brgy}&type=Resident`
      );

      if (response.status === 200) {
        // Filter notifications created after the client's createdAt
        const filteredNotifications = response.data.filter(item =>
          item.createdAt > res.data[0].createdAt
        );

        // Sort filtered notifications by createdAt in descending order
        const sortedNotifications = filteredNotifications.sort((a, b) => b.createdAt - a.createdAt);

        const read = sortedNotifications.filter(item =>
          item.read_by.some(item1 => item1.readerId === id)
        );

        const emptyRead = sortedNotifications.filter(item =>
          item.read_by.length === 0
        );

        if (sortedNotifications.length === read.length) {
          setUnread(sortedNotifications.length - (read.length - emptyRead.length));
        } else {
          setUnread(sortedNotifications.length - read.length);
        }

        setNotification(sortedNotifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageError = (event) => {
    event.target.src = defaultPFP;
  };

  // console.log(notification)
  // console.log(userData)

  return (
    <div>
      <TopHeader fetch={fetch} userData={userData.isApproved === "Verified" ? true : false} />
      <nav className={`h-[70px] bg-gradient-to-r from-[${info && info.theme && info.theme.gradient && info.theme.gradient.start !== "" ? info.theme.gradient.start : "#295141"}] to-[${info && info.theme && info.theme.gradient && info.theme.gradient.end !== "" ? info.theme.gradient.end : "#408D51"}] relative z-[50] flex w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.10)]`}>
        <div className=' flex bg-[url("/header-bg.png")] my-auto justify-between w-full h-full pr-[20px]'>
          <div className="flex gap-5 overflow-hidden">
            <div className="mr-[30px] sm:hidden md:flex">
              <div className="flex bg-white h-full px-[20px] w-[200px] my-auto justify-between overflow-hidden">
                <button
                  type="button"
                  data-hs-overlay="#hs-overlay-basic"
                  aria-controls="hs-overlay-basic"
                  aria-label="Toggle navigation"
                  className="my-auto w-[50px]"
                >
                  <FaBars
                    className="mx-auto cursor-pointer text-custom-gold"
                    size={"30px"}
                  />
                </button>
              </div>
              <div className="flex relative right-[30px]">
                <div className="bg-white w-[20px] h-[200px] rotate-[50deg] relative right-[15px] bottom-[60px]"></div>
                <div className="bg-gradient-to-r from-custom-gold1 to-custom-gold w-[60px] h-[200px] rotate-[50deg] relative bottom-[60px]"></div>
                <div className="bg-white w-[10px] h-[200px] rotate-[50deg] relative left-[19px] bottom-[60px]"></div>
              </div>
            </div>
            <button
              type="button"
              data-hs-overlay="#hs-overlay-basic"
              aria-controls="hs-overlay-basic"
              aria-label="Toggle navigation"
              className="ml-[20px] my-auto w-[50px] md:hidden"
            >
              <FaBars
                className="mx-auto cursor-pointer text-custom-gold"
                size={"30px"}
              />
            </button>
            <h1 className="font-bold my-auto text-[23px] truncate text-white sm:hidden md:flex">
              BARANGAY {brgy}
            </h1>
          </div>

          <div className="gap-5 flex">
            {/* NOTIFICATION DROPDOWN */}

            <div className="hs-dropdown my-auto">
              <button
                id="hs-dropdown-notification"
                className="flex w-[40px] relative h-[40px] text-white focus:text-custom-gold"
              >
                <FaBell className="m-auto" size={"20px"} />
                {
                  unread === 0 ?
                    null
                    :
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 rounded-full top-[-5px] right-0">{unread}</div>
                }
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 sm:w-[320px] md:w-[450px] hidden z-[100] min-w-[15rem] "
                aria-labelledby="hs-dropdown-notification"
              >
                <div
                  className={notification.length !== 0 ? "mt-[-50px] bg-white h-[500px] shadow-md rounded-lg p-2 pb-[20px]" : "mt-[-50px] bg-white shadow-md rounded-lg p-2 pb-[20px]"}
                >
                  <div className="py-[10px] px-[5px] border-b-[1px] border-custom-gray flex justify-between">
                    <h1 className="font-medium text-[18px] my-auto">
                      Notifications ({unread})
                    </h1>
                  </div>

                  {/* NOTIFICATION LIST */}

                  {
                    notification.length !== 0 ?
                      < Notification notification={notification} setViewNotif={setViewNotif} fetch={fetch} />
                      :
                      <div className="flex flex-col items-center">
                        <img className="w-[150px] m-auto" src={no_data} alt="" />
                        No Notification Yet
                      </div>
                  }
                </div>
              </div>
            </div>

            {/* PROFILE DROP DOWN */}

            <div className="hs-dropdown bg-white w-[40px] h-[40px] rounded-[100%] relative my-auto sm:hidden md:flex">
              <button id="hs-dropdown-profile">
                <img
                  id="headerPFP"
                  src={
                    userData && userData.profile && userData.profile.link !== ""
                      ? userData.profile.link
                      : ""
                  }
                  onError={handleImageError}
                  className="hs-dropdown-toggle rounded-[100%] w-[40px] h-[40px] object-cover cursor-pointer"
                  alt=""
                />
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity] duration hs-dropdown-open:opacity-100 absolute hs-dropdown-open:z-[100] opacity-0 w-56 hidden z-[63] min-w-[15rem]"
                aria-labelledby="hs-dropdown-profile"
              >
                <div
                  className="mt-[-35px] font-medium bg-white shadow-md rounded-lg p-2"
                >
                  <Link
                    to={`/settings/?id=${id}&brgy=${brgy}`}
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                          .getQuerySelector(
                            "[data-hs-overlay-backdrop-template]"
                          )
                          .remove()
                        : null;
                    }}
                    className={`flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm hover:text-custom-gold1 text-gray-800 hover:bg-gradient-to-r from-[${info && info.theme && info.theme.gradient && info.theme.gradient.start !== undefined ? info.theme.gradient.start : ""}] to-[${info && info.theme && info.theme.gradient && info.theme.gradient.end !== undefined ? info.theme.gradient.end : ""}] focus:ring-2 focus:ring-blue-500 `}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                          .getQuerySelector(
                            "[data-hs-overlay-backdrop-template]"
                          )
                          .remove()
                        : null;
                    }}
                    className={`flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm hover:text-custom-gold1 text-gray-800 hover:bg-gradient-to-r from-[${info && info.theme && info.theme.gradient && info.theme.gradient.start !== undefined ? info.theme.gradient.start : ""}] to-[${info && info.theme && info.theme.gradient && info.theme.gradient.end !== undefined ? info.theme.gradient.end : ""}] focus:ring-2 focus:ring-blue-500 `}
                  >
                    Sign-Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ViewNotification viewNotif={viewNotif} userData={userData} info={info} />
    </div>
  );
};

export default Header;
