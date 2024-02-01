import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API_LINK from '../../config/API';
import axios from 'axios';

import ViewNotification from './viewNotification';

const Notification = ({notification, setViewNotif}) => {
    // console.log(notification)

    const handleView = (item) => {
        setViewNotif(item);
    };

    return (
        <div className="">
            {
                (notification.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))).map((item, i) => (
                    <button
                        type="button"
                        data-hs-overlay="#hs-modal-viewNotification"
                        key={i}
                        className='w-full'
                        onClick={() => handleView({ ...item })}
                    >
                        <div className='flex gap-5 w-full my-5 px-5 py-2 border-b-[1px] border-b-custom-green-header hover:scale-105 transition-all hover:border-b-[5px] hover:border-b-custom-green-header'>
                            <div className='flex flex-col w-[75%]'>
                                <h1 className='text-[14px] text-left truncate font-bold'>{item.compose.subject}</h1>
                                <p className='text-[12px] text-left line-clamp-4'>{item.compose.message}</p>
                            </div>
                            <div className='w-[25%]'>
                                <img src={item.logo.link} alt="" />
                            </div>
                        </div>
                    </button>
                ))
            }
        </div>
    )
}

export default Notification