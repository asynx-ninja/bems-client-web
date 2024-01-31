import { React, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import axios from "axios";
import defaultPFP from "../../assets/sample-image/default-pfp.png";
import API_LINK from "../../config/API";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [userData, setUserData] = useState([]);
  const [announcement, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        if (res.status === 200) {
          setUserData(res.data[0]);
          var pfpSrc = document.getElementById("headerPFP");
          pfpSrc.src =
            res.data[0].profile.link !== ""
              ? res.data[0].profile.link
              : defaultPFP;
        } else {
          setError("Invalid username or password");
        }

        const res1 = await axios.get(
          `${API_LINK}/announcement/all/?brgy=${brgy}`
        );
        setAnnouncements(res1.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  const dateFormat = (date) => {
    const birthdate = date === undefined ? "" : date.substr(0, 10);
    return birthdate;
  };

  return (
    <div>
      <nav className="h-[70px] bg-gradient-to-r from-[#295141] relative z-[50] to-[#408D51] flex w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.10)]">
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
                className="flex w-[40px] h-[40px] text-white focus:text-custom-gold"
              >
                <FaBell className="m-auto" size={"20px"} />
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 sm:w-[320px] md:w-[400px] hidden z-[100] min-w-[15rem] "
                aria-labelledby="hs-dropdown-notification"
              >
                <div
                  className="mt-[-35px] bg-white h-[500px] shadow-md rounded-lg p-2 pb-[20px] overflow-scroll"
                >
                  <div className="py-[10px] px-[5px] border-b-[1px] border-custom-gray">
                    <h1 className="font-medium text-[18px] my-auto">
                      Notifications
                    </h1>
                  </div>

                  {/* NOTIFICATION LIST */}

                  {announcement.map((item, i) => (
                    <div
                      key={i}
                      className="border-b-[1px] hover:bg-gray-100 border-gray-100"
                    >
                      <Link
                        to={`/events/?id=${id}&brgy=${brgy}&event_id=${item.event_id}&page=${0}`}
                        className="w-full px-[5px] bg-white cursor-pointer"
                      >
                        <div className="flex justify-between px-[10px] text-sm bg-transparent">
                          <h1 className="font-medium w-[200px] truncate">
                            {item.title}
                          </h1>
                          <h1 className="text-gray-400">
                            {dateFormat(item.date)}
                          </h1>
                        </div>
                        <p className="bg-transparent px-[10px] py-[5px] w-[280px] text-sm truncate">
                          {item.details}
                        </p>
                      </Link>
                    </div>
                  ))}

                  <div className="w-full flex justify-center">
                    <Link
                      to={`/events-list/?id=${id}&brgy=${brgy}`}
                      onClick={() => {
                        window.innerWidth >= 320 && window.innerWidth <= 1023
                          ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                          : null;
                      }}
                      className="text-center mt-[10px] text-[12px]"
                    >
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* PROFILE DROP DOWN */}

            <div className="hs-dropdown bg-white w-[40px] h-[40px] rounded-[100%] relative my-auto sm:hidden md:flex">
              <button id="hs-dropdown-profile">
                <img
                  id="headerPFP"
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
                    className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm hover:text-custom-gold1 text-gray-800 hover:bg-gradient-to-r from-[#295141] to-[#408D51] focus:ring-2 focus:ring-blue-500 "
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
                    className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm hover:text-custom-gold1 text-gray-800 hover:bg-gradient-to-r from-[#295141] to-[#408D51] focus:ring-2 focus:ring-blue-500 "
                  >
                    Sign-Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
