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


const Inquiries = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);

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

  // console.log(inquiries);

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
      <div className="relative">
        <img
          className="h-[400px] w-full object-cover"
          src="./../src/assets/image/1.png"
          alt=""
        />
        <img
          className="absolute inset-0 mx-auto my-auto w-[700px]"
          src="./../src/assets/header/montalban-banner2.png"
          alt=""
        />
      </div>
      <div className="p-4 lg:p-10 border flex sm:flex-col lg:flex-row">
        <div className="w-full lg:w-[30%] md:mr-[20px] bg-white rounded-lg">
          <h2 className="text-[2rem] font-bold text-green-900 mb-6">INQUIRIES</h2>
          <div className="mb-6">
            <Link
              to={`/inquiries/?id=${id}&brgy=${brgy}`}
              className="py-2 px-4 rounded-lg font-bold lg:text-left text-center bg-green-900 text-white mb-4 transition ease-in-out delay-50 block"
            >
              Inquiries
            </Link>
            <Link
              to={`/archive/?id=${id}&brgy=${brgy}`}
              className="py-2 px-4 rounded-lg font-bold lg:text-left text-center bg-[#d9d9d9] text-green-900 hover:bg-green-900 hover:text-white transition ease-in-out delay-50 block"
            >
              Archives
            </Link>
          </div>
        </div>
        <div className="sm:w-full lg:w-[80%] flex flex-col">
          <div className="flex flex-row w-full">
            <div className="sm:mt-[20px] w-full sm:mx-auto md:mt-0 flex justify-end items-end">
              {/* ARCHIVE BUTTON */}
              <div className="hs-tooltip inline-block mx-[10px] my-auto w-[50px]">
                <button
                  type="button"
                  data-hs-overlay="#hs-modal-archiveInquiry"
                  className="hs-tooltip-toggle w-[50px] h-[50px] text-white rounded-md  bg-pink-800 font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                >
                  <AiOutlineStop size={24} style={{ color: "#ffffff" }} />
                  <span
                    className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                    role="tooltip"
                  >
                    Archived Selected Inquiries
                  </span>
                </button>
              </div>

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
              {
                inquiries.length === 0 ?
                  <tr>
                    <th className="pt-[50px]" rowSpan={5} colSpan={7}>
                      No Records Shown
                    </th>
                  </tr>
                  : null
              }
              <InquiriesList inquiries={inquiries} selectedItems={selectedItems} checkboxHandler={checkboxHandler} setInquiry={setInquiry} />
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