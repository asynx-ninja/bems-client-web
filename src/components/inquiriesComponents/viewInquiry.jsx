import React from 'react';
import { IoMdCreate } from "react-icons/io";
import { Link } from 'react-router-dom';
import image from "../../assets/sample-image/profile.jpg"
import Reply from "../inquiriesComponents/ReplyModal"
import DeleteInquiryModal from '../../components/inquiriesComponents/DeleteModal';
function viewMessage() {
  return (
    <div className='bg-[#CBD6DA] h-[39.3rem] p-4 md:p-3 lg:p-8'>
      <div className='bg-white text-white w-full h-full rounded-3xl'>
        <div className='w-full h-full flex flex-col lg:flex-row'>
          <div className='rounded-3xl h-full sm:w-full md:w-full lg:w-[25rem] lg:shadow-2xl'>
            <div className='flex flex-col items-center w-full rounded-xl'>
              <div className='text-[2rem] font-bold h-[4rem] bg-green-900 w-full flex items-center justify-center rounded-tl-xl'>
                INQUIRIES
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
                <Link to="/inquiries" className=' sm:py-1 lg:py-2 sm:rounded-none lg:rounded-r-full  lg:mr-5 font-bold bg-green-900 text-white w-full transition ease-in-out delay-50'>
                  Inbox
                </Link>
                <Link to="/sent" className='sm:py-1 text-green-900 lg:py-2 sm:rounded-none lg:rounded-r-full  lg:mr-5 font-bold  bg-[#d9d9d9] hover:bg-green-900 hover:text-white hover:w-full transition ease-in-out delay-50'>
                  Sent
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full h-full sm:px-4 sm:mb-[1rem] lg:p-8 '>
            <div className=' w-full sm:h-[22.2rem] md:h-[22rem] lg:h-full rounded-2xl bg-[#D9D9D9]'>
              <div className='w-full h-[4rem] bg-green-900 flex sm:justify-center lg:justify-end rounded-tr-2xl rounded-tl-2xl space-x-2 lg:space-x-4 py-4 px-6'>
                <Link to="/inquiries" className='bg-green-700 font-heavy sm:px-3 sm:text-sm lg:text-md lg:px-10 flex items-center justify-center rounded-xl'>Back</Link>
                <button
                  data-hs-overlay="#hs-modal-deleteInquiry"
                  className='bg-red-700 font-heavy sm:text-sm sm:px-2 lg:px-10 flex items-center justify-center rounded-xl'>Delete</button>
              </div>
              <div className='flex items-center w-full h-[3rem] lg:space-x-[16rem] mt-2 '>
                <h1 className='text-black sm:pl-4 sm:pr-2 lg:p-4 sm:text-sm lg:text-xl font-heavy '>SUBJECT: ENGLISH</h1>
                <div className=' h-[3rem] flex justify-end sm:flex-grow sm:px-4 lg:w-2/5 sm:py-2 lg:py-1 '>
                  <button
                    data-hs-overlay="#hs-modal-reply"
                    className='rounded-xl sm:px-4 lg:px-6 bg-green-900'> Reply</button>
                </div>
              </div>
              <div className='flex items-center w-full h-[6rem] '>
                <div className='flex sm:flex-col lg:flex-row items-center w-full'>
                  <div className='flex flex-row items-center w-full'>
                    <img className=" py-2 rounded-full sm:h-[4rem] sm:w-[5rem] lg:w-[7rem] px-4 lg:h-[6rem]" src={image} alt="" />
                    <div className='flex flex-col'>
                      <h1 className='sm:text-sm lg:text-xl font-heavy text-black'>Kinet Batista</h1>
                      <span className='text-black sm:text-[9px] lg:text-[11px]'>KinetBatista@gmail.com</span>
                    </div>
                  </div>

                  <div className='sm:text-[10px] lg:text-sm  flex w-full sm:justify-center sm:h-[2px] lg:h-[4rem]  text-black lg:justify-end items-center px-4'>
                    September 101, 2023
                  </div>
                </div>
              </div>
              <div className='w-full [16.2rem] sm:px-4 lg:p-4'>
                <div className='bg-white w-full sm:h-[7.7rem] md:h-[7.7rem] lg:h-[15.7rem] rounded-xl flex items-center justify-center sm:px-5 lg:px-0'>
                  <h1 className='text-black sm:text-sm lg:text-lg'> kahit kasinungalingan papaniwalaan ko basta galing sa labi mo</h1>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reply />
      <DeleteInquiryModal />
    </div>
  );
}

export default viewMessage