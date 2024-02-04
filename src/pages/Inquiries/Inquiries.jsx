import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlineStop } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ViewMessage from "../../components/inquiriesComponents/inquiriesModals/ViewMessage";
import ComposeModal from "../../components/inquiriesComponents/inquiriesModals/Compose";
import InquiriesList from "../../components/inquiriesComponents/InquiriesList";
import video from "../../assets/image/video.mp4";
import no_data from "../../assets/image/no-data.png"


const Inquiries = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const user_id = searchParams.get("user_id");
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/inquiries/?id=${user_id}&brgy=${brgy}&archived=false&page=${currentPage}`
        );

        if (response.status === 200) {
          setInquiries(response.data.result.sort((date1, date2) => new Date(date2.createdAt) - new Date(date1.createdAt)))
          setPageCount(response.data.pageCount);
        } else {
          setInquiries([]);
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetch();
  }, [user_id, brgy, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // console.log(inquiries)

  const tableHeader = [
    "subject",
    "to",
    "date",
    "status",
    "actions",
  ];

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="relative h-[250px] w-full object-cover">
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
            <div className="md:mr-[20px] rounded-lg">
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
          <div className="overflow-x-auto sm:h-[380px] lg:h-[680px] border border-b-0 mt-5 rounded-t-xl bg-white">
            <table className="w-full divide-y divide-gray-200 ">
              {/* Table Headers */}
              <thead className="bg-custom-green-table-header border">
                <tr>
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
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Table Body */}
                {
                  inquiries.length === 0 ?
                    <tr>
                      <th className="pt-[50px]" rowSpan={5} colSpan={7}>
                        <img className="w-[150px] mx-auto" src={no_data} alt="" />
                        No Records Shown
                      </th>
                    </tr>
                    :
                    <InquiriesList
                      inquiries={inquiries}
                      setInquiry={setInquiry}
                    />
                }
              </tbody>
            </table>
          </div>

          <div className="md:py-4 md:px-4 bg-custom-green-header flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
            <span className="font-medium text-white sm:text-xs text-sm">
              Showing {currentPage + 1} out of {pageCount} pages
            </span>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">>"
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<<"
              className="flex space-x-3 text-white font-bold"
              activeClassName="text-yellow-500"
              disabledLinkClassName="text-gray-300"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
      <ComposeModal />
      <ViewMessage inquiry={inquiry} setInquiry={setInquiry} />
    </div>
  );
};

export default Inquiries;