import React from "react";

function ViewFeedbackModal({ onClose }) {
  return (
    <div>
      <button
        type="button"
        className="text-white w-full justify-center bg-custom-green-button2 font-medium rounded-full text-sm m-2 py-2 px-10 text-center inline-flex items-center mr-2"
        style={{ margin: "10px 0px", padding: "10px 20px" }}
        data-hs-overlay="#hs-view-feedback-modal"
      >
        VIEW
      </button>

      <div
        id="hs-view-feedback-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 px-3 md:px-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col bg-white shadow-sm ">
            {/* Header */}
            <div class="bg-[#295141] w-overflow-hidden">
              <div class="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform">
                <h3
                  class="font-base text-white mx-auto text-md md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  FEEDBACK | COMMENT
                </h3>
              </div>
            </div>

            <div className="m-5 p-5 border">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="w-[25%]">
                    <h1 className="font-bold">
                      REQUEST ID: <span className="font-light">1</span>
                    </h1>
                  </div>

                  <div className="w-[54%] flex flex-col md:flex-row">
                    <h1 className="font-bold ">REQUEST TYPE:</h1>
                    <span className="font-light md:ml-2">
                      Certificate of Indigency
                    </span>
                  </div>

                  <div className="w-[20%]">
                    <h1 className="font-bold">
                      STATUS: <span className="font-light">Active</span>
                    </h1>
                  </div>
                </div>
                <div className="mt-4">
                  <h1>Feedback:</h1>
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full h-48 text-sm mt-5 text-gray-900 rounded-lg resize-none"
                    readOnly
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean condimentum consequat lectus feugiat vestibulum.
                    Donec rhoncus neque in odio imperdiet, ut pellentesque lorem
                    vulputate. Quisque fermentum iaculis porttitor. Aliquam
                    hendrerit sodales congue. Integer in ligula ant e. In sit
                    amet ex id massa congue ornare. Ut gravida diam nec rhoncus
                    feugiat. Mauris feugiat, nulla ut semper vestibulum, quam
                    urna mattis risus, at sagittis turpis enim nec ante.
                  </textarea>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div class="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700 ">
              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-view-feedback-modal"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFeedbackModal;
