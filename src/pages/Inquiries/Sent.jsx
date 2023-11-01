import React from 'react';
import { IoMdCreate } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import Compose from "../../components/inquiriesComponents/Compose";
import DeleteInquiryModal from '../../components/inquiriesComponents/DeleteModal';
import { Link } from 'react-router-dom';

function Sent() {
  return (
    <div className='bg-[#CBD6DA] h-[39.3rem] p-4 md:p-10 xl:px-24'>
      <div className='bg-white text-white w-full h-full rounded-3xl'>
        <div className='w-full h-full flex flex-col lg:flex-row'>
          <div className='rounded-3xl h-full sm:w-full md:w-full lg:w-[25rem] lg:shadow-2xl'>
            <div className='flex flex-col items-center w-full rounded-xl'>
              <div className='text-[2rem] font-bold h-[4rem] bg-green-900 w-full flex items-center justify-center rounded-tl-xl'>
                SENT
              </div>
              <div className='flex justify-center w-full items-center sm:h-[4rem] '>
                <button
                  data-hs-overlay="#hs-modal-compose"
                  className=' bg-green-900 sm:py-2 sm:px-2 sm:w-2/3  lg:w-3/4 lg:h-[3rem] rounded-full flex justify-center items-center font-bold lg:mt-4 text-white'>
                  <IoMdCreate size={20} style={{ marginRight: '4px' }} />
                  <h1 className='mr-3'>Compose</h1>
                </button>
              </div>
              <div className='w-full text-center sm:h-[6rem] lg:h-[10rem] flex flex-col justify-center lg:mt-4 space-y-2'>
                <Link to="/inquiries" className='text-green-900 sm:py-1 lg:py-2 sm:rounded-none lg:rounded-r-full  lg:mr-5 font-bold bg-[#d9d9d9] hover:bg-green-900 hover:text-white hover:w-full transition ease-in-out delay-50'>
                  Inbox
                </Link>
                <Link to="/sent" className='sm:py-1 lg:py-2 sm:rounded-none lg:rounded-r-full  lg:mr-5 font-bold  bg-green-900 text-white w-full transition ease-in-out delay-50'>
                  Sent
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col justify-center'>
            <div className='flex sm:ml-4 lg:justify-end w-full items-center'>
              <div className='px-4 lg:w-1/6 '>
                <div className=''>
                  <select
                    id="sortby"
                    name="sortby"
                    className="flex w-full border-2 rounded-full lg:h-[3rem] border-solid bg-green-900 text-white font-bold sm:text-[11.9px] lg:text-sm text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="" disabled selected>Sort by</option>
                    <option value="date">Date</option>
                    <option value="fname">First Name</option>
                    <option value="lname">Last Name</option>
                  </select>
                </div>
              </div>
              <div className='sm:w-5/6 lg:w-2/5 mr-[3rem] h-12 flex items-center '>
                <form className='sm:w-full lg:w-full '>
                  <label htmlFor="default-search" className=" text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Inquiry" required />
                  </div>
                </form>
              </div>
            </div>
            <div className="sm:mt-3 flex flex-col px-8 overflow-hidden">
              <div className="-m-1.5 overflow-x-auto sm:h-[300px] sm:mb-6 md:h-[256px] lg:h-[450px] lg:mb-[-0.5rem] rounded-3xl">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                      <thead>
                        <tr>
                          <th scope="col" className="underline bg-green-900 text-white px-6 py-3 text-center text-xs font-medium uppercase">
                            Name
                          </th>
                          <th scope="col" className="underline bg-green-900 text-white px-6 py-3 text-center text-xs font-medium uppercase">
                            Email
                          </th>
                          <th scope="col" className="underline bg-green-900 text-white px-6 py-3 text-center text-xs font-medium uppercase">
                            Subject
                          </th>
                          <th scope="col" className="underline bg-green-900 text-white px-6 py-3 text-center text-xs font-medium uppercase">
                            Message
                          </th>
                          <th scope="col" className="underline bg-green-900 text-white px-6 py-3 text-center text-xs font-medium uppercase">
                            Date
                          </th>
                          <th scope="col" className="underline bg-green-900 text-white px-6 py-3 text-center text-xs font-medium uppercase">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Array(10).fill("").map((_, index) => (
                          <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="bg-[#E8E8E8] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              1
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              1
                            </td>
                            <td className="bg-[#E8E8E8] px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              1
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              1
                            </td>
                            <td className="bg-[#E8E8E8] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              1
                            </td>
                            <td className="flex justify-center bg-[#E8E8E8] px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link to="/sentmessage" className="bg-blue-500 px-3 py-2 rounded-r-[20px] rounded-bl-[25px] text-white font-bold mr-3" href="#">
                                <AiFillEye size={20} />
                              </Link>
                              <button data-hs-overlay="#hs-modal-deleteInquiry" className="bg-red-500 px-3 py-2 rounded-r-[20px] rounded-bl-[25px] text-white font-bold" href="#">
                                <BsTrash3 size={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Compose />
      <DeleteInquiryModal />
    </div>
  );
}

export default Sent;
