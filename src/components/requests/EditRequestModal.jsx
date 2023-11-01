import React from "react";
import { FiEdit } from "react-icons/fi";

function EditRequestModal({ onClose }) {
  return (
    <div>
      <button
        type="button"
        className="text-white w-full justify-center bg-custom-green-button2 font-medium rounded-full text-sm m-2 py-2 px-10 text-center inline-flex items-center mr-2"
        style={{ margin: "10px 0px", padding: "10px 20px" }}
        data-hs-overlay="#hs-edit-request-modal"
      >
        <FiEdit size={24} style={{ color: "#ffffff" }} />
      </button>

      <div
        id="hs-edit-request-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto items-center justify-center "
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-[50px] opacity-0 px-3 md:px-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col bg-white shadow-sm ">
            {/* Header */}
            <div class="bg-[#295141] w-overflow-hidden">
              <div class="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform">
                <h3
                  class="font-base text-white mx-auto text-md md:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  EDIT REQUEST
                </h3>
              </div>
            </div>

            <div className="m-5 p-5 border">
              <div className="flex sm:flex-col md:flex-row gap-2">
                <div className="flex flex-col sm:w-full md:w-1/2">
                  <span className="font-medium">Name</span>
                  <input type="text" placeholder="Name" value="Juan Dela Cruz" />
                </div>
                <div className="flex flex-col sm:w-full md:w-1/2">
                  <span className="font-medium">Email</span>
                  <input type="text" placeholder="Email" value="juandelacruz@gmail.com" />
                </div>
              </div>
              <div className="flex sm:flex-col md:flex-row gap-2">
                <div className="flex flex-col sm:w-full md:w-1/2">
                  <span className="font-medium">Contact No.</span>
                  <input type="text" placeholder="Name" value="09123456789" />
                </div>
                <div className="flex flex-col sm:w-full md:w-1/2">
                  <span className="font-medium">Barangay</span>
                  <input type="text" placeholder="Email" value="San Jose" />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-medium">Subject</span>
                <input type="text" placeholder="Email" value="Blotter" />
              </div>
              <div className="flex flex-col w-full">
                <span className="font-medium">Request</span>
                <textarea name="" id="" cols="30" rows="5" value="Si Aling Miranda nangutang isang taon na di pa nababayaran!"></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div class="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700 ">
              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-green-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-edit-request-modal"
              >
                SAVE CHANGES
              </button>

              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-edit-request-modal"
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

export default EditRequestModal;
