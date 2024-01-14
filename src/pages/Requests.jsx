import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
import video from "../assets/image/video.mp4";
import axios from "axios";
import API_LINK from "../config/API";
import { useSearchParams } from "react-router-dom";

// COMPONENTS
import ViewRequestModal from "../components/requests/modals/ViewRequestModal";
import RequestList from "../components/requests/RequestList";

const Requests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const user_id = searchParams.get("user_id")
  const [request, setRequest] = useState([])
  const [viewRequest, setViewRequest] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    document.title = "Service Request | Barangay E-Services Management";
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/requests/specific/?user_id=${user_id}`
        );

        // const getUser = await axios.get(`${API_LINK}/users/specific/${id}`);

        setRequest(response.data)

      } catch (err) {
        console.log(err)
      }
    };

    fetch();
  }, [brgy, id]);

  console.log(request)



  // console.log(viewRequest);

  const checkAllHandler = () => {
    if (request.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = request.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

  const tableHeader = [
    "Request Name",
    "date requested",
    "status",
    "actions",
  ];

  return (
    <div className="flex flex-col">
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

      <div className="p-4 lg:p-10">
        <div className="flex flex-col">

          <div className="md:mr-[20px] bg-white rounded-lg">
            <h2 className="text-[2rem] font-bold text-green-900">REQUEST</h2>
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
                  request.length === 0 ?
                    <tr>
                      <th className="pt-[50px]" rowSpan={5} colSpan={6}>
                        No Records Shown
                      </th>
                    </tr>
                    :
                    <RequestList request={request} selectedItems={selectedItems} checkboxHandler={checkAllHandler} setViewRequest={setViewRequest} />
                }
              </tbody>
            </table>
          </div>

          <div className="py-1 px-4 border rounded-b-lg bg-custom-green-table-header">
            <nav className="flex items-center space-x-2">
              <a
                className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span aria-hidden="true">«</span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="w-10 h-10 bg-custom-amber text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
                aria-current="page"
              >
                1
              </a>
              <a
                className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
              >
                2
              </a>
              <a
                className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
              >
                3
              </a>
              <a
                className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span className="sr-only">Next</span>
                <span aria-hidden="true">»</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <ViewRequestModal viewRequest={viewRequest} />
    </div>
  );
};

export default Requests;