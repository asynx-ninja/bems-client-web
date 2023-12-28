import { React, useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSearchParams, Link } from "react-router-dom";
import API_LINK from '../config/API';
import axios from 'axios';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

// COMPONENTS
import Services from './../assets/dashboard/items/Services.png'
import Events from './../assets/dashboard/items/Events.png'
import AboutDetails from './../assets/dashboard/items/AboutDetails.png'
import Inquire from './../assets/dashboard/items/Inquire.png'
import Request from './../assets/dashboard/items/Request.png'
import BrgyInfo from './../assets/dashboard/items/BrgyInfo.png'

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id")
  const brgy = searchParams.get("brgy")
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        if (res.status === 200) {
          setUserData(res.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  console.log(userData)

  return (
    <div className='flex flex-col'>

      <div className='font-bold w-[90%] mx-auto py-10 mt-[30px] flex justify-between'>
        <div>
          <p className='text-[20px] leading-[1px]'>HI, <b className='text-custom-green-header'>{userData.firstName}!</b> WELCOME TO </p>
          <h1 className='text-[38px]'>BARANGAY <b className='text-custom-green-header'>E-SERVICES</b> APPLICATION</h1>
        </div>
      </div>

      <div className='w-[90%] mx-auto mb-[50px] border-t-[1px] border-t-gray-300 p-5 gap-5 grid sm:grid-1 md:grid-cols-2'>

        <div className='bg-[#208b3a] px-5 pt-5 flex flex-row sm:h-auto lg:h-[260px] justify-center rounded-md hover:scale-[105%] transition'>
          <div className='flex flex-col py-5 w-[50%] justify-center'>
            <h1 className='text-white font-bold sm:text-[12px] lg:text-[20px] x:text-[28px] sm:leading-3 md:leading-4 lg:leading-5 x:leading-7'>GET UPDATES AT BAGONG MONTALBAN MOBILE APP</h1>
            <Link
              to={`/mobile/?id=${id}&brgy=${brgy}`}
              className='sm:w-[90px] lg:w-[120px] mt-[18px] bg-white font-medium sm:text-[10px] lg:text-[14px] py-[8px] rounded-md hover:scale-[105%] transition text-center'
            >
              <h1>
                Read More
              </h1>
            </Link>
          </div>
          <div className='w-[50%] flex flex-col justify-end sm:items-center md:items-end'>
            <img src={AboutDetails} width={250} height={250} alt="" />
          </div>
        </div>

        <div className='bg-[#7251b5] px-5 pt-5 flex flex-row sm:h-auto lg:h-[260px] justify-center rounded-md hover:scale-[105%] transition'>
          <div className='flex flex-col py-5 w-[50%] justify-center'>
            <h1 className='text-white font-bold sm:text-[12px] lg:text-[20px] x:text-[28px] sm:leading-3 md:leading-4 lg:leading-5 x:leading-7'>EXPLORE BEAUTY OF THE BARANGAY</h1>
            <Link
              to={`/barangay-info/?id=${id}&brgy=${brgy}`}
              className='sm:w-[90px] lg:w-[120px] mt-[18px] bg-white font-medium sm:text-[10px] lg:text-[14px] py-[8px] rounded-md hover:scale-[105%] transition text-center'
            >
              <h1>
                See More
              </h1>
            </Link>
          </div>
          <div className='w-[50%] flex flex-col justify-end sm:items-center md:items-end'>
            <img src={BrgyInfo} width={250} height={250} alt="" />
          </div>
        </div>

        <div className='bg-[#f9a620] px-5 pt-5 flex flex-row sm:h-auto lg:h-[260px]  justify-center rounded-md hover:scale-[105%] transition'>
          <div className='flex flex-col py-5 w-[50%] justify-center'>
            <h1 className='text-white font-bold sm:text-[12px] lg:text-[20px] x:text-[28px] sm:leading-3 md:leading-4 lg:leading-5 x:leading-7'>PARTICIPATE EVENTS NEAR YOUR BARANGAY!</h1>
            <Link
              to={`/events-list/?id=${id}&brgy=${brgy}`}
              className='sm:w-[90px] lg:w-[120px] mt-[18px] bg-white font-medium sm:text-[10px] lg:text-[14px] py-[8px] rounded-md hover:scale-[105%] transition text-center'
            >
              <h1>
                Join Now
              </h1>
            </Link>
          </div>
          <div className='w-[50%] flex flex-col justify-end sm:items-center md:items-end'>
            <img src={Events} width={250} height={250} alt="" />
          </div>
        </div>

        <div className='bg-[#ff477e] px-5 pt-5 flex flex-row sm:h-auto lg:h-[260px]  justify-center rounded-md hover:scale-[105%] transition'>
          <div className='flex flex-col py-5 w-[50%] justify-center'>
            <h1 className='text-white font-bold sm:text-[12px] lg:text-[20px] x:text-[28px] sm:leading-3 md:leading-4 lg:leading-5 x:leading-7'>MAKE REQUEST FAST AND EASY!</h1>
            <Link
              to={`/services/?id=${id}&brgy=${brgy}`}
              className='sm:w-[90px] lg:w-[120px] mt-[18px] bg-white font-medium sm:text-[10px] lg:text-[14px] py-[8px] rounded-md hover:scale-[105%] transition text-center'
            >
              <h1>
                View Request
              </h1>
            </Link>
          </div>
          <div className='w-[50%] flex flex-col justify-end sm:items-center md:items-end'>
            <img src={Request} width={250} height={250} alt="" />
          </div>
        </div>

        <div className='bg-[#0077b6] px-5 pt-5 flex flex-row sm:h-auto lg:h-[260px] justify-center rounded-md hover:scale-[105%] transition'>
          <div className='flex flex-col py-5 w-[50%] justify-center'>
            <h1 className='text-white font-bold sm:text-[12px] lg:text-[20px] x:text-[28px] sm:leading-3 md:leading-4 lg:leading-5 x:leading-7'>TRACK YOUR REQUEST IN BARANGAY SERVICES</h1>
            <Link
              to={`/requests/?id=${id}&brgy=${brgy}&user_id=${userData.user_id}`}
              className='sm:w-[90px] lg:w-[120px] mt-[18px] bg-white font-medium sm:text-[10px] lg:text-[14px] py-[8px] rounded-md hover:scale-[105%] transition text-center'
            >
              <h1>
                View Request
              </h1>
            </Link>
          </div>
          <div className='w-[50%] flex flex-col justify-end sm:items-center md:items-end'>
            <img src={Services} width={250} height={250} alt="" />
          </div>
        </div>

        <div className='bg-[#d00000] px-5 pt-5 flex flex-row sm:h-auto lg:h-[260px] justify-center rounded-md hover:scale-[105%] transition'>
          <div className='flex flex-col py-5 w-[50%] justify-center'>
            <h1 className='text-white font-bold sm:text-[12px] lg:text-[20px] x:text-[28px] sm:leading-3 md:leading-4 lg:leading-5 x:leading-7'>GOT A QUERY? TALK TO US!</h1>
            <Link
              to={`/inquiries/?id=${id}&brgy=${brgy}`}
              className='sm:w-[90px] lg:w-[120px] mt-[18px] bg-white font-medium sm:text-[10px] lg:text-[14px] py-[8px] rounded-md hover:scale-[105%] transition text-center'
            >
              <h1>
                Inquire Now
              </h1>
            </Link>
          </div>
          <div className='w-[50%] flex flex-col justify-end sm:items-center md:items-end'>
            <img src={Inquire} width={250} height={250} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard