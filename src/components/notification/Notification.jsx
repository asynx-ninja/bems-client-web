import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API_LINK from '../../config/API';
import axios from 'axios';
import moment from 'moment';

import ViewNotification from './viewNotification';

const Notification = ({ notification, setViewNotif, fetch }) => {
    // console.log(notification)
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const brgy = searchParams.get("brgy");

    const readNotif = async (item) => {
        try {
            const checkRead = await axios.get(`${API_LINK}/notification/check/?user_id=${id}&notification_id=${item._id}`)

            // console.log(checkRead.data.read_by[0].readerId)

            if (checkRead.data.read_by.length === 0 || checkRead.data.read_by[0].readerId !== id) {
                const response = await axios.patch(`${API_LINK}/notification/?notification_id=${item._id}`, { readerId: id })

                if (response.status === 200) {
                    console.log('You read a Notification!')
                }

                // console.log(item)
            }

            fetch()
            setViewNotif(item)

        } catch (err) {
            console.log(err)
        }
    }

    const DateFormat = (date) => {
        const notificationDate = moment(date);
        const now = moment();
        const timeDiff = moment.duration(now.diff(notificationDate));
        let timeAgo = "";

        if (timeDiff.asMinutes() < 60) {
            if (timeDiff.asMinutes() < 1) {
                timeAgo = `Less than a minutes ago`;
            } else {
                timeAgo = `${Math.floor(timeDiff.asMinutes())} minutes ago`;
            }
        } else if (timeDiff.asHours() < 24) {
            timeAgo = `${Math.floor(timeDiff.asHours())} hours ago`;
        } else if (timeDiff.asDays() === 1) {
            timeAgo = "Yesterday at " + notificationDate.format("h:mm A");
        } else {
            timeAgo = notificationDate.format("ddd [at] MMM D, h:mm A");
        }

        return timeAgo
    };

    const getUnseen = (item) => {
        if (item.length !== 0) {
            const check = item.find((read) => read.readerId = id)

            if (check.length === 0) {
                return true
            } else {
                return false
            }
        }else{
            return true
        }
    }

    const borderNotif = (item) => {
        if (item === "Events") {
            return 'border-l-[1px] border-l-custom-green-button'
        } else if (item === "Requests") {
            return 'border-l-[1px] border-l-red-500'
        } else if (item === "Application") {
            return 'border-l-[1px] border-l-custom-green-header'
        } else if (item === "Services") {
            return 'border-l-[1px] border-l-red-400'
        }
    }

    return (
        <div className=" overflow-y-scroll h-[425px]">
            {
                notification.map((item, i) => (
                    <button
                        type="button"
                        data-hs-overlay="#hs-modal-viewNotification"
                        key={i}
                        className='w-full border-b-[1px] border-b-gray-200 relative'
                        onClick={() => readNotif(item)}
                    >
                        {
                            getUnseen(item.read_by) === true ?
                                <div className="absolute inline-flex items-center justify-center w-3 h-3 text-[10px] font-bold text-white bg-red-500 border-2 rounded-full top-0 right-0"></div>
                                : null
                        }
                        <div
                            className={`${borderNotif(item.compose.go_to)} flex gap-5 w-full my-2 px-5 py-2 transition-all hover:border-l-[5px] hover:border-b-custom-green-header`}
                        >
                            <div className='flex flex-col sm:w-full md:w-[75%]'>
                                <div className='w-full'>
                                    <h1 className='text-[14px] text-left truncate font-bold'>{item.compose.subject}</h1>
                                    <p className='text-[12px] text-left line-clamp-2'>{item.compose.message}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-[12px] text-left text-gray-400'>{DateFormat(item.createdAt)}</p>
                                </div>
                            </div>
                            <div className='w-[25%] sm:hidden md:block'>
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