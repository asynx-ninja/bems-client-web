import React from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get("id")
    const brgy = searchParams.get("brgy")
    const title = location.pathname.split("/")[1];

    return (
        <nav
            className="flex sm:px-0 md:px-5 py-3 text-black rounded-lg "
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        to={`/dashboard/?id=${id}&brgy=${brgy}`}
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-500 dark:text-gray-400 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3 mr-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Dashboard
                    </Link>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg
                            className="w-3 h-3 mx-1 text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <Link
                            className="ml-1 text-sm font-medium text-gray-700 hover:text-green-500 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                        >
                            {title === "events-list" ? "EVENTS LIST" : title.toUpperCase()}
                        </Link>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
