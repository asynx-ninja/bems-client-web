import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import video from "../assets/image/video.mp4";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ViewEventModal from "../components/articles/eventsapplication/modals/ViewEventModal";
import EventsApplicationList from "../components/articles/eventsapplication/EventsApplicationList";
import no_data from "../assets/image/no-data.png"

const EventsApplication = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const user_id = searchParams.get("user_id")
  const [events, setEvents] = useState([])
  const [viewEvent, setViewEvent] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);


  useEffect(() => {
    document.title = "Service Request | Barangay E-Services Management";
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/application/specific/?user_id=${user_id}&page=${currentPage}`
        );

        // const getUser = await axios.get(`${API_LINK}/users/specific/${id}`);

        setEvents(response.data.result.sort((date1, date2) => new Date(date2.createdAt) - new Date(date1.createdAt)))
        setPageCount(response.data.pageCount);

      } catch (err) {
        console.log(err)
      }
    };

    fetch();
  }, [brgy, id, currentPage]);

  // console.log(events)

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // console.log(viewEvent);

  const tableHeader = [
    "Events Name",
    "Application Date",
    "status",
    "actions",
  ];

  return (
    <div className="flex flex-col">
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

      <div className="p-4 lg:p-10">
        <div className="flex flex-col">

          <div className="md:mr-[20px] bg-white rounded-lg">
            <h2 className="text-[2rem] font-bold text-green-900">EVENTS APPLICATION LIST</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto sm:h-[380px] lg:h-[680px] xl:h-[700px] xxl:h-[700px] xxxl:h-[640px] border border-b-0 mt-5 rounded-t-xl">
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

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  events.length === 0 ?
                    <tr>
                      <th className="pt-[50px]" rowSpan={5} colSpan={7}>
                        <img className="w-[150px] mx-auto" src={no_data} alt="" />
                        No Records Shown
                      </th>
                    </tr>
                    :
                    <EventsApplicationList events={events} setViewEvent={setViewEvent} />
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
      <ViewEventModal viewEvent={viewEvent} />
    </div>
  );
};

export default EventsApplication;