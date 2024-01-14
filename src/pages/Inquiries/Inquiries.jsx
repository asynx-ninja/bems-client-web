import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlineStop } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
import axios from "axios";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ArchiveInquiryModal from "../../components/inquiriesComponents/inquiriesModals/ArchivedInquiryModal";
import ViewMessage from "../../components/inquiriesComponents/inquiriesModals/ViewMessage";
import ComposeModal from "../../components/inquiriesComponents/inquiriesModals/Compose";
import InquiriesList from "../../components/inquiriesComponents/InquiriesList";
import video from "../../assets/image/video.mp4";


const Inquiries = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState([]);


  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/inquiries/?id=${id}&brgy=${brgy}&archived=false`
      );

      // console.log(response)
      if (response.status === 200) setInquiries(response.data);
      else setInquiries([]);
    };

    fetch();
  }, []);


  const checkboxHandler = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  };

  const checkAllHandler = () => {
    if (inquiries.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = inquiries.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = [
    "Inquiry id",
    "e-mail",
    "date",
    "status",
    "actions",
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="relative lg:h-[250px] w-full object-cover">
        <video className="h-full w-full object-cover" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{
            content: "''",
          }}
        />
      </div>
      <div className="p-4 lg:p-10 border flex flex-col">
        <div className="w-full flex flex-col">
          <div className="flex w-full justify-between">
            <div className="md:mr-[20px] bg-white rounded-lg">
              <h2 className="text-[2rem] font-bold text-green-900">INQUIRIES</h2>
            </div>

            <div className="flex h-auto justify-end">
              {/* COMPOSE BUTTON */}
              <button
                type="button"
                data-hs-overlay="#hs-modal-compose"
                className="hs-tooltip-toggle flex justify-center items-center rounded-lg bg-custom-green-header text-white font-medium text-sm text-center w-[100px] h-[50px]"
              >
                <FaPlus size={24} style={{ color: "#ffffff" }} />
                <span
                  className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                  role="tooltip"
                >
                  Compose
                </span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto sm:h-[380px] lg:h-[680px] border border-b-0 mt-5 rounded-t-xl">
            <table className="w-full divide-y divide-gray-200 ">
              {/* Table Headers */}
              <thead className="bg-custom-green-table-header border">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        name=""
                        onClick={checkAllHandler}
                        id=""
                      />
                    </div>
                  </th>
                  {
                    tableHeader.map((item, i) => (
                      <th
                        scope="col"
                        key={i}
                        className="px-6 py-3 text-center text-xs font-bold text-white uppercase"
                      >
                        {item}
                      </th>
                    ))
                  }
                </tr>
              </thead>

              {/* Table Body */}
              {inquiries.length === 0 ? (
                <tr>
                  <th className="pt-[50px]" rowSpan={5} colSpan={7}>
                    No Records Shown
                  </th>
                </tr>
              ) : null}
              <InquiriesList
                inquiries={inquiries}
                selectedItems={selectedItems}
                checkboxHandler={checkboxHandler}
                setInquiry={setInquiry}
              />
            </table>
          </div>

          <div class="py-1 px-4 border rounded-b-lg bg-custom-green-table-header">
            <nav class="flex items-center space-x-2">
              <a
                class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span aria-hidden="true">«</span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="w-10 h-10 bg-custom-amber text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
                aria-current="page"
              >
                1
              </a>
              <a
                class="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
              >
                2
              </a>
              <a
                class="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
              >
                3
              </a>
              <a
                class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span class="sr-only">Next</span>
                <span aria-hidden="true">»</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <ComposeModal />
      <ArchiveInquiryModal selectedItems={selectedItems} />
      <ViewMessage inquiry={inquiry} setInquiry={setInquiry} />
    </div>
  );
};

export default Inquiries;