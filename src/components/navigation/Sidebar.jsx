import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaUserAlt,
  FaTh,
  FaCog,
  FaRegListAlt,
  FaInfo,
  FaCommentAlt,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import defaultPFP from "../../assets/sample-image/default-pfp.png";
import API_LINK from "../../config/API";

const Sidebar = () => {
  const [isCollapse, onCollapse] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        if (res.status === 200) {
          setUserData(res.data[0]);
          var pfpSrc = document.getElementById("sidebarPFP");
          pfpSrc.src =
            res.data[0].profile.link !== ""
              ? res.data[0].profile.link
              : defaultPFP;
        } else {
          setError("Invalid username or password");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  // console.log("id", id)
  const OnOpen = () => {
    if (isCollapse) {
      onCollapse(false);
    } else {
      onCollapse(true);
    }
  };

  return (
    <div>
      {/* SIDE BAR */}

      <div
        id="hs-overlay-basic"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden absolute top-0 left-0 bottom-0 z-[100] bg-white w-64 scrollbar-y h-full"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex w-full">
              <img
                src="./../src/assets/header/side-bg.png"
                className="object-fit"
                alt=""
              />
            </div>

            <div>
              <Link
                to={`/dashboard/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={
                  "flex h-[50px] w-full my-auto pl-[30px] gap-5 text-[#326350] transition-all ease-in-out hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-custom-gold"
                }
              >
                <FaChartPie className="my-auto" size={"15px"} />
                <h1 className="text-bold my-auto font-bold text-sm">
                  DASHBOARD
                </h1>
              </Link>
              <Link
                to={`/settings/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className="flex h-[50px] w-full my-auto pl-[30px] gap-5 text-[#326350] transition-all ease-in-out hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-custom-gold"
              >
                <FaUserAlt className="my-auto" size={"15px"} />
                <h1 className="text-bold my-auto font-bold text-sm">ACCOUNT</h1>
              </Link>
              <button
                id="hs-unstyled-collapse"
                data-hs-collapse="#hs-unstyled-collapse-heading"
                className="hs-collapse-toggle flex h-[50px] w-full my-auto pl-[30px] gap-5 text-[#326350] transition-all ease-in-out hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-custom-gold"
                onClick={OnOpen}
              >
                <FaTh className="my-auto" size={"15px"} />
                <h1 className="text-bold my-auto font-bold text-left w-[120px] leading-[15px] text-sm">
                  SERVICES MANAGEMENT
                </h1>

                {isCollapse ? (
                  <FaAngleDown
                    id="hs-unstyled-collapse"
                    data-hs-collapse="#hs-unstyled-collapse-heading"
                    className="my-auto mr-[10px]"
                    size={"15px"}
                  />
                ) : (
                  <FaAngleUp
                    id="hs-unstyled-collapse"
                    data-hs-collapse="#hs-unstyled-collapse-heading"
                    className="my-auto mr-[10px]"
                    size={"15px"}
                  />
                )}
              </button>
              <div
                id="hs-unstyled-collapse-heading"
                className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-unstyled-collapse"
              >
                <Link
                  to={`/services/?id=${id}&brgy=${brgy}`}
                  onClick={() => {
                    window.innerWidth >= 320 && window.innerWidth <= 1023
                      ? document
                          .getQuerySelector(
                            "[data-hs-overlay-backdrop-template]"
                          )
                          .remove()
                      : null;
                  }}
                  className={
                    "flex h-[50px] w-full my-auto pl-[60px] gap-5 text-[#326350] transition-all ease-in-out hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-custom-gold"
                  }
                >
                  {" "}
                  <FaCog className="my-auto" size={"15px"} />
                  <h1 className="text-bold my-auto font-bold w-[50px]  text-sm">
                    SERVICES
                  </h1>
                </Link>
                <Link
                  to={`/requests/?id=${id}&brgy=${brgy}`}
                  onClick={() => {
                    window.innerWidth >= 320 && window.innerWidth <= 1023
                      ? document
                          .getQuerySelector(
                            "[data-hs-overlay-backdrop-template]"
                          )
                          .remove()
                      : null;
                  }}
                  className={
                    "flex h-[50px] w-full my-auto pl-[60px] gap-5 text-[#326350] transition-all ease-in-out hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-custom-gold"
                  }
                >
                  {" "}
                  <FaRegListAlt className="my-auto" size={"15px"} />
                  <h1 className="text-bold my-auto font-bold w-[50px] leading-[20px] text-sm">
                    REQUEST
                  </h1>
                </Link>
              </div>
              <Link
                to={`/barangay-info/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={
                  "flex h-[50px] w-full my-auto pl-[30px] gap-5 text-[#326350] transition-all ease-in-out hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-custom-gold"
                }
              >
                {" "}
                <FaInfo className="my-auto" size={"15px"} />
                <h1 className="text-bold my-auto font-bold w-[50px] leading-[15px] text-sm">
                  BARANGAY INFORMATION
                </h1>
              </Link>
              <Link
                to={`/inquiries/?id=${id}&brgy=${brgy}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={
                  "flex h-[50px] w-full my-auto pl-[30px] gap-5 text-[#326350] hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-custom-gold"
                }
              >
                {" "}
                <FaCommentAlt className="my-auto" size={"15px"} />
                <h1 className="text-bold my-auto font-bold text-sm">
                  INQUIRIES
                </h1>
              </Link>
            </div>
          </div>

          {/* PROFILE DROP DOWN */}

          <div className="hs-dropdown sm:flex md:hidden w-full bg-gradient-to-r from-[#295141] to-[#408D51] h-[90px]">
            <div
              id="hs-dropdown-profile"
              className="hs-dropdown-toggle cursor-pointer flex w-full"
            >
              <div className=" bg-white w-[40px] h-[40px] rounded-[100%] my-auto ml-[25px] sm:flex md:hidden">
                <img
                  id="sidebarPFP"
                  className="rounded-[100%] w-[40px] h-[40px] object-cover"
                  alt=""
                />
              </div>

              <h1 className="text-sm w-[100px] font-bold text-white my-auto ml-[20px] leading-[20px]">
                {userData.firstName} {userData.lastName}
              </h1>
            </div>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-[63] mt-2 min-w-[16rem] bg-white shadow-md rounded-lg p-2"
              aria-labelledby="hs-dropdown-profile"
            >
              <Link
                to="/"
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm hover:text-custom-gold1 text-gray-800 hover:bg-gradient-to-r from-[#295141] to-[#408D51] focus:ring-2 focus:ring-blue-500 font-bold text-[16px]"
              >
                E-Mails
              </Link>
              <Link
                to="/"
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm hover:text-custom-gold1 text-gray-800 hover:bg-gradient-to-r from-[#295141] to-[#408D51] focus:ring-2 focus:ring-blue-500 font-bold text-[16px]"
              >
                Sign-Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
