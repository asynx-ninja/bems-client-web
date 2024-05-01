import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import defaultLogo from "../../assets/header/side-bg.png";

const ViewNotification = ({ viewNotif, userData, info }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

  console.log(viewNotif);

  return (
    <div>
      <div
        id="hs-modal-viewNotification"
        className="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full md:max-w-lg lg:max-w-1xl xxl:max-w-2xl mx-auto h-[500px]">
            {/* Header */}
            <div
              className={`py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[${
                info &&
                info.theme &&
                info.theme.gradient &&
                info.theme.gradient.start !== ""
                  ? info.theme.gradient.start
                  : "#295141"
              }] to-[${
                info &&
                info.theme &&
                info.theme.gradient &&
                info.theme.gradient.end !== ""
                  ? info.theme.gradient.end
                  : "#408D51"
              }] overflow-hidden rounded-t-2xl`}
            >
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                NOTIFICATION
              </h3>
            </div>

            <div className="flex flex-col w-full p-5 overflow-y-auto">
              <div
                className="items-center py-[100px] px-4 border-b relative mb-5"
                style={{
                  backgroundImage: `url(${
                    viewNotif &&
                    viewNotif.logo &&
                    viewNotif.logo.link !== undefined
                      ? viewNotif.logo.link
                      : defaultLogo
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                {/* Content */}
                <h3 className="lg:tracking-[.4rem] tracking-widest text-md lg:text-lg font-bold uppercase text-center text-white dark:text-white relative z-10">
                  {viewNotif.length === 0 ? "" : viewNotif.compose.subject}
                </h3>
              </div>

              <div className="flex flex-col">
                <div className="border-b-[1px] border-b-gray-300 pb-3">
                  <h1 className="font-bold">Details</h1>
                </div>
                <div className="py-5 w-full h-auto">
                  <textarea
                    disabled
                    value={
                      viewNotif.length === 0 ? "" : viewNotif.compose.message
                    }
                    className="sm:w-full h-[500px] w-full text-black border-0 bg-transparent resize-none whitespace-pre-line"
                  >
                    {viewNotif.length === 0 ? "" : viewNotif.compose.message}
                  </textarea>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                <div className="w-full pb-5 sm:space-y-3 md:flex md:space-y-0 gap-5">
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-900 text-white shadow-sm text-center"
                    data-hs-overlay="#hs-modal-viewNotification"
                  >
                    CLOSE
                  </button>
                  {viewNotif.length !== 0 &&
                  viewNotif.compose.go_to === "Events" ? (
                    <Link
                      to={`/events-list/?id=${id}&brgy=${brgy}&user_id=${userData.user_id}`}
                      className="h-[2.5rem] flex w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-custom-green-button text-white shadow-sm text-center"
                      data-hs-overlay="#hs-modal-viewNotification"
                    >
                      <h1 className="m-auto">
                        Go to{" "}
                        {viewNotif.length === 0 ? "" : viewNotif.compose.go_to}
                      </h1>
                    </Link>
                  ) : null}
                  {viewNotif.length !== 0 &&
                  viewNotif.compose.go_to === "Services" ? (
                    <Link
                      to={`/requests/?id=${id}&brgy=${brgy}&user_id=${userData.user_id}`}
                      className="h-[2.5rem] flex w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-custom-green-button text-white shadow-sm text-center"
                      data-hs-overlay="#hs-modal-viewNotification"
                    >
                      <h1 className="m-auto">
                        Go to{" "}
                        {viewNotif.length === 0 ? "" : viewNotif.compose.go_to}
                      </h1>
                    </Link>
                  ) : null}
                  {viewNotif.length !== 0 &&
                  viewNotif.compose.go_to === "Inquiries" ? (
                    <Link
                      to={`/inquiries/?id=${id}&brgy=${brgy}&user_id=${userData.user_id}`}
                      className="h-[2.5rem] flex w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-custom-green-button text-white shadow-sm text-center"
                      data-hs-overlay="#hs-modal-viewNotification"
                    >
                      <h1 className="m-auto">
                        Go to{" "}
                        {viewNotif.length === 0 ? "" : viewNotif.compose.go_to}
                      </h1>
                    </Link>
                  ) : null}
                  {viewNotif.length !== 0 &&
                  viewNotif.compose.go_to === "Requests" ? (
                    <Link
                      to={`/requests/?id=${id}&brgy=${brgy}&user_id=${userData.user_id}`}
                      className="h-[2.5rem] flex w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-custom-green-button text-white shadow-sm text-center"
                      data-hs-overlay="#hs-modal-viewNotification"
                    >
                      <h1 className="m-auto">
                        Go to{" "}
                        {viewNotif.length === 0 ? "" : viewNotif.compose.go_to}
                      </h1>
                    </Link>
                  ) : null}
                  {viewNotif.length !== 0 &&
                  viewNotif.compose.go_to === "Application" ? (
                    <Link
                      to={`/events-application/?id=${id}&brgy=${brgy}&user_id=${userData.user_id}`}
                      className="h-[2.5rem] flex w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-custom-green-button text-white shadow-sm text-center"
                      data-hs-overlay="#hs-modal-viewNotification"
                    >
                      <h1 className="m-auto">
                        Go to{" "}
                        {viewNotif.length === 0 ? "" : viewNotif.compose.go_to}
                      </h1>
                    </Link>
                  ) : null}
                  {viewNotif.length !== 0 &&
                  viewNotif.compose.go_to === "Patawag" ? (
                    <Link
                      to={`/blotter/?id=${id}&brgy=${brgy}&user_id=${userData.user_id}`}
                      className="h-[2.5rem] flex w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-custom-green-button text-white shadow-sm text-center"
                      data-hs-overlay="#hs-modal-viewNotification"
                    >
                      <h1 className="m-auto">
                        Go to{" "}
                        {viewNotif.length === 0 ? "" : viewNotif.compose.go_to}
                      </h1>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNotification;
